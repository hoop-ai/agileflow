import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '@/api/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Track current auth state for use inside callbacks (avoids stale closures)
  const isAuthenticatedRef = useRef(false);
  useEffect(() => { isAuthenticatedRef.current = isAuthenticated; }, [isAuthenticated]);

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
      console.error('Profile load failed:', error);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoadingAuth(false);
      setAuthError({ type: 'config_error', message: 'Supabase is not configured. Check environment variables.' });
      return;
    }

    // Seed initial state from existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
        isAuthenticatedRef.current = true;
        loadProfile(session.user.id).finally(() => setIsLoadingAuth(false));
      } else {
        setIsLoadingAuth(false);
      }
    }).catch(() => {
      setIsLoadingAuth(false);
    });

    // Single listener handles all auth state transitions
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
        isAuthenticatedRef.current = true;
        setAuthError(null);
        try { await loadProfile(session.user.id); } catch (e) { console.error('Profile load failed:', e); }
        setIsLoadingAuth(false);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setIsAuthenticated(false);
        isAuthenticatedRef.current = false;
        setIsLoadingAuth(false);
      } else if (event === 'TOKEN_REFRESHED') {
        // Normal for concurrent sessions — not an error
        if (session?.user) {
          setUser(session.user);
        }
      } else if (event === 'USER_UPDATED' && session?.user) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const isRegistrationEnabled = import.meta.env.VITE_REGISTRATION_ENABLED !== 'false';

  const signup = async (email, password, fullName) => {
    if (!isRegistrationEnabled) {
      throw new Error('Registration is currently closed. Contact your administrator for access.');
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/login?verified=true`
      }
    });
    if (error) throw error;
    return data;
  };

  const loginWithOAuth = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    if (error) {
      if (error.message?.includes('provider') || error.message?.includes('Unsupported')) {
        throw new Error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} sign-in is not configured yet. Please use email instead.`);
      }
      throw error;
    }
    return data;
  };

  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login?reset=true`
    });
    if (error) throw error;
    return data;
  };

  const updatePassword = async (newPassword) => {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setIsAuthenticated(false);
    isAuthenticatedRef.current = false;
  };

  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  const combinedUser = profile ? { ...profile, email: user?.email } : null;

  return (
    <AuthContext.Provider value={{
      user: combinedUser,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings: false,
      isRegistrationEnabled,
      authError,
      appPublicSettings: null,
      login,
      signup,
      loginWithOAuth,
      resetPassword,
      updatePassword,
      logout,
      navigateToLogin,
      checkAppState: () => supabase.auth.getSession()
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
