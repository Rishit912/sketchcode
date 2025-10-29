import React from "react";
import AnimateOnScroll from "./AnimateOnScroll";

// Inline SVG Icons (no external dependency)
const HeartIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
    />
  </svg>
);
const CogsIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path d="M11.99 2A10.01 10.01 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10.01 10.01 0 0 0 11.99 2zm0 17.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0-5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0-5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
  </svg>
);
const HandsIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 7.5h.75H20.25v2.85A1.725 1.725 0 0 1 18.525 12H7.5V7.5Zm0 0V5.25A2.25 2.25 0 0 1 9.75 3h4.5A2.25 2.25 0 0 1 16.5 5.25v2.25H7.5Z"
    />
  </svg>
);

const AboutUs = () => {
  const chooseUsFeatures = [
    {
      title: "Customer-Centered Design",
      desc: "We focus on user needs and business goals — design and development decisions are driven by measurable outcomes and usability.",
    },
    {
      title: "Rapid Implementation",
      desc: "Fast setup and iterative delivery so you can see value quickly while maintaining high quality.",
    },
    {
      title: "Secure & Reliable",
      desc: "Security-first engineering, data protection and reliable operations to keep your product safe and performant.",
    },
    {
      title: "Expert Team",
      desc: "A cross-functional team of engineers, designers and product experts focused on delivering results.",
    },
    {
      title: "24/7 Support",
      desc: "Proactive maintenance and responsive support to keep your products up-to-date and available.",
    },
    {
      title: "Scalable Growth",
      desc: "Architectures and solutions designed to grow with your business — from startup to enterprise.",
    },
  ];

  return (
    <AnimateOnScroll duration="duration-1000">
      <section
        id="about"
        className="relative z-10 bg-gray-900/95 text-gray-200 min-h-screen py-16 md:py-24 border-b-4 border-gray-700 font-['Inter']"
      >
        <div className="container mx-auto px-6 lg:px-12">
          {/* INTRO SECTION */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-50">
              We are{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                SketchCode
              </span>
            </h1>
            <p className="mt-4 text-gray-400 max-w-3xl mx-auto">
              At SketchCode, we turn visionary ideas into exceptional digital
              realities. Our mission: to create powerful digital solutions that
              are a joy to build and use.
            </p>
          </div>

          {/* OUR FOUNDATION */}
          <AnimateOnScroll delay={150} duration="duration-800">
            <div className="bg-gray-800 p-10 md:p-12 rounded-2xl shadow-xl border border-gray-700 mb-16">
              <h2 className="text-3xl font-bold text-gray-50 mb-4 text-center">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Foundation
                </span>
              </h2>
              <p className="text-gray-300 text-lg mb-4 text-center md:text-left">
                The idea for SketchCode was born from a simple belief: that
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {/* Step 1 */}
              <AnimateOnScroll delay={100}>
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

              {/* Step 2 */}
              <AnimateOnScroll delay={300}>
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

              {/* Step 3 */}
              <AnimateOnScroll delay={500}>
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
          </div>

          {/* WHY CHOOSE US */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-50 text-center mb-4">
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                SketchCode
              </span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg text-center mb-8">
              We deliver exceptional value through an AI-first mindset, rapid
              development, and dedication to our clients’ success.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {chooseUsFeatures.map((feature, index) => (
                <AnimateOnScroll key={index} delay={index * 150}>
                  <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 
                                  transform transition-transform duration-300 hover:scale-105 
                                  h-full flex flex-col justify-between">
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 flex-grow">{feature.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* CTA SECTION */}
          <AnimateOnScroll delay={200}>
            <div className="bg-blue-600 text-white p-12 rounded-3xl text-center shadow-lg mb-12">
              <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
                Ready to build something amazing together?
              </h3>
              <p className="text-gray-100 mb-4">
                Let’s start a conversation about your next big project.
              </p>
              <a
                href="/contact"
                className="bg-white text-blue-600 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-transform duration-300 hover:scale-105"
              >
                Let's Connect
              </a>
            </div>
          </AnimateOnScroll>

          {/* MEET FOUNDER */}
          <AnimateOnScroll delay={400}>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 text-center">
              <h3 className="text-3xl md:text-5xl font-extrabold text-gray-50 mb-4">
                Meet Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Founder
                </span>
              </h3>
              <p className="text-gray-400 max-w-3xl mx-auto mb-4">
                “At SketchCode, we believe technology should empower creativity.
                Our mission is to make innovation accessible to everyone — one
                smart product at a time.”
              </p>
              <div className="text-sm text-gray-400">
                Founder & CEO, SketchCode
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </AnimateOnScroll>
  );
};

export default AboutUs;
