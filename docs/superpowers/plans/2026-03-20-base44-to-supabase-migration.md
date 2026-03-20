# Base44 → Supabase + Vercel Migration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely remove Base44 dependency and replace with Supabase (database + auth) + OpenRouter (AI) + Vercel (hosting), all on free tiers.

**Architecture:** Replace Base44's proprietary SDK with Supabase JS client for CRUD + auth. Create a thin entity service layer (`src/api/entities/`) that mirrors Base44's `.list()`, `.create()`, `.update()`, `.delete()` API so page components need minimal changes. Replace Base44's LLM integration with OpenRouter API using cascading model fallback.

**Tech Stack:** Supabase (PostgreSQL + Auth + RLS), OpenRouter API, Vite + React 18, Vercel hosting

---

## File Structure

### Files to CREATE:
- `src/api/supabaseClient.js` — Supabase client initialization
- `src/api/entities/Board.js` — Board entity service (CRUD + filter)
- `src/api/entities/Item.js` — Item entity service
- `src/api/entities/User.js` — User entity service
- `src/api/entities/CalendarEvent.js` — CalendarEvent entity service
- `src/api/entities/UserStory.js` — UserStory entity service
- `src/api/entities/Sprint.js` — Sprint entity service
- `src/api/entities/index.js` — Barrel export
- `src/api/openrouter.js` — OpenRouter LLM client with model fallback
- `supabase/schema.sql` — Database schema (for reference/setup)

### Files to MODIFY:
- `vite.config.js` — Remove Base44 plugin, add `@/entities` alias
- `package.json` — Remove `@base44/sdk`, `@base44/vite-plugin`; add `@supabase/supabase-js`
- `.env.local` — Replace Base44 vars with Supabase + OpenRouter vars
- `src/lib/AuthContext.jsx` — Rewrite for Supabase auth
- `src/components/utils/ThemeProvider.jsx` — Use Supabase instead of base44.auth
- `src/components/utils/AIAssistant.jsx` — Rewrite for OpenRouter
- `src/pages/Board.jsx` — Update entity imports
- `src/pages/Boards.jsx` — Replace `base44.entities.Board` with import
- `src/pages/Backlog.jsx` — Replace `base44.entities.*` with imports
- `src/pages/Calendar.jsx` — Replace `base44.entities.CalendarEvent` with import
- `src/pages/Dashboard.jsx` — Update entity imports
- `src/pages/Analytics.jsx` — Update entity imports
- `src/components/backlog/SprintPlanningModal.jsx` — Replace base44 calls
- `src/components/dashboard/CalendarModal.jsx` — Replace base44 calls

### Files to DELETE:
- `src/api/base44Client.js` — Old Base44 client
- `src/lib/app-params.js` — Base44 parameter extraction

---

## Task 1: Database Schema & Supabase Client

**Files:**
- Create: `supabase/schema.sql`
- Create: `src/api/supabaseClient.js`

- [ ] **Step 1: Create database schema file**

