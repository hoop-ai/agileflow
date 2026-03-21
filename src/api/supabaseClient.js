// src/api/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Redirect to login on session expiry
supabase.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT' && !window.location.pathname.startsWith('/login')) {
    window.location.href = '/login';
  }
});

// Detect auth errors from Supabase queries and force logout on session expiry
export function handleAuthError(error) {
  if (!error) return false;
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
