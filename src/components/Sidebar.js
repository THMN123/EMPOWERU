import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, PiggyBank, MessageCircle, User, 
  Lightbulb, LogOut, Settings, UserCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import './Sidebar.css';

const NavButton = ({ icon: Icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="nav-button-wrapper"
    >
      <Link 
        to={to}
        className={`nav-button ${isActive ? 'active' : ''}`}
        aria-current={isActive ? 'page' : undefined}
      >
        <motion.div
          animate={{
            y: isActive ? -5 : 0
          }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          <Icon size={22} />
        </motion.div>
        <motion.span
          animate={{
            opacity: isActive ? 1 : 0.7
          }}
        >
          {label}
        </motion.span>
        {isActive && (
          <motion.div 
            className="active-indicator"
            layoutId="activeIndicator"
            transition={{ type: 'spring', stiffness: 500 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

const DropdownMenu = ({ isOpen, onClose, triggerRef, user }) => {
  const dropdownRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleInteraction = (event) => {
      const clickedOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(event.target);
      const clickedOutsideTrigger = triggerRef.current && !triggerRef.current.contains(event.target);
      
      if (clickedOutsideDropdown && clickedOutsideTrigger) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleInteraction);
      document.addEventListener('touchstart', handleInteraction);
    }

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [isOpen, onClose, triggerRef]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <motion.div
      ref={dropdownRef}
      className="dropdown"
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: isOpen ? 1 : 0,
        y: isOpen ? 0 : -10
      }}
      transition={{ duration: 0.2 }}
      role="menu"
      aria-hidden={!isOpen}
    >
      <div className="user-info">
        <img 
          src={user?.photoURL || 'https://i.pravatar.cc/40'} 
          alt={user?.displayName} 
          className="sidebar-avatar"
        />
        <div className="user-details">
          <span className="user-name">{user?.displayName || 'User'}</span>
          <span className="user-email">{user?.email}</span>
        </div>
      </div>

      <motion.button 
        whileTap={{ scale: 0.95 }}
        className="dropdown-item" 
        onClick={() => navigate('/profile')}
      >
        <UserCircle size={18} />
        <span>Profile</span>
      </motion.button>
      <motion.button 
        whileTap={{ scale: 0.95 }}
        className="dropdown-item" 
        onClick={() => navigate('/settings')}
      >
        <Settings size={18} />
        <span>Settings</span>
      </motion.button>
      <motion.button 
        whileTap={{ scale: 0.95 }}
        className="dropdown-item" 
        onClick={handleLogout}
      >
        <LogOut size={18} />
        <span>Logout</span>
      </motion.button>
    </motion.div>
  );
};

const Sidebar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownTriggerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className="app-header">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
        >
          <Lightbulb size={24} />
          <h1>EMPOWERU</h1>
        </motion.div>
        <div className="user-controls">
          <motion.button
            ref={dropdownTriggerRef}
            className="avatar-button"
            onClick={() => setShowDropdown(!showDropdown)}
            whileTap={{ scale: 0.9 }}
            aria-expanded={showDropdown}
          >
            <motion.img 
              src={currentUser?.photoURL || 'https://i.pravatar.cc/40'} 
              alt="User" 
              animate={{
                scale: showDropdown ? 1.1 : 1
              }}
              transition={{ type: 'spring' }}
            />
          </motion.button>
          <DropdownMenu 
            isOpen={showDropdown} 
            onClose={() => setShowDropdown(false)}
            triggerRef={dropdownTriggerRef}
            user={currentUser}
          />
        </div>
      </header>

      <nav className={`app-navigation ${isMobile ? 'mobile' : ''}`}>
        <NavButton to="/" icon={Home} label="Home" />
        <NavButton to="/investments" icon={PiggyBank} label="Invest" />
        <NavButton to="/messages" icon={MessageCircle} label="Chat" />
        <NavButton to="/profile" icon={User} label="Profile" />
      </nav>
    </>
  );
};

export default Sidebar;