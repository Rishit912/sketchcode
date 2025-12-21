import React from 'react';
import { 
  FaHeart, 
  FaCode, 
  FaLaptopCode, 
  FaDatabase, 
  FaServer, 
  FaFigma, 
  FaCogs, 
  FaHandsHelping,
  FaRocket
} from 'react-icons/fa';
import AnimateOnScroll from './AnimateOnScroll'; 

const coreSkills = [
  { icon: <FaLaptopCode className="text-blue-400" />, title: 'Frontend Engineering', tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { icon: <FaServer className="text-purple-400" />, title: 'Backend Systems', tags: ['Node.js', 'Express', 'Microservices', 'REST APIs'] },
  { icon: <FaDatabase className="text-green-400" />, title: 'Cloud & Infrastructure', tags: ['MongoDB', 'PostgreSQL', 'AWS', 'Docker'] },
  { icon: <FaFigma className="text-red-400" />, title: 'UI/UX Strategy', tags: ['Product Design', 'Figma Prototyping', 'User Research'] },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-900 font-['Inter']">
      
      {/* HERO SECTION: MISSION & BRAND */}
      <section id="about" className="relative z-10 bg-gray-900 text-gray-200 py-16 md:py-24 border-b border-gray-800">
        <div className="container mx-auto px-6 lg:px-12">
          
          <AnimateOnScroll duration="duration-1000">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-50">
                Innovating with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">FlitCode</span>
              </h1>
              <p className="mt-6 text-gray-400 max-w-3xl mx-auto text-lg md:text-xl">
                We are a full-service digital agency dedicated to transforming complex business challenges into scalable software solutions. At FlitCode, we build the technology that powers tomorrow.
              </p>
            </div>
          </AnimateOnScroll>

          {/* CORPORATE FOUNDATION */}
          <AnimateOnScroll delay={150} duration="duration-800" direction="right">
            <div className="bg-gray-800 p-10 md:p-12 rounded-2xl shadow-xl border border-gray-700 mb-16">
              <h2 className="text-3xl font-bold text-gray-50 mb-4 text-center">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Philosophy</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-gray-300 text-lg">
                <p>
                  FlitCode was founded on the principle that high-end engineering should be accessible and transparent. We prioritize clean architecture, security, and performance in every line of code we write.
                </p>
                <p>
                  By staying at the forefront of modern stacks like MERN and Next.js, we ensure our partners receive products that are not just functional today, but ready for the demands of the future market.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CORE EXPERTISE & SERVICES */}
      <section className="bg-gray-900 py-16 md:py-24 border-b border-gray-800">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimateOnScroll direction="left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-50 text-center mb-16">
              Enterprise <span className="text-blue-400">Expertise</span>
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreSkills.map((skill, index) => (
              <AnimateOnScroll key={index} direction="up" delay={`delay-${index * 150}`}>
                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 h-full flex flex-col hover:border-blue-500/50 transition-colors group">
                  <div className="text-4xl mb-6 p-4 rounded-lg bg-gray-900 border border-gray-700 w-fit group-hover:bg-blue-900/20 transition-colors">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-4">{skill.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {skill.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-semibold text-blue-300 bg-blue-900/30 px-3 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* COLLABORATIVE PROCESS */}
      <section className="bg-gray-900 py-16 md:py-24 border-b border-gray-800">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <AnimateOnScroll direction="down">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-50 mb-16">
              How We <span className="text-purple-400">Partner</span>
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <AnimateOnScroll delay={200} direction="right">
              <div className="flex flex-col items-center">
                <FaRocket className="text-5xl text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Rapid Discovery</h3>
                <p className="text-gray-400">We analyze your business requirements to define a roadmap focused on ROI and market readiness.</p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={400} direction="up">
              <div className="flex flex-col items-center">
                <FaCogs className="text-5xl text-purple-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Agile Delivery</h3>
                <p className="text-gray-400">Bi-weekly sprints ensure transparency and constant feedback loops during the development lifecycle.</p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={600} direction="left">
              <div className="flex flex-col items-center">
                <FaHandsHelping className="text-5xl text-green-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Scalable Growth</h3>
                <p className="text-gray-400">Our relationship continues past launch with maintenance, security patches, and feature scaling.</p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimateOnScroll direction="up">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-12 rounded-3xl text-center shadow-2xl">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to Scale Your Digital Presence?</h2>
              <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                Join our network of successful partners and transform your project into an industry-leading product.
              </p>
              <a href="/contact" className="inline-block bg-white text-blue-700 font-bold px-10 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-transform hover:scale-105">
                Contact Our Team
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;