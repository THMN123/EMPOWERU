import { Outlet } from 'react-router-dom';
import './PublicLayout.css';

const PublicLayout = () => {
  return (
    <div className="public-layout">
      <div className="auth-container">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;