import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Navbar from './components/Navbar'
import './index.css'
import './assets/logo.png'
import About from './components/AboutUs'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Contact from './components/ContactUs'
import Footer from './components/Footer'
import Home from './components/Home'
import Industries from './components/Industries'
import Testimonials from './components/Testimonials'
import Careers from './components/Careers'
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import TeamManagement from "./components/TeamManagement";
import Team from './components/Team';
import Preloader from './components/Preloader';

function App() {
  return (
    <Router>
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gray-900">
          <div className="absolute inset-0 opacity-20">
            <div className="floating-squares"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          {/* Animated Lines */}
          <div className="animate-line-1"></div>
          <div className="animate-line-2"></div>
          <div className="animate-line-3"></div>

          {/* Glowing Orbs */}
          <div className="glow-orb-1"></div>
          <div className="glow-orb-2"></div>
          <div className="glow-orb-3"></div>
        </div>
      </div>

      {/* Main Content */}
      <Preloader>
      <div className="relative z-10">
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
  <Route path="/industries" element={<Industries />} />
  <Route path="/testimonials" element={<Testimonials />} />
  <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
    <Route path="/admin-dashboard" element={<AdminDashboard />} />
    {/* Ensure admin routes render the AdminDashboard container so the left admin sidebar stays visible
      when navigating to team management. AdminDashboard will detect the path and render the
      appropriate embedded view (projects or team). */}
    <Route path="/admin/team" element={<AdminDashboard />} />
  <Route path="/team" element={<Team />} />
        <Route path="*" element={<Home />} />
      </Routes>
        <Footer />
      </div>
      </Preloader>

      {/* Global Styles */}
      <style>
        {`
          /* Background Grid */
          .bg-grid-pattern {
            background-image: linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
            background-size: 40px 40px;
          }

          /* Floating Squares Animation */
          .floating-squares {
            position: absolute;
            inset: 0;
            background-image: 
              radial-gradient(circle at 25% 25%, rgba(56, 189, 248, 0.1) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 2px, transparent 2px);
            background-size: 60px 60px;
            animation: squareFloat 20s linear infinite;
          }

          @keyframes squareFloat {
            0% { background-position: 0 0; }
            100% { background-position: 60px 60px; }
          }

          /* Animated Lines */
          .animate-line-1, .animate-line-2, .animate-line-3 {
            position: absolute;
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.2), transparent);
            animation: lineSweep 8s linear infinite;
          }

          .animate-line-1 { top: 25%; animation-delay: 0s; }
          .animate-line-2 { top: 45%; animation-delay: -2s; }
          .animate-line-3 { top: 65%; animation-delay: -4s; }

          @keyframes lineSweep {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          /* Glowing Orbs */
          .glow-orb-1, .glow-orb-2, .glow-orb-3 {
            position: absolute;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            filter: blur(50px);
            opacity: 0.15;
            animation: orbFloat 20s ease-in-out infinite;
          }

          .glow-orb-1 {
            background: radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%);
            top: 20%;
            left: 20%;
            animation-delay: 0s;
          }

          .glow-orb-2 {
            background: radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%);
            top: 60%;
            right: 20%;
            animation-delay: -5s;
          }

          .glow-orb-3 {
            background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
            bottom: 10%;
            left: 40%;
            animation-delay: -10s;
          }

          @keyframes orbFloat {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(50px, 50px); }
            50% { transform: translate(0, 100px); }
            75% { transform: translate(-50px, 50px); }
          }

          /* Radial Gradient Background */
          .bg-gradient-radial {
            background: radial-gradient(circle at center, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 50%, var(--tw-gradient-to) 100%);
          }
        `}
      </style>
    </Router>
  );
}

export default App;