import React, { useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll'; // ASSUMED: This component is defined elsewhere
import ecom from '../assets/ecom.png';
import food from '../assets/food.png';
import manufacturing from '../assets/manu.png';
import automotive from '../assets/auto.png';
import education from '../assets/edu.png';

// --- ICON DEFINITIONS (Inline SVGs) ---
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


// --- INDUSTRY DATA WITH IMAGE URLs (No change) ---
const industriesData = [
  {
    id: 'food',
    title: 'Food Service & Restaurants',
    summary: 'CRM, online ordering and operations tools for restaurants and hospitality.',
    details: 'We build ordering platforms, reservation systems, inventory integrations, and CRM tools tailored to restaurants and food service businesses. Features include online menus, order management, analytics and loyalty programs.',
    imageUrl: food
  },
  {
    id: 'retail',
    title: 'Retail & E-commerce',
    summary: 'E-commerce sites, inventory and customer analytics for retail brands.',
    details: 'Scalable e-commerce platforms, payment integrations, product catalogs and custom UX to improve conversion and retention. We support marketplaces, headless commerce, and PIM integrations.',
    imageUrl: ecom
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    summary: 'Automation and production analytics for manufacturers.',
    details: 'Process automation, production monitoring, and ERP integrations to optimize throughput and reduce waste. Custom dashboards and reporting to track KPIs across production lines.',
    imageUrl: manufacturing
  },
  {
    id: 'saas',
    title: 'Technology & SaaS',
    summary: 'Product engineering and platform development for SaaS companies.',
    details: 'We help build scalable web platforms, APIs, subscription billing flows, analytics, and onboarding experiences targeted at SaaS growth.',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
  },
  {
    id: 'automotive',
    title: 'Automotive',
    summary: 'Dealer portals, booking systems and customer apps for automotive businesses.',
    details: 'Customer portals, scheduling, service booking, and inventory management for dealerships and automotive service providers.',
    imageUrl: automotive
  },
  {
    id: 'education',
    title: 'Education & Training',
    summary: 'Learning platforms and LMS integrations for education providers.',
    details: 'LMS integrations, student portals, course marketplaces and analytics to deliver modern learning experiences.',
    imageUrl: education
  }
];

// --- DESKTOP HELPER COMPONENTS ---

/**
 * Single item used in the Services and Outcomes grid to create the boxed effect.
 */
const GridItem = ({ title, detail }) => (
    <div className="bg-gray-700 p-3 rounded-lg border border-gray-600/50 hover:bg-gray-600 transition duration-200 cursor-pointer">
        <h5 className="font-semibold text-gray-50 text-sm">{title}</h5>
        <p className="text-gray-400 text-xs mt-0.5">{detail}</p>
    </div>
);


// 1. Component for the main description and image section (Desktop)
const IndustryHeaderContent = ({ current }) => (
    <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-50 mb-6 border-b border-gray-700 pb-3">
            {current.title}
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
            {/* Description Text - Takes 3/5 of the space on desktop */}
            <div className="md:w-3/5">
                <p className="text-gray-200 text-lg mb-4">{current.summary}</p>
                <p className="text-gray-400">{current.details}</p>
            </div>
            
            {/* Image - Takes 2/5 of the space on desktop. Height constrained. */}
            <div className="md:w-2/5 order-first md:order-last mb-4 md:mb-0">
                <img 
                    src={current.imageUrl} 
                    alt={`Visual representation for ${current.title}`} 
                    className="w-full h-auto max-h-80 object-cover rounded-lg shadow-xl"
                />
            </div>
        </div>
    </div>
);

// 2. Component for the Services block (Full width of the right panel, 4-column grid)
const ServicesBlock = () => (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 ">
        <h4 className="font-semibold text-gray-100 text-xl mb-4">Services We Provide</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <GridItem title="Web & Mobile Apps" detail="Custom platform development" />
            <GridItem title="UI/UX Design" detail="Prototypes & user testing" />
            <GridItem title="Integrations" detail="APIs & third-party connectors" />
            <GridItem title="Legacy Systems" detail="Modernization & refactoring" />
            <GridItem title="Data Analytics" detail="Custom reporting dashboards" />
            <GridItem title="Cloud Migration" detail="Scalable architecture" />
            <GridItem title="Ongoing Support" detail="Maintenance & updates" />
            <GridItem title="Technology Audit" detail="Stack and security review" />
        </div>
    </div>
);

// 3. Component for the Outcomes block (Full width of the right panel, 4-column grid)
const OutcomesBlock = () => (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 ">
        <h4 className="font-semibold text-gray-100 text-xl mb-4">Business Outcomes</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <GridItem title="High Conversion" detail="Optimized checkout flows" />
            <GridItem title="Efficiency" detail="Automated internal processes" />
            <GridItem title="Scalability" detail="Handle massive user load" />
            <GridItem title="Reduced Costs" detail="Streamlined operations" />
            <GridItem title="Customer Loyalty" detail="Personalized CRM tools" />
            <GridItem title="Faster Deployment" detail="CI/CD pipelines" />
            <GridItem title="Market Access" detail="Launch new digital products" />
            <GridItem title="Data-Driven" detail="Actionable insights from data" />
        </div>
    </div>
);


// --- MOBILE/ACCORDION HELPER COMPONENT (No change) ---
const MobileDetailsContent = ({ current }) => (
  <div className="pt-4">
    <div className="md:hidden mb-4">
      <img 
        src={current.imageUrl} 
        alt={`Visual representation for ${current.title}`} 
        className="w-full h-auto object-cover rounded-lg shadow-xl"
      />
    </div>

    <p className="text-gray-400 mb-6">{current.details}</p>

    <div className="grid grid-cols-1 gap-4">
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
  </div>
);


// --- MAIN INDUSTRIES COMPONENT (REVERTED RIGHT PANEL STRUCTURE) ---
const Industries = () => {
  const [selected, setSelected] = useState(industriesData[0].id);
  const [openMobile, setOpenMobile] = useState(industriesData[0].id);

  const current = industriesData.find(i => i.id === selected) || industriesData[0];

  const toggleMobileOpen = (id) => {
    setOpenMobile(openMobile === id ? null : id);
  };

  return (
    <AnimateOnScroll duration="duration-1000">
      <section id="industries" className="bg-gray-900 text-gray-200 py-16 md:py-24 font-['Inter'] border-b-4 border-gray-700">
        <div className="container mx-auto px-6 lg:px-12 ">
          
          {/* Header */}
          <AnimateOnScroll delay={100} duration="duration-700" direction="down">
            <div className="text-center mb-12">
             <h1 className="text-4xl md:text-6xl  leading-tight tracking-tight text-gray-50 font-extrabold ">
               Industries We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-extrabold ">Serve</span>
             </h1> 
              <p className="mt-4 text-gray-400 max-w-3xl mx-auto text-lg">Specialized solutions for industry-specific problems — explore our sector expertise below.</p>
            </div>
          </AnimateOnScroll>

          {/* --- DESKTOP VIEW (md: and up) --- */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 1. Left Panel: Industry Selection Buttons (Sidebar) */}
            <div className="space-y-4">
              {industriesData.map((ind, index) => (
                <AnimateOnScroll key={ind.id} delay={200 + index * 100} duration="duration-600" direction="right">
                  <button
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
                </AnimateOnScroll>
              ))}
            </div>

            {/* 2. Right Panel: Details Content (Stacked blocks with space-y-4) */}
            <div className="md:col-span-2 space-y-4"> 
                
                {/* Block A: Main Content and Image */}
                <IndustryHeaderContent current={current} />
                
                {/* Block B: Services (Full Width) */}
                <ServicesBlock />
                
                {/* Block C: Outcomes (Full Width) */}
                <OutcomesBlock />

            </div>
          </div>

          {/* --- MOBILE VIEW (less than md:) --- */}
          <div className="md:hidden space-y-4">
            {industriesData.map((ind, index) => {
              const isMobileOpen = openMobile === ind.id;
              return (
                <AnimateOnScroll key={ind.id} delay={index * 150} duration="duration-600" direction="up">
                  <div 
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
                    
                    {/* Accordion Content (Conditionally rendered) */}
                    {isMobileOpen && (
                      <div className="p-4 transition-all duration-300 ease-in-out">
                        <MobileDetailsContent current={ind} />
                      </div>
                    )}
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>


        </div>
        
      </section>
    </AnimateOnScroll>
  );
}

export default Industries;