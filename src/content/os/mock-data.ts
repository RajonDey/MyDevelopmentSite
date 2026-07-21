import type { CommandCenterData } from "@/types/os";

/** Locked §12 real inventory — July 21, 2026. No dummy clients/metrics. */
const now = "2026-07-21T12:00:00.000Z";

export const mockCommandCenter: CommandCenterData = {
  northStar: {
    id: "ns-2026",
    year: 2026,
    statement:
      "Build and ship honest work across client delivery, our own product, and research — as one small team that stays sustainable.",
    mission:
      "Help real users and clients with things that work; grow IELTS Ready and research that others can cite; keep client delivery calm and linked to how we operate.",
    whyItMatters:
      "Client work funds the engine; IELTS Ready and papers compound what we own; YouTube waits until we have capacity — we improve together, not as separate lanes.",
    updatedAt: now,
  },

  teamCapacity: {
    teamActiveLimit: 5,
  },

  members: [
    {
      id: "member-raj",
      email: "rajondeyofficial@gmail.com",
      name: "Rajon",
      role: "admin",
      orgRoleId: "role-founder",
      kind: "core",
      status: "active",
      activeLimit: 3,
    },
    {
      id: "member-gourob",
      email: "gourobdn15@gmail.com",
      name: "Gourob",
      role: "admin",
      orgRoleId: "role-cofounder",
      kind: "core",
      status: "active",
      activeLimit: 3,
    },
  ],

  roleDefs: [
    {
      id: "role-founder",
      slug: "founder",
      name: "Founder",
      summary:
        "Handles vision, fundraising, technology architecture, sales, hiring, and culture.",
      responsibilities: [
        "Own company vision and North Star",
        "Fundraising and strategic partnerships",
        "Technology architecture direction",
        "Sales and client relationships",
        "Hiring and culture",
      ],
      principles: [
        "Vision first — every priority ladders up",
        "Hire for ownership; protect culture",
        "Architecture and sales stay honest and sustainable",
      ],
      sortOrder: 1,
      active: true,
    },
    {
      id: "role-cofounder",
      slug: "co-founder",
      name: "Co-founder",
      summary:
        "Head of Engineering — handles product execution, delivery, and the engineering team.",
      responsibilities: [
        "Head of Engineering",
        "Product execution and shipping cadence",
        "Delivery quality across active work",
        "Lead and grow the engineering team",
      ],
      principles: [
        "Execution over theory — ship what matters",
        "Engineering bar is non-negotiable",
        "Delivery clarity: blockers surface early",
      ],
      sortOrder: 2,
      active: true,
    },
  ],

  pillars: [
    {
      id: "pillar-client",
      slug: "client-services",
      name: "Client Services",
      emoji: "💼",
      description:
        "Paid delivery — team projects link to Lead Desk; Desk owns billing and client notes.",
      sortOrder: 1,
      activeSlotLimit: 2,
      leadId: "member-raj",
    },
    {
      id: "pillar-saas",
      slug: "saas",
      name: "SaaS",
      emoji: "🚀",
      description: "Products we own — roadmap and notes live in OS.",
      sortOrder: 2,
      activeSlotLimit: 1,
      leadId: "member-gourob",
    },
    {
      id: "pillar-content",
      slug: "content",
      name: "YouTube",
      emoji: "📺",
      description: "Public channel — parked until we have capacity.",
      sortOrder: 3,
      activeSlotLimit: 0,
      leadId: "member-raj",
    },
    {
      id: "pillar-research",
      slug: "research",
      name: "Research Paper",
      emoji: "📄",
      description: "Published and in-progress papers — knowledge we own.",
      sortOrder: 4,
      activeSlotLimit: 1,
      leadId: "member-gourob",
    },
  ],

  objectives: [
    {
      id: "obj-client-q3",
      pillarId: "pillar-client",
      year: 2026,
      quarter: 3,
      title: "Deliver HICU Platform calmly",
      outcome:
        "Client runs on a reliable platform; Desk stays source of truth.",
      health: "green",
      sortOrder: 1,
    },
    {
      id: "obj-saas-q3",
      pillarId: "pillar-saas",
      year: 2026,
      quarter: 3,
      title: "Advance IELTS Ready",
      outcome:
        "Learners get a better practice product; roadmap lives in OS.",
      health: "green",
      sortOrder: 1,
    },
    {
      id: "obj-content-q3",
      pillarId: "pillar-content",
      year: 2026,
      quarter: 3,
      title: "Hold until ready",
      outcome: "Channel stays backlog — no fake progress.",
      health: "yellow",
      sortOrder: 1,
    },
    {
      id: "obj-research-q3",
      pillarId: "pillar-research",
      year: 2026,
      quarter: 3,
      title: "Finish journal survey; stand on published work",
      outcome: "One paper live; one moving toward submission.",
      health: "green",
      sortOrder: 1,
    },
  ],

  keyResults: [
    {
      id: "kr-client-desk",
      objectiveId: "obj-client-q3",
      label: "Active linked Desk projects on track",
      current: 1,
      target: 1,
      unit: "projects",
      updatedAt: now,
    },
    {
      id: "kr-saas-ielts",
      objectiveId: "obj-saas-q3",
      label: "IELTS Ready in active delivery",
      current: 1,
      target: 1,
      unit: "products",
      updatedAt: now,
    },
    {
      id: "kr-yt-setup",
      objectiveId: "obj-content-q3",
      label: "Channel setup steps done",
      current: 0,
      target: 3,
      unit: "steps",
      updatedAt: now,
    },
    {
      id: "kr-research-papers",
      objectiveId: "obj-research-q3",
      label: "Papers published",
      current: 1,
      target: 2,
      unit: "papers",
      updatedAt: now,
    },
  ],

  projects: [
    {
      id: "proj-hicu",
      objectiveId: "obj-client-q3",
      title: "HICU Platform",
      kind: "client_linked",
      ownerId: "member-raj",
      collaboratorIds: ["member-gourob"],
      status: "active",
      priority: "p1",
      deadline: null,
      summary: "Hexas — HICU development, platform work, and classes.",
      whoItHelps: "Hexas / HICU team — reliable platform for their work",
      fulfillmentNote:
        "Desk owns billing and client notes; OS owns priority and load.",
      links: [{ label: "Lead Desk", url: "/dashboard" }],
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: now,
    },
    {
      id: "proj-ielts",
      objectiveId: "obj-saas-q3",
      title: "IELTS Ready",
      kind: "internal",
      ownerId: "member-gourob",
      collaboratorIds: ["member-raj"],
      status: "active",
      priority: "p1",
      deadline: null,
      summary:
        "IELTS Academic practice product we own. Split further work in notes as needed.",
      notes:
        "Live product. Capture next slices here (features, fixes) without spinning up new capacity projects unless needed.",
      whoItHelps: "IELTS Academic learners practicing for the exam",
      fulfillmentNote: "A product we own — roadmap lives in OS, not Desk.",
      links: [{ label: "Live site", url: "https://ieltsready.org/" }],
      createdAt: "2025-06-01T00:00:00.000Z",
      updatedAt: now,
    },
    {
      id: "proj-youtube",
      objectiveId: "obj-content-q3",
      title: "YouTube channel — setup",
      kind: "internal",
      ownerId: "member-raj",
      collaboratorIds: ["member-gourob"],
      status: "backlog",
      priority: "p3",
      deadline: null,
      summary: "Public YouTube channel for builders — not initiated yet.",
      backlogReason: "Not initiated — wait until client + SaaS capacity allows.",
      whoItHelps: "Builders and small teams who learn from honest tutorials",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "proj-ieee-poisoning",
      objectiveId: "obj-research-q3",
      title: "Code Poisoning (IEEE)",
      kind: "internal",
      ownerId: "member-gourob",
      collaboratorIds: ["member-raj"],
      status: "done",
      priority: "p1",
      deadline: null,
      summary:
        "Code Poisoning Through Misleading Comments: Jailbreaking Large Language Models via Contextual Deception",
      whoItHelps: "Researchers and practitioners studying LLM safety",
      fulfillmentNote: "Published — knowledge others can cite.",
      links: [
        {
          label: "IEEE Xplore",
          url: "https://ieeexplore.ieee.org/document/11491067",
        },
      ],
      completedAt: "2026-01-15T00:00:00.000Z",
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2026-01-15T00:00:00.000Z",
    },
    {
      id: "proj-agentic-survey",
      objectiveId: "obj-research-q3",
      title: "Agentic AI survey (journal)",
      kind: "internal",
      ownerId: "member-gourob",
      collaboratorIds: ["member-raj"],
      status: "active",
      priority: "p1",
      deadline: null,
      summary:
        "Agentic AI with Large Language Models: A Survey of Architectures, Evolutionary Dynamics, Governance, and Bounded Self-Improvement",
      notes: "Journal paper in progress — track draft / venue / next milestone here.",
      whoItHelps: "Researchers mapping agentic LLM systems and governance",
      fulfillmentNote: "Second paper in flight toward submission.",
      createdAt: "2026-03-01T00:00:00.000Z",
      updatedAt: now,
    },
  ],

  wins: [
    {
      id: "win-ieee",
      projectId: "proj-ieee-poisoning",
      title: "IEEE paper published",
      note: "Code Poisoning Through Misleading Comments — jailbreaking LLMs via contextual deception",
      createdById: "member-gourob",
      createdAt: "2026-01-15T00:00:00.000Z",
    },
    {
      id: "win-ielts-live",
      projectId: "proj-ielts",
      title: "IELTS Ready live",
      note: "Product on the web at ieltsready.org",
      createdById: "member-gourob",
      createdAt: "2025-09-01T00:00:00.000Z",
    },
  ],

  focusProjectIds: ["proj-hicu", "proj-ielts", "proj-agentic-survey"],

  checkIns: [],
  capacityOverrides: [],
  quarterlyReview: {
    year: 2026,
    quarter: 3,
    learnings: "",
    completedSteps: [],
    updatedAt: now,
  },
};
