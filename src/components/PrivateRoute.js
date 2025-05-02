import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;