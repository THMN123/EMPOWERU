import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  Outlet 
} from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Investments from './pages/Investments';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Protected Routes */}
              <Route element={<PrivateLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/messages/:chatId" element={<Messages />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Catch-all Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Add this layout component
const PrivateLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;