import React from 'react';
import type { PortfolioData } from './types';
import { GitHubIcon, LinkedInIcon, TwitterIcon, ExternalLinkIcon, CodeIcon } from './components/Icons';

export const portfolioData: PortfolioData = {
  name: "Jane Doe",
  title: "Senior Frontend React Engineer",
  bio: "I'm a passionate frontend developer with a knack for creating beautiful, functional, and user-centric web applications. With over 8 years of experience, I specialize in the React ecosystem, TypeScript, and modern web technologies. I love solving complex problems and turning ideas into reality.",
  // FIX: Added missing 'avatarUrl' property required by the PortfolioData type.
  avatarUrl: "https://picsum.photos/seed/avatar/200",
  contact: {
    email: "jane.doe@example.com",
    socials: [
      {
        name: "GitHub",
        url: "https://github.com",
        // FIX: The 'icon' property must be a string literal (e.g., "GitHub") to match the SocialLink type and serve as a key for the SocialIcon component.
        icon: "GitHub",
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com",
        // FIX: The 'icon' property must be a string literal (e.g., "LinkedIn") to match the SocialLink type and serve as a key for the SocialIcon component.
        icon: "LinkedIn",
      },
      {
        name: "Twitter",
        url: "https://twitter.com",
        // FIX: The 'icon' property must be a string literal (e.g., "Twitter") to match the SocialLink type and serve as a key for the SocialIcon component.
        icon: "Twitter",
      },
    ],
  },
  projects: [
    {
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce website with a modern UI, product filtering, shopping cart, and a secure checkout process.",
      tags: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Stripe"],
      imageUrl: "https://picsum.photos/seed/project1/400/300",
      liveUrl: "#",
      sourceUrl: "#",
    },
    {
      title: "Data Visualization Dashboard",
      description: "An interactive dashboard for visualizing complex datasets, featuring various chart types and real-time data updates.",
      tags: ["React", "D3.js", "TypeScript", "GraphQL", "Node.js"],
      imageUrl: "https://picsum.photos/seed/project2/400/300",
      liveUrl: "#",
      sourceUrl: "#",
    },
    {
      title: "Project Management Tool",
      description: "A collaborative project management application with features like task boards, team chat, and file sharing.",
      tags: ["React", "Firebase", "Redux", "Material-UI"],
      imageUrl: "https://picsum.photos/seed/project3/400/300",
      liveUrl: "#",
    },
    {
      title: "Personal Blog",
      description: "A content-focused blog platform built with a static site generator for optimal performance and SEO.",
      tags: ["Gatsby", "React", "GraphQL", "Styled Components"],
      imageUrl: "https://picsum.photos/seed/project4/400/300",
      sourceUrl: "#",
    },
  ],
  skills: [
    { name: "HTML5 & CSS3", category: "Frontend" },
    { name: "JavaScript (ES6+)", category: "Languages" },
    { name: "TypeScript", category: "Languages" },
    { name: "React & React Native", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "Redux", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express.js", category: "Backend" },
    { name: "GraphQL", category: "Backend" },
    { name: "REST APIs", category: "Backend" },
    { name: "Git & GitHub", category: "Tools & DevOps" },
    { name: "Docker", category: "Tools & DevOps" },
    { name: "CI/CD", category: "Tools & DevOps" },
    { name: "Jest & RTL", category: "Tools & DevOps" },
  ],
  experience: [
    {
      company: "Tech Solutions Inc.",
      title: "Senior Frontend Engineer",
      duration: "Jan 2020 - Present",
      description: [
        "Led the development of a new client-facing dashboard using React, TypeScript, and GraphQL, improving user engagement by 25%.",
        "Mentored junior developers, conducted code reviews, and established best practices for the frontend team.",
        "Collaborated with UX/UI designers to translate wireframes and mockups into high-quality, responsive user interfaces.",
        "Improved application performance by 40% through code splitting, lazy loading, and optimization techniques.",
      ],
    },
    {
      company: "Innovate Co.",
      title: "Frontend Developer",
      duration: "Jun 2017 - Dec 2019",
      description: [
        "Developed and maintained web applications using React and Redux.",
        "Worked in an Agile team to deliver features on a bi-weekly sprint cycle.",
        "Wrote unit and integration tests using Jest and React Testing Library to ensure code quality.",
      ],
    },
    {
      company: "Web Crafters",
      title: "Junior Web Developer",
      duration: "May 2015 - May 2017",
      description: [
        "Built responsive websites for clients using HTML, CSS, and JavaScript (jQuery).",
        "Assisted senior developers in building and debugging web applications.",
        "Gained foundational knowledge of web development principles and version control with Git.",
      ],
    },
  ],
};