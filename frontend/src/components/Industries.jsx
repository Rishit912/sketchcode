import React, { useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';
// The external component AnimateOnScroll has been removed to resolve the compilation error.
// The external import for @heroicons/react has been removed to fix the resolution error.
// We will use inline SVGs instead.

const ChevronDownIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const ChevronUpIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
  </svg>
);


const industriesData = [
  {
    id: 'food',
    title: 'Food Service & Restaurants',
    summary: 'CRM, online ordering and operations tools for restaurants and hospitality.',
    details: 'We build ordering platforms, reservation systems, inventory integrations, and CRM tools tailored to restaurants and food service businesses. Features include online menus, order management, analytics and loyalty programs.'
  },
  {
    id: 'retail',
    title: 'Retail & E-commerce',
    summary: 'E-commerce sites, inventory and customer analytics for retail brands.',
    details: 'Scalable e-commerce platforms, payment integrations, product catalogs and custom UX to improve conversion and retention. We support marketplaces, headless commerce, and PIM integrations.'
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    summary: 'Automation and production analytics for manufacturers.',
    details: 'Process automation, production monitoring, and ERP integrations to optimize throughput and reduce waste. Custom dashboards and reporting to track KPIs across production lines.'
  },
  {
    id: 'saas',
    title: 'Technology & SaaS',
    summary: 'Product engineering and platform development for SaaS companies.',
    details: 'We help build scalable web platforms, APIs, subscription billing flows, analytics, and onboarding experiences targeted at SaaS growth.'
  },
  {
    id: 'automotive',
    title: 'Automotive',
    summary: 'Dealer portals, booking systems and customer apps for automotive businesses.',
    details: 'Customer portals, scheduling, service booking, and inventory management for dealerships and automotive service providers.'
  },
  {
    id: 'education',
    title: 'Education & Training',
    summary: 'Learning platforms and LMS integrations for education providers.',
    details: 'LMS integrations, student portals, course marketplaces and analytics to deliver modern learning experiences.'
  }
];

// Helper component for the content box (to avoid repetition)
const IndustryDetailsContent = ({ current }) => (

  <>
  
    {/* Description */}
    <p className="text-gray-400 mb-6">{current.details}</p>

    {/* Services and Outcomes Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-700 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-100">Services We Provide</h4>
        <ul className="text-gray-300 mt-2 list-disc list-inside space-y-1">
          <li>Custom Web & Mobile Apps</li>
          <li>UI/UX Design & Prototyping</li>
          <li>Integrations & APIs</li>
        </ul>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-100">Business Outcomes</h4>
        <ul className="text-gray-300 mt-2 list-disc list-inside space-y-1">
          <li>Improved conversion & retention</li>
          <li>Operational efficiency</li>
          <li>Scalable systems</li>
        </ul>
      </div>
    </div>
  </>
);


const Industries = () => {
  // 'selected' manages the tab selection for screens MD and larger (the sidebar)
  const [selected, setSelected] = useState(industriesData[0].id);
  // 'openMobile' manages the expanded state for screens less than MD (the accordion)
  // We initialize it to the first item's ID so one panel is open by default.
  const [openMobile, setOpenMobile] = useState(industriesData[0].id);

  // Get the currently selected item for the desktop view
  const current = industriesData.find(i => i.id === selected) || industriesData[0];

  // Function to toggle the mobile accordion state
  const toggleMobileOpen = (id) => {
    // If the clicked item is already open, close it (set to null). Otherwise, open the clicked item.
    setOpenMobile(openMobile === id ? null : id);
  };

  return (
    <AnimateOnScroll>
    <section id="industries" className="bg-gray-900 text-gray-200 py-16 md:py-24 font-['Inter'] border-b-4 border-gray-700">
      <div className="container mx-auto px-6 lg:px-12 ">
        {/* Header */}
        <div className="text-center mb-12">
         <h1 className="text-4xl md:text-6xl  leading-tight tracking-tight text-gray-50 font-extrabold ">
          Industries We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-extrabold ">Serve</span>
        </h1> 
          <p className="mt-4 text-gray-400 max-w-3xl mx-auto text-lg">Specialized solutions for industry-specific problems — explore our sector expertise below.</p>
        </div>

        {/* --- DESKTOP VIEW (md: and up) --- */}
        {/* Hides the desktop sidebar/content view on small screens */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Industry Selection Buttons (Sidebar) */}
          <div className="space-y-4">
            {industriesData.map(ind => (
              <button
                key={ind.id}
                onClick={() => setSelected(ind.id)}
                className={`w-full text-left p-5 rounded-xl transition duration-200 ease-in-out shadow-lg
                  ${selected === ind.id 
                    ? 'border border-blue-500 bg-gray-800 text-gray-50 scale-[1.01]' 
                    : 'border border-gray-700 bg-gray-800/60 text-gray-200 hover:bg-gray-700/80'
                  } 
                  hover:shadow-blue-500/20
                `}
              >
                <h3 className="font-bold text-xl">{ind.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{ind.summary}</p>
              </button>
            ))}
          </div>

          {/* Details Content (Main Panel) */}
          <div className="md:col-span-2 bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-50 mb-6 border-b border-gray-700 pb-3">{current.title}</h2>
            <IndustryDetailsContent current={current} />
          </div>
        </div>

        {/* --- MOBILE VIEW (less than md:) --- */}
        {/* Hides the accordion view on medium screens and up */}
        <div className="md:hidden space-y-4">
          {industriesData.map(ind => {
            const isMobileOpen = openMobile === ind.id;
            return (
              <div 
                key={ind.id} 
                className="bg-gray-800 rounded-xl border-b-4 border-gray-700 overflow-hidden shadow-lg"
              >
                {/* Accordion Header/Button */}
                <button
                  onClick={() => toggleMobileOpen(ind.id)}
                  className={`w-full text-left p-4 transition-all duration-300 ease-in-out 
                    ${isMobileOpen ? 'bg-gray-700' : 'hover:bg-gray-800/80'}
                  `}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className={`font-bold text-lg ${isMobileOpen ? 'text-blue-400' : 'text-gray-100'}`}>{ind.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{ind.summary}</p>
                    </div>
                    {isMobileOpen ? (
                      <ChevronUpIcon className="w-6 h-6 text-blue-400 ml-4 flex-shrink-0 transition-transform" />
                    ) : (
                      <ChevronDownIcon className="w-6 h-6 text-gray-400 ml-4 flex-shrink-0 transition-transform" />
                    )}
                  </div>
                </button>
                
                {/* Accordion Content (Conditionally rendered to control collapse) */}
                {isMobileOpen && (
                  <div className="p-4 pt-0 transition-all duration-300 ease-in-out">
                    <div className="border-t border-gray-700 pt-4">
                      {/* Title is repeated for context in the accordion content */}
                      <h2 className="text-xl font-bold text-gray-50 mb-4">{ind.title}</h2>
                      <IndustryDetailsContent current={ind} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>


      </div>
      
    </section>
      </AnimateOnScroll>
  );
}

export default Industries;
