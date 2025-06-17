import { notFound } from 'next/navigation';
import { services } from '../services-data';
import ServiceDetail from '@/components/ServiceDetail';
import React from 'react';

// This tells Next.js to generate this page at build time
export const dynamic = 'force-static';

// This page doesn't need dynamic params as it's a static route
export async function generateStaticParams() {
  return [];
}

// This tells Next.js to revalidate this page every hour
export const revalidate = 3600;

export default function BusinessNeedsStrategy() {
  const headerContent = (
    <p className="text-lg text-white mt-4 text-center max-w-4xl mx-auto">
      This is the foundational phase where Business Analysts operate at the enterprise level—bridging overarching business objectives with actionable initiatives. It goes beyond tactical problem-solving to deeply shape an organization's direction. Here's how it unfolds:
    </p>
  );

  const content = [
    <div key="section1">
      <h2 className="text-2xl font-semibold mb-3">1. Framing Strategy & Business Needs</h2>
      <p className="mb-4">
        Business Analysts begin by defining the strategic intent. This involves engaging senior leadership to understand the organization's vision, goals, and market positioning. Analysts conduct discovery workshops, interviews, and surveys to align with executive priorities and clarify what success looks like.
      </p>
    </div>,
    
    <div key="section2">
      <h2 className="text-2xl font-semibold mb-3">2. Environmental & Competitive Research</h2>
      <p className="mb-4">
        Key to this work is analysing both internal and external forces:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>
          <span className="font-medium">PEST/PESTLE analysis</span> explores macro-conditions—political, economic, social, technological—that affect strategic decision-making.
        </li>
        <li>
          <span className="font-medium">Porter's Five Forces</span> examines industry competition, supplier and buyer influence, threats of new entrants/substitutes, framing the strategic landscape.
        </li>
        <li>
          <span className="font-medium">Competitor analysis</span> evaluates rival strengths, weaknesses, and market positioning to identify opportunities and threats.
        </li>
      </ul>
    </div>,
    
    <div key="section3">
      <h2 className="text-2xl font-semibold mb-3">3. SWOT & Gap Analysis</h2>
      <p className="text-gray-700 mb-4">
        Transforming data into insight, Analysts use:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li>
          <span className="font-medium">SWOT</span> to surface organizational strengths and vulnerabilities against external opportunities and threats.
        </li>
        <li>
          <span className="font-medium">Strategic gap analysis</span> to identify where current performance lags behind strategic aspirations—setting a roadmap to bridge that divide.
        </li>
      </ul>
    </div>,
    
    <div key="section4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Enterprise Architecture & Business Modeling</h2>
      <p className="text-gray-700 mb-4">
        Delving deeper, BAs use enterprise modeling and business architecture to outline how various components—processes, systems, people, and data—must align to support strategy. They articulate current and future state blueprints, ensuring transformation efforts aren't fragmented or siloed.
      </p>
    </div>,
    
    <div key="section5">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Prioritization & Feasibility</h2>
      <p className="text-gray-700 mb-4">
        With a rich diagnostic in place, BAs work closely with leadership to define, scope, and prioritize initiatives. They evaluate each potential project for:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li>Strategic alignment</li>
        <li>Financial viability</li>
        <li>Technical feasibility</li>
        <li>Organizational readiness</li>
      </ul>
      <p className="text-gray-700 mb-4">
        This stage bridges strategy with action—building the pipeline for prioritized, purposeful transformation.
      </p>
    </div>,
    
    <div key="section6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Roadmapping & Governance Support</h2>
      <p className="text-gray-700 mb-4">
        Strategic analysis culminates in creating a transformation roadmap. Analysts define:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li>Key milestones</li>
        <li>Interdependencies</li>
        <li>Resource needs</li>
        <li>Governance structures (e.g. steering committees, sponsorship frameworks)</li>
      </ul>
      <p className="text-gray-700 mb-4">
        This roadmap becomes the central framework guiding all downstream activities ensuring engagement, coordination, and accountability.
      </p>
    </div>,
    
    <div key="section7">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Continuous Strategic Monitoring</h2>
      <p className="text-gray-700 mb-6">
        Strategy isn't static. As the external or internal landscape shifts, Analysts revisit the analysis, adjust priorities, and update roadmaps accordingly. Rather than single-point input, this is often an ongoing dialogue that evolves across the transformation lifecycle.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Why This Matters</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li><span className="font-medium">Prevents piecemeal efforts:</span> Ensures transformation is anchored in context and strategic alignment, not side projects.</li>
        <li><span className="font-medium">Clarifies ROI:</span> Empowers organizations with objective, fact-based insight to decide what really matters.</li>
        <li><span className="font-medium">Unites functions:</span> Breaks silos by connecting leadership's vision with operational realities and IT capabilities.</li>
        <li><span className="font-medium">Accelerates delivery:</span> With clear scope, roadmap, and governance, execution becomes more focused, responsive, and resilient.</li>
      </ul>
      
      <p className="mt-6 text-lg text-gray-700">
        At Bright Lambs, we lead with Strategic & Enterprise Analysis to unlock clarity and buy-in from day one. It's the difference between reacting to change and confidently shaping your future.
      </p>
    </div>
  ];

  // Verify this is the correct service
  const service = services.find(s => s.slug === 'business-needs-strategy');
  
  if (!service) {
    notFound();
  }

  return (
    <ServiceDetail 
      title="Business Needs & Strategic Analysis"
      headerContent={headerContent}
      content={content}
      imageUrl="/images/strategic-analysis.jpg"
    />
  );
}
