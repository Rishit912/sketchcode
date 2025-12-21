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
<<<<<<< HEAD
    <AnimateOnScroll duration="duration-1000">
      <section
        id="about"
        className="relative z-10 bg-gray-900/95 text-gray-200 min-h-screen py-16 md:py-24 border-b-4 border-gray-700 font-['Inter']"
      >
        <div className="container mx-auto px-6 lg:px-12">
          {/* INTRO SECTION */}
          <AnimateOnScroll duration="duration-800" delay={0}>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-50">
                We are{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  FlitCode
                </span>
              </h1>
              <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
                At FlitCode, we turn visionary ideas into exceptional digital
                realities. Our mission: to create powerful digital solutions that
                are a joy to build and use.
              </p>
            </div>
          </AnimateOnScroll>

          {/* OUR FOUNDATION (Full Block Slide-in) */}
          <AnimateOnScroll delay={150} duration="duration-800" direction="right">
            <div className="bg-gray-800 p-10 md:p-12 rounded-2xl shadow-xl border border-gray-700 mb-16">
              <h2 className="text-3xl font-bold text-gray-50 mb-4 text-center">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Foundation
                </span>
              </h2>
              <p className="text-gray-300 text-lg mb-4 text-center md:text-left">
                The idea for FlitCode was born from a simple belief: that
                technology should be a force for positive change. We started
                with a strong focus on clean code, thoughtful design, and direct
                communication — building a company grounded in lasting quality.
              </p>
              <p className="text-gray-300 text-lg text-center md:text-left">
                Every process and detail is crafted to deliver flawless digital
                experiences our clients can rely on — fueled by passion for
                turning complex ideas into elegant, scalable solutions.
              </p>
            </div>
          </AnimateOnScroll>

          {/* OUR COLLABORATIVE PROCESS */}
          <div className="mb-16 text-center">
            {/* Process Title (Slide Down) */}
            <AnimateOnScroll delay={50} duration="duration-700" direction="down">
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-50 mb-4">
                Our Collaborative{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Process
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
                The best results come from working together — our process is
                transparent, efficient, and centered around your vision.
              </p>
            </AnimateOnScroll>

            {/* Process Steps - Alternating Left, Up, Right */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {/* Step 1 (Slide Right) */}
              <AnimateOnScroll delay={300} direction="right">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 
                                transform transition-transform duration-300 hover:scale-105 
                                h-full flex flex-col justify-between">
                  <div className="text-5xl text-blue-400 mb-4">
                    <HeartIcon className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    1. Shared Vision
                  </h3>
                  <p className="text-gray-400 flex-grow">
                    We begin by understanding your goals, audience, and
                    long-term vision — ensuring complete alignment before we
                    start building.
                  </p>
                </div>
              </AnimateOnScroll>

              {/* Step 2 (Slide Up) */}
              <AnimateOnScroll delay={500} direction="up">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 
                                transform transition-transform duration-300 hover:scale-105 
                                h-full flex flex-col justify-between">
                  <div className="text-5xl text-purple-400 mb-4">
                    <CogsIcon className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    2. Agile Development
                  </h3>
                  <p className="text-gray-400 flex-grow">
                    Using an agile approach, we iterate fast, share progress
                    often, and incorporate your feedback every step of the way.
                  </p>
                </div>
              </AnimateOnScroll>

              {/* Step 3 (Slide Left) */}
              <AnimateOnScroll delay={700} direction="left">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 
                                transform transition-transform duration-300 hover:scale-105 
                                h-full flex flex-col justify-between">
                  <div className="text-5xl text-green-400 mb-4">
                    <HandsIcon className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    3. Ongoing Partnership
                  </h3>
                  <p className="text-gray-400 flex-grow">
                    We continue supporting you post-launch — ensuring your
                    product grows, adapts, and thrives long term.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
=======
    
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
>>>>>>> 4bdeffe547b302a19f3c8e7e4dbd2ef32a76a35d
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

<<<<<<< HEAD
          {/* WHY CHOOSE US */}
          <div className="mb-16">
            {/* Choose Us Title (Slide Left) */}
            <AnimateOnScroll delay={200} duration="duration-700" direction="left">
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-50 text-center mb-4">
                Why Choose{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  FlitCode
                </span>
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-lg text-center mb-8">
                We deliver exceptional value through an AI-first mindset, rapid
                development, and dedication to our clients’ success.
              </p>
            </AnimateOnScroll>
=======
>>>>>>> 4bdeffe547b302a19f3c8e7e4dbd2ef32a76a35d

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


<<<<<<< HEAD
          {/* MEET FOUNDER (Slide Left) */}
          <AnimateOnScroll delay={500} direction="left">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 text-center">
              <h3 className="text-3xl md:text-5xl font-extrabold text-gray-50 mb-4">
                Meet Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Founder
                </span>
              </h3>
              <p className="text-gray-400 max-w-3xl mx-auto mb-4">
                “At FlitCode, we believe technology should empower creativity.
                Our mission is to make innovation accessible to everyone — one
                smart product at a time.”
              </p>
              <div className="text-sm text-gray-400">
                Founder & CEO, FlitCode
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </AnimateOnScroll>
=======
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
>>>>>>> 4bdeffe547b302a19f3c8e7e4dbd2ef32a76a35d
  );
};

export default AboutUs;