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

export default function ProcessOptimization() {
  const headerContent = (
    <p className="text-lg text-white mt-4 text-center max-w-4xl mx-auto">
      This is pivotal in transforming how an organisation operates; streamlining workflows, limiting inefficiencies, and enhancing agility to serve both customers and the business more effectively. Business analysts employ a methodical and iterative approach to achieve this.
    </p>
  );

  const content = [
    <div key="section1">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Mapping Current Workflows (As‑Is Assessment)</h2>
      <p className="text-gray-700 mb-4">
        At the outset, analysts work closely with stakeholders to map the existing processes in detail. This involves:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li>Conducting interviews and observing current practices</li>
        <li>Documenting workflows using flowcharts, swimlane diagrams or BPMN</li>
        <li>Identifying handovers, bottlenecks, variation and delays</li>
      </ul>
      <p className="text-gray-700 mb-4">
        This "as‑is" modelling helps visualise workflows, roles, systems and key metrics like lead time and error rates.
      </p>
    </div>,
    
    <div key="section2">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Analysing and Diagnosing Inefficiencies</h2>
      <p className="text-gray-700 mb-4">
        Once workflows are visualised, analysis begins:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li>Applying root‑cause techniques (e.g. 5 Whys, fishbone diagrams)</li>
        <li>Highlighting bottlenecks, duplicated effort, waste and compliance issues</li>
        <li>Quantifying workload, delays, error rates and cost implications</li>
      </ul>
      <p className="text-gray-700 mb-4">
        This enables focused diagnostics on where the most value lies in reducing friction.
      </p>
    </div>,
    
    <div key="section3">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Designing Future State (Target Process Blueprint)</h2>
      <p className="text-gray-700 mb-4">
        Analysts then collaborate with stakeholders to design an optimised future state:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li>Simplifying and merging steps to eliminate inefficiencies</li>
        <li>Clarifying roles and reducing handover complexity</li>
        <li>Integrating process governance and control points</li>
        <li>Defining key KPIs: cycle time, promptness, error rate, cost</li>
      </ul>
      <p className="text-gray-700 mb-4">
        This "to‑be" model often starts in workshops, then is formalised into polished designs for alignment.
      </p>
    </div>,
    
    <div key="section4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Testing and Refining New Workflows</h2>
      <p className="text-gray-700 mb-4">
        Prior to rollout, processes undergo prototyping:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li>Essential steps are piloted manually or in limited scope</li>
        <li>Feedback from users and metrics are gathered</li>
        <li>Iterations refine flow, roles and exception handling</li>
      </ul>
      <p className="text-gray-700 mb-4">
        This avoids disrupting core operations and tests the optimised design in practice.
      </p>
    </div>,
    
    <div key="section5">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Automation & Tool Integration</h2>
      <p className="text-gray-700 mb-4">
        Optimisation often involves technology:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li>Identifying repetitive, rule‑based tasks for automation</li>
        <li>Evaluating workflow tools, RPA or scripting solutions</li>
        <li>Planning and supporting integration with existing systems (ERP, CRM, HRM)</li>
      </ul>
      <p className="text-gray-700 mb-4">
        This ensures process digitalisation is seamless, reliable and user‑friendly.
      </p>
    </div>,
    
    <div key="section6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Training, Communication & Change Management</h2>
      <p className="text-gray-700 mb-4">
        A critical success factor is user adoption:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
        <li>Co‑creating training materials, SOPs and run‑books</li>
        <li>Workshops, roadshows and small‑group training sessions</li>
        <li>Maintaining feedback loops for users to report issues or improvements</li>
      </ul>
      <p className="text-gray-700 mb-4">
        This cultivates ownership and lessens resistance to change.
      </p>
    </div>,
    
    <div key="section7">
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Measurement & Continuous Improvement</h2>
      <p className="text-gray-700 mb-6">
        Optimisation is never finished:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
        <li>Establishing process KPIs with live dashboards</li>
        <li>Monitoring deviations and alerting for corrective action</li>
        <li>Periodic reviews to capture new friction or evolving needs</li>
      </ul>
      <p className="text-gray-700 mb-6">
        This ensures the optimisation remains effective and adaptive.
      </p>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Why This Matters</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li><span className="font-medium">Faster, leaner workflows</span> that cut delays and waste</li>
        <li><span className="font-medium">Greater service quality</span>, fewer errors and inconsistencies</li>
        <li><span className="font-medium">Stronger staff engagement</span>, with clear process ownership</li>
        <li><span className="font-medium">Better technological alignment</span>, via automation and system integration</li>
        <li><span className="font-medium">Built-for-evolution model</span>, transforming optimisation into a habit</li>
      </ul>
      
      <p className="mt-6 text-lg text-gray-700">
        At Bright Lambs, we believe real optimisation goes beyond methodology—it requires empathy, involvement, and iterative refinement. Systems and tools matter, but lasting success comes from designing workflows people understand, trust and live every day.
      </p>
    </div>
  ];

  // Verify this is the correct service
  const service = services.find(s => s.slug === 'process-optimization');
  
  if (!service) {
    notFound();
  }

  return (
    <ServiceDetail 
      title="Process & Workflow Optimization"
      headerContent={headerContent}
      content={content}
      imageUrl="/images/process-optimization.jpg"
    />
  );
}
