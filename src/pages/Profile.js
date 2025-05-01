// pages/Profile.js
import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Briefcase, DollarSign, Settings, LogOut } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <motion.div 
        className="profile-header glassmorphism"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="avatar-section">
          <img 
            src="https://i.pravatar.cc/120" 
            alt="Profile" 
            className="profile-avatar"
          />
          <div className="profile-info">
            <h2>Alexandra Chen</h2>
            <p>Investor since 2020</p>
            <div className="stats">
              <div className="stat-item">
                <Briefcase size={18} />
                <span>24 Investments</span>
              </div>
              <div className="stat-item">
                <DollarSign size={18} />
                <span>$182,500 Total</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="details-section glassmorphism"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3>Account Details</h3>
        <div className="detail-item">
          <User size={20} />
          <div className="detail-content">
            <span className="label">Full Name</span>
            <span className="value">Alexandra Chen</span>
          </div>
        </div>
        <div className="detail-item">
          <Mail size={20} />
          <div className="detail-content">
            <span className="label">Email</span>
            <span className="value">alex.chen@example.com</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="actions-section glassmorphism"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button whileHover={{ scale: 1.02 }} className="profile-action">
          <Settings size={18} />
          <span>Account Settings</span>
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} className="profile-action">
          <Briefcase size={18} />
          <span>Investment History</span>
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} className="profile-action logout">
          <LogOut size={18} />
          <span>Log Out</span>
        </motion.button>
      </motion.div>

      <div className="mobile-nav-spacer"></div>
    </div>
  );
};

export default Profile;