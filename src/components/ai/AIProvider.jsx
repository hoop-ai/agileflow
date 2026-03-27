import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiSession } from "@/api/entities/AiSession";
import { AiMessage } from "@/api/entities/AiMessage";

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const AIContext = createContext(null);

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions";

const MODELS = {
  fast: [
    "anthropic/claude-haiku:beta",
    "google/gemini-2.0-flash-001",
    "openai/gpt-4o-mini",
  ],
  thinking: [
    "openai/gpt-4o-mini",
    "anthropic/claude-haiku:beta",
    "google/gemini-2.0-flash-001",
  ],
};

const SYSTEM_PROMPT = `You are the AgileFlow AI Assistant — a helpful project management co-pilot built into a task management platform.

## What You Know
You are embedded in AgileFlow, a project management tool with boards, sprints, a backlog, analytics, and a calendar. The user is a project manager or team member.

## How to Respond
- **Lead with a bold one-sentence answer**, then expand with details
- Use **markdown** formatting: bold for emphasis, tables for comparisons, lists for steps
- Keep responses concise and actionable — max 200 words unless the user asks for detail
- Use bullet points for multi-step answers
- When comparing things, use a markdown table with proper headers
- Format code with backtick blocks

## Response Structure
For questions about how to do something:
1. Bold one-line answer
2. Step-by-step instructions (numbered)
3. Pro tip (if applicable)

For questions about concepts:
1. Bold definition/answer
2. Brief explanation
3. Example or analogy

## Scope
- Answer questions about project management, agile methodology, sprint planning, backlog management
- Help with task prioritization, team workload, and workflow optimization
- Explain AgileFlow features and how to use them
- Provide general productivity and project management advice
- If asked about something outside your scope, say so briefly and redirect

## Formatting Rules
- Always use proper markdown tables: | Header | Header |\\n|---|---|\\n| Cell | Cell |
- Bold important terms and numbers
- Use headers (##, ###) to organize longer responses
- Never use HTML tags — only markdown`;

