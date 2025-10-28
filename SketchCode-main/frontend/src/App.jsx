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

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;