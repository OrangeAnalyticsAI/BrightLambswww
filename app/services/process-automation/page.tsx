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

export default function ProcessAutomation() {
  const headerContent = (
    <p className="mx-auto mt-4 max-w-4xl text-center text-lg text-white">
      This is the bridge between process design and operation, enabling organisations to work more
      efficiently and reliably. Business analysts play a central role in identifying, implementing
      and refining automation and system-to-system connections that turn manual effort into
      streamlined workflow.
    </p>
  );

  const content = [
    <div key="section1">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        1. Identifying and Prioritising Automation Opportunities
      </h2>
      <p className="mb-4 text-gray-700">
        A key task is to analyse existing workflows, pinpointing repetitive, rules-based tasks with
        the greatest potential for automation. Techniques such as process mapping, cost/benefit
        analysis, and complexity scoring help establish which tasks should be automated first,
        delivering maximum value; often through RPA (robotic process automation), intelligent
        automation, or workflow engines.
      </p>
    </div>,

    <div key="section2">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        2. Documenting As‑Is and To‑Be Workflows
      </h2>
      <p className="mb-4 text-gray-700">
        The next step is formalising both current ("as‑is") and proposed ("to‑be") processes.
        Documentation, via BPMN diagrams or RPA PDDs (Process Definition Documents), captures
        process flows, decisions, exceptions, data sources, and integrations. This clarity ensures
        developers and analysts align on purpose and requirements.
      </p>
    </div>,

    <div key="section3">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">3. Tool Evaluation & Selection</h2>
      <p className="mb-4 text-gray-700">
        Business analysts assess automation platforms (such as UiPath, Blue Prism, Automation
        Anywhere) and integration middleware (API gateways or enterprise service buses), weighing
        criteria like technical fit, cost, maintenance, scalability, and governance. This selection
        process includes engaging vendors, reviewing case studies, and testing pilots.
      </p>
    </div>,

    <div key="section4">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        4. Integration Design & Architecture
      </h2>
      <p className="mb-4 text-gray-700">
        With tools selected, analysts design integration architecture:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Detail data flows between systems</li>
        <li>Define API or interface requirements</li>
        <li>Address data mapping, validation, error handling</li>
        <li>Ensure secure, reliable data exchange.</li>
      </ul>
      <p className="mb-4 text-gray-700">
        These designs become critical artefacts for technical and support teams.
      </p>
    </div>,

    <div key="section5">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        5. Development Oversight & Quality Assurance
      </h2>
      <p className="mb-4 text-gray-700">
        Business analysts coordinate with developers and RPA specialists during build phases. They
        validate the automation logic against the documented "to‑be" process, review interim code
        and bot scripts, and ensure exception handling and data integrity. Analysts also establish
        automated and manual testing strategies to ensure solutions behave as intended, catching
        defects early.
      </p>
    </div>,

    <div key="section6">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">6. Change Management & Training</h2>
      <p className="mb-4 text-gray-700">
        Adoption is as important as deployment. Analysts craft change plans to prepare users,
        complete with training materials, quick-reference guides, and live demonstrations. They also
        define escalation processes when automation deviates from expected flows or features require
        refinement.
      </p>
    </div>,

    <div key="section7">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">7. Deployment & Monitoring</h2>
      <p className="mb-4 text-gray-700">
        When live, analysts help supervise the rollout, monitor bot and interface performance (e.g.
        throughput, error rates, runtime), and trigger alerts if thresholds are exceeded. They
        ensure schedule integrity, liaise with IT for infrastructure issues, and confirm production
        readiness.
      </p>
    </div>,

    <div key="section8">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        8. Benefits Realisation & Continuous Improvement
      </h2>
      <p className="mb-6 text-gray-700">
        Post-implementation, business analysts track benefits, time saved, costs reduced, error
        rates lowered, and compare against projected ROI. They gather user feedback, monitor for
        failures or inefficiencies, and recommend refinements or extension opportunities. This
        establishes automation as a continuous maturity journey rather than a one-off project.
      </p>

      <h3 className="mb-3 text-xl font-semibold text-gray-900">Why It Matters</h3>
      <ul className="list-disc space-y-2 pl-6 text-gray-700">
        <li>
          <span className="font-medium">Efficiency and accuracy:</span> frees skilled staff from
          mundane tasks, allowing focus on higher-value work
        </li>
        <li>
          <span className="font-medium">Consistency and reliability:</span> automation enforces
          standards and reduces human error
        </li>
        <li>
          <span className="font-medium">Scalability:</span> repeatable automated workflows scale
          without proportional increase in cost
        </li>
        <li>
          <span className="font-medium">Insights for evolution:</span> data from automation reveals
          new improvement opportunities
        </li>
      </ul>

      <p className="mt-6 text-lg text-gray-700">
        At Bright Lambs, we ensure automation efforts are thoroughly grounded in business needs,
        clearly documented, tightly integrated, carefully deployed, and relentlessly optimised,
        ensuring sustainable returns from day one.
      </p>
    </div>,
  ];

  // Verify this is the correct service
  const service = services.find((s) => s.slug === 'process-automation');

  if (!service) {
    notFound();
  }

  return (
    <ServiceDetail
      title="Process Automation & System Integration"
      headerContent={headerContent}
      content={content}
      imageUrl="/images/process-automation.jpg"
    />
  );
}
