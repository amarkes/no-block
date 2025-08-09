// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onRecoveryRoute = pathname.startsWith('/reset-password');

  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub = () => {};

    // Restaura sessão inicial (sem redirecionar aqui)
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // Eventos de auth
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      // console.log('[auth event]', event, s);
      setSession(s ?? null);
      setUser(s?.user ?? null);

      if (event === 'SIGNED_IN') {
        navigate('/dashboard', { replace: true });
      }

      // ⚠️ não chutar pro login se estiver no fluxo de recuperação
      if (event === 'SIGNED_OUT' && !onRecoveryRoute) {
        navigate('/login', { replace: true });
      }

      if (event === 'PASSWORD_RECOVERY') {
        // já estamos/iremos para /reset-password
        navigate('/reset-password', { replace: true });
      }

      if (event === 'INITIAL_SESSION') {
        setLoading(false);
      }
    });

    unsub = () => sub.subscription.unsubscribe();
    return () => unsub();
  }, [navigate, onRecoveryRoute]);

  const signInEmail = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setSession(data?.session ?? null);
    setUser(data?.session?.user ?? null);
    setLoading(false);
    return { data, error: error?.message };
  };

  const signUpEmail = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setSession(data?.session ?? null);
    setUser(data?.session?.user ?? null);
    setLoading(false);
    return { data, error: error?.message };
  };

  // Envia e-mail com link de recuperação
  const requestPasswordReset = async (email) => {
    setLoading(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    return { data, error: error?.message };
  };

  // Define a nova senha após verificação
  const updatePassword = async (newPassword) => {
    setLoading(true);
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    return { data, error: error?.message };
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  const value = {
    user,
    session,
    loading,
    signInEmail,
    signUpEmail,
    requestPasswordReset,
    updatePassword,
    signOut,
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
