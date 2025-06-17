export interface Service {
  title: string;
  description: string;
  slug: string;
  details: string[];
}

export const services: Service[] = [
  {
    title: "Business Needs & Strategy Analysis",
    description: "Evaluate current business structures, processes, and strategies to identify improvement opportunities and align initiatives with overall goals.",
    slug: "business-needs-strategy",
    details: [
      "Comprehensive business process analysis",
      "Strategic alignment and goal setting",
      "Competitive analysis and market positioning",
      "ROI and business case development"
    ]
  },
  {
    title: "Process & Workflow Optimization",
    description: "As-is Process Mapping & Future-State Redesign. Model existing workflows, identify inefficiencies, and design streamlined, high-impact processes using techniques like value‑stream mapping",
    slug: "process-optimization",
    details: [
      "Current state process mapping",
      "Bottleneck identification",
      "Future state process design",
      "Value-stream mapping"
    ]
  },
  {
    title: "Requirements Elicitation & Analysis",
    description: "Engage stakeholders through workshops, interviews, and focus groups to capture functional and non-functional requirements. Formalize these with use cases, user stories, data models, and diagrams",
    slug: "requirements-elicitation",
    details: [
      "Stakeholder workshops",
      "User story development",
      "Use case modeling",
      "Data models and diagrams"
    ]
  },
  {
    title: "Solution Assessment, Selection & Design Support",
    description: "Assess technology options, conduct feasibility studies against requirements, and support system selection to ensure alignment with business objectives",
    slug: "solution-assessment",
    details: [
      "Vendor evaluation",
      "Solution architecture design",
      "Feasibility studies",
      "Implementation planning"
    ]
  },
  {
    title: "Implementation Support & Validation",
    description: "Translate requirements into testable acceptance criteria, assist with user acceptance testing (UAT), and ensure solution aligns with stakeholder needs during deployment",
    slug: "implementation-support",
    details: [
      "Test case development",
      "User acceptance testing",
      "Deployment support",
      "Solution validation"
    ]
  },
  {
    title: "Process Automation & System Integration",
    description: "Design and implement automation (e.g., RPA, workflows) and ensure systems and tools seamlessly interact to automate manual steps.",
    slug: "process-automation",
    details: [
      "RPA implementation",
      "Workflow automation",
      "System integration",
      "API development"
    ]
  },
  {
    title: "Data Analysis & Business Intelligence",
    description: "Analyze data trends, build dashboards, and deliver actionable insights that guide decision-making and improve performance",
    slug: "data-analysis",
    details: [
      "Data visualization",
      "Dashboard development",
      "KPI tracking",
      "Predictive analytics"
    ]
  },
  {
    title: "Documentation & Stakeholder Communication",
    description: "Produce clear, structured deliverables like BRDs, SRSs, user stories, diagrams, and maintain ongoing stakeholder alignment through regular updates",
    slug: "documentation",
    details: [
      "Business requirements documentation",
      "Technical specifications",
      "User guides",
      "Stakeholder presentations"
    ]
  },
  {
    title: "Mentoring & Capability Building",
    description: "Supporting Business Analyst development through education, workshops, and mentoring, ensuring BA skills are nurtured and matured over time.",
    slug: "mentoring",
    details: [
      "BA training programs",
      "Mentorship sessions",
      "Best practice development",
      "Team capability assessment"
    ]
  }
];
