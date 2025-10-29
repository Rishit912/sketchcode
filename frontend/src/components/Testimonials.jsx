import React from 'react';
import AnimateOnScroll from './AnimateOnScroll'; // ADDED

const testimonials = [
  {
    name: 'Anjali Patel',
    role: 'Founder, Cafe Bloom',
    quote: 'SketchCode rebuilt our website and online ordering system — sales grew 32% in three months and the admin panel is a joy to use.'
  },
  {
    name: 'Rajat Mehra',
    role: 'Head of Product, ShopNow',
    quote: 'They took our complex requirements and delivered a scalable e-commerce platform on time and on budget.'
  },
  {
    name: 'Priya Sharma',
    role: 'CTO, TrainWell',
    quote: 'Excellent communication and iterative delivery. The mobile app is fast and stable — our retention improved instantly.'
  }
];

const Testimonials = () => {
  return (
    // --- NO OUTER <AnimateOnScroll> HERE ---
    <section 
        id="testimonials" 
        className="relative z-10 bg-gray-900/95 text-gray-200 py-16 md:py-24 border-b-4 border-gray-700" 
    >
      <div className="container mx-auto px-6 lg:px-12 text-center">
        
        {/* Main Heading and Intro Text */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-50">
          What's Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Clients Say</span>
        </h1>        
        <br />
        <p className="text-gray-400 max-w-3xl mx-auto mb-12">Real feedback from customers who used our web and mobile development services.</p>

        {/* Testimonial Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            
            // Individual card is wrapped for staggered animation (i * 200 delay)
            <AnimateOnScroll key={i} delay={i * 200} duration="duration-700"> 
              <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700">
                <p className="text-gray-300 italic">"{t.quote}"</p>
                <div className="mt-4">
                    <div className="font-semibold text-gray-100">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.role}</div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
    // --- NO OUTER </AnimateOnScroll> HERE ---
  );
}

export default Testimonials;