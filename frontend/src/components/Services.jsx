import React from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaPaintBrush,
  FaVideo,
  FaBezierCurve,
  FaCogs,
} from "react-icons/fa";

const services = [
  {
    icon: <FaLaptopCode size={50} className="text-blue-400" />,
    title: "Web Development",
    description:
      "Custom websites built for performance, accessibility, and conversion — from marketing sites to complex web apps.",
  },
  {
    icon: <FaMobileAlt size={50} className="text-purple-400" />,
    title: "App Development",
    description:
      "Cross-platform and native mobile applications for iOS and Android focused on speed, usability, and reliability.",
  },
  {
    icon: <FaPaintBrush size={50} className="text-green-400" />,
    title: "UI/UX & Web Design",
    description:
      "Human-centered design services — wireframes, prototypes, and polished interfaces that delight users and drive engagement.",
  },
  {
    icon: <FaVideo size={50} className="text-yellow-400" />,
    title: "E-commerce Solutions",
    description:
      "Scalable online stores with secure payments, catalog management, and conversion-focused user experiences.",
  },
  {
    icon: <FaBezierCurve size={50} className="text-pink-400" />,
    title: "Maintenance & Support",
    description:
      "Ongoing maintenance, updates, and performance monitoring to ensure your products stay fast, secure, and modern.",
  },
  {
    icon: <FaCogs size={50} className="text-indigo-400" />,
    title: "Custom Software",
    description:
      "Bespoke backend systems, APIs, and automation tools tailored to your business processes and long-term goals.",
  },
];

const Services = () => {
  return (
    // Outer animation wrapper for the entire section
    <AnimateOnScroll duration="duration-1000">
      <section
        id="services"
        className="relative z-10 bg-gray-900/95 text-gray-200 py-16 md:py-24 border-b-4 border-gray-700 min-h-screen"
      >
        <div className="container mx-auto px-6 lg:px-12">
          
          {/* Main Title/Intro Block (Same style as Careers.jsx) */}
          {/* Service Header Block */}
<div className="text-center mb-16 md:mb-24">
  <h1 className="text-4xl md:text-6xl font-extrabold text-gray-50 font-serif">
    Our{" "}
    <span className="text-6xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
      Services
    </span>
  </h1>
  <p className="mt-4 text-gray-400 max-w-3xl mx-auto text-lg md:text-xl">
    We are dedicated to providing a full spectrum of digital solutions to help you achieve your goals
    and stand out in the market.
  </p>
</div>


          {/* Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 items-stretch">
            {services.map((service, index) => (
              <AnimateOnScroll
                key={index}
                delay={index * 150}
                duration="duration-700"
              >
                <div
                  className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 
                             transform transition-transform duration-300 hover:scale-105 
                             hover:border-blue-500 h-full flex flex-col justify-between text-center"
                >
                  <div className="mb-6 flex justify-center">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-100 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* CTA Block (Same structure as Careers) */}
          <AnimateOnScroll delay={200} duration="duration-700">
            <div className="bg-blue-600 text-white p-12 rounded-3xl text-center shadow-lg">
              <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
                Want to build something amazing?
              </h3>
              <p className="text-gray-100 mb-4">
                Let’s collaborate and craft digital products that make an impact.
              </p>
              <a
                href="/contact"
                className="bg-white text-blue-600 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-all duration-300"
              >
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
