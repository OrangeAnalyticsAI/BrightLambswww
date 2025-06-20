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

export default function SolutionAssessment() {
  const headerContent = (
    <p className="mx-auto mt-4 max-w-4xl text-center text-lg text-white">
      This is about guiding organisations through choosing the right path forward and ensuring the
      chosen solution truly addresses their needs. Business analysts play a crucial role in this
      phase, bridging strategy, stakeholder requirements, vendor offerings, and implementation
      realities.
    </p>
  );

  const content = [
    <div key="section1">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">1. Defining Evaluation Criteria</h2>
      <p className="mb-4 text-gray-700">
        Before evaluating any option, analysts collaborate with stakeholders to define objective
        criteria. These often include:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Requirements coverage (including functional and non-functional needs)</li>
        <li>Total cost of ownership (licensing, implementation, ongoing maintenance)</li>
        <li>Technical compatibility and integration capabilities</li>
        <li>Vendor credentials and support frameworks</li>
        <li>Scalability, security, regulatory compliance, and risk.</li>
      </ul>
      <p className="mb-4 text-gray-700">
        By developing a weighted decision matrix, analysts ensure consistent, transparent evaluation
        across all solution candidates.
      </p>
    </div>,

    <div key="section2">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">2. Market and Vendor Research</h2>
      <p className="mb-4 text-gray-700">
        Analysts conduct comprehensive market scans and vendor landscape reviews. This involves:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Identifying leading and niche providers</li>
        <li>Comparing feature sets, product roadmaps, and architecture</li>
        <li>Engaging vendors for demonstrations or proof of concept (POC)</li>
        <li>Interviewing references and reviewing case studies</li>
      </ul>
      <p className="mb-4 text-gray-700">
        The outcome is a shortlist of vendors that best align with organisational objectives and
        constraints.
      </p>
    </div>,

    <div key="section3">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        3. Facilitating Evaluation Processes
      </h2>
      <p className="mb-4 text-gray-700">
        With criteria and candidates in place, analysts organise formal evaluation sessions, pilots
        or POCs. They establish clear scopes, timelines, and evidence collection methods—balancing
        scripted testing with exploratory use to assess adaptability and usability.
      </p>
      <p className="mb-4 text-gray-700">
        During these sessions, analysts gather quantitative metrics (e.g. speed, error rate, task
        completion) and qualitative feedback (usability, confidence, fit-for-purpose) from diverse
        user groups. They monitor performance against acceptance criteria and identify any
        divergence or risk.
      </p>
    </div>,

    <div key="section4">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        4. Analysing Findings & Comparing Options
      </h2>
      <p className="mb-4 text-gray-700">
        Once data are fully collected, analysts evaluate and synthesise:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Collating test results and user feedback</li>
        <li>Scoring each vendor against criteria in the decision matrix</li>
        <li>Highlighting trade-offs, risks, and dependencies</li>
        <li>Assessing organisational readiness (people, culture, infrastructure)</li>
      </ul>
      <p className="mb-4 text-gray-700">
        This process surfaces which solution offers the most value, flexibility, and sustainability
        for both current and anticipated needs.
      </p>
    </div>,

    <div key="section5">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        5. Recommending & Securing Approval
      </h2>
      <p className="mb-4 text-gray-700">
        Analysts deliver a comprehensive recommendation supported by the decision matrix, user
        feedback, cost-benefit analysis, and risk evaluation. They present this to sponsors and
        steering committees, facilitating informed decision-making. Final sign-off is
        crucial—marking the official transition from selection to procurement and implementation.
      </p>
    </div>,

    <div key="section6">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        6. Transition Design & Readiness Planning
      </h2>
      <p className="mb-4 text-gray-700">
        Once a solution is chosen, analysts define transition and adoption requirements:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Designating configuration, integration, and data migration plans</li>
        <li>Identifying changes to roles, governance, and support structures</li>
        <li>Defining training, communication, and cut-over strategies</li>
        <li>Establishing success metrics and readiness assessment criteria.</li>
      </ul>
      <p className="mb-4 text-gray-700">
        This sets the stage for a smooth implementation without disruption.
      </p>
    </div>,

    <div key="section7">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">7. Post-Selection Evaluation</h2>
      <p className="mb-6 text-gray-700">
        Choosing a solution isn't the end, in many organisations, analysts later validate the live
        system:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
        <li>Monitoring performance against expected outcomes</li>
        <li>Gathering continuous feedback from end-users</li>
        <li>Steering adjustments, bug fixes, or configuration tweaks</li>
        <li>Recommending further improvements or training based on actual usage</li>
      </ul>
      <p className="mb-6 text-gray-700">
        This ongoing assessment ensures the solution remains aligned with evolving business needs.
      </p>

      <h3 className="mb-3 text-xl font-semibold text-gray-900">Why This Matters</h3>
      <ul className="list-disc space-y-2 pl-6 text-gray-700">
        <li>
          <span className="font-medium">Brings a structured, data-driven approach</span> to complex
          decisions
        </li>
        <li>
          <span className="font-medium">Reduces risk</span> through objective comparison and
          transparent scoring
        </li>
        <li>
          <span className="font-medium">
            Ensures chosen solutions genuinely meet stakeholder needs
          </span>{' '}
          and context
        </li>
        <li>
          <span className="font-medium">Facilitates smoother adoption</span> with readiness and
          user-centred transition planning
        </li>
      </ul>

      <p className="mt-6 text-lg text-gray-700">
        At Bright Lambs, we guide this process end to end—from thorough market insight to final
        handover—ensuring clarity, confidence, and long-term value.
      </p>
    </div>,
  ];

  // Verify this is the correct service
  const service = services.find((s) => s.slug === 'solution-assessment');

  if (!service) {
    notFound();
  }

  return (
    <ServiceDetail
      title="Solution Assessment & System Selection"
      headerContent={headerContent}
      content={content}
      imageUrl="/images/solution-assessment.jpg"
    />
  );
}