```sql
-- supabase/schema.sql
-- Run this in Supabase SQL Editor to create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users profile table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar TEXT,
  theme TEXT DEFAULT 'light',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Boards table
CREATE TABLE public.boards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#0073EA',
  icon TEXT DEFAULT '📋',
  columns JSONB DEFAULT '[]'::jsonb,
  groups JSONB DEFAULT '[]'::jsonb,
  settings JSONB DEFAULT '{}'::jsonb,
  created_date TIMESTAMPTZ DEFAULT NOW(),
  updated_date TIMESTAMPTZ DEFAULT NOW()
);

-- Items table (tasks within boards)
CREATE TABLE public.items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  board_id UUID REFERENCES public.boards(id) ON DELETE CASCADE NOT NULL,
  group_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  data JSONB DEFAULT '{}'::jsonb,
  order_index INTEGER DEFAULT 0,
  created_date TIMESTAMPTZ DEFAULT NOW(),
  updated_date TIMESTAMPTZ DEFAULT NOW()
);

-- Calendar Events table
CREATE TABLE public.calendar_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  color TEXT DEFAULT '#0073EA',
  event_type TEXT DEFAULT 'other',
  location TEXT,
  attendees JSONB DEFAULT '[]'::jsonb,
  all_day BOOLEAN DEFAULT false,
  created_date TIMESTAMPTZ DEFAULT NOW(),
  updated_date TIMESTAMPTZ DEFAULT NOW()
);

-- User Stories table (backlog)
CREATE TABLE public.user_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'backlog',
  story_points INTEGER DEFAULT 0,
  sprint_id UUID,
  board_id UUID REFERENCES public.boards(id) ON DELETE SET NULL,
  assigned_to TEXT,
  acceptance_criteria JSONB DEFAULT '[]'::jsonb,
  created_date TIMESTAMPTZ DEFAULT NOW(),
  updated_date TIMESTAMPTZ DEFAULT NOW()
);

-- Sprints table
CREATE TABLE public.sprints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  board_id UUID REFERENCES public.boards(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  goal TEXT,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'planning',
  capacity INTEGER DEFAULT 40,
  committed_points INTEGER DEFAULT 0,
  completed_points INTEGER DEFAULT 0,
  velocity INTEGER DEFAULT 0,
  created_date TIMESTAMPTZ DEFAULT NOW(),
  updated_date TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key from user_stories to sprints
ALTER TABLE public.user_stories
  ADD CONSTRAINT fk_user_stories_sprint
  FOREIGN KEY (sprint_id) REFERENCES public.sprints(id) ON DELETE SET NULL;

-- Row Level Security (RLS) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sprints ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read/update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Boards: users can CRUD their own boards
CREATE POLICY "Users can view own boards" ON public.boards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create boards" ON public.boards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own boards" ON public.boards FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own boards" ON public.boards FOR DELETE USING (auth.uid() = user_id);

-- Items: users can CRUD items on their boards
CREATE POLICY "Users can view items on own boards" ON public.items FOR SELECT USING (
  board_id IN (SELECT id FROM public.boards WHERE user_id = auth.uid())
);
CREATE POLICY "Users can create items on own boards" ON public.items FOR INSERT WITH CHECK (
  board_id IN (SELECT id FROM public.boards WHERE user_id = auth.uid())
);
CREATE POLICY "Users can update items on own boards" ON public.items FOR UPDATE USING (
  board_id IN (SELECT id FROM public.boards WHERE user_id = auth.uid())
);
CREATE POLICY "Users can delete items on own boards" ON public.items FOR DELETE USING (
  board_id IN (SELECT id FROM public.boards WHERE user_id = auth.uid())
);

-- Calendar Events: users can CRUD their own events
CREATE POLICY "Users can view own events" ON public.calendar_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create events" ON public.calendar_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own events" ON public.calendar_events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own events" ON public.calendar_events FOR DELETE USING (auth.uid() = user_id);

-- User Stories: users can CRUD their own stories
CREATE POLICY "Users can view own stories" ON public.user_stories FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create stories" ON public.user_stories FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own stories" ON public.user_stories FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own stories" ON public.user_stories FOR DELETE USING (auth.uid() = user_id);

-- Sprints: users can CRUD their own sprints
CREATE POLICY "Users can view own sprints" ON public.sprints FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create sprints" ON public.sprints FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sprints" ON public.sprints FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sprints" ON public.sprints FOR DELETE USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_date timestamps
CREATE OR REPLACE FUNCTION public.update_updated_date()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_date = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_boards_updated_date BEFORE UPDATE ON public.boards FOR EACH ROW EXECUTE FUNCTION public.update_updated_date();
CREATE TRIGGER update_items_updated_date BEFORE UPDATE ON public.items FOR EACH ROW EXECUTE FUNCTION public.update_updated_date();
CREATE TRIGGER update_calendar_events_updated_date BEFORE UPDATE ON public.calendar_events FOR EACH ROW EXECUTE FUNCTION public.update_updated_date();
CREATE TRIGGER update_user_stories_updated_date BEFORE UPDATE ON public.user_stories FOR EACH ROW EXECUTE FUNCTION public.update_updated_date();
CREATE TRIGGER update_sprints_updated_date BEFORE UPDATE ON public.sprints FOR EACH ROW EXECUTE FUNCTION public.update_updated_date();
CREATE TRIGGER update_profiles_updated_date BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_date();
```

