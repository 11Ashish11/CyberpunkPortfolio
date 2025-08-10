import { ContactInfo, Experience, Project, Skill, BlogPost } from '../types';

// Theme Constants
export const COLORS = {
  primary: '#00ff41',
  secondary: '#ff0080',
  accent: '#00d4ff',
  background: '#0a0a0a',
  backgroundDark: '#050505',
  text: '#ffffff',
  textMuted: '#b0b0b0',
  border: '#333333',
  glow: '#00ff41',
  error: '#ff073a',
  warning: '#ffaa00',
  success: '#00ff41',
} as const;

// Animation Constants
export const ANIMATIONS = {
  duration: {
    fast: 0.2,
    medium: 0.4,
    slow: 0.6,
    glacial: 1.0,
  },
  easing: {
    easeOut: [0.4, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
    easeInOut: [0.4, 0, 0.2, 1],
  },
} as const;

// Navigation Constants
export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'HOME', href: '#home' },
  { id: 'experience', label: 'EXPERIENCE', href: '#experience' },
  { id: 'projects', label: 'PROJECTS', href: '#projects' },
  { id: 'skills', label: 'SKILLS', href: '#skills' },
  { id: 'blog', label: 'BLOG', href: '#blog' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
] as const;

// Personal Information
export const PERSONAL_INFO = {
  name: 'Ashish Bhoya',
  title: 'Software Developer',
  description: 'Crafting digital experiences in the neon-lit realm of code. Specializing in full-stack development with a passion for innovation.',
  tagline: 'Building the future, one line of code at a time.',
} as const;

// Contact Information
export const CONTACT_INFO: ContactInfo = {
  email: 'ashish@example.com',
  github: 'https://github.com/11Ashish11',
  linkedin: 'https://linkedin.com/in/ashishbhoya',
  twitter: 'https://x.com/56Bhoya',
};

// Mock Experience Data
export const EXPERIENCE_DATA: Experience[] = [
  {
    id: 'exp-1',
    title: 'Software Developer',
    company: 'Zluri',
    duration: '2024 October - Present',
    startDate: new Date('2024-10-07'),
    description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies. Architected microservices handling 1M+ requests daily.',
    technologies: ['React', 'Node.js', 'AWS', 'Docker', 'TypeScript'],
  },
  {
    id: 'exp-2',
    title: 'Software Developer Engineer',
    company: 'Whatfix',
    duration: '2022 - 2024',
    startDate: new Date('2022-04-21'),
    endDate: new Date('2024-10-06'),
    description: 'Built responsive web applications from ground up. Collaborated with cross-functional teams to deliver high-quality products within tight deadlines.',
    technologies: ['Vue.js', 'Python', 'PostgreSQL', 'Redis', 'Kubernetes'],
  },
  {
    id: 'exp-3',
    title: 'Software Developer Intern',
    company: 'Whatfix',
    duration: '2021 - 2022',
    startDate: new Date('2021-04-21'),
    endDate: new Date('2022-04-21'),
    description: 'Developed and maintained client websites. Gained expertise in modern frontend frameworks and backend technologies.',
    technologies: ['JavaScript', 'PHP', 'MySQL', 'WordPress', 'jQuery'],
  },
];

