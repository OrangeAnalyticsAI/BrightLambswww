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

export default function Mentoring() {
  const headerContent = (
    <p className="mx-auto mt-4 max-w-4xl text-center text-lg text-white">
      Mentoring and Capability Building are at the heart of Bright Lambs' approach. We recognise
      that developing skilled business analysts is not a one-off event but a continual journey of
      growth, guided by structured support, shared learning, and community. Central to this is our
      Business Analysis Academy (BAA.ac).
    </p>
  );

  const content = [
    <div key="section1">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        1. Establishing a Foundation: BAA.ac as Our Core Platform
      </h2>
      <p className="mb-4 text-gray-700">
        Our in-house Business Analysis Academy (BAA.ac) serves as both a training repository and
        community hub.
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>
          For Bright Lambs staff, BAA.ac is the base for structured onboarding, continuous
          development modules, and access to evolving content across BA competencies.
        </li>
        <li>
          For the wider BA community, we offer free access to practice guidance, frameworks, case
          studies, templates, webinars, and more, demonstrating our commitment to elevating the
          profession globally.
        </li>
      </ul>
      <p className="mb-4 text-gray-700">
        By using BAA.ac as the central training platform, we embed shared standards, empower
        self-directed growth, and foster peer-to-peer support.
      </p>
    </div>,

    <div key="section2">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        2. Mentoring, Coaching & Leadership
      </h2>
      <p className="mb-4 text-gray-700">
        We pair analysts with seasoned consultants in a long-term mentor relationship, focusing on:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Individual development plans, tailored to strengths and aspiration</li>
        <li>Regular coaching sessions, structured around real project challenges</li>
        <li>Soft skill growth; facilitation, stakeholder engagement, critical thinking</li>
        <li>Technical confidence; process modelling, data interpretation, tool application</li>
      </ul>
      <p className="mb-4 text-gray-700">
        This mentorship ensures individuals receive personalised guidance and leadership as they
        advance through career stages.
      </p>
    </div>,

    <div key="section3">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">3. Structured Learning Pathways</h2>
      <p className="mb-4 text-gray-700">
        BAA.ac's content is organised into well-defined learning tracks, aligned with BABOK®
        knowledge areas, industry best practice, and Bright Lambs' own frameworks. Courses feature:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Interactive self-paced modules (theory + comprehension questions)</li>
        <li>Templates and worked examples (e.g., BRDs, process maps)</li>
        <li>Recorded masterclasses, including guest sector speakers and topic specialists</li>
        <li>Suggested peer learning activities: book reviews, role-plays, community discussions</li>
      </ul>
      <p className="mb-4 text-gray-700">
        Completion of each pathway is recognised through digital badges and encouragement to
        contribute back as community experts.
      </p>
    </div>,

    <div key="section4">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        4. Peer-to-Peer Growth & Community
      </h2>
      <p className="mb-4 text-gray-700">
        The peer dimension is vital. Through BAA.ac and internal sessions, we host:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>
          Monthly BA "huddles" where analysts present case studies and reflect on lessons learned
        </li>
        <li>
          Peer review forums, supporting document critique in a safe, developmental environment
        </li>
        <li>
          Virtual mentoring, group drop-ins with senior colleagues to review challenges and share
          insights
        </li>
      </ul>
      <p className="mb-4 text-gray-700">
        This collaborative approach cultivates trust, resilience, and a habit of continuous
        reflection and improvement.
      </p>
    </div>,

    <div key="section5">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        5. Managing Capability Growth & Impact
      </h2>
      <p className="mb-4 text-gray-700">We track individual progress via BAA.ac analytics:</p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Course completions</li>
        <li>Micro-credential achievements</li>
        <li>Participation metrics (contributions, peer reviews)</li>
        <li>Application outcomes (e.g., improved process KPIs, stakeholder feedback)</li>
      </ul>
      <p className="mb-4 text-gray-700">
        Encouraging formal certification through accredited bodies such as BCS, International
        Institute of Business Analysis, AgileBA, etc.
      </p>
      <p className="mb-4 text-gray-700">
        These data form the basis of quarterly capability conversations, highlighting achievements,
        identifying development opportunities, and guiding next steps.
      </p>
    </div>,

    <div key="section6">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        6. Embedding Capability into Delivery
      </h2>
      <p className="mb-6 text-gray-700">
        The ultimate goal is better client delivery. Analysts who train on BAA.ac and benefit from
        mentoring are more confident, resilient, and ready to lead:
      </p>
      <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
        <li>They adopt frameworks thoughtfully, tailoring them to context</li>
        <li>They articulate value and align technical detail with stakeholder needs</li>
        <li>They demonstrate leadership in driving change and enabling others</li>
      </ul>

      <h3 className="mb-3 text-xl font-semibold text-gray-900">Why It Matters</h3>
      <ul className="list-disc space-y-2 pl-6 text-gray-700">
        <li>
          <span className="font-medium">It embodies our belief in people:</span> By investing in
          learning and mentoring, we uphold BA capability as a skill that grows with support, not
          something that can simply be inherited.
        </li>
        <li>
          <span className="font-medium">It sets high standards:</span> With BAA.ac as our "gold
          standard", every analyst works within the same framework, delivering reliable quality.
        </li>
        <li>
          <span className="font-medium">It scales impact:</span> As we build capability internally,
          we also nurture BA talent externally, expanding confidence and competence in the
          profession.
        </li>
        <li>
          <span className="font-medium">It deepens client outcomes:</span> Better-trained analysts
          design more effective processes, drive adoption more smoothly, and capture value more
          consistently.
        </li>
      </ul>

      <p className="mt-6 text-lg text-gray-700">
        At Bright Lambs, mentoring and capability building are not just nice to have, they are
        mission-critical. Through structured mentorship, shared learning via BAA.ac, and a
        supportive community, we unleash the human potential behind every transformation.
      </p>
    </div>,
  ];

  // Verify this is the correct service
  const service = services.find((s) => s.slug === 'mentoring');

  if (!service) {
    notFound();
  }

  return (
    <ServiceDetail
      title="Mentoring & Capability Building"
      headerContent={headerContent}
      content={content}
      imageUrl="/images/mentoring.jpg"
    />
  );
}
