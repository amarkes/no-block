import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{padding:16}}>Carregando…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