export function AIProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const abortRef = useRef(null);
  const location = useLocation();

  const getPageContext = () => {
    const route = location.pathname;
    const params = new URLSearchParams(location.search);
    const filters = Object.fromEntries(params.entries());
    let pageTitle = "Dashboard";
    if (route.includes("/Board")) pageTitle = "Board Detail";
    else if (route.includes("/Boards")) pageTitle = "All Boards";
    else if (route.includes("/Backlog")) pageTitle = "Backlog";
    else if (route.includes("/Analytics")) pageTitle = "Analytics";
    else if (route.includes("/Calendar")) pageTitle = "Calendar";
    else if (route.includes("/Help")) pageTitle = "Help Center";
    return { route, filters, pageTitle };
  };

  const loadSessions = useCallback(async () => {
    setSessionsLoading(true);
    try {
      const data = await AiSession.list(50);
      setSessions(data);
    } catch (e) {
      console.error("Failed to load sessions:", e);
    }
    setSessionsLoading(false);
  }, []);

  const loadSession = useCallback(async (id) => {
    try {
      const msgs = await AiMessage.listBySession(id);
      setMessages(msgs.map(m => ({
        id: m.id,
        role: m.role,
        content: m.content,
        timestamp: new Date(m.created_at),
      })));
      setSessionId(id);
    } catch (e) {
      console.error("Failed to load session:", e);
    }
  }, []);

  const sendMessage = useCallback(async (text) => {
    const question = text.trim();
    if (!question || streaming) return;

    const userMsg = { id: generateId(), role: "user", content: question, timestamp: new Date() };
    const assistantId = generateId();
    const assistantMsg = { id: assistantId, role: "assistant", content: "", timestamp: new Date() };

    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setStreaming(true);
    setThinking(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      if (!OPENROUTER_API_KEY) {
        throw new Error("AI features need to be configured. Check your API key.");
      }

      const pageContext = getPageContext();
      const contextNote = `\n\n[User is currently on: ${pageContext.pageTitle} (${pageContext.route})]`;

      // Build conversation history for context
      const conversationHistory = messages.slice(-10).map(m => ({
        role: m.role,
        content: m.content,
      }));

      const apiMessages = [
        { role: "system", content: SYSTEM_PROMPT + contextNote },
        ...conversationHistory,
        { role: "user", content: question },
      ];

      const models = MODELS.fast;
      let lastError = null;
      let accumulated = "";

      for (const model of models) {
        try {
          accumulated = "";
          const response = await fetch(OPENROUTER_BASE_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
              "HTTP-Referer": window.location.origin,
            },
            body: JSON.stringify({
              model,
              messages: apiMessages,
              max_tokens: 2048,
              temperature: 0.7,
              stream: true,
            }),
            signal: controller.signal,
          });

          if (!response.ok) {
            const errText = await response.text().catch(() => "");
            lastError = new Error(`Model ${model} returned ${response.status}: ${errText}`);
            continue;
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });

            for (const line of chunk.split("\n")) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data:")) continue;
              const jsonStr = trimmed.slice(5).trim();
              if (jsonStr === "[DONE]") continue;

              try {
                const parsed = JSON.parse(jsonStr);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  accumulated += delta;
                  setThinking(false);
                  setMessages(prev =>
                    prev.map(m => m.id === assistantId ? { ...m, content: accumulated } : m)
                  );
                }
              } catch {
                // Partial JSON frame, skip
              }
            }
          }

          // Success — break out of model loop
          if (accumulated) break;

        } catch (modelErr) {
          if (modelErr instanceof DOMException && modelErr.name === "AbortError") throw modelErr;
          lastError = modelErr;
          continue;
        }
      }

      // Save to DB
      try {
        let currentSessionId = sessionId;
        if (!currentSessionId) {
          const newSession = await AiSession.create(question.slice(0, 50), "fast");
          currentSessionId = newSession.id;
          setSessionId(currentSessionId);
        }
        await AiMessage.create(currentSessionId, "user", question);
        await AiMessage.create(currentSessionId, "assistant", accumulated);
        await AiSession.update(currentSessionId, { updated_at: new Date().toISOString() });
        loadSessions();
      } catch (dbErr) {
        console.error("Failed to save chat:", dbErr);
      }

      // All models failed
      if (lastError && !messages.find(m => m.id === assistantId)?.content) {
        throw lastError;
      }

    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setMessages(prev =>
        prev.map(m => m.id === assistantId ? { ...m, content: m.content || `*${errorMessage}*` } : m)
      );
    } finally {
      setStreaming(false);
      setThinking(false);
    }
  }, [streaming, messages, location]);

  const openPanel = useCallback(() => setPanelOpen(true), []);
  const closePanel = useCallback(() => setPanelOpen(false), []);
  const togglePanel = useCallback(() => setPanelOpen(prev => !prev), []);

  const startNewChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setSessionId(null);
    setStreaming(false);
    setThinking(false);
  }, []);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    setStreaming(false);
    setThinking(false);
  }, []);

  const renameSession = useCallback(async (id, title) => {
    try {
      await AiSession.update(id, { title });
      setSessions(prev => prev.map(s => s.id === id ? { ...s, title } : s));
    } catch (e) {
      console.error("Failed to rename session:", e);
    }
  }, []);

  const deleteSession = useCallback(async (id) => {
    try {
      await AiSession.delete(id);
      setSessions(prev => prev.filter(s => s.id !== id));
      if (sessionId === id) {
        setMessages([]);
        setSessionId(null);
      }
    } catch (e) {
      console.error("Failed to delete session:", e);
    }
  }, [sessionId]);

  const value = {
    messages,
    sessionId,
    streaming,
    thinking,
    panelOpen,
    pageContext: getPageContext(),
    sendMessage,
    openPanel,
    closePanel,
    togglePanel,
    startNewChat,
    stopStreaming,
    sessions,
    sessionsLoading,
    loadSessions,
    loadSession,
    renameSession,
    deleteSession,
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}

export function useAI() {
  const ctx = useContext(AIContext);
  if (!ctx) throw new Error("useAI must be used within an AIProvider");
  return ctx;
}
