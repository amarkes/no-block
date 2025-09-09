import { useAuth } from '@/context/AuthContext';


export default function Dashboard() {
  const { signOut, loading } = useAuth();

  const _signOut = async () => {
    await signOut();
  };

  return (
    <div>
      <button onClick={_signOut}>
        {loading ? 'Signing out...' : 'Sign Out'}
      </button>
    </div>
  )
}