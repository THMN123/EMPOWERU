import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, PiggyBank, MessageCircle, User, 
  Lightbulb, LogOut, Settings, UserCircle 
} from 'lucide-react';
import './Sidebar.css';

const DropdownMenu = ({ isOpen, onClose, triggerRef, isMobile }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && 
          !dropdownRef.current.contains(event.target) &&
          triggerRef.current && 
          !triggerRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') onClose();
      });
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className={`dropdown ${isMobile ? 'mobile-dropdown' : ''}`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
    >
      <button 
        role="menuitem"
        onClick={onClose}
        className="dropdown-item"
      >
        <UserCircle size={16} aria-hidden="true" /> 
        <span>Profile</span>
      </button>
      <button 
        role="menuitem"
        onClick={onClose}
        className="dropdown-item"
      >
        <Settings size={16} aria-hidden="true" /> 
        <span>Settings</span>
      </button>
      <button 
        role="menuitem"
        onClick={onClose}
        className="dropdown-item"
      >
        <LogOut size={16} aria-hidden="true" /> 
        <span>Logout</span>
      </button>
    </div>
  );
};

const SidebarMenuButton = ({ icon: Icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={`sidebar-menu-button ${isActive ? 'active' : ''}`}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon size={20} aria-hidden="true" />
      <span className="menu-label">{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = () => setShowMenu((prev) => !prev);
  const closeDropdown = () => setShowMenu(false);

  return (
    <>
      {/* Header with logo on left and avatar on right */}
      <header className="sidebar-header">
        <div className="logo">
          <Lightbulb size={24} aria-hidden="true" />
          <h2>EMPOWERU</h2>
        </div>
        
        <div className="header-avatar">
          <button
            className="user-button"
            ref={buttonRef}
            onClick={toggleDropdown}
            aria-expanded={showMenu}
            aria-controls="user-dropdown-menu"
            aria-haspopup="true"
            id="user-menu-button"
          >
            <img 
              src="https://i.pravatar.cc/30" 
              alt="User Avatar" 
              className="avatar" 
              width="30"
              height="30"
              loading="lazy"
            />
            {!isMobile && (
              <span className="username" aria-hidden="true">
                User
              </span>
            )}
          </button>

          <DropdownMenu 
            isOpen={showMenu} 
            onClose={closeDropdown} 
            triggerRef={buttonRef}
            isMobile={isMobile}
          />
        </div>
      </header>

      {/* Main sidebar/navigation */}
      <aside className="sidebar" aria-label="Main navigation">
        <nav className="menu-items" aria-label="Primary">
          <SidebarMenuButton to="/" icon={Home} label="Home" />
          <SidebarMenuButton to="/investments" icon={PiggyBank} label="Investments" />
          <SidebarMenuButton to="/messages" icon={MessageCircle} label="Messages" />
          <SidebarMenuButton to="/profile" icon={User} label="Profile" />
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;