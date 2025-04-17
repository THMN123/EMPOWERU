import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SidebarMenuButton.css';

const SidebarMenuButton = ({ icon: Icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`sidebar-menu-button ${isActive ? 'active' : ''}`}>
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

export default SidebarMenuButton;