// Mock Projects Data
export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-1',
    title: 'Sorting Algorithm Visualizer',
    description: 'Interactive web application to visualize sorting algorithms in action. Supports multiple algorithms with real-time performance metrics.',
    technologies: ['React', 'JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/11Ashish11/sorting-visualizer',
    liveUrl: 'https://sortedashish.netlify.app/',
    stars: 127,
    forks: 23,
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Airline Management System',
    description: 'Comprehensive system for managing airline operations including flight scheduling, ticket booking, and passenger management.',
    technologies: ['Javascript', 'Node.js', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/11Ashish11/AirlineManagmentSystem',
    stars: 89,
    forks: 15,
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Real-time Chat App',
    description: 'Scalable chat application with end-to-end encryption, file sharing, and real-time notifications.',
    technologies: ['Socket.io', 'React', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/11Ashish11/UpgradedChatApp',
    liveUrl: 'https://upgradedchatapp.onrender.com/',
    stars: 203,
    forks: 41,
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'Chrome Tab Number Counter Extension',
    description: 'Chrome extension that counts the number of open tabs and displays a badge with the count. Useful for managing browser tabs efficiently.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/11Ashish11/ChromeTabExtension',
    liveUrl: 'https://chromewebstore.google.com/detail/chrome-tabs-numbers/enongpimpbipgpoigjoolmehalnmbemb',
    stars: 342,
    forks: 67,
    featured: false,
  },
];

// Mock Skills Data
export const SKILLS_DATA: Skill[] = [
  // Frontend
  { id: 'react', name: 'React', level: 90, category: 'frontend', icon: 'fab fa-react' },
  { id: 'javascript', name: 'JavaScript', level: 95, category: 'frontend', icon: 'fab fa-js-square' },
  { id: 'typescript', name: 'TypeScript', level: 88, category: 'frontend', icon: 'fas fa-code' },
  { id: 'css', name: 'CSS3', level: 90, category: 'frontend', icon: 'fab fa-css3-alt' },
  
  // Backend
  { id: 'java', name: 'Java', level: 85, category: 'backend', icon: 'fab fa-java' },
  { id: 'spring', name: 'Spring Boot', level: 80, category: 'backend', icon: 'fas fa-cogs' },
  { id: 'nodejs', name: 'Node.js', level: 88, category: 'backend', icon: 'fab fa-node-js' },
  { id: 'python', name: 'Python', level: 85, category: 'backend', icon: 'fab fa-python' },
  { id: 'mongodb', name: 'MongoDB', level: 80, category: 'backend', icon: 'fas fa-database' },
  { id: 'postgresql', name: 'PostgreSQL', level: 82, category: 'backend', icon: 'fas fa-server' },
  
  // DevOps
  { id: 'aws', name: 'AWS', level: 78, category: 'devops', icon: 'fab fa-aws' },
  { id: 'azure', name: 'Azure', level: 75, category: 'devops', icon: 'fab fa-microsoft' },
  { id: 'docker', name: 'Docker', level: 85, category: 'devops', icon: 'fab fa-docker' },
  { id: 'git', name: 'Git', level: 92, category: 'devops', icon: 'fab fa-git-alt' },
  { id: 'linux', name: 'Linux', level: 80, category: 'devops', icon: 'fab fa-linux' },
];

// Mock Blog Data
export const BLOG_DATA: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Building Neural Networks from Scratch',
    excerpt: 'Deep dive into implementing neural networks without frameworks. Understanding backpropagation, gradient descent, and optimization techniques...',
    publishDate: new Date('2024-08-05'),
    category: 'AI/ML',
    tags: ['Python', 'Machine Learning', 'Mathematics'],
    readTime: 12,
    slug: 'building-neural-networks-from-scratch',
  },
  {
    id: 'blog-2',
    title: 'Advanced React Performance Optimization',
    excerpt: 'Techniques for optimizing React applications at scale. From memoization to code splitting and beyond...',
    publishDate: new Date('2024-07-22'),
    category: 'Web Dev',
    tags: ['React', 'Performance', 'JavaScript'],
    readTime: 8,
    slug: 'advanced-react-performance-optimization',
  },
  {
    id: 'blog-3',
    title: 'Container Orchestration with Kubernetes',
    excerpt: 'Complete guide to deploying and managing containerized applications using Kubernetes in production environments...',
    publishDate: new Date('2024-06-18'),
    category: 'DevOps',
    tags: ['Kubernetes', 'Docker', 'Cloud'],
    readTime: 15,
    slug: 'container-orchestration-kubernetes',
  },
];

// Breakpoints for responsive design
export const BREAKPOINTS = {
  xs: '480px',
  sm: '768px',
  md: '1024px',
  lg: '1200px',
  xl: '1440px',
} as const;

// Terminal Commands
export const TERMINAL_COMMANDS = [
  'whoami',
  'cat about.txt',
  'ls skills/',
  'git log --oneline',
  'npm run dev',
] as const;