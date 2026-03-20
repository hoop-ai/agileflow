// src/api/openrouter.js

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

// Model cascade: free/cheap -> paid cheap
const MODEL_CASCADE = [
  'openai/gpt-4o-mini',           // Very cheap, reliable
  'meta-llama/llama-3.3-8b-instruct:free', // Free
  'google/gemini-2.0-flash-001',  // Very cheap
  'anthropic/claude-3.5-haiku',   // Cheap paid fallback
];

async function callModel(model, messages) {
  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'AgileFlow AI Assistant',
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `Model ${model} failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No response generated.';
}

export async function invokeLLM(prompt) {
  const messages = [
    {
      role: 'system',
      content: `You are an AI assistant for AgileFlow, an Agile/Scrum project management application.

The app includes:
- Dashboard: Overview of all boards, tasks, and activities
- Boards: Create and manage project boards with customizable columns and groups
- Backlog: Manage user stories and sprint planning
- Calendar: View and schedule team events and deadlines
- Analytics: Track performance metrics and insights
- Settings: Customize theme, notifications, and preferences

Provide helpful, concise responses. If the user asks how to do something, explain the steps clearly.`
    },
    { role: 'user', content: prompt }
  ];

  // Try models in cascade order
  for (const model of MODEL_CASCADE) {
    try {
      return await callModel(model, messages);
    } catch (error) {
      console.warn(`Model ${model} failed:`, error.message);
      // Continue to next model
    }
  }

  throw new Error('All AI models failed. Please try again later.');
}
