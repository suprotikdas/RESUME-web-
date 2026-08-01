import { ResumeData } from '../types';

export const sampleFullStackResume: ResumeData = {
  id: 'sample-fullstack-dev',
  title: 'Senior Full-Stack Engineer Resume',
  lastUpdated: new Date().toISOString(),
  templateId: 'modern-tech',
  personalInfo: {
    fullName: 'Alex Morgan',
    email: 'alex.morgan@devcraft.io',
    phone: '+1 (555) 382-9102',
    location: 'San Francisco, CA (Open to Remote)',
    linkedin: 'linkedin.com/in/alexmorgan-dev',
    github: 'github.com/alexmorgan-code',
    portfolio: 'alexmorgan.dev',
    targetRole: 'Senior Full-Stack Software Engineer',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  },
  summary: 'Results-driven Senior Full-Stack Engineer with 6+ years of experience architecting high-throughput distributed systems, microservices, and modern React applications. Proven track record of scaling user bases by 300% while reducing backend latency by 45% through Redis caching and query optimizations.',
  education: [
    {
      id: 'edu-1',
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science & Engineering',
      startDate: '2016',
      endDate: '2020',
      gpa: '3.88 / 4.0',
      achievements: 'Dean\'s Honor List (6 terms), ACM Programming Competition 2nd Place, Published Research Paper on Distributed Consensus.'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'Apex Cloud Solutions',
      position: 'Senior Full-Stack Engineer',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: 'Present',
      current: true,
      description: '• Spearheaded architectural migration from monolithic backend to Node.js/TypeScript microservices on Kubernetes, reducing cloud infrastructure cost by 32% ($140K/yr).\n• Developed real-time collaborative dashboard using Next.js 14, WebSockets, and TailwindCSS, boosting daily active user engagement by 64%.\n• Integrated Google Gemini AI models into the core analytics pipeline, automating report generation for 25,000+ enterprise users.'
    },
    {
      id: 'exp-2',
      company: 'Vanguard Tech Labs',
      position: 'Full-Stack Software Engineer',
      location: 'Oakland, CA',
      startDate: '2020-06',
      endDate: '2022-02',
      current: false,
      description: '• Architected resilient RESTful & GraphQL API gateway handling 15M+ requests daily with 99.99% uptime.\n• Optimized PostgreSQL queries and implemented Redis multi-layer caching, cutting p99 response time from 420ms to 85ms.\n• Led a cross-functional team of 5 engineers to deliver automated CI/CD pipeline using GitHub Actions and Docker.'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'DevPulse - Distributed Code Health & Analytics Platform',
      description: 'Built an open-source Developer Performance Monitor that analyzes GitHub commit velocity, PR review times, and test coverage using TypeScript, FastAPI, and PostgreSQL.',
      techStack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker', 'TailwindCSS'],
      githubUrl: 'github.com/alexmorgan-code/devpulse',
      liveUrl: 'devpulse-analytics.io'
    },
    {
      id: 'proj-2',
      title: 'HyperStream AI - Real-time Audio & Vision Transcriber',
      description: 'Created a multi-modal web app leveraging Google Gemini Live API and WebSockets to transcribe audio and synthesize live video keyframes in under 200ms.',
      techStack: ['Next.js', 'Google Gemini API', 'WebSockets', 'TailwindCSS', 'Node.js'],
      githubUrl: 'github.com/alexmorgan-code/hyperstream',
      liveUrl: 'hyperstream-ai.app'
    }
  ],
  skillCategories: [
    {
      id: 'cat-1',
      categoryName: 'Programming Languages',
      skills: ['TypeScript', 'JavaScript (ES6+)', 'Python', 'Go', 'SQL', 'HTML5/CSS3']
    },
    {
      id: 'cat-2',
      categoryName: 'Frameworks & Libraries',
      skills: ['React 19', 'Next.js', 'Node.js', 'Express', 'FastAPI', 'TailwindCSS', 'GraphQL', 'Redux Toolkit']
    },
    {
      id: 'cat-3',
      categoryName: 'Developer Tools & Cloud',
      skills: ['Docker', 'Kubernetes', 'AWS (S3, EC2, Lambda)', 'PostgreSQL', 'Redis', 'Git / GitHub Actions', 'Vite']
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      issueDate: '2023-05',
      credentialUrl: 'aws.amazon.com/verify/129381'
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Application Developer (CKAD)',
      issuer: 'Linux Foundation',
      issueDate: '2022-11',
      credentialUrl: 'cncf.io/verify/ckad-9981'
    }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Global Hackathon Winner - AI & Automation',
      description: 'Awarded 1st place out of 450+ developer teams for creating an automated AI accessibility audit tool.',
      date: '2023-09'
    }
  ],
  leadership: [
    {
      id: 'lead-1',
      organization: 'Bay Area Open Source Guild',
      role: 'Tech Lead & Workshop Instructor',
      duration: '2021 - Present',
      description: 'Mentored 120+ junior developers in full-stack web development and modern cloud architecture.'
    }
  ],
  volunteer: [
    {
      id: 'vol-1',
      organization: 'Code for America',
      role: 'Volunteer Software Engineer',
      description: 'Contributed 150+ hours writing open-source civic tools for public transportation accessibility.'
    }
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' },
    { id: 'lang-2', language: 'Spanish', proficiency: 'Professional' }
  ]
};

