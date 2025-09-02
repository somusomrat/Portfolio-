
import type React from 'react';

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  sourceUrl?: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools & DevOps' | 'Languages';
}

export interface Experience {
  company: string;
  title: string;
  duration: string;
  description:string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  contact: {
    email: string;
    socials: SocialLink[];
  };
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  editPassword?: string;
}