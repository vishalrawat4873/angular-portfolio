import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal';


interface SkillGroup {
  category: string;
  skills: string[];
}

interface WhatIDo {
  icon: string;
  title: string;
  description: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
  isCurrent: boolean;
}

interface Education {
  degree: string;
  institute: string;
  period: string;
  location: string;
}

interface Certificate {
  title: string;
  issuer: string;
  date: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink,ScrollRevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

  whatIDo: WhatIDo[] = [
    {
      icon: 'ti-code',
      title: 'Full Stack Development',
      description: 'Building scalable web apps with Angular, ASP.NET Core, and SQL Server — from database to UI.'
    },
    {
      icon: 'ti-shield-lock',
      title: 'Secure APIs',
      description: 'REST APIs with JWT authentication, role-based authorization, and clean architecture.'
    },
    {
      icon: 'ti-brand-youtube',
      title: 'Content Creation',
      description: 'Running a YouTube channel with 2.8K+ subscribers — sharing tech and personal journey.'
    },
    {
      icon: 'ti-robot',
      title: 'AI-Assisted Dev',
      description: 'Experienced with Cursor AI, GitHub Copilot, and ChatGPT for smarter, faster development.'
    }
  ];

  skillGroups: SkillGroup[] = [
    {
      category: 'Languages',
      skills: ['C#', 'TypeScript', 'JavaScript', 'Python']
    },
    {
      category: 'Frontend',
      skills: ['Angular', 'HTML5', 'CSS3 / SCSS', 'Bootstrap']
    },
    {
      category: 'Backend',
      skills: ['ASP.NET Core', 'REST APIs', 'JWT Auth', 'Clean Architecture']
    },
    {
      category: 'Database',
      skills: ['SQL Server', 'SSMS', 'Database Design']
    },
    {
      category: 'Tools',
      skills: ['Git', 'GitHub', 'Postman', 'Visual Studio', 'VS Code', 'Cursor AI', 'GitHub Copilot']
    },
    {
      category: 'Soft Skills',
      skills: ['Teamwork', 'Leadership', 'Problem Solving', 'Communication', 'Time Management']
    }
  ];

  experiences: Experience[] = [
    {
      role: 'Full Stack Developer',
      company: 'Evince Development',
      period: 'Dec 2025 – Present',
      location: 'On Site · Ahmedabad',
      isCurrent: true,
      points: [
        'Working on a live production web application using ASP.NET Core and Angular.',
        'Delivering scalable full-stack features with secure authentication and smooth frontend–backend integration.',
        'Utilized SQL Server for database operations and Git for version control in a collaborative environment.'
      ]
    },
    {
      role: 'Full Stack Intern',
      company: 'Evince Development',
      period: 'Aug 2024 – Nov 2024',
      location: 'On Site · Ahmedabad',
      isCurrent: false,
      points: [
        'Developed RESTful Web APIs using ASP.NET Core with JWT-based authentication and role-based authorization.',
        'Built responsive Angular/TypeScript UIs and followed clean architecture principles.',
        'Performed code reviews and ensured high-quality maintainable code.'
      ]
    }
  ];

  education: Education[] = [
    {
      degree: 'B.Tech in Computer Science Engineering',
      institute: 'Shivalik College of Engineering',
      period: 'July 2022 – July 2026',
      location: 'Dehradun, Uttarakhand'
    },
    {
      degree: 'Class 12th',
      institute: 'Boksa Janjati Krishak Inter College, Sheesham Bara',
      period: '2020',
      location: 'Dehradun, Uttarakhand'
    },
    {
      degree: 'Class 10th ',
      institute: 'Government Inter College Kotachami',
      period: '2018',
      location: 'Almora, Uttarakhand'
    }
  ];

  certificates: Certificate[] = [
    { title: 'C# Programming, .NET, OOP, LINQ', issuer: 'Udemy', date: 'Aug 2025' },
    { title: 'ASP.NET Core 10',                 issuer: 'Udemy', date: 'Nov 2025' },
    { title: 'NCC Certificate (A Grade)',         issuer: 'NCC',   date: '2022'     }
  ];
}