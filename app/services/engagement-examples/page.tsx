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

export default function EngagementExamples() {
  const content = [
    <div key="section1">
      <h2 className="mb-3 text-2xl font-semibold">1. Team Augmentation for Major Projects</h2>
      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">Engagement Type: Statement of Work (SoW)</p>
      <p className="mb-4">
        When you are delivering a large transformation project and need extra capacity or specialist insight, 
        we embed experienced business analysts into your team. We bring our own methods, tools, and documentation 
        standards, but we can also adapt to yours as needed. You get fully integrated support without the cost 
        or commitment of permanent hires.
      </p>
      <p className="font-medium mb-2">Example:</p>
      <p className="italic mb-6">
        Supporting an ERP implementation by mapping legacy processes, gathering detailed requirements, 
        and translating them into actionable user stories for delivery teams.
      </p>
    </div>,

    <div key="section2">
      <h2 className="mb-3 text-2xl font-semibold">2. Process Mapping, Improvement, and Automation</h2>
      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">Engagement Type: Statement of Work (SoW)</p>
      <p className="mb-4">
        Whether you are tackling a pain point or chasing a productivity gain, we help you understand and 
        improve how things are done. We document current processes, identify inefficiencies or risks, and 
        design streamlined, automated solutions that deliver measurable value.
      </p>
      <p className="font-medium mb-2">Example:</p>
      <p className="italic mb-6">
        Redesigning a procure-to-pay (P2P) workflow to reduce manual handling and integrate with 
        automation tools such as Power Automate or n8n.
      </p>
    </div>,

    <div key="section3">
      <h2 className="mb-3 text-2xl font-semibold">3. Ongoing BA Support for a Specific Function or Technology</h2>
      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">Engagement Type: Service Level Agreement (SLA)</p>
      <p className="mb-4">
        Some business-critical systems need consistent oversight, not just during implementation but throughout their lifecycle. 
        Our ongoing business analysis support provides just that. We offer a retained service with guaranteed availability, 
        giving you continuity, specialist knowledge, and fast response times without the need to hire a full-time internal resource.
      </p>
      
      <p className="mb-3">
        Our analysts act as a bridge between your business and the technology. As well as supporting process improvement and 
        managing change requests, we can also:
      </p>
      
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li>Provide first-line technical support to users when the vendor cannot</li>
        <li>Handle user onboarding, training, and access management</li>
        <li>Manage roles, profiles, and permissions to maintain control and security</li>
        <li>Oversee data integrity and data management processes</li>
        <li>Coordinate and implement configuration changes or minor enhancements</li>
        <li>Identify opportunities for further optimisation or automation</li>
      </ul>
      
      <p className="mb-4">
        This service is particularly valuable where the technology is embedded in core operations but lacks dedicated 
        internal ownership. We step into that space, driving adoption, reducing support bottlenecks, and ensuring the 
        solution continues to evolve with your business.
      </p>
      
      <p className="font-medium mb-2">Example:</p>
      <p className="italic mb-6">
        Providing ongoing analysis and change support for Salesforce, managing user queries and access, maintaining data structures, 
        and ensuring the platform continues to support sales and service teams effectively.
      </p>
    </div>,

    <div key="section4">
      <h2 className="mb-3 text-2xl font-semibold">4. Discovery and Feasibility Analysis</h2>
      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">Engagement Type: Fixed-Term SoW</p>
      <p className="mb-4">
        Before you commit budget and resources, we help you validate the opportunity. We run structured 
        discovery sessions to understand the challenge, explore solution options, and provide clear 
        recommendations with effort, impact, and risk assessments.
      </p>
      <p className="font-medium mb-2">Example:</p>
      <p className="italic mb-6">
        Scoping the viability of a self-service customer portal, including user journey mapping, 
        technical constraints, and business case development.
      </p>
    </div>,

    <div key="section5">
      <h2 className="mb-3 text-2xl font-semibold">5. Training and Capability Building</h2>
      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">Engagement Type: Bespoke or Retained SLA</p>
      <p className="mb-4">
        We do not just deliver; we upskill your team as well. Whether it is mentoring junior BAs, 
        coaching product owners, or delivering formal training through our Business Analysis Academy 
        (BAA.ac), we help build long-term capability in your organisation.
      </p>
      <p className="font-medium mb-2">Example:</p>
      <p className="italic mb-6">
        Running a six-week capability uplift programme alongside a digital project to increase 
        internal confidence and autonomy.
      </p>
    </div>,

    <div key="section6">
      <h2 className="mb-3 text-2xl font-semibold">6. Data-Driven Process and Performance Reviews</h2>
      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">Engagement Type: SoW or Retained Service</p>
      <p className="mb-4">
        We use data to understand how your processes actually run, not just how they should. 
        By combining qualitative insight with dashboards and KPIs, we help you uncover inefficiencies 
        and act on real opportunities for improvement.
      </p>
      <p className="font-medium mb-2">Example:</p>
      <p className="italic mb-6">
        Reviewing field service performance using Jira, Power BI, and staff interviews to refine 
        dispatching rules and reduce on-site wait times.
      </p>
      
      <p className="text-lg mt-8 mb-6">
        Each engagement is tailored to your needs. Whether you are scaling up, modernising, or simply 
        trying to bring order to complexity, we bring calm, clarity, and action.
      </p>
    </div>
  ];

  // Since this is a special page, we'll use null for prev/next services to hide navigation
  const prevService = undefined;
  const nextService = undefined;

  return (
    <ServiceDetail
      title="Engagement Examples"
      description="Our Business Analysis services are designed to fit seamlessly into your business. Whether you need short-term expertise or a long-term partnership, we offer a range of engagement models to suit your goals, pace, and internal capabilities. Each engagement is underpinned by clear deliverables and governed by a Statement of Work (SoW) or Service Level Agreement (SLA)."
      content={content}
      imageUrl="/images/services/engagement_examples.jpg"
      showBackButton={true}
      prevService={prevService}
      nextService={nextService}
    />
  );
}
