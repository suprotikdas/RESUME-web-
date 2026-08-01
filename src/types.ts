export type TemplateId = 'modern-tech' | 'corporate-executive' | 'minimalist-clean' | 'creative-vibrant' | 'silicon-valley-ats';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  photoUrl?: string;
  targetRole: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface Leadership {
  id: string;
  organization: string;
  role: string;
  duration: string;
  description: string;
}

export interface Volunteer {
  id: string;
  organization: string;
  role: string;
  description: string;
}

export interface Language {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
}

export interface ResumeData {
  id: string;
  title: string;
  lastUpdated: string;
  templateId: TemplateId;
  personalInfo: PersonalInfo;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skillCategories: SkillCategory[];
  certifications: Certification[];
  achievements: Achievement[];
  leadership: Leadership[];
  volunteer: Volunteer[];
  languages: Language[];
}

export interface ATSBreakdown {
  formatting: number;
  keywords: number;
  projects: number;
  experience: number;
  skills: number;
  achievements: number;
  grammar: number;
  education: number;
  missingSections: number;
}

export interface ATSAnalysisResult {
  overallScore: number;
  breakdown: ATSBreakdown;
  strengthPoints: string[];
  missingKeywords: string[];
  weakVerbsDetected: string[];
  passiveVoiceFlags: string[];
  recommendations: string[];
}

export interface JDMatchResult {
  matchPercentage: number;
  jobTitleExtracted: string;
  companyExtracted: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestedAdditions: {
    section: string;
    suggestion: string;
  }[];
}

export interface STARGuide {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface InterviewPrepItem {
  question: string;
  type: 'Behavioral' | 'Technical' | 'Leadership' | 'Project-Deep-Dive';
  context: string;
  starGuide: STARGuide;
  keyTips: string[];
}

export interface ResumeVersion {
  id: string;
  timestamp: string;
  name: string;
  data: ResumeData;
}
