import React from 'react';
import AnimateOnScroll from './AnimateOnScroll';

const testimonials = [
  {
    name: 'Anjali Patel',
    role: 'Founder, Cafe Bloom',
    quote:
      'SketchCode rebuilt our website and online ordering system — sales grew 32% in three months and the admin panel is a joy to use.',
  },
  {
    name: 'Rajat Mehra',
    role: 'Head of Product, ShopNow',
    quote:
      'They took our complex requirements and delivered a scalable e-commerce platform on time and on budget.',
  },
  {
    name: 'Priya Sharma',
    role: 'CTO, TrainWell',
    quote:
      'Excellent communication and iterative delivery. The mobile app is fast and stable — our retention improved instantly.',
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative z-10 bg-gray-900 text-gray-200 py-16 md:py-24 border-b border-gray-800"
    >
      <div className="container mx-auto px-6 lg:px-12 text-center">
        
        {/* --- Heading Section - Slide Down --- */}
        <AnimateOnScroll duration="duration-800" delay={100} direction="down">
          <h1 className="text-4xl md:text-6xl font-extrabold font-serif text-gray-50">
            What Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Clients Say
            </span>
          </h1>
          <p className="mt-4 text-gray-400 max-w-3xl mx-auto text-lg md:text-xl">
            Real feedback from clients who trusted SketchCode to bring their ideas to life.
          </p>
        </AnimateOnScroll>

        {/* --- Testimonials Grid - Alternating Slide Left/Right --- */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <AnimateOnScroll 
              key={i} 
              delay={i * 200 + 300} // Staggered delay for cascade effect
              duration="duration-700"
              direction={i % 2 === 0 ? "right" : "left"} // Alternating direction
            >
              <div className="bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-purple-500/50 min-h-[300px] flex flex-col justify-between">
                <p className="text-gray-300 italic leading-relaxed mb-6 flex-grow">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-gray-700/60">
                  <h3 className="text-lg font-semibold text-gray-100">{t.name}</h3>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;