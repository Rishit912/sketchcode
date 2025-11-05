import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';
// Assume AnimateOnScroll component is imported and functional
import AnimateOnScroll from './AnimateOnScroll'; 

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // 'idle', 'sending', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // NOTE: YOU MUST REPLACE THE PLACEHOLDERS BELOW WITH YOUR ACTUAL EmailJS CREDENTIALS
      await emailjs.sendForm(
        'service_xekcl78',      
        'template_jt3ajo5',     
        e.target,               // The form element
        'dUx0kHekaic6WXHUU'     
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Clear form

      // Hide success message after 4s
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setStatus('error');

      // Hide error message after 4s
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="bg-gray-900 text-gray-200 py-16 md:py-24 border-b-4 border-gray-700" id="contact">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Title Section - Slides in from the Right */}
        <AnimateOnScroll duration="duration-1000" direction="right">
          <div className="text-center mb-16 md:mb-24">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-50">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Connect</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-400">
              Have a project in mind? Reach out to me and let's start the conversation.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Contact Form Container - Slides in from the Left */}
        <AnimateOnScroll duration="duration-1000" direction="left">
          <div className="max-w-xl mx-auto bg-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <FaSpinner className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane /> Send Message
                    </>
                  )}
                </button>
              </div>

              {/* Feedback Messages */}
              {status === 'success' && (
                <p className="text-green-500 text-center mt-4">
                  Thank you! Your message has been sent.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-center mt-4">
                  Oops! Something went wrong. Please try again later.
                </p>
              )}
            </form>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default ContactUs;