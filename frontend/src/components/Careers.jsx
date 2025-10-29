import React from 'react';
import AnimateOnScroll from './AnimateOnScroll';
// The import for the external component AnimateOnScroll has been removed to resolve the compilation error. 
// The animation wrappers have also been removed, which were relying on that component.

const Careers = () => {
  return (
  <AnimateOnScroll> 
    // Outer wrap for the entire section
    <section id="careers" className="relative z-10 bg-gray-900/95 text-gray-200 py-16 md:py-24 min-h-screen font-['Inter'] border-b-4 border-gray-700">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Main Title/Intro Block */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-50">Careers at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">SketchCode</span></h1>
          <p className="mt-4 text-gray-400 max-w-3xl mx-auto">Join a small, fast-moving team building websites, apps and digital products used by real customers. We value craftsmanship, clear communication and continuous learning.</p>
        </div>

        {/* 1. WHY JOIN / PERKS / HIRE Process Cards (Equal Height) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
<AnimateOnScroll>
          {/* Card 1 */}
          {/* Added h-full and flex flex-col to ensure equal height */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700 h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-100 mb-3">Why join SketchCode?</h3>
            <ul className="text-gray-300 list-disc list-inside space-y-2">
              <li>Work on real projects — websites, mobile apps and e‑commerce platforms.</li>
              <li>Flexible, remote-friendly work with supportive teammates.</li>
              <li>Opportunities to grow — mentoring and ownership of features.</li>
            </ul>
          </div>
</AnimateOnScroll>

<AnimateOnScroll>
          {/* Card 2 */}
          {/* Added h-full and flex flex-col to ensure equal height */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700 h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-100 mb-3">Perks & Benefits</h3>
            <ul className="text-gray-300 list-disc list-inside space-y-2">
              <li>Flexible hours and remote-first culture.</li>
              <li>Learning & training budget for conferences and courses.</li>
              <li>Collaborative code reviews and career mentorship.</li>
            </ul>
          </div>
</AnimateOnScroll>

<AnimateOnScroll>
          {/* Card 3 */}
          {/* Added h-full and flex flex-col to ensure equal height */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700 h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-100 mb-3">How we hire</h3>
            <p className="text-gray-300">Short interview loop: initial screening, small technical exercise, and a cultural fit chat. We move fast and keep feedback clear.</p>
          </div>

</AnimateOnScroll>
        </div>


<AnimateOnScroll>
        {/* 2. WHY JOIN FEATURE GRID (Equal Height) */}
        <div className="mb-12">
          <h3 className="text-4xl md:text-6xl font-extrabold text-gray-50 text-center">Why Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">SketchCode</span></h3>
         <br /> <p className="text-gray-400 max-w-3xl mx-auto text-center mb-8">We hire people who love building great digital products — here are a few reasons our team enjoys working at SketchCode.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Loop and apply individual animation with index-based delay */}
            {[
              { title: 'Customer-Centered Design', desc: 'Work on projects that prioritize real user needs — from prototypes to polished interfaces that solve customer problems.' },
              { title: 'Experienced Team', desc: 'Collaborate with engineers and designers who care about craftsmanship, code quality, and mentoring junior teammates.' },
              { title: 'Fast, Iterative Delivery', desc: 'Ship features quickly with a focus on continuous improvement and measurable outcomes.' },
              { title: 'Growth & Learning', desc: 'Regular knowledge sharing, learning budgets, and opportunities to take ownership of projects and career growth.' },
              { title: 'Flexible & Remote', desc: 'Remote-friendly culture with flexible hours so you can balance work and life.' },
              { title: 'Impactful Work', desc: 'Contribute to product decisions and see the impact of your work directly with customers.' },
            ].map((feature, index) => (
              // Removed AnimateOnScroll wrapper
              <div key={index} className="bg-gray-800 p-8 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 border border-gray-700 h-full flex flex-col">
                <h3 className="text-xl font-semibold text-gray-100 mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

</AnimateOnScroll>

<AnimateOnScroll>
        {/* 3. CTA Block */}
        {/* Removed AnimateOnScroll wrapper */}

        <div className="bg-blue-600 text-white p-12 rounded-3xl text-center shadow-lg">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-2">Not seeing the right role?</h3>
          <p className="text-gray-100 mb-4">We occasionally hire contract and full-time engineers and designers — send us your CV and portfolio.</p>
          <a href="mailto:sketchcode.dev@gmail.com" className="bg-white text-blue-600 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition duration-150">Send CV & Portfolio</a>
        </div>
     </AnimateOnScroll>

      </div>
    </section>
 </AnimateOnScroll>
  )
}

export default Careers
