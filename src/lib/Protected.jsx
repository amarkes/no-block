import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ANON_PATHS = ['/reset-password', '/forgot', '/login', '/sign-up', '/terms', '/policy'];

export default function Protected({ children }) {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();

  // se a rota atual é liberada, não bloqueia
  if (ANON_PATHS.some(p => pathname.startsWith(p))) return children;

  if (loading) return <div style={{ padding: 16 }}>Carregando…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
