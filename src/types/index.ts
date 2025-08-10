// Global TypeScript definitions

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
  startDate: Date;
  endDate?: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  forks?: number;
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: SkillCategory;
  icon: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'devops' | 'tools' | 'languages';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishDate: Date;
  category: string;
  tags: string[];
  readTime: number;
  slug: string;
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  backgroundDark: string;
  text: string;
  textMuted: string;
  border: string;
  glow: string;
  error: string;
  warning: string;
  success: string;
}

export interface AnimationProps {
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  loading: boolean;
}