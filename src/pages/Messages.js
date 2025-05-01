import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, ChevronLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import './Messages.css';

const Messages = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const [messages, setMessages] = useState({
    1: [
      { id: 1, text: "Welcome to the NeuroTech AI investor portal!", sender: 'them', time: "10:30 AM" },
      { id: 2, text: "We're excited to share our Q2 progress report with you.", sender: 'them', time: "10:31 AM" },
      { id: 3, text: "Thanks! Looking forward to reviewing it.", sender: 'me', time: "10:35 AM" }
    ],
    2: [
      { id: 1, text: "Hi Sarah, here are the documents you requested.", sender: 'me', time: "9:00 AM" },
      { id: 2, text: "Received, thank you!", sender: 'them', time: "9:15 AM" }
    ]
  });

  const filteredConversations = conversations.filter(convo =>
    convo.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    convo.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResize = useCallback(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    if (!mobile && chatId) navigate('/messages');
  }, [chatId, navigate]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !chatId) return;

    const newMsg = {
      id: messages[chatId].length + 1,
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...prev[chatId], newMsg]
    }));
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
          role="navigation"
          aria-label="Conversations list"
        >
          <div className="messages-header">
            <h2>Messages</h2>
            <div className="search-bar">
              <Search size={18} aria-hidden="true" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search conversations"
              />
            </div>
          </div>
          
          <div className="conversations" role="list">
            {filteredConversations.map(convo => (
              <motion.div
                key={convo.id}
                className={`conversation ${chatId == convo.id ? 'active' : ''}`}
                onClick={() => navigate(`/messages/${convo.id}`)}
                whileHover={{ scale: 1.02 }}
                role="listitem"
                aria-current={chatId == convo.id ? 'true' : undefined}
              >
                <img 
                  src={convo.user.avatar} 
                  alt={`${convo.user.name}'s avatar`} 
                  className="avatar" 
                  aria-hidden="true"
                />
                <div className="convo-info">
                  <div className="convo-header">
                    <h4 aria-label="Contact name">{convo.user.name}</h4>
                    <span className="time" aria-label="Last message time">
                      {convo.time}
                    </span>
                  </div>
                  <p className="last-message" aria-label="Last message preview">
                    {convo.lastMessage}
                  </p>
                </div>
                {convo.unread > 0 && (
                  <span 
                    className="unread-count"
                    aria-label={`${convo.unread} unread messages`}
                  >
                    {convo.unread}
                  </span>
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
          role="region"
          aria-label="Chat window"
        >
          <div className="chat-header">
            {isMobile && (
              <button 
                className="back-button" 
                onClick={() => navigate('/messages')}
                aria-label="Back to conversations"
              >
                <ChevronLeft size={24} aria-hidden="true" />
              </button>
            )}
            <div className="user-info">
              <img 
                src={conversations.find(c => c.id == chatId)?.user.avatar} 
                alt={`${conversations.find(c => c.id == chatId)?.user.name}'s avatar`} 
                className="avatar" 
                aria-hidden="true"
              />
              <h3 aria-label="Current chat contact">
                {conversations.find(c => c.id == chatId)?.user.name}
              </h3>
            </div>
          </div>
          
          <div className="messages" role="log" aria-live="polite">
            {messages[chatId]?.map(msg => (
              <div 
                key={msg.id} 
                className={`message ${msg.sender}`}
                aria-label={`Message from ${msg.sender === 'me' ? 'you' : 'contact'}`}
              >
                <div className="message-content">
                  <p>{msg.text}</p>
                  <span className="time" aria-label="Message time">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="message-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              aria-label="Type your message"
            />
            <button 
              className="send-button"
              onClick={handleSendMessage}
              aria-label="Send message"
              disabled={!newMessage.trim()}
            >
              <Send size={20} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
      
      <div className="mobile-nav-spacer"></div>
    </div>
  );
};

export default Messages;