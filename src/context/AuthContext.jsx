import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // agora usado para tudo

  useEffect(() => {
    let unsub = () => {};

    // Restaura sessão inicial
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // Eventos de auth
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s ?? null);
      setUser(s?.user ?? null);

      if (event === 'SIGNED_IN') {
        navigate('/dashboard', { replace: true });
      }
      if (event === 'SIGNED_OUT') {
        navigate('/login', { replace: true });
      }
      if (event === 'INITIAL_SESSION') {
        setLoading(false);
      }
    });

    unsub = () => sub.subscription.unsubscribe();
    return () => unsub();
  }, [navigate]);

  const signInEmail = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setSession(data.session ?? null);
    setUser(data.session?.user ?? null);
    setLoading(false);
    return { data, error: error?.message };
  };

  const signUpEmail = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setSession(data.session ?? null);
    setUser(data.session?.user ?? null);
    setLoading(false);
    return { data, error: error?.message };
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  const value = { user, session, loading, signInEmail, signUpEmail, signOut };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
