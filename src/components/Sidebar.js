import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, PiggyBank, MessageCircle, User, Lightbulb, LogOut, Settings, UserCircle } from 'lucide-react';
import SidebarMenuButton from './SidebarMenuButton';
import './Sidebar.css';

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Toggles menu visibility
  const toggleDropdown = () => setShowMenu((prev) => !prev);

  // Closes the menu
  const closeDropdown = () => setShowMenu(false);

  // Handles clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="sidebar">
      {/* Sidebar logo */}
      <div className="logo">
        <Lightbulb size={24} />
        <h2>EMPOWERU</h2>
      </div>

      {/* Sidebar menu items */}
      <nav className="menu-items">
        <SidebarMenuButton to="/" icon={Home} label="Home" />
        <SidebarMenuButton to="/investments" icon={PiggyBank} label="Investments" />
        <SidebarMenuButton to="/messages" icon={MessageCircle} label="Messages" />
        <SidebarMenuButton to="/profile" icon={User} label="Profile" />
      </nav>

      {/* Sidebar footer with user info */}
      <div className="sidebar-footer">
        <button
          className="user-button"
          ref={buttonRef}
          onClick={toggleDropdown}
        >
          <img src="https://i.pravatar.cc/30" alt="User Avatar" className="avatar" />
        </button>

        {showMenu && (
          <div
            className="dropdown"
            ref={dropdownRef}
          >
            <button onClick={closeDropdown}><UserCircle size={16} /> Profile</button>
            <button onClick={closeDropdown}><Settings size={16} /> Settings</button>
            <button onClick={closeDropdown}><LogOut size={16} /> Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
