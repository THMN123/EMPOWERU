// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Investments from './pages/Investments';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />
            
            {/* Investments Route */}
            <Route path="/investments" element={<Investments />} />
            
            {/* Messages Routes */}
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:chatId" element={<Messages />} />
            
            {/* Profile Route */}
            <Route path="/profile" element={<Profile />} />
            
            {/* Optional: Redirect to home for unknown routes */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;