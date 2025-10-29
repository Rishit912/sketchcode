import React, { useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';

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

const Industries = () => {
  const [selected, setSelected] = useState(industriesData[0].id);

  const current = industriesData.find(i => i.id === selected) || industriesData[0];

  return (
    <AnimateOnScroll>
    <section id="industries" className="bg-gray-900 text-gray-200 py-16 md:py-24 border-b-4 border-gray-700">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
<h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-50">
            industries <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">We Serve</span>
          </h1>          <p className="mt-4 text-gray-400 max-w-3xl mx-auto">Specialized solutions for industry-specific problems — pick an industry to see details and services we provide.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            {industriesData.map(ind => (
              <button
                key={ind.id}
                onClick={() => setSelected(ind.id)}
                className={`w-full text-left p-4 rounded-2xl border ${selected===ind.id? 'border-blue-500 bg-gray-800': 'border-gray-700 bg-gray-800'} hover:scale-[1.01] transition-transform`}
              >
                <h3 className="font-bold text-gray-100">{ind.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{ind.summary}</p>
              </button>
            ))}
          </div>

          <div className="md:col-span-2 bg-gray-800 p-8 rounded-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-gray-50 mb-4">{current.title}</h2>
            <p className="text-gray-400 mb-6">{current.details}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-100">Services We Provide</h4>
                <ul className="text-gray-300 mt-2 list-disc list-inside">
                  <li>Custom Web & Mobile Apps</li>
                  <li>UI/UX Design & Prototyping</li>
                  <li>Integrations & APIs</li>
                </ul>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-100">Business Outcomes</h4>
                <ul className="text-gray-300 mt-2 list-disc list-inside">
                  <li>Improved conversion & retention</li>
                  <li>Operational efficiency</li>
                  <li>Scalable systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </AnimateOnScroll>
  );
}

export default Industries;
