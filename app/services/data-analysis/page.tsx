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

export default function DataAnalysis() {
  const headerContent = (
    <p className="mx-auto mt-4 max-w-4xl text-center text-lg text-white">
      Data Analysis & Business Intelligence is at the heart of any data-driven organisation. While
      distinct concepts, they work hand in hand: data analysis uncovers hidden insights, and BI
      packages these insights into accessible tools for decision-making.
    </p>
  );

  const content = [
    <div key="section1">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">1. Data Gathering & Preparation</h2>
      <p className="mb-4 text-gray-700">
        Analysts begin by identifying and retrieving data from diverse sources, ERP systems, CRM
        platforms, web logs, third-party datasets, and occasionally unstructured sources such as
        documents or emails. This raw data is then cleaned and transformed, resolving issues like
        duplicates, missing values, and inconsistent formats. These foundation steps are critical
        for ensuring the subsequent validity of all analysis and reporting.
      </p>
    </div>,

    <div key="section2">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        2. Exploratory Data Analysis (EDA)
      </h2>
      <p className="mb-4 text-gray-700">
        Once clean, the data undergoes exploratory analysis. This involves visual summaries,
        correlation matrices, and statistical descriptions to uncover trends, anomalies, and
        underlying patterns. This exploratory phase establishes hypotheses and reveals early
        insights about business performance.
      </p>
    </div>,

    <div key="section3">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        3. Descriptive & Diagnostic Analytics
      </h2>
      <p className="mb-4 text-gray-700">
        In BI, the primary objective is to describe and explain what has happened:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>
          Dashboards and reporting present Key Performance Indicators (KPIs), trends, and summary
          statistics
        </li>
        <li>
          Drill-down analysis enables stakeholders to trace performance back to specific periods,
          segments, or events
        </li>
        <li>
          Diagnostic analysis employs techniques like root-cause evaluation to clarify why trends
          have emerged
        </li>
      </ul>
      <p className="mb-4 text-gray-700">
        These insights inform both tactical responses (e.g., addressing operational issues) and
        higher-level business decisions.
      </p>
    </div>,

    <div key="section4">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        4. Predictive & Prescriptive Analytics
      </h2>
      <p className="mb-4 text-gray-700">
        For truly forward-thinking organisations, BI extends into predictive and prescriptive
        analytics:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>
          Predictive models, using methods like regression, classification, or time-series
          forecasting, anticipate future trends or risks
        </li>
        <li>
          Prescriptive analytics recommend actions using optimisation techniques or decision-tree
          guidance
        </li>
      </ul>
      <p className="mb-4 text-gray-700">
        These advanced insights empower organisations to pre-empt challenges and seize opportunities
        with intent.
      </p>
    </div>,

    <div key="section5">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        5. Dashboard & Report Development
      </h2>
      <p className="mb-4 text-gray-700">
        BI analysts design intuitive, interactive dashboards and reports that showcase insights
        effectively:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>
          Selecting relevant chart types, layout and colour systems to support clarity and ease of
          use
        </li>
        <li>Implementing drill-through capabilities, filters, and contextual prompts</li>
        <li>Ensuring data refresh is automated, traceable, and validated.</li>
      </ul>
      <p className="mb-4 text-gray-700">
        Effective BI artefacts become living tools for business monitoring and insight.
      </p>
    </div>,

    <div key="section6">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        6. Stakeholder Collaboration & Insight Delivery
      </h2>
      <p className="mb-4 text-gray-700">
        Delivering insights requires more than dashboards; it needs collaborative storytelling:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>
          In workshops and presentations, analysts explain trends, outliers, and strategic
          opportunities
        </li>
        <li>
          They recommend specific measures aligned to objectives, marketing optimisation, cost
          reduction, customer retention, or new revenue streams
        </li>
      </ul>
    </div>,

    <div key="section7">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        7. Governance, Compliance & Data Security
      </h2>
      <p className="mb-4 text-gray-700">
        All analytical activities must comply with internal policies and external regulations:
      </p>
      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
        <li>Maintaining data lineage, version history, access logs, and metadata documentation</li>
        <li>
          Applying necessary security controls and protection for personal or sensitive data,
          especially under frameworks like GDPR
        </li>
        <li>Ensuring dashboards are governed, maintained, and regularly validated</li>
      </ul>
    </div>,

    <div key="section8">
      <h2 className="mb-3 text-2xl font-semibold text-gray-900">
        8. Continuous Improvement & BI Maturity
      </h2>
      <p className="mb-6 text-gray-700">BI isn't a one-off project, it is a journey:</p>
      <ul className="mb-6 list-disc space-y-2 pl-6 text-gray-700">
        <li>Analysts monitor usage patterns and performance of reports and models</li>
        <li>
          They iterate on KPIs, introduce new data sources, and integrate machine learning advances
          such as generative-AI query support
        </li>
      </ul>
      <p className="mb-6 text-gray-700">
        This fosters a culture of continuous insight, elevating organisational intelligence over
        time.
      </p>

      <h3 className="mb-3 text-xl font-semibold text-gray-900">Why It Matters</h3>
      <ul className="list-disc space-y-2 pl-6 text-gray-700">
        <li>
          <span className="font-medium">Transforms inaccessible data into actionable insight</span>,
          enabling better-informed decisions
        </li>
        <li>
          <span className="font-medium">Drives efficiency and accountability</span>, exposing
          performance ideas and saving costs
        </li>
        <li>
          <span className="font-medium">
            Supports both tactical responsiveness and strategic foresight
          </span>
          , from operational fixes to long-term planning
        </li>
        <li>
          <span className="font-medium">Embeds data ownership and literacy</span> across teams,
          making insight a shared capability
        </li>
      </ul>

      <p className="mt-6 text-lg text-gray-700">
        At Bright Lambs, we combine rigorous data analysis with intelligent BI solutions. We ensure
        data is clean, insight is clear, and decisions are informed from daily operations to
        executive strategy.
      </p>
    </div>,
  ];

  // Verify this is the correct service
  const service = services.find((s) => s.slug === 'data-analysis');

  if (!service) {
    notFound();
  }

  return (
    <ServiceDetail
      title="Data Analysis & Business Intelligence"
      headerContent={headerContent}
      content={content}
      imageUrl="/images/data-analysis.jpg"
    />
  );
}
