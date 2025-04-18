import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, ArrowDownRight, Plus, 
  MessageSquare, Heart, Share2, User,
  BarChart2, Calendar, Image, DollarSign,
  Search, ChevronRight, ChevronLeft
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const [postContent, setPostContent] = useState('');
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Sample data
  const trendingInvestments = [
    { id: 1, name: 'Tech Startup', category: 'Software', roi: '+32%', investors: 142 },
    { id: 2, name: 'Eco Farm', category: 'Agriculture', roi: '+18%', investors: 89 },
    { id: 3, name: 'Fashion Brand', category: 'Retail', roi: '+25%', investors: 204 },
    { id: 4, name: 'AI Research', category: 'Technology', roi: '+41%', investors: 231 },
    { id: 5, name: 'Solar Energy', category: 'Renewables', roi: '+22%', investors: 178 }
  ];

  const userPosts = [
    {
      id: 1,
      user: { 
        name: "Alex Rivera", 
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        verified: true
      },
      content: "Just committed $25k to NeuroTech AI's Series B. Their brain-computer interface could revolutionize how we treat neurological disorders. The team has published 12 peer-reviewed papers this year alone!",
      investment: "NeuroTech AI",
      amount: "$25,000",
      likes: 48,
      comments: 23,
      time: "2h ago",
      tags: ["#AI", "#HealthcareTech"]
    },
    {
      id: 2,
      user: { 
        name: "Priya Patel", 
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        verified: true
      },
      content: "Excited to join GreenFuture Farms' sustainability round! Their vertical farming tech yields 10x more produce per sq ft than traditional methods. Perfect for urban food deserts. Investing $15k.",
      investment: "GreenFuture Farms",
      amount: "$15,000",
      likes: 89,
      comments: 42,
      time: "5h ago",
      tags: ["#Sustainability", "#AgTech"]
    },
    {
      id: 3,
      user: { 
        name: "Marcus Chen", 
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        verified: false
      },
      content: "After 6 months of due diligence, I'm investing $50k in QuantumLeap Computing. Their quantum error correction could give them a 3-year lead in the quantum race. High risk, but the potential is staggering.",
      investment: "QuantumLeap Computing",
      amount: "$50,000",
      likes: 124,
      comments: 67,
      time: "1d ago",
      tags: ["#QuantumComputing", "#DeepTech"]
    },
    {
      id: 4,
      user: { 
        name: "Sophia Al-Mansoori", 
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        verified: true
      },
      content: "Just participated in UrbanVertical's seed round ($10k). Their modular farming units can be installed in any parking garage - brilliant solution for food deserts. Already in talks with 3 major cities!",
      investment: "UrbanVertical",
      amount: "$10,000",
      likes: 76,
      comments: 31,
      time: "3h ago",
      tags: ["#UrbanFarming", "#FoodSecurity"]
    },
    {
      id: 5,
      user: { 
        name: "Jamal Williams", 
        avatar: "https://randomuser.me/api/portraits/men/86.jpg",
        verified: false
      },
      content: "Investing $8k in ElectriFly's drone delivery network. Their autonomous charging stations solve the range limitation that's plagued the industry. First commercial routes launching next quarter in Texas.",
      investment: "ElectriFly",
      amount: "$8,000",
      likes: 53,
      comments: 28,
      time: "7h ago",
      tags: ["#Drones", "#Logistics"]
    }
  ];

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

      {/* Trending Investments Carousel */}
      <section className="trending-section">
        <div className="section-header">
          <h2 className="section-title">Trending Opportunities</h2>
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
            {trendingInvestments.map((item, index) => (
              <motion.div
                key={item.id}
                className={`investment-card ${index === activeIndex ? 'active' : ''}`}
                whileHover={{ y: -10 }}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="card-content">
                  <div className="investment-badge">{item.category}</div>
                  <h3>{item.name}</h3>
                  <div className="investment-metrics">
                    <span className="roi">{item.roi}</span>
                    <span className="investors">
                      <User size={14} /> {item.investors}
                    </span>
                  </div>
                </div>
                <motion.button 
                  className="invest-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus size={16} /> Explore
                </motion.button>
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

      {/* Community Feed */}
      <section className="feed-section">
        <h2 className="section-title">Community Pulse</h2>
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
                    {post.user.verified && <span className="verified-badge">✓</span>}
                  </div>
                  <span className="post-time">{post.time}</span>
                </div>
              </div>
              <div className="post-content">
                <p>{post.content}</p>
                <div className="investment-details">
                  <span className="investment-amount">{post.amount}</span>
                  <span className="investment-name">{post.investment}</span>
                </div>
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="post-actions">
                <button className="action-button">
                  <Heart size={18} /> {post.likes}
                </button>
                <button className="action-button">
                  <MessageSquare size={18} /> {post.comments}
                </button>
                <button className="action-button">
                  <Share2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Home;