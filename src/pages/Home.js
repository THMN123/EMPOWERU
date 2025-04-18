import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, ArrowDownRight, Plus, 
  MessageSquare, Heart, Share2, User,
  BarChart2, Calendar, Image, DollarSign,
  ChevronRight, ChevronLeft, TrendingUp,
  Zap, Leaf, Bookmark, Verified, MoreHorizontal
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const [postContent, setPostContent] = useState('');
  const scrollRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Sample data
  const trendingInvestments = [
    { id: 1, name: 'NeuroTech AI', category: 'AI', roi: '+32%', investors: 142, trend: 'rising' },
    { id: 2, name: 'GreenFuture Farms', category: 'AgTech', roi: '+18%', investors: 89, trend: 'esg' },
    { id: 3, name: 'UrbanVertical', category: 'UrbanTech', roi: '+25%', investors: 204, trend: 'hot' },
    { id: 4, name: 'QuantumLeap', category: 'Quantum', roi: '+41%', investors: 231, trend: 'rising' },
    { id: 5, name: 'Solaris Energy', category: 'CleanTech', roi: '+22%', investors: 178, trend: 'esg' },
    { id: 6, name: 'BioGen Solutions', category: 'Biotech', roi: '+37%', investors: 156, trend: 'hot' }
  ];

  const userPosts = [
    {
      id: 1,
      user: { name: "Alex Rivera", avatar: "https://randomuser.me/api/portraits/men/32.jpg", verified: true },
      content: "Just committed $25k to NeuroTech AI's Series B. Their brain-computer interface could revolutionize neurological treatments.",
      investment: "NeuroTech AI",
      amount: "$25,000",
      likes: 48,
      comments: 23,
      shares: 12,
      time: "2h ago",
      tags: ["#AI", "#HealthcareTech"]
    },
    {
      id: 2,
      user: { name: "Priya Patel", avatar: "https://randomuser.me/api/portraits/women/44.jpg", verified: true },
      content: "Excited to join GreenFuture Farms' sustainability round! Their vertical farming tech yields 10x more produce per sq ft.",
      investment: "GreenFuture Farms",
      amount: "$15,000",
      likes: 89,
      comments: 42,
      shares: 19,
      time: "5h ago",
      tags: ["#Sustainability", "#AgTech"]
    },
    {
      id: 3,
      user: { name: "Marcus Chen", avatar: "https://randomuser.me/api/portraits/men/75.jpg", verified: false },
      content: "After 6 months of due diligence, investing $50k in QuantumLeap Computing. Their quantum error correction could give them a 3-year lead.",
      investment: "QuantumLeap Computing",
      amount: "$50,000",
      likes: 124,
      comments: 67,
      shares: 31,
      time: "1d ago",
      tags: ["#QuantumComputing", "#DeepTech"]
    },
    {
      id: 4,
      user: { name: "Sophia Al-Mansoori", avatar: "https://randomuser.me/api/portraits/women/68.jpg", verified: true },
      content: "Participating in UrbanVertical's seed round ($10k). Their modular farming units can be installed in any parking garage - brilliant solution!",
      investment: "UrbanVertical",
      amount: "$10,000",
      likes: 76,
      comments: 31,
      shares: 15,
      time: "3h ago",
      tags: ["#UrbanFarming", "#FoodSecurity"]
    },
    {
      id: 5,
      user: { name: "Jamal Williams", avatar: "https://randomuser.me/api/portraits/men/86.jpg", verified: false },
      content: "Investing $8k in ElectriFly's drone delivery network. Their autonomous charging stations solve the range limitation that's plagued the industry.",
      investment: "ElectriFly",
      amount: "$8,000",
      likes: 53,
      comments: 28,
      shares: 9,
      time: "7h ago",
      tags: ["#Drones", "#Logistics"]
    }
  ];

  const filteredInvestments = activeFilter === 'all' 
    ? trendingInvestments 
    : trendingInvestments.filter(item => item.trend === activeFilter);

  return (
    <div className="home-container">
      {/* Create Post Component */}
      <motion.div 
        className="create-post-card glassmorphism"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="post-input-container">
          <img 
            src="https://randomuser.me/api/portraits/men/1.jpg" 
            alt="Profile" 
            className="user-avatar shimmer"
          />
          <motion.div 
            className="input-wrapper"
            whileHover={{ scale: 1.02 }}
          >
            <input
              type="text"
              placeholder="What investment are you excited about?"
              className="post-input"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </motion.div>
        </div>
        
        <motion.div 
          className="post-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="action-buttons">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="action-button"
            >
              <Image size={20} className="icon" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="action-button"
            >
              <DollarSign size={20} className="icon" />
            </motion.button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="post-button gradient-bg"
          >
            Share Update
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Trending Opportunities Section */}
      <section className="trending-section">
        <div className="section-header">
          <h2 className="section-title">Trending Opportunities</h2>
          <div className="filter-buttons">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`filter-button ${activeFilter === 'rising' ? 'active' : ''}`}
              onClick={() => setActiveFilter('rising')}
            >
              <TrendingUp size={16} className="button-icon" /> Rising
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`filter-button ${activeFilter === 'hot' ? 'active' : ''}`}
              onClick={() => setActiveFilter('hot')}
            >
              <Zap size={16} className="button-icon" /> Hot
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`filter-button ${activeFilter === 'esg' ? 'active' : ''}`}
              onClick={() => setActiveFilter('esg')}
            >
              <Leaf size={16} className="button-icon" /> ESG
            </motion.button>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            className="see-all"
          >
            View All <ChevronRight size={16} />
          </motion.button>
        </div>
        
        <div className="carousel-container">
          <motion.button 
            onClick={scrollLeft}
            className="carousel-button left"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          
          <div className="carousel" ref={scrollRef}>
            {filteredInvestments.map((item, index) => (
              <motion.div
                key={item.id}
                className="investment-card"
                whileHover={{ y: -10 }}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="card-content">
                  <div className="investment-badge">{item.category}</div>
                  <div className="investment-header">
                    <h3>{item.name}</h3>
                    <button className="watchlist-button">
                      <Bookmark size={18} />
                    </button>
                  </div>
                  <div className="investment-metrics">
                    <div className="metric-group">
                      <span className="metric-label">ROI</span>
                      <span className="roi">{item.roi}</span>
                    </div>
                    <div className="metric-group">
                      <span className="metric-label">Investors</span>
                      <span className="investors">
                        <User size={14} /> {item.investors}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card-actions">
                  <motion.button 
                    className="invest-button secondary"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <BarChart2 size={16} /> Details
                  </motion.button>
                  <motion.button 
                    className="invest-button primary"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Plus size={16} /> Invest
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.button 
            onClick={scrollRight}
            className="carousel-button right"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </section>

      {/* Community Feed Section */}
      <section className="feed-section">
        <div className="section-header">
          <h2 className="section-title">Community Pulse</h2>
          <button className="sort-button">
            <span>Newest</span>
            <ChevronRight size={16} />
          </button>
        </div>
        
        <AnimatePresence>
          {userPosts.map(post => (
            <motion.div
              key={post.id}
              className="post-card glassmorphism"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              exit={{ opacity: 0 }}
              whileHover={{ boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
            >
              <div className="post-header">
                <img src={post.user.avatar} alt={post.user.name} className="user-avatar" />
                <div className="user-info">
                  <div className="user-name">
                    <h3>{post.user.name}</h3>
                    {post.user.verified && (
                      <span className="verified-badge">
                        <Verified size={16} />
                      </span>
                    )}
                  </div>
                  <span className="post-time">{post.time}</span>
                </div>
                <button className="post-menu">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              
              <div className="post-content">
                <p>{post.content}</p>
                <div className="investment-details">
                  <span className="investment-amount">{post.amount}</span>
                  <span className="investment-name">{post.investment}</span>
                </div>
                {post.tags.length > 0 && (
                  <div className="post-tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="post-actions">
                <motion.button 
                  className="action-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart size={18} /> {post.likes}
                </motion.button>
                <motion.button 
                  className="action-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageSquare size={18} /> {post.comments}
                </motion.button>
                <motion.button 
                  className="action-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 size={18} /> {post.shares}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* Bottom spacing for mobile nav */}
      <div className="mobile-nav-spacer"></div>
    </div>
  );
};

export default Home;