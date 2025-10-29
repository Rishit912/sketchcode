import React from "react";
import AnimateOnScroll from "./AnimateOnScroll";

const Careers = () => {
  return (
    <AnimateOnScroll duration="duration-1000">
      <section
        id="careers"
        className="relative z-10 bg-gray-900/95 text-gray-200 py-16 md:py-24 min-h-screen border-b-4 border-gray-700 font-['Inter']"
      >
        <div className="container mx-auto px-6 lg:px-12">
          {/* Intro Section */}
          <AnimateOnScroll delay={100} duration="duration-700">
            <div className="text-center mb-16 md:mb-24">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-50">
                Careers at{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  SketchCode
                </span>
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
                Join a small, fast-moving team building impactful digital
                products — from websites and mobile apps to intelligent
                automation tools. We value creativity, craftsmanship, and a
                passion for continuous learning.
              </p>
            </div>
          </AnimateOnScroll>

          {/* WHY JOIN / PERKS / HIRING PROCESS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 md:mb-24 items-stretch">
            {/* Card 1 */}
            <AnimateOnScroll delay={100} duration="duration-700">
              <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 
                              transform transition-transform duration-300 hover:scale-105 
                              h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-100 mb-3">
                    Why join SketchCode?
                  </h3>
                  <ul className="text-gray-300 list-disc list-inside space-y-2">
                    <li>
                      Work on real-world projects that make an impact —
                      websites, mobile apps, and AI-driven platforms.
                    </li>
                    <li>
                      Flexible, remote-friendly culture with supportive
                      teammates.
                    </li>
                    <li>
                      Opportunities to grow through mentoring and skill
                      development.
                    </li>
                  </ul>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Card 2 */}
            <AnimateOnScroll delay={300} duration="duration-700">
              <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 
                              transform transition-transform duration-300 hover:scale-105 
                              h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-100 mb-3">
                    Perks & Benefits
                  </h3>
                  <ul className="text-gray-300 list-disc list-inside space-y-2">
                    <li>Flexible hours and remote-first work culture.</li>
                    <li>
                      Learning budget for online courses, events, and training.
                    </li>
                    <li>Collaborative code reviews and personal mentorship.</li>
                  </ul>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Card 3 */}
            <AnimateOnScroll delay={500} duration="duration-700">
              <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 
                              transform transition-transform duration-300 hover:scale-105 
                              h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-100 mb-3">
                    How We Hire
                  </h3>
                  <p className="text-gray-300">
                    Our hiring process is simple and transparent — short
                    screening call, small technical exercise, and a culture-fit
                    chat. We move fast and give clear feedback.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* WHY JOIN FEATURE GRID */}
          <div className="mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-50 text-center">
              Why Join{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                SketchCode
              </span>
            </h2>
            <br />
            <p className="text-gray-400 max-w-3xl mx-auto text-lg text-center mb-8">
              We believe in empowering our people to grow, learn, and make a
              difference. Here’s why our team loves working here:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {[
                {
                  title: "Customer-Centered Design",
                  desc: "Work on projects that prioritize real user needs — from prototypes to polished interfaces that solve real problems.",
                },
                {
                  title: "Experienced Team",
                  desc: "Collaborate with engineers and designers who care about quality, mentoring, and innovation.",
                },
                {
                  title: "Fast, Iterative Delivery",
                  desc: "Ship features quickly with an emphasis on continuous improvement and real-world feedback.",
                },
                {
                  title: "Growth & Learning",
                  desc: "Regular learning sessions, mentorship, and opportunities to take ownership of exciting projects.",
                },
                {
                  title: "Flexible & Remote",
                  desc: "Work from anywhere with flexible hours — we value results over rigid schedules.",
                },
                {
                  title: "Impactful Work",
                  desc: "Contribute to meaningful projects that make a difference for businesses and communities.",
                },
              ].map((feature, index) => (
                <AnimateOnScroll
                  key={index}
                  delay={index * 150}
                  duration="duration-600"
                >
                  <div
                    className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 
                               transform transition-transform duration-300 hover:scale-105 
                               h-full flex flex-col justify-between"
                  >
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">{feature.desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <AnimateOnScroll delay={200} duration="duration-700">
            <div className="bg-blue-600 text-white p-12 rounded-3xl text-center shadow-lg">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Ready to shape the future with us?
              </h2>
              <p className="text-lg md:text-xl font-light mb-8">
                We’re always open to meeting passionate designers, developers,
                and innovators who want to make an impact.
              </p>
              <a
                href="mailto:sketchcode.dev@gmail.com"
                className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
              >
                Send CV & Portfolio
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </AnimateOnScroll>
  );
};

export default Careers;
