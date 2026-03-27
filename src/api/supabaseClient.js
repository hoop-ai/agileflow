import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase configuration. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.'
  );
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'agileflow-auth',
      }
    })
  : null;

// One-time migration: clear old auth storage keys to force fresh login
// This runs once per browser and cleans up stale sessions from the old config
const AUTH_VERSION = 'v2';
if (typeof window !== 'undefined' && localStorage.getItem('agileflow-auth-version') !== AUTH_VERSION) {
  // Remove any old Supabase auth keys that used the default storage key
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('sb-') && key.includes('-auth-token')) {
      localStorage.removeItem(key);
    }
  });
  localStorage.setItem('agileflow-auth-version', AUTH_VERSION);
}

export const isSupabaseConfigured = !!supabase;

// Detect auth errors from Supabase queries and force logout on session expiry
export function handleAuthError(error) {
  if (!error || !supabase) return false;
  const isAuthError =
    error.message?.includes('JWT') ||
    error.message?.includes('token') ||
    error.code === 'PGRST301' ||
    error.code === '401' ||
    error.status === 401 ||
    error.message?.includes('not authenticated');

  if (isAuthError) {
    supabase.auth.signOut().then(() => {
      window.location.href = '/login';
    });
    return true;
  }
  return false;
}
