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

export default function RequirementsElicitation() {
  const content = [
    <div key="section1">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        1. Preparation & Context Setting
      </h2>
      <p className="mb-4 text-gray-700">
        Business analysts begin by reviewing existing artefacts—business cases, project scopes,
        regulatory guidelines, system documentation—to ground their understanding of the problem
        space. They then identify relevant stakeholders, including system users, business owners,
        subject-matter experts, decision-makers, IT support, and any regulatory representatives. An
        elicitation plan is drafted to define objectives, choose elicitation techniques, schedule
        sessions, and prepare supporting materials.
      </p>
    </div>,

    <div key="section2">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">2. Stakeholder Engagement</h2>
      <p className="mb-4 text-gray-700">
        Analysts engage stakeholders through a tailored mix of techniques:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>
          <span className="font-medium">Structured Interviews</span> allow deep insights from
          individuals or small groups, guided by prepared questions and prompts.
        </li>
        <li>
          <span className="font-medium">Workshops or Focus Groups</span> such as JAD (Joint
          Application Design) enable collective exploration, debate, and consensus gathering in
          facilitated sessions.
        </li>
        <li>
          <span className="font-medium">Observation or Shadowing</span> involves watching users as
          they perform real tasks to uncover tacit knowledge not expressed explicitly.
        </li>
        <li>
          <span className="font-medium">Surveys or Questionnaires</span> can capture broad feedback
          from many users, useful for early-stage requirement discovery.
        </li>
        <li>
          <span className="font-medium">Prototyping & Walkthroughs</span>, including wireframes or
          use-case diagrams, help stakeholders visualise potential solutions and trigger valuable
          responses.
        </li>
      </ul>
    </div>,

    <div key="section3">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        3. Documenting & Modelling Requirements
      </h2>
      <p className="mb-4 text-gray-700">
        Information is then captured in formal models and documentation. Common artefacts include:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Use Cases or User Stories for functional behaviour,</li>
        <li>Structured diagrams (e.g., BPMN, data models),</li>
        <li>Acceptance Criteria and Functional Specs,</li>
        <li>
          Non-Functional Requirements specifying performance, security, usability, and compliance
          needs.
        </li>
      </ul>
      <p className="mb-4 text-gray-700">
        Analysts ensure consistency by using templates, visual modelling, and traceability to
        connect each requirement to its origin and rationale.
      </p>
    </div>,

    <div key="section4">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">4. Validation & Confirmation</h2>
      <p className="mb-4 text-gray-700">
        Draft requirements are reviewed iteratively with stakeholders to confirm accuracy and
        completeness. Analysts organise review sessions or distribute documents for feedback,
        capturing refinements or new discoveries. This iterative validation helps prevent
        misunderstandings and scope creep.
      </p>
    </div>,

    <div key="section5">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">5. Prioritisation & Trade-offs</h2>
      <p className="mb-4 text-gray-700">
        Not all requirements can be implemented simultaneously. Analysts use techniques such as
        MoSCoW, ranking models, or cost-benefit analysis to prioritise requirements, ensuring effort
        is focused on the most valuable functionality first. They facilitate transparent
        decision-making aligned with strategy and resources.
      </p>
    </div>,

    <div key="section6">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">6. Integration & Traceability</h2>
      <p className="mb-4 text-gray-700">
        Each requirement is traced back to strategic goals and forward to design, development, and
        testing. This traceability ensures that nothing is lost and that tests and designs reflect
        the stated needs. Where agile methods are used, approaches such as Specification by Example
        and acceptance test-driven development (ATDD) enable living documentation that bridges
        requirements and testing.
      </p>
    </div>,

    <div key="section7">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        7. Ongoing Requirements Management
      </h2>
      <p className="mb-6 text-gray-700">
        Requirements evolve. Business analysts maintain a change log, manage version control, assess
        impact, and re-validate changes with stakeholders. They use requirements tools or
        repositories when complexity or regulation demands, ensuring clarity and governance.
      </p>

      <h3 className="mb-3 text-xl font-semibold text-gray-900">Why It Matters</h3>
      <ul className="list-disc space-y-2 pl-6 text-gray-700">
        <li>
          <span className="font-medium">
            Ensures solution design genuinely addresses core business needs
          </span>{' '}
          while reducing risk of rework or wasted investment.
        </li>
        <li>
          <span className="font-medium">
            Promotes stakeholder alignment, mutual understanding, and trust
          </span>{' '}
          through active engagement.
        </li>
        <li>
          <span className="font-medium">Enables disciplined documentation and traceability</span>,
          essential for complex, regulated, or multi-vendor projects.
        </li>
        <li>
          <span className="font-medium">Supports agile delivery</span> by translating business needs
          into test-driven artefacts, ensuring each increment delivers real value.
        </li>
      </ul>

      <p className="mt-6 text-lg text-gray-700">
        At Bright Lambs, we champion a rigorous and human-centred approach to Requirements
        Elicitation & Analysis. We ensure solutions are built right from the start—not just in code,
        but in clarity and mutual understanding.
      </p>
    </div>,
  ];

  // Get all services and current service index
  const currentServiceIndex = services.findIndex((s) => s.slug === 'requirements-elicitation');
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
      title="Requirements Elicitation & Analysis"
      description="The cornerstone of effective business analysis, where insights from stakeholders are transformed into precise, actionable specifications. This phase ensures that the real needs of the organisation are understood and thoroughly documented before any design or implementation begins."
      content={content}
      imageUrl="/images/services/requirements-elicitation.jpg"
      showBackButton={false}
      prevService={prevService}
      nextService={nextService}
    />
  );
}
