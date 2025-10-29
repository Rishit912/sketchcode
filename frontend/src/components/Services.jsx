import React from 'react';
import AnimateOnScroll from './AnimateOnScroll'; // ADDED
import { FaLaptopCode, FaMobileAlt, FaPaintBrush, FaVideo, FaBezierCurve } from 'react-icons/fa';

const services = [
  {
    icon: <FaLaptopCode size={50} className="text-blue-400" />,
    title: 'Web Development',
    description: 'Custom websites built for performance, accessibility, and conversion — from marketing sites to complex web apps.'
  },
  {
    icon: <FaMobileAlt size={50} className="text-purple-400" />,
    title: 'App Development',
    description: 'Cross-platform and native mobile applications for iOS and Android focused on speed, usability, and reliability.'
  },
  {
    icon: <FaPaintBrush size={50} className="text-green-400" />,
    title: 'UI/UX & Web Design',
    description: 'Human-centered design services: wireframes, prototypes and polished interfaces that delight users and drive engagement.'
  },
  {
    icon: <FaVideo size={50} className="text-yellow-400" />,
    title: 'E‑commerce Solutions',
    description: 'Scalable online stores with payment integration, catalog management, and conversion-focused UX.'
  },
  {
    icon: <FaBezierCurve size={50} className="text-pink-400" />,
    title: 'Maintenance & Support',
    description: 'Ongoing maintenance, performance monitoring, and feature support to keep your product secure and up-to-date.'
  },
  {
    icon: <FaLaptopCode size={50} className="text-indigo-400" />,
    title: 'Custom Software',
    description: 'Bespoke backend systems, integrations, and automation tailored to your business processes and goals.'
  }
];

const Services = () => {
  return (
    // 1. Wrap the entire section with AnimateOnScroll for the main entrance
    <AnimateOnScroll duration="duration-1000"> 
      <section 
        id="services"
        className="relative z-10 bg-gray-900/95 text-gray-200 py-16 md:py-24 border-b-4 border-gray-700" 
      >
        <div className="container mx-auto px-6 lg:px-12">
          
          {/* Service Header Block */}
          <div className="text-center mb-16 md:mb-24">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-50">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Services</span>
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
              We are dedicated to providing a full spectrum of digital solutions to help you achieve your goals and stand out in the market.
            </p>
          </div>

          {/* 2. Service Cards Grid - Staggered Animation Applied Here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {services.map((service, index) => (
              // Wrap EACH individual card for a staggered fade-in/slide-up effect
              <AnimateOnScroll key={index} delay={index * 150} duration="duration-700">
                <div 
                  className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-[1.02] border border-gray-700 text-center"
                >
                  <div className="mb-4 mx-auto">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* 3. CTA Block - Animated Separately */}
          <AnimateOnScroll delay={500} duration="duration-700">
            <div className="bg-blue-600 text-white p-12 rounded-3xl text-center shadow-lg mt-16 md:mt-24">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to elevate your digital presence?</h2>
              <p className="text-lg md:text-xl font-light mb-8">
                Tell us about your project and we’ll create a custom plan to bring it to life.
              </p>
              <a href="/contact" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-[1.02]">
                Get a Free Quote
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </AnimateOnScroll> 
  );
};

export default Services;