export const sampleProductManagerResume: ResumeData = {
  id: 'sample-pm-resume',
  title: 'Lead Product Manager Resume',
  lastUpdated: new Date().toISOString(),
  templateId: 'corporate-executive',
  personalInfo: {
    fullName: 'Sarah Chen',
    email: 'sarah.chen@productlead.io',
    phone: '+1 (555) 781-4421',
    location: 'New York, NY (Hybrid)',
    linkedin: 'linkedin.com/in/sarahchen-pm',
    github: '',
    portfolio: 'sarahchenproduct.com',
    targetRole: 'Lead Product Manager / Director of Product',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
  },
  summary: 'Data-informed Lead Product Manager with 7+ years of experience scaling B2B SaaS products from 0-to-1 and $10M+ ARR. Adept at cross-functional squad leadership, roadmap strategy, funnel conversion optimization, and AI feature integration.',
  education: [
    {
      id: 'edu-pm-1',
      school: 'New York University, Stern School of Business',
      degree: 'Master of Business Administration (MBA)',
      fieldOfStudy: 'Product Strategy & Technology',
      startDate: '2017',
      endDate: '2019',
      gpa: '3.91',
      achievements: 'President of Tech & Product Society, Venture Capital Competition Finalist.'
    }
  ],
  experience: [
    {
      id: 'exp-pm-1',
      company: 'OmniFlow SaaS',
      position: 'Lead Product Manager',
      location: 'New York, NY',
      startDate: '2021-08',
      endDate: 'Present',
      current: true,
      description: '• Drove core product roadmap for Enterprise Automation suite, increasing ARR from $4.2M to $12.8M in 24 months.\n• Redesigned customer onboarding funnel using A/B testing frameworks, lifting 30-day user retention by 28%.\n• Managed 3 engineering squads (18 engineers, 3 designers) across 3 sprint cycles.'
    }
  ],
  projects: [
    {
      id: 'proj-pm-1',
      title: 'AI Workflow Assistant Launch',
      description: 'Conceptualized and launched an automated prompt workflow assistant that generated $1.8M in net new ARR within 6 months of rollout.',
      techStack: ['Product Strategy', 'Mixpanel', 'Figma', 'A/B Testing', 'Agile/Scrum']
    }
  ],
  skillCategories: [
    {
      id: 'cat-pm-1',
      categoryName: 'Product Strategy & Analytics',
      skills: ['Product Roadmap', 'User Research', 'GTM Strategy', 'Amplitude', 'Mixpanel', 'Google Analytics 4', 'SQL Queries']
    },
    {
      id: 'cat-pm-2',
      categoryName: 'Methodologies & Tools',
      skills: ['Agile / Scrum', 'Jira & Confluence', 'Figma Wireframing', 'PRD Writing', 'A/B Testing', 'OKRs']
    }
  ],
  certifications: [
    {
      id: 'cert-pm-1',
      name: 'Certified Scrum Product Owner (CSPO)',
      issuer: 'Scrum Alliance',
      issueDate: '2021-03'
    }
  ],
  achievements: [
    {
      id: 'ach-pm-1',
      title: 'Top Product Innovator Award',
      description: 'Recognized as Top 10 Product Leaders in NYC SaaS Ecosystem by TechCrunch Alley.',
      date: '2023-11'
    }
  ],
  leadership: [],
  volunteer: [],
  languages: [
    { id: 'lang-pm-1', language: 'English', proficiency: 'Native' },
    { id: 'lang-pm-2', language: 'Mandarin', proficiency: 'Fluent' }
  ]
};

export const emptyResumeData: ResumeData = {
  id: 'new-draft',
  title: 'Untitled Resume Draft',
  lastUpdated: new Date().toISOString(),
  templateId: 'modern-tech',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    targetRole: ''
  },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skillCategories: [
    { id: 'sc-1', categoryName: 'Programming Languages', skills: [] },
    { id: 'sc-2', categoryName: 'Frameworks & Libraries', skills: [] },
    { id: 'sc-3', categoryName: 'Developer Tools', skills: [] }
  ],
  certifications: [],
  achievements: [],
  leadership: [],
  volunteer: [],
  languages: []
};
