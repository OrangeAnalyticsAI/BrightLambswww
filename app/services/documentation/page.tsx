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

export default function Documentation() {
  const content = [
    <div key="section1">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        1. Identifying Requirements for Communication
      </h2>
      <p className="mb-4 text-gray-700">
        Business analysts begin by creating a communication plan that identifies:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Who needs what information, how often, and by what method</li>
        <li>
          The level of interaction required, whether decision-making, consultation or keeping
          informed
        </li>
        <li>
          Documentation standards and approval processes for artefacts such as business
          requirements, use cases, and process flows.
        </li>
      </ul>
      <p className="mb-4 text-gray-700">
        A structured approach ensures stakeholders feel engaged and informed, rather than sidelined.
      </p>
    </div>,

    <div key="section2">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        2. Producing Accurate, Structured Documentation
      </h2>
      <p className="mb-4 text-gray-700">
        Analysts generate a variety of artefacts across project phases, including:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Vision and scope documents</li>
        <li>
          Business Requirement Documents (BRD) and Functional Requirement Specifications (FRS)
        </li>
        <li>Use cases, user stories</li>
        <li>Requirements traceability matrices, data models, and process diagrams</li>
      </ul>
      <p className="mb-4 text-gray-700">
        According to The Business Analyst Job Description, these documents are essential tools that
        support development, testing, governance and audit needs.
      </p>
    </div>,

    <div key="section3">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        3. Applying Best Practices in Information Delivery
      </h2>
      <p className="mb-4 text-gray-700">
        Well-prepared documentation isn't enough unless it is also:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Delivered on time and well in advance of decision-making points.</li>
        <li>
          Language- and format-adapted for different audiences, from executives to technical teams
          to regulatory bodies
        </li>
        <li>
          Supported by visual aids such as flowcharts, wireframes or data models to aid
          comprehension.
        </li>
      </ul>
      <p className="mb-4 text-gray-700">
        Timely and clear documentation reinforces trust, mitigates ambiguity and prevents
        miscommunications.
      </p>
    </div>,

    <div key="section4">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        4. Facilitating Collaborative Reviews
      </h2>
      <p className="mb-4 text-gray-700">Documentation is validated through:</p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Workshops, walkthroughs and peer reviews</li>
        <li>
          Iterative feedback loops that capture comments, resolve conflicts and achieve consensus.
        </li>
      </ul>
      <p className="mb-4 text-gray-700">
        By refining artefacts collaboratively, analysts ensure alignment and stakeholder buy‑in,
        while reducing the risk of scope creep or rework.
      </p>
    </div>,

    <div key="section5">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        5. Managing Traceability & Configuration
      </h2>
      <p className="mb-4 text-gray-700">
        Maintaining a requirements traceability matrix is central to demonstrating that every
        requirement links back to business goals and forward into design, development, testing and
        deployment.
      </p>
      <p className="mb-4 text-gray-700">
        Change management logs, version control and sign-off records ensure everyone is working from
        the same, approved versions of key artefacts.
      </p>
    </div>,

    <div key="section6">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        6. Proactively Managing Stakeholder Engagement
      </h2>
      <p className="mb-4 text-gray-700">
        Analysts employ stakeholder analysis tools and communication plans to:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Understand each stakeholder's influence, motivation and informational needs.</li>
        <li>
          Tailor messaging frequency, channels and depth accordingly, whether via face‑to‑face
          meetings, newsletters or dashboards
        </li>
        <li>
          Build trust through transparency, actively sharing status updates, risks, blockers and
          issue resolutions.
        </li>
      </ul>
    </div>,

    <div key="section7">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        7. Governance, Reporting & Escalation
      </h2>
      <p className="mb-4 text-gray-700">Documentation supports governance via:</p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Regular status reports, executive summaries and exception logs</li>
        <li>Clear escalation maps for unresolved issues or conflicting stakeholder views.</li>
        <li>
          Adherence to organisational and regulatory standards such as GDPR, ISO, or
          industry-specific compliance
        </li>
      </ul>
    </div>,

    <div key="section8">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        8. Hand‑over & Knowledge Transfer
      </h2>
      <p className="mb-4 text-gray-700">As projects conclude, BAs prepare:</p>
      <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
        <li>Final requirement packages for operations and support teams</li>
        <li>Training materials, standard operating procedures and quick‑reference materials</li>
        <li>Post‑implementation reviews capturing lessons learned and suggested next‑steps</li>
      </ul>

      <h3 className="mb-3 text-xl font-semibold text-gray-900">Why It Matters</h3>
      <ul className="list-disc space-y-2 pl-6 text-gray-700">
        <li>
          <span className="font-medium">Builds stakeholder trust and alignment</span>, reducing
          ambiguity and rework
        </li>
        <li>
          <span className="font-medium">Ensures auditability and compliance</span> through traceable
          artefacts and evidence chains.
        </li>
        <li>
          <span className="font-medium">Enables clearer decisions</span> with structured, tailored
          communication
        </li>
        <li>
          <span className="font-medium">
            Lays the groundwork for efficient hand-over, user support and continuous improvement
          </span>
        </li>
      </ul>

      <p className="mt-6 text-lg text-gray-700">
        At Bright Lambs, we regard documentation and communication not as paperwork but as strategic
        instruments, powerful vectors for clarity, alignment, confidence and long‑lasting
        organisational benefit.
      </p>
    </div>,
  ];

  // Get all services and current service index
  const currentServiceIndex = services.findIndex((s) => s.slug === 'documentation');
  const currentService = services[currentServiceIndex];
  const prevService = currentServiceIndex > 0 ? {
    title: services[currentServiceIndex - 1].title,
    href: `/services/${services[currentServiceIndex - 1].slug}`
  } : undefined;
  const nextService = currentServiceIndex < services.length - 1 ? {
    title: services[currentServiceIndex + 1].title,
    href: `/services/${services[currentServiceIndex + 1].slug}`
  } : undefined;

  if (!currentService) {
    notFound();
  }

  return (
    <ServiceDetail
      title="Documentation & Stakeholder Communication"
      description="Effective Documentation and Stakeholder Communication lie at the foundation of successful business analysis. This discipline ensures clarity, alignment and transparency throughout a project's lifecycle, from initial discovery through to post‑implementation reviews."
      content={content}
      imageUrl="/images/services/documentation.jpg"
      showBackButton={false}
      prevService={prevService}
      nextService={nextService}
    />
  );
}
