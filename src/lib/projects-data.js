const projects = [
  {
    slug: "codelab",
    title: "CodeLab",
    description:
      "Real-time collaborative coding platform featuring shared code editors, live cursors, rich text docs, whiteboard collaboration, and presence awareness. Built with Yjs-powered CRDT syncing, Socket.IO, Monaco Editor, and a scalable Dockerized architecture.",
    link: "https://codellab.vercel.app/",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Socket.IO",
      "Yjs",
      "Prisma",
      "Docker",
      "PostgreSQL",
      "NextAuth",
    ],
  },
  {
    slug: "earning-area",
    title: "Earning Area",
    description:
      "A reward distribution platform that enables users to seamlessly distribute monetary rewards to a large community. Integrates Paytm & OpenMoney APIs with interactive formats like Lifafa and scratch cards.",
    link: "https://earningarea.org/",
    techStack: ["PHP", "MySQL", "Node.js", "MongoDB", "Redis", "Socket.IO", "Paytm API"],
  },
  {
    slug: "dream10",
    title: "Dream10",
    description:
      "Real-time competitive quiz app with live contests, fair question broadcasting via Socket.IO, leaderboards, and prize distribution.",
    link: "https://dream10.in/",
    techStack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "Socket.IO",
      "BullMQ",
      "Razorpay",
      "Prometheus",
    ],
  },
  {
    slug: "lead-tracking-system",
    title: "Lead Tracking System",
    description:
      "Invite-only affiliate marketing platform with fraud detection, real-time dashboards, and automated payout engine.",
    link: "https://panel3.logicpay.in/",
    techStack: [
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Socket.IO",
      "Grafana",
      "Prometheus",
      "Docker",
    ],
  },
  {
    slug: "tod-ai",
    title: "TOD-AI",
    description:
      "Interactive toddler learning app teaching the alphabet through animations, audio pronunciation, and engaging visuals.",
    link: "https://tod-ai-teal.vercel.app/",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Three.js", "MongoDB", "Redis"],
  },
  {
    slug: "data-vault",
    title: "Data Vault",
    description:
      "Secure file-sharing platform using Telegram Bot API as backend storage for efficient, low-cost file management.",
    link: "https://datavault-two.vercel.app/",
    techStack: ["Next.js", "React", "Tailwind CSS", "Node.js", "MongoDB", "Telegram API", "JWT"],
  },
  {
    slug: "tickethub",
    title: "TicketHub",
    description:
      "Modern event ticket booking and management platform with secure authentication, event creation, ticket issuance, and attendee management.",
    link: "https://tickethub.vercel.app/",
    techStack: ["Next.js", "React", "Tailwind CSS", "MongoDB", "Node.js", "Radix UI", "JWT"],
  },
  {
    slug: "cashbackwallah",
    title: "Cashbackwallah",
    description:
      "Logistics and shipping management platform for Indian e-commerce businesses. Compare rates across 25+ carrier partners, book shipments, track in real-time, and manage wallet payments. Features a franchise referral network with commission-based earnings and a comprehensive admin dashboard.",
    link: "https://cashbackwallah.com/",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Express",
      "Razorpay",
      "Redis",
      "BullMQ",
      "Socket.IO",
      "Docker",
      "Zustand",
      "TanStack Query",
      "Shadcn UI",
      "Sentry",
    ],
  },
  {
    slug: "kanspark",
    title: "KanSpark",
    description:
      "Real-time collaborative Kanban project management application. Organize work visually with drag-and-drop boards, lists, and cards. Features team collaboration with role-based permissions, real-time updates via Socket.IO, and dual Kanban and list view modes.",
    link: "https://kanspark-ruddy.vercel.app/",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Mantine UI",
      "Express",
      "MongoDB",
      "Mongoose",
      "Socket.IO",
      "JWT",
      "Docker",
      "TanStack Query",
      "dnd-kit",
    ],
  },
  {
    slug: "neet-counselors",
    title: "NEETCounselors",
    description:
      "India's trusted NEET counselling guidance platform. AI-powered college predictor for rank-based medical college recommendations, structured counselling plans (Essential, Premium, Elite Concierge) with 1-on-1 video consultations, comprehensive blog on NEET procedures, state-wise cutoff analysis, live counselor booking, and 12x7 support.",
    link: "https://neetcounselors.com/",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Payload CMS",
      "MongoDB",
      "Razorpay",
      "Radix UI",
      "Docker",
      "Cloudflare Turnstile",
      "Lexical Editor",
    ],
  },
];

export function getAllProjects() {
  return projects;
}

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.slug);
}
