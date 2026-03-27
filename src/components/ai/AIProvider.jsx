import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiSession } from "@/api/entities/AiSession";
import { AiMessage } from "@/api/entities/AiMessage";
import { AI_TOOLS, executeTool } from "@/lib/ai-tools";

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function formatToolResultsAsMarkdown(toolCalls, toolResults) {
  const parts = toolResults.map((tr, idx) => {
    const toolName = toolCalls[idx]?.function?.name || "unknown";
    try {
      const parsed = JSON.parse(tr.content);
      if (parsed.error) return `**Error** (${toolName}): ${parsed.error}`;
      if (parsed.success) {
        const details = Object.entries(parsed)
          .filter(([k]) => k !== "success")
          .map(([k, v]) => `- **${k}**: ${v}`)
          .join("\n");
        return `**Done** — ${toolName}\n${details}`;
      }
      if (Array.isArray(parsed)) {
        if (parsed.length === 0) return `**${toolName}**: No results found.`;
        const preview = parsed.slice(0, 10).map(item => {
          const label = item.name || item.title || item.id || JSON.stringify(item).slice(0, 80);
          return `- ${label}`;
        }).join("\n");
        const more = parsed.length > 10 ? `\n- ...and ${parsed.length - 10} more` : "";
        return `**${toolName}** (${parsed.length} results):\n${preview}${more}`;
      }
      return `**${toolName}**:\n\`\`\`json\n${JSON.stringify(parsed, null, 2).slice(0, 500)}\n\`\`\``;
    } catch {
      return `**${toolName}**: ${tr.content.slice(0, 300)}`;
    }
  });
  return parts.join("\n\n");
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
- Never use HTML tags — only markdown

## Available Tools
You have tools to interact with the AgileFlow platform directly. Use them when users ask you to:
- **Find team members** → call listTeamMembers to see everyone's roles, skills, and job titles
- **View boards** → call listBoards to see available project boards
- **Create tasks** → call createTask with a board_id and title
- **Assign tasks** → call assignTask with a task_id and person's name
- **List tasks** → call listTasks to see items on a board

When assigning tasks, ALWAYS call listTeamMembers first to find the right person based on their skills and role. Confirm what you did after each action.

## Intelligent Assignment & Sprint Planning
You can provide data-driven recommendations using the assignment engine:
- **Suggest task assignments** → call suggestAssignment to rank team members by suitability (competency, availability, performance). Present the top candidates with their scores and reasoning.
- **Suggest sprint composition** → call suggestSprintPlan to recommend which backlog stories to include in the next sprint based on priority, team skills, and capacity constraints.

When a user asks "who should I assign this to?" or "plan my sprint", use these tools to give quantified recommendations. Always explain the reasoning behind the scores.`;

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

      // Stream parser that detects both text content and tool calls
      async function processStream(response, msgId) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let text = "";
        let toolCalls = [];
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          // Keep the last partial line in the buffer
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data:")) continue;
            const jsonStr = trimmed.slice(5).trim();
            if (jsonStr === "[DONE]") continue;

            try {
              const parsed = JSON.parse(jsonStr);
              const choice = parsed.choices?.[0];

              const delta = choice?.delta?.content;
              if (delta) {
                text += delta;
                setThinking(false);
                setMessages(prev =>
                  prev.map(m => m.id === msgId ? { ...m, content: text } : m)
                );
              }

              if (choice?.delta?.tool_calls) {
                for (const tc of choice.delta.tool_calls) {
                  if (tc.index !== undefined) {
                    if (!toolCalls[tc.index]) {
                      toolCalls[tc.index] = { id: tc.id || "", type: "function", function: { name: "", arguments: "" } };
                    }
                    if (tc.id) toolCalls[tc.index].id = tc.id;
                    if (tc.function?.name) toolCalls[tc.index].function.name += tc.function.name;
                    if (tc.function?.arguments) toolCalls[tc.index].function.arguments += tc.function.arguments;
                  }
                }
              }
            } catch {
              // Partial JSON frame, skip
            }
          }
        }

        return { text, toolCalls: toolCalls.filter(Boolean) };
      }

      // Call OpenRouter with tool definitions
      async function callModel(model, msgs, signal, options = {}) {
        const useStream = options.stream !== false;
        return fetch(OPENROUTER_BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": window.location.origin,
          },
          body: JSON.stringify({
            model,
            messages: msgs,
            max_tokens: 2048,
            temperature: 0.7,
            stream: useStream,
            tools: AI_TOOLS,
          }),
          signal,
        });
      }

      for (const model of models) {
        try {
          accumulated = "";
          const response = await callModel(model, apiMessages, controller.signal);

          if (!response.ok) {
            const errText = await response.text().catch(() => "");
            lastError = new Error(`Model ${model} returned ${response.status}: ${errText}`);
            continue;
          }

          let { text, toolCalls } = await processStream(response, assistantId);
          accumulated = text;

          // Handle tool calls — execute tools and send results back for a final answer
          if (toolCalls.length > 0) {
            // Generate synthetic IDs for any tool calls missing an ID
            toolCalls.forEach((tc, idx) => {
              if (!tc.id) {
                tc.id = `call_${Date.now()}_${idx}`;
              }
            });

            setMessages(prev =>
              prev.map(m => m.id === assistantId ? { ...m, content: "*Checking your data...*" } : m)
            );

            const toolResults = [];
            for (const tc of toolCalls) {
              try {
                const args = JSON.parse(tc.function.arguments || "{}");
                const result = await executeTool(tc.function.name, args);
                toolResults.push({
                  role: "tool",
                  tool_call_id: tc.id,
                  content: JSON.stringify(result),
                });
              } catch (e) {
                toolResults.push({
                  role: "tool",
                  tool_call_id: tc.id,
                  content: JSON.stringify({ error: e.message }),
                });
              }
            }

            // Format tool_calls for the assistant message per OpenRouter spec
            const formattedToolCalls = toolCalls.map(tc => ({
              id: tc.id,
              type: "function",
              function: { name: tc.function.name, arguments: tc.function.arguments },
            }));

            const followUpMsgs = [
              ...apiMessages,
              { role: "assistant", content: accumulated || null, tool_calls: formattedToolCalls },
              ...toolResults,
            ];

            // Follow-up loop: handle multiple rounds of tool calls (max 3)
            let currentMsgs = followUpMsgs;
            let followUpDone = false;
            for (let round = 0; round < 3; round++) {
              try {
                const timeoutCtrl = new AbortController();
                const timeoutId = setTimeout(() => timeoutCtrl.abort(), 15000);
                const onParentAbort = () => timeoutCtrl.abort();
                controller.signal.addEventListener("abort", onParentAbort);

                try {
                  const followUpResponse = await callModel(model, currentMsgs, timeoutCtrl.signal, { stream: false });
                  clearTimeout(timeoutId);
                  controller.signal.removeEventListener("abort", onParentAbort);

                  if (followUpResponse.ok) {
                    const json = await followUpResponse.json();
                    const msg = json.choices?.[0]?.message;

                    // Check if model wants to call more tools
                    if (msg?.tool_calls && msg.tool_calls.length > 0) {
                      const nextToolResults = [];
                      for (const tc of msg.tool_calls) {
                        try {
                          const args = JSON.parse(tc.function?.arguments || "{}");
                          const result = await executeTool(tc.function.name, args);
                          nextToolResults.push({
                            role: "tool",
                            tool_call_id: tc.id || `call_${Date.now()}_${nextToolResults.length}`,
                            content: JSON.stringify(result),
                          });
                        } catch (e) {
                          nextToolResults.push({
                            role: "tool",
                            tool_call_id: tc.id || `call_${Date.now()}_${nextToolResults.length}`,
                            content: JSON.stringify({ error: e.message }),
                          });
                        }
                      }
                      // Build next round messages
                      currentMsgs = [
                        ...currentMsgs,
                        { role: "assistant", content: msg.content || null, tool_calls: msg.tool_calls },
                        ...nextToolResults,
                      ];
                      setMessages(prev =>
                        prev.map(m => m.id === assistantId ? { ...m, content: "*Working on it...*" } : m)
                      );
                      continue; // Next round
                    }

                    // No more tool calls — use the text response
                    if (msg?.content) {
                      accumulated = msg.content;
                      followUpDone = true;
                      setMessages(prev =>
                        prev.map(m => m.id === assistantId ? { ...m, content: msg.content } : m)
                      );
                      setThinking(false);
                    }
                  }
                  break; // Exit loop on success or non-tool response
                } catch (fetchErr) {
                  clearTimeout(timeoutId);
                  controller.signal.removeEventListener("abort", onParentAbort);
                  if (fetchErr instanceof DOMException && fetchErr.name === "AbortError" && controller.signal.aborted) {
                    throw fetchErr;
                  }
                  break; // Exit loop on network error
                }
              } catch (outerErr) {
                if (outerErr instanceof DOMException && outerErr.name === "AbortError") throw outerErr;
                break;
              }
            }

            // Fallback: format tool results as markdown if follow-up didn't produce a response
            if (!followUpDone) {
              const fallback = formatToolResultsAsMarkdown(toolCalls, toolResults);
              accumulated = fallback;
              setMessages(prev =>
                prev.map(m => m.id === assistantId ? { ...m, content: fallback } : m)
              );
              setThinking(false);
            }
          }

          if (accumulated) break;

        } catch (modelErr) {
          if (modelErr instanceof DOMException && modelErr.name === "AbortError") throw modelErr;
          lastError = modelErr;
          continue;
        }
      }

      // Ensure the final message content is set (especially after tool calls)
      setMessages(prev =>
        prev.map(m => m.id === assistantId ? { ...m, content: accumulated } : m)
      );
      setThinking(false);

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

      // All models failed — no accumulated text means nothing was shown to the user
      if (!accumulated && lastError) {
        throw lastError;
      }
      if (!accumulated) {
        throw new Error("No response received. Please try again.");
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
