import React from 'react';
import AnimateOnScroll from './AnimateOnScroll'; 
import { FaHeart, FaCogs, FaHandsHelping } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <AnimateOnScroll duration="duration-1000"> {/* Outer wrap for the entire section */}
      <section 
        id="about" 
        className="relative z-10 bg-gray-900/95 text-gray-200 min-h-screen py-16 md:py-24 border-b-4 border-gray-700" 
      >
        <div className="container mx-auto px-6 lg:px-12">
          
          {/* Intro Section - Fast, early animation */}
          <AnimateOnScroll delay={100} duration="duration-700">
            <div className="text-center mb-16 md:mb-24">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                We are <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">SketchCode.</span>
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
                At SketchCode, we turn visionary ideas into exceptional digital realities. Our company was founded with a clear mission: to create powerful digital solutions that are a joy to build and use.
              </p>
            </div>
          </AnimateOnScroll>

          {/* How We Built It (Foundation) - Single Block Animation */}
          <div className="mb-16 md:mb-24">
            <h4 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-50 text-center">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Foundation</span>
            </h4><br />
            <AnimateOnScroll delay={200} duration="duration-800">
              <div className="bg-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-700">
                <p className="text-gray-300 text-lg mb-4 text-center md:text-left">
                  The idea for SketchCode was born from a simple belief: that technology can and should be a force for positive change. We started with a strong focus on core principles of clean code, thoughtful design, and direct communication. Instead of following fleeting trends, we chose to build a company grounded in lasting quality.
                </p>
                <p className="text-gray-300 text-lg text-center md:text-left">
                  Every system, every process, and every detail has been meticulously crafted to support our ultimate goal: delivering flawless digital experiences that our clients can rely on. Our growth has been organic, fueled by a commitment to excellence and a passion for turning complex ideas into elegant solutions.
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Our Collaborative Process - Staggered Animation */}
          <div className="mb-16 md:mb-24 text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-50">
              Our Collaborative <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Process</span>
            </h2><br />
            <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
              We believe that the best results come from working together. Our process is transparent, efficient, and highly collaborative, ensuring your vision is at the center of everything we do.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              
              {/* Step 1: Shared Vision */}
              <AnimateOnScroll delay={100} duration="duration-700">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700">
                  <div className="text-5xl text-blue-400 mb-4 mx-auto text-center">
                    <FaHeart />
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2 text-center">1. Shared Vision</h3>
                  <p className="text-gray-400 text-center">
                    We start by listening to you. We work together to define your goals, understand your audience, and align on a clear, shared vision for the project.
                  </p>
                </div>
              </AnimateOnScroll>
              
              {/* Step 2: Agile Development */}
              <AnimateOnScroll delay={300} duration="duration-700">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700">
                  <div className="text-5xl text-purple-400 mb-4 mx-auto text-center">
                    <FaCogs />
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2 text-center">2. Agile Development</h3>
                  <p className="text-gray-400 text-center">
                    Our development process is agile and transparent. We provide regular updates and incorporate your feedback every step of the way to ensure a perfect fit.
                  </p>
                </div>
              </AnimateOnScroll>
              
              {/* Step 3: Ongoing Partnership */}
              <AnimateOnScroll delay={500} duration="duration-700">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700">
                  <div className="text-5xl text-green-400 mb-4 mx-auto text-center">
                    <FaHandsHelping />
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2 text-center">3. Ongoing Partnership</h3>
                  <p className="text-gray-400 text-center">
                    Our relationship doesn't end at launch. We offer continuous support and guidance to help you grow, succeed, and adapt in the long run.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Why Choose Us (feature cards) - Staggered Animation */}
          <div className="mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-50 text-center">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Sketchcode</span>
            </h2>
            <br />
            <p className="text-gray-400 max-w-3xl mx-auto text-lg text-center mb-8">We deliver exceptional value through our AI-first approach, rapid implementation, and unwavering commitment to customer success.</p>

            {/* Render cards using a map for easy staggering */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {[
                  { title: 'Customer-Centered Design', desc: 'We focus on user needs and business goals — design and development decisions are driven by measurable outcomes and usability.' },
                  { title: 'Rapid Implementation', desc: 'Fast setup and iterative delivery so you can see value quickly while maintaining high quality.' },
                  { title: 'Secure & Reliable', desc: 'Security-first engineering, data protection and reliable operations to keep your product safe and performant.' },
                  { title: 'Expert Team', desc: 'A cross-functional team of engineers, designers and product experts focused on delivering results.' },
                  { title: '24/7 Support', desc: 'Proactive maintenance and responsive support to keep your products up-to-date and available.' },
                  { title: 'Scalable Growth', desc: 'Architectures and solutions designed to grow with your business — from startup to enterprise.' },
              ].map((feature, index) => (
                  <AnimateOnScroll key={index} delay={index * 150} duration="duration-600">
                      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700">
                          <h3 className="text-xl font-bold text-gray-100 mb-2">{feature.title}</h3>
                          <p className="text-gray-400">{feature.desc}</p>
                      </div>
                  </AnimateOnScroll>
              ))}
            </div>
          </div>

        
          {/* CTA Section - Animated as a single block */}
          <AnimateOnScroll delay={100} duration="duration-700">
            <div className="bg-blue-600 text-white p-12 rounded-3xl text-center shadow-lg">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to build something amazing together?</h2>
              <p className="text-lg md:text-xl font-light mb-8">
                We're always excited to hear about new ideas. Let's start the conversation.
              </p>
              <a href="/contact" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
                Let's Connect
              </a>
            </div>
          </AnimateOnScroll>

          {/* Meet our Founder - Animated as a single block */}
          <AnimateOnScroll delay={300} duration="duration-700">
            <div className="mt-12 bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 text-center">
              <h3 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-50">
                Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Founder</span>
              </h3><br />
              <p className="text-gray-400 max-w-3xl mx-auto">"At SketchCode, we believe that AI should be accessible to every business. Our mission is to democratize intelligent automation and help companies of all sizes leverage its power to drive growth and efficiency."</p>
              <div className="mt-6 text-sm text-gray-400">Founder & CEO, SketchCode</div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </AnimateOnScroll> 
  );
};

export default AboutUs;