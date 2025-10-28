import React from 'react'

const Careers = () => {
  return (
  <section id="careers" className="bg-gray-900 text-gray-200 py-16 md:py-24 min-h-screen border-b-4 border-gray-700">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-50">Careers at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">SketchCode</span></h1>
          <p className="mt-4 text-gray-400 max-w-3xl mx-auto">Join a small, fast-moving team building websites, apps and digital products used by real customers. We value craftsmanship, clear communication and continuous learning.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700">
            <h3 className="text-xl font-bold text-gray-100 mb-3">Why join SketchCode?</h3>
            <ul className="text-gray-300 list-disc list-inside space-y-2">
              <li>Work on real projects — websites, mobile apps and e‑commerce platforms.</li>
              <li>Flexible, remote-friendly work with supportive teammates.</li>
              <li>Opportunities to grow — mentoring and ownership of features.</li>
            </ul>
          </div>

            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700">
            <h3 className="text-xl font-bold text-gray-100 mb-3">Perks & Benefits</h3>
            <ul className="text-gray-300 list-disc list-inside space-y-2">
              <li>Flexible hours and remote-first culture.</li>
              <li>Learning & training budget for conferences and courses.</li>
              <li>Collaborative code reviews and career mentorship.</li>
            </ul>
          </div>

            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700">
            <h3 className="text-xl font-bold text-gray-100 mb-3">How we hire</h3>
            <p className="text-gray-300">Short interview loop: initial screening, small technical exercise, and a cultural fit chat. We move fast and keep feedback clear.</p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-50 mb-6">Why Join SketchCode</h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-center mb-8">We hire people who love building great digital products — here are a few reasons our team enjoys working at SketchCode.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Customer-Centered Design</h3>
              <p className="text-gray-300">Work on projects that prioritize real user needs — from prototypes to polished interfaces that solve customer problems.</p>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Experienced Team</h3>
              <p className="text-gray-300">Collaborate with engineers and designers who care about craftsmanship, code quality, and mentoring junior teammates.</p>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Fast, Iterative Delivery</h3>
              <p className="text-gray-300">Ship features quickly with a focus on continuous improvement and measurable outcomes.</p>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Growth & Learning</h3>
              <p className="text-gray-300">Regular knowledge sharing, learning budgets, and opportunities to take ownership of projects and career growth.</p>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Flexible & Remote</h3>
              <p className="text-gray-300">Remote-friendly culture with flexible hours so you can balance work and life.</p>
            </div>

            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700">
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Impactful Work</h3>
              <p className="text-gray-300">Contribute to product decisions and see the impact of your work directly with customers.</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-600 text-white p-12 rounded-3xl text-center shadow-lg">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-2">Not seeing the right role?</h3>
          <p className="text-gray-100 mb-4">We occasionally hire contract and full-time engineers and designers — send us your CV and portfolio.</p>
          <a href="mailto:sketchcode.dev@gmail.com" className="bg-white text-blue-600 font-bold px-6 py-3 rounded-full">Send CV & Portfolio</a>
        </div>
      </div>
    </section>
  )
}

export default Careers
