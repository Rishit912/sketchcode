import React, { useEffect, useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import api from "../api";

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get('/api/jobs');
        const openJobs = (res.data || []).filter(j => j.status === 'open');
        setJobs(openJobs);
      } catch (err) {
        console.error(err);
        setError("Unable to load job openings right now.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Define the common feature data outside the return function for clean code
  const whyJoinFeatures = [
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
  ];

  return (
    <AnimateOnScroll duration="duration-1000">
      <section
        id="careers"
        className="relative z-10 bg-gray-900/95 text-gray-200 py-16 md:py-24 min-h-screen border-b-4 border-gray-700 font-['Inter']"
      >
        <div className="container mx-auto px-6 lg:px-12">
          
          {/* Intro Section - Slide Down */}
          <AnimateOnScroll delay={200} duration="duration-700" direction="down">
            <div className="text-center mb-16 md:mb-24">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-50">
                Careers at{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  FlitCode
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

          {/* WHY JOIN / PERKS / HIRING PROCESS Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 md:mb-24 items-stretch">
            {/* Card 1 (Slide Right) */}
            <AnimateOnScroll delay={200} duration="duration-700" direction="right">
              <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 
                               transform transition-transform duration-300 hover:scale-105 
                               h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-100 mb-3">
                    Why join FlitCode?
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

            {/* Card 2 (Slide Up) */}
            <AnimateOnScroll delay={400} duration="duration-700" direction="up">
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

            {/* Card 3 (Slide Left) */}
            <AnimateOnScroll delay={600} duration="duration-700" direction="left">
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

          {/* WHY JOIN FEATURE GRID Title - Slide Right */}
          <AnimateOnScroll delay={200} duration="duration-700" direction="right">
            <div className="mb-16 md:mb-24">
              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-50 text-center">
                Why Join{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  FlitCode
                </span>
              </h2>
              <br />
              <p className="text-gray-400 max-w-3xl mx-auto text-lg text-center mb-8">
                We believe in empowering our people to grow, learn, and make a
                difference. Here’s why our team loves working here:
              </p>
            </div>
          </AnimateOnScroll>

          {/* WHY JOIN FEATURE GRID - Alternating Left/Right */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {whyJoinFeatures.map((feature, index) => (
              <AnimateOnScroll
                key={index}
                delay={index * 200}
                duration="duration-600"
                direction={index % 2 === 0 ? "left" : "right"} // Alternating: 1st, 3rd, 5th from LEFT; 2nd, 4th, 6th from RIGHT
              >
                {/* 💡 FIX APPLIED HERE: The content div is correctly placed inside the wrapper */}
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

          {/* CTA Section - Slide Down */}
          <AnimateOnScroll delay={300} duration="duration-700" direction="down">
            <div className="bg-blue-600 text-white p-12 rounded-3xl text-center shadow-lg mt-16 md:mt-24">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Ready to shape the future with us?
              </h2>
              <p className="text-lg md:text-xl font-light mb-8">
                We’re always open to meeting passionate designers, developers,
                and innovators who want to make an impact.
              </p>
              <a
                href="mailto:flitcode.dev@gmail.com"
                className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
              >
                Send CV & Portfolio
              </a>
            </div>
          </AnimateOnScroll>

          {/* Live Job Openings */}
          <AnimateOnScroll delay={200} duration="duration-700" direction="up">
            <div className="mt-20">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-50">Open Roles</h2>
                <p className="text-gray-400 mt-3">Opportunities currently available at FlitCode.</p>
              </div>

              {loading ? (
                <p className="text-center text-gray-300">Loading jobs...</p>
              ) : error ? (
                <p className="text-center text-red-400">{error}</p>
              ) : jobs.length === 0 ? (
                <p className="text-center text-gray-300">No openings right now. Check back soon!</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobs.map((job, idx) => (
                    <div key={job._id || idx} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-100">{job.title}</h3>
                          <p className="text-gray-400 text-sm mt-1">{job.location} • {job.type} • {job.mode}</p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">Open</span>
                      </div>
                      <p className="text-gray-300 mt-3 text-sm leading-relaxed">{job.description}</p>

                      {job.requirements?.length > 0 && (
                        <div className="mt-3 text-sm text-gray-300">
                          <span className="font-semibold">Requirements:</span> {job.requirements.join(', ')}
                        </div>
                      )}
                      {job.responsibilities?.length > 0 && (
                        <div className="mt-1 text-sm text-gray-300">
                          <span className="font-semibold">Responsibilities:</span> {job.responsibilities.join(', ')}
                        </div>
                      )}

                      <div className="mt-4 flex gap-3">
                        {job.applyEmail && (
                          <a
                            href={`mailto:${job.applyEmail}?subject=${encodeURIComponent(job.title)} - Application`}
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                          >
                            Apply via Email
                          </a>
                        )}
                        {job.applyLink && (
                          <a
                            href={job.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg bg-white text-blue-700 font-semibold hover:bg-gray-100 transition"
                          >
                            Apply Online
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </AnimateOnScroll>
  );
};

export default Careers;