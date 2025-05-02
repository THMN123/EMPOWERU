import React, { useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Auth.css';

const VerifyEmail = () => {
  const { currentUser, sendVerificationEmail } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.emailVerified) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleResend = async () => {
    await sendVerificationEmail();
  };

  return (
    <motion.div 
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="auth-card glassmorphism">
        <h2>Verify Your Email</h2>
        <p>We've sent a verification email to {currentUser?.email}</p>
        
        <div className="auth-actions">
          <button onClick={handleResend} className="auth-button">
            Resend Verification Email
          </button>
          <button 
            onClick={() => navigate('/')}
            className="auth-button secondary"
          >
            Return Home
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default VerifyEmail;