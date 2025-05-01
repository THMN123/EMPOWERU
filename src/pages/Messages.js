import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, ChevronLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import './Messages.css';

const Messages = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const conversations = [
    {
      id: 1,
      user: { name: "Investment Team", avatar: "https://i.pravatar.cc/40?img=1" },
      lastMessage: "We're excited to share our Q2 progress report...",
      time: "10:30 AM",
      unread: 2
    },
    {
      id: 2,
      user: { name: "Sarah Wilson", avatar: "https://i.pravatar.cc/40?img=2" },
      lastMessage: "Thanks for the investment details!",
      time: "9:15 AM",
      unread: 0
    }
  ];

  const messages = {
    1: [
      { id: 1, text: "Welcome to the NeuroTech AI investor portal!", sender: 'them', time: "10:30 AM" },
      { id: 2, text: "We're excited to share our Q2 progress report with you.", sender: 'them', time: "10:31 AM" },
      { id: 3, text: "Thanks! Looking forward to reviewing it.", sender: 'me', time: "10:35 AM" }
    ],
    2: [
      { id: 1, text: "Hi Sarah, here are the documents you requested.", sender: 'me', time: "9:00 AM" },
      { id: 2, text: "Received, thank you!", sender: 'them', time: "9:15 AM" }
    ]
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768 && chatId) {
        navigate('/messages');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chatId, navigate]);

  const handleConversationClick = (id) => {
    if (isMobile) {
      navigate(`/messages/${id}`);
    }
  };

  return (
    <div className={`messages-container ${chatId ? 'chat-open' : ''}`}>
      {/* Conversations List */}
      {(!chatId || !isMobile) && (
        <motion.div 
          className="conversations-list glassmorphism"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="messages-header">
            <h2>Messages</h2>
            <div className="search-bar">
              <Search size={18} />
              <input type="text" placeholder="Search messages..." />
            </div>
          </div>
          
          <div className="conversations">
            {conversations.map(convo => (
              <motion.div
                key={convo.id}
                className={`conversation ${chatId == convo.id ? 'active' : ''}`}
                onClick={() => handleConversationClick(convo.id)}
                whileHover={{ scale: 1.02 }}
              >
                <img src={convo.user.avatar} alt={convo.user.name} className="avatar" />
                <div className="convo-info">
                  <div className="convo-header">
                    <h4>{convo.user.name}</h4>
                    <span className="time">{convo.time}</span>
                  </div>
                  <p className="last-message">{convo.lastMessage}</p>
                </div>
                {convo.unread > 0 && (
                  <span className="unread-count">{convo.unread}</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Chat Window */}
      {(chatId || !isMobile) && (
        <motion.div 
          className="chat-window glassmorphism"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="chat-header">
            {isMobile && (
              <button className="back-button" onClick={() => navigate('/messages')}>
                <ChevronLeft size={24} />
              </button>
            )}
            <div className="user-info">
              <img 
                src={conversations.find(c => c.id == chatId)?.user.avatar} 
                alt="Profile" 
                className="avatar" 
              />
              <h3>{conversations.find(c => c.id == chatId)?.user.name}</h3>
            </div>
          </div>
          
          <div className="messages">
            {messages[chatId]?.map(msg => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                <div className="message-content">
                  <p>{msg.text}</p>
                  <span className="time">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="message-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button className="send-button">
              <Send size={20} />
            </button>
          </div>
        </motion.div>
      )}
      
      <div className="mobile-nav-spacer"></div>
    </div>
  );
};

export default Messages;