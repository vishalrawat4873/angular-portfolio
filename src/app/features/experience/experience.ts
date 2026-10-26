import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal';
import { COMPANY_DATA } from '../../core/data/portfolio.data';

interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  isCurrent: boolean;
  points: string[];
}

interface Education {
  degree: string;
  institute: string;
  period: string;
  status: string;
  isCurrent: boolean;
}

interface NccPhoto {
  src: string;
  alt: string;
  title: string;
  badge: string;
}

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  icon: string;
}

interface CollegeMemory {
  src: string;
  caption: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './experience.html',
  styleUrls: ['./experience.scss']
})
export class Experience {
  private platformId = inject(PLATFORM_ID);
  readonly companyData = COMPANY_DATA;

  experiences: Experience[] = [
    {
      role: 'Full Stack Developer',
      company: COMPANY_DATA.name,
      companyUrl: COMPANY_DATA.url,
      period: 'Dec 2025 – Present',
      location: 'Ahmedabad, Gujarat',
      isCurrent: true,
      points: [
        'Developing and maintaining production-grade web apps using Classic ASP, ASP.NET Core, and Angular',
        'Built a Church Management System for a US client — Azure Blob media uploads, drag-and-drop ordering, PDF generation',
        'Implemented RESTful APIs with role-based JWT authentication in ASP.NET Core',
        'Collaborated with team using Git branching, code reviews, and agile sprints',
      ],
    },
    {
      role: 'Full Stack Intern',
      company: COMPANY_DATA.name,
      period: 'Aug 2024 – Nov 2024',
      location: 'Ahmedabad, Gujarat',
      isCurrent: false,
      points: [
        'Built a School Management System with Angular frontend and ASP.NET Core REST APIs',
        'Developed full Admin Panel with user/role management and JWT auth flow',
        'Wrote optimised SQL Server queries, stored procedures, and EF Core migrations',
        'Gained hands-on experience with clean architecture and team development workflow',
      ],
    },
  ];

  education: Education[] = [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institute: 'Shivalik College of Engineering, Dehradun',
      period: '2022 – 2026',
      status: 'Graduated',
      isCurrent: false,
    },
    {
      degree: 'Class 12th',
      institute: 'Boksa Janjati Krishak Inter College Sheeshambara, Dehradun (Uttrakhand)',
      period: '2020',
      status: 'Completed',
      isCurrent: false,
    },
    {
      degree: 'Class 10th',
      institute: 'Government Inter College Kotachami, Almora (Uttrakhand)',
      period: '2018',
      status: 'Completed',
      isCurrent: false,
    },
  ];

  nccQualities = [
    { icon: 'ti-shield-check', label: 'Discipline' },
    { icon: 'ti-crown',        label: 'Leadership' },
    { icon: 'ti-clock',        label: 'Time Management' },
    { icon: 'ti-users',        label: 'Team Command' },
    { icon: 'ti-run',          label: 'Physical Fitness' },
    { icon: 'ti-brain',        label: 'Decision Making Under Pressure' },
  ];

  activeNccIndex = signal(0);

  nccPhotos: NccPhoto[] = [
    {
      src: 'images/ncc-2.jpg',
      alt: 'NCC Parade Drill & Rifle Inspection — Under Officer Vishal Rawat',
      title: 'Parade Drill & Inspection',
      badge: 'Parade Commander',
    },
    {
      src: 'images/ncc-1.jpg',
      alt: 'NCC Ceremonial Winter Uniform — Under Officer Vishal Rawat',
      title: 'Ceremonial Uniform',
      badge: 'Under Officer',
    },
    {
      src: 'images/ncc-3.jpg',
      alt: 'NCC Cadet Squad & Troop Command — Vishal Rawat with squad',
      title: 'Cadet Squad Battalion',
      badge: 'Squad Command',
    },
  ];

  selectNccPhoto(index: number): void {
    this.activeNccIndex.set(index);
  }

  certificates: Certificate[] = [
    { title: 'C# Programming, .NET, OOP & LINQ', issuer: 'Udemy', date: 'Aug 2025', icon: 'ti-certificate' },
    { title: 'ASP.NET Core 10 (Complete Guide)', issuer: 'Udemy', date: 'Nov 2025', icon: 'ti-certificate' },
    { title: 'NCC A Grade Certificate', issuer: 'National Cadet Corps', date: '2022', icon: 'ti-award' },
  ];

  collegeMemories: CollegeMemory[] = [
    { src: 'images/campus-life.jpg', caption: 'Campus Life' },
    { src: '', caption: 'Tech Fest' },
    { src: '', caption: 'Graduation Day' },
  ];
}

