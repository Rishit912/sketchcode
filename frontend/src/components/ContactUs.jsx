import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaPaperPlane, FaSpinner, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa'; 
import AnimateOnScroll from './AnimateOnScroll'; 

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.sendForm(
        'service_xekcl78', // Your EmailJS Service ID
        'template_0wmsn1t', // Your Template ID
        e.target,           // The form element
        'dUx0kHekaic6WXHUU' // Your Public Key
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Reset form

      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 bg-gray-900 text-gray-200 py-16 md:py-24 border-b border-gray-800"
    >
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* --- 1. Unified Heading Section - Slide Down --- */}
        <AnimateOnScroll delay={100} duration="duration-700" direction="down">
          <div className="text-center mb-16 md:mb-24">
            <h1 className="text-4xl md:text-6xl font-extrabold font-['Inter'] text-gray-50">
              Let’s{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Connect
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-400">
              Have a project in mind? Reach out to us — we’d love to hear from you.
            </p>
          </div>
        </AnimateOnScroll>
        
        {/* --- Main Content Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* --- 2. Contact Information Cards - Slide Right --- */}
          <AnimateOnScroll delay={300} duration="duration-800" direction="right">
            <div className="space-y-8 p-4">
              
              <h2 className="text-3xl font-bold text-gray-50 mb-6 border-b border-gray-700 pb-2">
                Our Details
              </h2>
              
              {/* Info Card 1: Email */}
              <div className="flex items-start bg-gray-800/80 p-6 rounded-xl shadow-md border border-gray-700 hover:border-blue-500 transition duration-300">
                <FaEnvelope className="text-blue-400 text-2xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-50">Email Support</h3>
                  <p className="text-gray-400">We aim to reply within 24 hours.</p>
                  <a href="mailto:support@sketchcode.com" className="text-blue-400 hover:underline">
                    sketchcode.dev@gmail.com
                  </a>
                </div>
              </div>

              {/* Info Card 2: Location */}
              <div className="flex items-start bg-gray-800/80 p-6 rounded-xl shadow-md border border-gray-700 hover:border-purple-500 transition duration-300">
                <FaMapMarkerAlt className="text-purple-400 text-2xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-50">Headquarters</h3>
                  <p className="text-gray-400">Remote-first, serving clients globally.</p>
                  <p className="text-sm text-gray-500 mt-1">Gujarat, India (Main Office)</p>
                </div>
              </div>

              {/* Info Card 3: Phone (Placeholder) */}
              <div className="flex items-start bg-gray-800/80 p-6 rounded-xl shadow-md border border-gray-700 hover:border-blue-500 transition duration-300">
                {/* Corrected phone icon direction */}
                <FaPhone className="text-blue-400 text-2xl mt-1 mr-4 flex-shrink-0 transform -scale-x-100" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-50">Schedule a Call</h3>
                  <p className="text-gray-400">Book a quick discovery meeting.</p>
                  <a href="/schedule" className="text-blue-400 hover:underline">
                    Book Now
                  </a>
                </div>
              </div>
            </div> 
          </AnimateOnScroll>
          {/* ⬆️ THIS IS THE MISSING CLOSING TAG THAT RESOLVES THE ERROR ⬆️ */}


          {/* --- 3. Contact Form Card - Slide Left --- */}
          <AnimateOnScroll delay={500} duration="duration-800" direction="left">
            <div className="bg-gray-800/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg border border-gray-700 hover:border-purple-500/40 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-50 mb-8">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Your Email</label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    required
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Your Message</label>
                  <textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                               text-white font-bold py-3 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 
                               flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <>
                        <FaSpinner className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane  /> Send Message
                      </>
                    )}
                  </button>
                </div>

                {/* Status Messages */}
                {status === 'success' && (
                  <p className="text-green-500 text-center mt-4">
                    ✅ Thank you! Your message has been sent successfully.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-red-500 text-center mt-4">
                    ❌ Something went wrong. Please try again later.
                  </p>
                )}
              </form>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;