// pages/Investments.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, DollarSign, Clock, Plus } from 'lucide-react';
import './Investments.css';

const Investments = () => {
  const [activeTab, setActiveTab] = useState('active');
  
  const investments = [
    { 
      id: 1, 
      name: 'NeuroTech AI', 
      amount: '$25,000', 
      date: '2023-03-15', 
      return: '+32%', 
      status: 'active',
      type: 'Equity'
    },
    { 
      id: 2, 
      name: 'GreenFuture Farms', 
      amount: '$15,000', 
      date: '2023-05-01', 
      return: '+18%', 
      status: 'active',
      type: 'Convertible Note'
    },
    { 
      id: 3, 
      name: 'UrbanVertical', 
      amount: '$50,000', 
      date: '2022-11-20', 
      return: 'Matured', 
      status: 'completed',
      type: 'Debt'
    }
  ];

  return (
    <div className="investments-container">
      <motion.div 
        className="portfolio-summary glassmorphism"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Investment Portfolio</h2>
        <div className="portfolio-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <DollarSign size={24} />
            </div>
            <div className="stat-content">
              <span className="label">Total Invested</span>
              <span className="value">$90,000</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <span className="label">Avg Return</span>
              <span className="value">+24.5%</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <PieChart size={24} />
            </div>
            <div className="stat-content">
              <span className="label">Active Deals</span>
              <span className="value">2</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="investment-list">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active Investments
          </button>
          <button 
            className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>

        {investments
          .filter(investment => investment.status === activeTab)
          .map(investment => (
            <motion.div 
              key={investment.id}
              className="investment-item glassmorphism"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="investment-header">
                <h3>{investment.name}</h3>
                <span className={`status ${investment.status}`}>
                  {investment.status}
                </span>
              </div>
              <div className="investment-details">
                <div className="detail">
                  <span className="label">Invested Amount</span>
                  <span className="value">{investment.amount}</span>
                </div>
                <div className="detail">
                  <span className="label">Investment Date</span>
                  <span className="value">{investment.date}</span>
                </div>
                <div className="detail">
                  <span className="label">Return</span>
                  <span className={`return ${investment.status}`}>
                    {investment.return}
                  </span>
                </div>
                <div className="detail">
                  <span className="label">Type</span>
                  <span className="value">{investment.type}</span>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
      <div className="mobile-nav-spacer"></div>
    </div>
  );
};

export default Investments;