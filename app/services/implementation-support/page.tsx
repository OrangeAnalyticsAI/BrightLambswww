import { notFound } from 'next/navigation';
import { services } from '../services-data';
import ServiceDetail from '@/components/ServiceDetail';

// This tells Next.js to generate this page at build time
export const dynamic = 'force-static';

// This page doesn't need dynamic params as it's a static route
export async function generateStaticParams() {
  return [];
}

// This tells Next.js to revalidate this page every hour
export const revalidate = 3600;

export default function ImplementationSupport() {
  const headerContent = (
    <p className="text-lg text-white mt-4 text-center max-w-4xl mx-auto">
      Implementation Oversight & Testing ensures that solutions meet the defined requirements, are deployed effectively, and deliver real value. Business analysts act as the guardians of solution integrity and user adoption throughout this essential phase.
    </p>
  );

  const content = [
    <div key="section1">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Implementation Oversight</h2>
      <p className="text-gray-700 mb-4">
        Once a solution is developed, the business analyst transitions from requirements to oversight. This involves:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li>Collaborating with project managers to align delivery schedules with business priorities</li>
        <li>Ensuring design decisions remain faithful to agreed business objectives</li>
        <li>Monitoring development progress and flagging divergences that could impact functionality, user adoption, or business value.</li>
      </ul>
      <p className="text-gray-700 mb-4">
        Analysts attend planning sessions, sprint reviews, demos, and retrospectives to maintain stakeholder alignment and act swiftly to address emerging concerns.
      </p>
    </div>,
    
    <div key="section2">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Test Planning & Scenario Design</h2>
      <p className="text-gray-700 mb-4">
        A core responsibility is designing comprehensive test plans to validate the solution:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li>Creating test scenarios and acceptance criteria derived from user stories or requirements</li>
        <li>Defining test scripts for functional, integration, performance, and compliance checks</li>
        <li>Considering both positive and negative cases, edge conditions, and end-to-end workflows.</li>
      </ul>
      <p className="text-gray-700 mb-4">
        These test plans guide QA teams, developers, and business users in assessing whether the solution delivers its intended value.
      </p>
    </div>,
    
    <div key="section3">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Coordinating User Acceptance Testing (UAT)</h2>
      <p className="text-gray-700 mb-4">
        User Acceptance Testing is a pivotal milestone where business users validate functionality:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li>Planning and facilitating UAT sessions with clear instruction, structured test packs, and issue-tracking mechanisms</li>
        <li>Gathering quantitative metrics (e.g., pass rates, defect counts) and qualitative feedback on usability and fit-for-purpose</li>
        <li>Working with developers to triage, prioritise, and resolve issues before go-live.</li>
      </ul>
      <p className="text-gray-700 mb-4">
        Strong UAT oversight encourages user engagement and builds confidence in solution readiness.
      </p>
    </div>,
    
    <div key="section4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Risk-based and Continuous Testing</h2>
      <p className="text-gray-700 mb-4">
        To enhance efficiency and quality:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li>Analysts prioritise testing on high-risk components using techniques like risk-based testing (e.g. boundary testing, FMEA)</li>
        <li>In Agile or DevOps environments, they advocate for continuous testing, embedding automated checks early in the delivery pipeline to catch defects early and reduce rework.</li>
      </ul>
      <p className="text-gray-700 mb-4">
        This approach reduces delays and supports early detection of issues impacting delivery.
      </p>
    </div>,
    
    <div key="section5">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Change & Issue Management</h2>
      <p className="text-gray-700 mb-4">
        During testing, new issues and change requests inevitably arise:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li>Establishing formal processes for change requests, including assessment, documentation, approval, and impact analysis</li>
        <li>Ensuring issues are logged, triaged, prioritised, and transparently communicated to stakeholders</li>
        <li>Validating fixes and updated test coverage before drawing cycles to a close</li>
      </ul>
      <p className="text-gray-700 mb-4">
        This discipline ensures that delivery remains stable, predictable, and aligned with business objectives.
      </p>
    </div>,
    
    <div key="section6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Training and Documentation</h2>
      <p className="text-gray-700 mb-4">
        Business analysts play a vital role in preparing users for the new system:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li>Collaborating with trainers or developing training materials, user guides, and how-to manuals</li>
        <li>Supporting training sessions and capturing feedback to fine-tune content and ensure clarity.</li>
        <li>Creating quick-reference sheets or e-learning modules to reinforce learning and ease adoption</li>
      </ul>
      <p className="text-gray-700 mb-4">
        Proper documentation and training are essential to reducing post-go-live support demands.
      </p>
    </div>,
    
    <div key="section7">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Post-Implementation Review & Benefits Realisation</h2>
      <p className="text-gray-700 mb-6">
        After go-live, business analysts shift focus to evaluation:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        <li>Conducting reviews against success criteria set earlier</li>
        <li>Analysing performance data and user feedback to confirm that the solution delivers intended value.</li>
        <li>Recommending follow-up improvements or interventions to close any gaps identified</li>
        <li>Feeding insights back into process governance and agile backlog planning</li>
      </ul>
      <p className="text-gray-700 mb-6">
        This ensures that implementation is not only completed, but effective and optimised over time.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Why This Matters</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li><span className="font-medium">Ensures solutions do what they are meant to</span>, maintaining business integrity and user trust</li>
        <li><span className="font-medium">Reduces rework through early defect detection</span>, saving time and cost</li>
        <li><span className="font-medium">Fosters user adoption and confidence</span> through structured training and support</li>
        <li><span className="font-medium">Builds continuous improvement habits</span> by linking testing and evaluation to business outcomes</li>
      </ul>
      
      <p className="mt-6 text-lg text-gray-700">
        At Bright Lambs, we oversee implementation with rigour, transparency, and empathy, making sure that every solution launched is stable, trustworthy, and delivers lasting benefit.
      </p>
    </div>
  ];

  // Verify this is the correct service
  const service = services.find(s => s.slug === 'implementation-support');
  
  if (!service) {
    notFound();
  }

  return (
    <ServiceDetail 
      title="Implementation Oversight & Testing"
      headerContent={headerContent}
      content={content}
      imageUrl="/images/implementation-oversight.jpg"
    />
  );
}
