import React from 'react';
import { FaHeart, FaCode, FaLaptopCode, FaDatabase, FaServer, FaFigma, FaFileDownload } from 'react-icons/fa';
// Assume AnimateOnScroll component is imported and functional
import AnimateOnScroll from './AnimateOnScroll'; 
import resume from '../assets/Dangi_Rishit_.pdf';

// Define core skills data
const coreSkills = [
  { icon: <FaLaptopCode className="text-blue-400" />, title: 'Frontend Mastery', tags: ['React', 'TypeScript', 'Bootstrap', 'Tailwind CSS'] },
  { icon: <FaServer className="text-purple-400" />, title: 'Backend Development', tags: ['Node.js', 'Express', 'APIs (REST)'] },
  { icon: <FaDatabase className="text-green-400" />, title: 'Database & DevOps', tags: ['MongoDB', 'AWS/Vercel Deployment'] },
  { icon: <FaFigma className="text-red-400" />, title: 'Design & UX', tags: ['Figma Prototyping', 'Responsive Design', 'State Management'] },
];

const AboutUs = () => {
  return (
    
    <section className="bg-gray-900 text-gray-200 py-16 md:py-24 border-b-4 border-gray-700">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Intro Section - Personal Bio (Slides in from the right) */}
        <AnimateOnScroll duration="duration-1000" direction="right">
          <div className="text-center mb-8 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Rishit Dangi</span>
            </h1>
            <p className="mt-6 mx-auto text-lg md:text-xl text-gray-400">
              <span className="font-bold text-gray-50">Last-Year B.E. IT Student and MERN STACK Developer.</span> I am focused on building modern, robust, and beautiful web applications. I turn complex logic into smooth, user-centric experiences, primarily focusing on the **MERN/Next.js stack.**
            </p>
            <div className="mt-8 pt-4 border-t border-gray-700">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">My Philosophy:</h3>
              <p className="text-gray-400 max-w-3xl mx-auto text-md">
                *Quality over speed.* I prioritize clean, scalable code architecture and excellent performance, ensuring the solutions I build are maintainable and prepared for long-term growth.
              </p>
            </div>
          </div>
        </AnimateOnScroll>
        
        {/* --- NEW: Resume Download Bar (Link Updated) --- */}
        <AnimateOnScroll duration="duration-1000" direction="up" delay="delay-100">
            <div className="flex justify-center mb-16 md:mb-24">
                <a 
    href={resume} 
    download="Dangi_Rishit_.pdf" 
    type="application/pdf"
    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 text-lg"
>
    <FaFileDownload /> Download My Resume (PDF)
</a>
            </div>
        </AnimateOnScroll>
        {/* --- END NEW SECTION --- */}


        {/* --- Core Expertise Section (Slides in from the left) --- */}
        <AnimateOnScroll duration="duration-1000" direction="left"> 
          <div className="mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-50 mb-12 text-center">Core Expertise & Tech Stack</h2>
              
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {coreSkills.map((skill, index) => (
                // Individual Card: Slides up with a staggered delay
                <AnimateOnScroll 
                    key={index}
                    duration="duration-700" 
                    direction="up" 
                    delay={`delay-${index * 150}`} 
                >
                  <div 
                    className="bg-gray-800 p-6 rounded-xl shadow-2xl transition-transform duration-300 hover:scale-[1.03] border border-gray-700 flex flex-col items-start h-full"
                  >
                    <div className="text-4xl mb-4 p-3 rounded-full bg-gray-900 border border-gray-700">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-100 mb-4">{skill.title}</h3>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {skill.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="text-xs font-medium text-blue-300 bg-gray-700 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                      
                  </div>
                </AnimateOnScroll>
              ))}
              
            </div>
          </div>
        </AnimateOnScroll>
        {/* --- End Core Expertise Section --- */}


        {/* CTA Section - Slides in from the bottom (up) */}
        <AnimateOnScroll duration="duration-1000" direction="up"> 
          <div className="bg-blue-600 text-white p-12 rounded-3xl text-center shadow-lg">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Have a project idea or internship opportunity?</h2>
            <p className="text-lg md:text-xl font-light mb-8">
              Let's discuss how my expertise can bring your digital vision to life.
            </p>
            <a href="/contact" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
              Let's Connect
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default AboutUs;