- [ ] **Step 2: Create Supabase client**

```javascript
// src/api/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

- [ ] **Step 3: Update .env.local**

Replace all Base44 vars with:
```
VITE_SUPABASE_URL=<your-supabase-project-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
VITE_OPENROUTER_API_KEY=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
```

---

## Task 2: Entity Service Layer

**Files:**
- Create: `src/api/entities/Board.js`
- Create: `src/api/entities/Item.js`
- Create: `src/api/entities/User.js`
- Create: `src/api/entities/CalendarEvent.js`
- Create: `src/api/entities/UserStory.js`
- Create: `src/api/entities/Sprint.js`
- Create: `src/api/entities/index.js`

Each entity service must provide the same API surface as Base44: `list(sortField, limit)`, `create(data)`, `update(id, data)`, `delete(id)`, `filter(filters, sortField)`, and for User: `me()`, `updateMe(data)`.

- [ ] **Step 1: Create Board entity service**

```javascript
// src/api/entities/Board.js
import { supabase } from '../supabaseClient';

function parseSortField(sortField) {
  if (!sortField) return { column: 'created_date', ascending: false };
  const ascending = !sortField.startsWith('-');
  const column = sortField.replace(/^-/, '');
  return { column, ascending };
}

export const Board = {
  async list(sortField, limit) {
    const { column, ascending } = parseSortField(sortField);
    let query = supabase.from('boards').select('*').order(column, { ascending });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async get(id) {
    const { data, error } = await supabase.from('boards').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  async filter(filters, sortField) {
    const { column, ascending } = parseSortField(sortField);
    let query = supabase.from('boards').select('*');
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    query = query.order(column, { ascending });
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async create(boardData) {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('boards').insert({ ...boardData, user_id: user.id }).select().single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase.from('boards').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase.from('boards').delete().eq('id', id);
    if (error) throw error;
  }
};
```

- [ ] **Step 2: Create Item entity service**

```javascript
// src/api/entities/Item.js
import { supabase } from '../supabaseClient';

function parseSortField(sortField) {
  if (!sortField) return { column: 'created_date', ascending: false };
  const ascending = !sortField.startsWith('-');
  const column = sortField.replace(/^-/, '');
  return { column, ascending };
}

export const Item = {
  async list(sortField, limit) {
    const { column, ascending } = parseSortField(sortField);
    let query = supabase.from('items').select('*').order(column, { ascending });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async filter(filters, sortField) {
    const { column, ascending } = parseSortField(sortField);
    let query = supabase.from('items').select('*');
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
    query = query.order(column, { ascending });
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async create(itemData) {
    const { data, error } = await supabase.from('items').insert(itemData).select().single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase.from('items').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase.from('items').delete().eq('id', id);
    if (error) throw error;
  }
};
```

- [ ] **Step 3: Create remaining entity services (User, CalendarEvent, UserStory, Sprint)**

User service (`src/api/entities/User.js`):
```javascript
import { supabase } from '../supabaseClient';

export const User = {
  async me() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (error) throw error;
    return { ...profile, email: user.email };
  },

  async updateMe(updates) {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('profiles').update(updates).eq('id', user.id).select().single();
    if (error) throw error;
    return data;
  }
};
```

CalendarEvent service (`src/api/entities/CalendarEvent.js`):
```javascript
import { supabase } from '../supabaseClient';

function parseSortField(sortField) {
  if (!sortField) return { column: 'created_date', ascending: false };
  const ascending = !sortField.startsWith('-');
  const column = sortField.replace(/^-/, '');
  return { column, ascending };
}

export const CalendarEvent = {
  async list(sortField, limit) {
    const { column, ascending } = parseSortField(sortField);
    let query = supabase.from('calendar_events').select('*').order(column, { ascending });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async create(eventData) {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('calendar_events').insert({ ...eventData, user_id: user.id }).select().single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase.from('calendar_events').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase.from('calendar_events').delete().eq('id', id);
    if (error) throw error;
  }
};
```

UserStory service (`src/api/entities/UserStory.js`):
```javascript
import { supabase } from '../supabaseClient';

function parseSortField(sortField) {
  if (!sortField) return { column: 'created_date', ascending: false };
  const ascending = !sortField.startsWith('-');
  const column = sortField.replace(/^-/, '');
  return { column, ascending };
}

export const UserStory = {
  async list(sortField, limit) {
    const { column, ascending } = parseSortField(sortField);
    let query = supabase.from('user_stories').select('*').order(column, { ascending });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async create(storyData) {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('user_stories').insert({ ...storyData, user_id: user.id }).select().single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase.from('user_stories').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase.from('user_stories').delete().eq('id', id);
    if (error) throw error;
  }
};
```

Sprint service (`src/api/entities/Sprint.js`):
```javascript
import { supabase } from '../supabaseClient';

function parseSortField(sortField) {
  if (!sortField) return { column: 'created_date', ascending: false };
  const ascending = !sortField.startsWith('-');
  const column = sortField.replace(/^-/, '');
  return { column, ascending };
}

export const Sprint = {
  async list(sortField, limit) {
    const { column, ascending } = parseSortField(sortField);
    let query = supabase.from('sprints').select('*').order(column, { ascending });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async create(sprintData) {
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from('sprints').insert({ ...sprintData, user_id: user.id }).select().single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase.from('sprints').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase.from('sprints').delete().eq('id', id);
    if (error) throw error;
  }
};
```

- [ ] **Step 4: Create barrel export**

```javascript
// src/api/entities/index.js
export { Board } from './Board';
export { Item } from './Item';
export { User } from './User';
export { CalendarEvent } from './CalendarEvent';
export { UserStory } from './UserStory';
export { Sprint } from './Sprint';
```

---

## Task 3: Vite Config & Package Updates

**Files:**
- Modify: `vite.config.js`
- Modify: `package.json`

- [ ] **Step 1: Update vite.config.js**

Replace the entire file with:
```javascript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  logLevel: 'error',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/entities': path.resolve(__dirname, './src/api/entities'),
    }
  }
})
```

- [ ] **Step 2: Update package.json**

Remove from dependencies:
- `"@base44/sdk": "^0.8.0"`

Remove from devDependencies:
- `"@base44/vite-plugin": "^1.0.0"`

Add to dependencies:
- `"@supabase/supabase-js": "^2.49.0"`

Change name from `"base44-app"` to `"agileflow"`.

- [ ] **Step 3: Run npm install**

```bash
npm uninstall @base44/sdk @base44/vite-plugin && npm install @supabase/supabase-js
```

---

## Task 4: Auth Migration

**Files:**
- Modify: `src/lib/AuthContext.jsx`
- Modify: `src/components/utils/ThemeProvider.jsx`
- Delete: `src/api/base44Client.js`
- Delete: `src/lib/app-params.js`

- [ ] **Step 1: Rewrite AuthContext.jsx**

```jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/api/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Check initial session
    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
        await loadProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
      }
      setIsLoadingAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
        await loadProfile(session.user.id);
      }
    } catch (error) {
      console.error('Session check failed:', error);
      setAuthError({ type: 'unknown', message: error.message });
    }
    setIsLoadingAuth(false);
  };

  const loadProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signup = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setIsAuthenticated(false);
  };

  const navigateToLogin = () => {
    // In Supabase, we handle login in-app, not via redirect
    // This is kept for API compatibility — components can check isAuthenticated
    window.location.href = '/login';
  };

  // Combined user object for backward compatibility
  const combinedUser = profile ? { ...profile, email: user?.email } : null;

  return (
    <AuthContext.Provider value={{
      user: combinedUser,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings: false,
      authError,
      appPublicSettings: null,
      login,
      signup,
      logout,
      navigateToLogin,
      checkAppState: checkSession
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

- [ ] **Step 2: Rewrite ThemeProvider.jsx**

```jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/api/entities/User';

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const user = await User.me();
      const savedTheme = user.theme || 'light';
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } catch (error) {
      console.error('Error loading theme:', error);
      applyTheme('light');
      setThemeState('light');
    }
    setIsLoading(false);
  };

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');

    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else if (newTheme === 'light') {
      root.classList.add('light');
      root.style.colorScheme = 'light';
    } else if (newTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(prefersDark ? 'dark' : 'light');
      root.style.colorScheme = prefersDark ? 'dark' : 'light';
    }

    void document.body.offsetHeight;
  };

  const setTheme = async (newTheme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    try {
      await User.updateMe({ theme: newTheme });
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

- [ ] **Step 3: Delete old Base44 files**

Delete `src/api/base44Client.js` and `src/lib/app-params.js`.

---

## Task 5: Migrate Pages

**Files:**
- Modify: `src/pages/Board.jsx` (lines 3-4)
- Modify: `src/pages/Boards.jsx` (line 2, all `base44.entities.Board.*` calls)
- Modify: `src/pages/Backlog.jsx` (line 2, all `base44.entities.*` calls)
- Modify: `src/pages/Calendar.jsx` (line 2, all `base44.entities.CalendarEvent.*` calls)
- Modify: `src/pages/Dashboard.jsx` (lines 3-5)
- Modify: `src/pages/Analytics.jsx` (lines 2-3)

- [ ] **Step 1: Board.jsx — already imports from `@/entities/Board` and `@/entities/Item`**

These imports will now resolve to `src/api/entities/Board.js` and `src/api/entities/Item.js` via the Vite alias. No changes needed to this file.

- [ ] **Step 2: Boards.jsx — replace base44 imports and calls**

Replace line 2 `import { base44 } from "@/api/base44Client";` with:
```javascript
import { Board } from "@/api/entities/Board";
```

Replace all `base44.entities.Board.list(...)` → `Board.list(...)`
Replace all `base44.entities.Board.create(...)` → `Board.create(...)`
Replace all `base44.entities.Board.update(...)` → `Board.update(...)`
Replace all `base44.entities.Board.delete(...)` → `Board.delete(...)`

- [ ] **Step 3: Backlog.jsx — replace base44 imports and calls**

Replace line 2 `import { base44 } from "@/api/base44Client";` with:
```javascript
import { Board } from "@/api/entities/Board";
import { UserStory } from "@/api/entities/UserStory";
import { Sprint } from "@/api/entities/Sprint";
```

Replace all `base44.entities.Board.list(...)` → `Board.list(...)`
Replace all `base44.entities.UserStory.list(...)` → `UserStory.list(...)`
Replace all `base44.entities.UserStory.create(...)` → `UserStory.create(...)`
Replace all `base44.entities.UserStory.update(...)` → `UserStory.update(...)`
Replace all `base44.entities.UserStory.delete(...)` → `UserStory.delete(...)`
Replace all `base44.entities.Sprint.list(...)` → `Sprint.list(...)`

- [ ] **Step 4: Calendar.jsx — replace base44 imports and calls**

Replace line 2 `import { base44 } from "@/api/base44Client";` with:
```javascript
import { CalendarEvent } from "@/api/entities/CalendarEvent";
```

Replace all `base44.entities.CalendarEvent.list(...)` → `CalendarEvent.list(...)`
Replace all `base44.entities.CalendarEvent.create(...)` → `CalendarEvent.create(...)`
Replace all `base44.entities.CalendarEvent.delete(...)` → `CalendarEvent.delete(...)`

- [ ] **Step 5: Dashboard.jsx — update entity imports**

Lines 3-5 already import from `@/entities/Board`, `@/entities/Item`, `@/entities/User`. The Vite alias resolves these. No changes needed.

- [ ] **Step 6: Analytics.jsx — update entity imports**

Lines 2-3 already import from `@/entities/Board` and `@/entities/Item`. The Vite alias resolves these. No changes needed.

---

## Task 6: Migrate Components

**Files:**
- Modify: `src/components/backlog/SprintPlanningModal.jsx` (line 17)
- Modify: `src/components/dashboard/CalendarModal.jsx` (line 12)

- [ ] **Step 1: SprintPlanningModal.jsx — replace base44 imports**

Replace line 17 `import { base44 } from "@/api/base44Client";` with:
```javascript
import { Sprint } from "@/api/entities/Sprint";
import { UserStory } from "@/api/entities/UserStory";
```

Replace `base44.entities.Sprint.create(...)` → `Sprint.create(...)`
Replace `base44.entities.UserStory.update(...)` → `UserStory.update(...)`

- [ ] **Step 2: CalendarModal.jsx — replace base44 imports**

Replace line 12 `import { base44 } from "@/api/base44Client";` with:
```javascript
import { Item } from "@/api/entities/Item";
import { Board } from "@/api/entities/Board";
import { CalendarEvent } from "@/api/entities/CalendarEvent";
```

Replace `base44.entities.Item.list(...)` → `Item.list(...)`
Replace `base44.entities.Board.list(...)` → `Board.list(...)`
Replace `base44.entities.CalendarEvent.list(...)` → `CalendarEvent.list(...)`

---

## Task 7: Replace AI Assistant with OpenRouter

**Files:**
- Create: `src/api/openrouter.js`
- Modify: `src/components/utils/AIAssistant.jsx`

- [ ] **Step 1: Create OpenRouter client with cascading fallback**

```javascript
// src/api/openrouter.js

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

// Model cascade: free/cheap → paid cheap
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
```

- [ ] **Step 2: Rewrite AIAssistant.jsx to use OpenRouter**

Replace line 2 `import { base44 } from "@/api/base44Client";` with:
```javascript
import { invokeLLM } from "@/api/openrouter";
```

Replace the try block in `handleSend` (lines 39-55):
```javascript
try {
  const response = await invokeLLM(userMessage);
  setMessages(prev => [...prev, { role: 'assistant', content: response }]);
} catch (error) {
  setMessages(prev => [...prev, {
    role: 'assistant',
    content: 'Sorry, I encountered an error. Please try again.'
  }]);
}
```

---

## Task 8: Create Login Page

**Files:**
- Create: `src/pages/Login.jsx`
- Modify: `src/pages.config.js` (add Login route)

- [ ] **Step 1: Create Login page with email/password auth**

```jsx
// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signup(email, password, fullName);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">AgileFlow</h1>
          <p className="text-gray-600 mt-2">Project Management Made Simple</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>{isSignUp ? 'Create Account' : 'Welcome Back'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    required={isSignUp}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-[#0073EA] hover:bg-[#0056B3]"
                disabled={isLoading}
              >
                {isLoading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Log In'}
              </Button>

              <p className="text-center text-sm text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  className="text-[#0073EA] hover:underline font-medium"
                  onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                >
                  {isSignUp ? 'Log In' : 'Sign Up'}
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Add Login route to pages.config.js**

Add Login to the pages config so it's accessible at `/login`.

---

## Task 9: Final Cleanup & Verification

**Files:**
- Delete: `src/api/base44Client.js`
- Delete: `src/lib/app-params.js`
- Modify: `CLAUDE.md` (update documentation)

- [ ] **Step 1: Search for any remaining "base44" references**

```bash
grep -r "base44" src/ --include="*.js" --include="*.jsx" -l
```

Remove or replace every remaining reference.

- [ ] **Step 2: Run lint and build**

```bash
npm run lint:fix
npm run build
```

- [ ] **Step 3: Update CLAUDE.md**

Update all references from Base44 to Supabase. Update the tech stack, entity documentation, and commands sections.

- [ ] **Step 4: Commit and push to fork**

```bash
git add -A
git commit -m "feat: migrate from Base44 to Supabase + OpenRouter + Vercel"
git push origin main
```

---

## Post-Migration: Supabase Setup Instructions (Manual)

These steps must be done manually in the Supabase dashboard:

1. **Create a Supabase project** at https://supabase.com (free tier)
2. **Run the schema SQL** from `supabase/schema.sql` in the SQL Editor
3. **Enable Email Auth** in Authentication → Providers
4. **Copy project URL and anon key** to `.env.local`
5. **Deploy to Vercel**: Connect the GitHub fork `hoop-ai/project-management-system`, set env vars

---

## Verification Checklist

- [ ] No `base44` imports remain anywhere in `src/`
- [ ] No `@base44/sdk` or `@base44/vite-plugin` in `package.json`
- [ ] All 6 entity services work: Board, Item, User, CalendarEvent, UserStory, Sprint
- [ ] Auth flow works: signup, login, logout, session persistence
- [ ] Theme persistence works via Supabase profiles
- [ ] AI Assistant responds using OpenRouter with model fallback
- [ ] Login page renders and functions
- [ ] `npm run build` succeeds with no errors
- [ ] `npm run lint` passes
