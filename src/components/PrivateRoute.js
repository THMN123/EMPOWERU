import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <LoadingSpinner fullscreen />;
  
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;