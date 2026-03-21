# AgileFlow — Project Management System

A Monday.com-style project management app built with React + Vite, Supabase, and OpenRouter AI.

## Features
- Kanban boards with drag-and-drop
- Sprint planning and backlog management
- Analytics dashboard with charts
- Calendar integration
- AI assistant (OpenRouter)
- Dark mode support

## Setup

1. Clone the repo
2. `npm install`
3. Create `.env.local`:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_OPENROUTER_API_KEY=your-openrouter-key
```
4. Run `supabase/schema.sql` in your Supabase SQL Editor
5. `npm run dev`

## Deployment
Deployed on Vercel. See `DEPLOYMENT_CHECKLIST.md` for full setup instructions.
