import { useAuth } from '../AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const PublicRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) return <LoadingSpinner fullscreen />;
  
  return currentUser ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;