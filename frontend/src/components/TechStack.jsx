import React from 'react';
// Assume AnimateOnScroll component is imported and functional
import AnimateOnScroll from './AnimateOnScroll'; 

import { 
    FaReact, FaJs, FaNodeJs, FaHtml5, FaCss3Alt, 
    FaGitAlt, FaDatabase, FaServer, FaFigma, FaCode, FaPaintBrush, FaCodeBranch 
} from 'react-icons/fa';
import { SiTailwindcss, SiMongodb } from 'react-icons/si';

// --- Define your Tech Stack Data ---
const techCategories = [
    {
        category: 'Core Programming & Frontend',
        icon: <FaReact className="text-blue-400" />,
        tools: [
            { name: 'HTML5', icon: <FaHtml5 className="text-orange-600" />, level: 'Expert' },
            { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" />, level: 'Expert' },
            { name: 'JavaScript', icon: <FaJs className="text-yellow-500" />, level: 'Expert' },
            { name: 'React.js', icon: <FaReact className="text-blue-500" />, level: 'Advanced' },
            { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-500" />, level: 'Advanced' },
        ]
    },
    {
        category: 'Backend & APIs (MERN)',
        icon: <FaServer className="text-purple-400" />,
        tools: [
            { name: 'Node.js', icon: <FaNodeJs className="text-green-500" />, level: 'Intermediate' },
            { name: 'Express.js', icon: <FaServer className="text-gray-400" />, level: 'Intermediate' },
            { name: 'REST APIs', icon: <FaCodeBranch className="text-red-400" />, level: 'Intermediate' },
            { name: 'MongoDB', icon: <SiMongodb className="text-green-600" />, level: 'Intermediate' },
        ]
    },
    {
        category: 'Tools, Version Control & Design',
        icon: <FaCode className="text-pink-400" />,
        tools: [
            { name: 'VS Code', icon: <FaCode className="text-blue-400" />, level: 'Expert' },
            { name: 'Git', icon: <FaGitAlt className="text-orange-600" />, level: 'Intermediate' },
            { name: 'Figma', icon: <FaFigma className="text-pink-500" />, level: 'Advanced' },
            { name: 'Photoshop', icon: <FaPaintBrush className="text-blue-300" />, level: 'Intermediate' },
        ]
    }
];

const TechStack = () => {
  return (
    <section className="bg-gray-900 text-gray-200 py-16 md:py-24 border-b-4 border-gray-700 min-h-screen">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Title Section - Slides in from the Right */}
        <AnimateOnScroll duration="duration-1000" direction="right">
          <div className="text-center mb-16 md:mb-24">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Tech Stack</span>
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
              The core languages, frameworks, and tools I use to build modern, full-stack applications (MERN Stack focus).
            </p>
          </div>
        </AnimateOnScroll>

        {/* Tech Stack Grid */}
        <div className="space-y-12">
            {techCategories.map((categoryData, index) => (
                // Category Block: Alternates between LEFT and RIGHT slide
                <AnimateOnScroll 
                    key={index} 
                    duration="duration-1000" 
                    direction={index % 2 === 0 ? "left" : "right"} // This creates the alternating effect!
                    delay={`delay-${index * 100}`}
                >
                    <div className="bg-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-700">
                        
                        {/* Category Header */}
                        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-700">
                            <div className="text-3xl">
                                {categoryData.icon}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
                                {categoryData.category}
                            </h2>
                        </div>

                        {/* Tools Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                            {categoryData.tools.map((tool, toolIndex) => (
                                // Individual Card: Slides in from the bottom (Up) with a staggered delay
                                <AnimateOnScroll 
                                    key={toolIndex}
                                    duration="duration-700" 
                                    direction="up" 
                                    delay={`delay-${(index * categoryData.tools.length + toolIndex) * 75}`} // Staggered delay logic
                                >
                                    <div 
                                        className="bg-gray-900 p-4 rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.05] hover:shadow-purple-500/20 flex flex-col items-center text-center h-full"
                                    >
                                        <div className="text-4xl mb-2">
                                            {tool.icon}
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-50">{tool.name}</h4>
                                        <span className="text-xs text-gray-400 mt-auto pt-1 w-full border-t border-gray-700 uppercase tracking-wider">
                                            {tool.level}
                                        </span>
                                    </div>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </AnimateOnScroll>
            ))}
        </div>

        {/* CTA Section - Slides in from the Bottom (Down) */}
        <AnimateOnScroll duration="duration-1000" direction="down" delay="delay-200">
          <div className="mt-20 bg-blue-600 text-white p-12 rounded-3xl text-center shadow-lg">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to collaborate on a new project?</h2>
            <p className="text-lg md:text-xl font-light mb-8">
              My skills are ready for deployment. Let's discuss your requirements.
            </p>
            <a href="/contact" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
              Get in Touch
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default TechStack;