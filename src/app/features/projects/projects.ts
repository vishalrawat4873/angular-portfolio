import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  category: 'Client Project' | 'Production' | 'Personal';
  categoryClass: string;
  description: string;
  features: string[];
  techStack: string[];
  period: string;
  liveUrl: string | null;
  isPrivate: boolean;
}

interface Filter {
  label: string;
  value: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {

  // ── Filter state ─────────────────────────────────────
  activeFilter = signal('All');

  filters: Filter[] = [
    { label: 'All',          value: 'All'          },
    { label: 'ASP.NET Core', value: 'ASP.NET Core' },
    { label: 'Angular',      value: 'Angular'      },
    { label: 'Classic ASP',  value: 'Classic ASP'  },
    { label: 'SQL Server',   value: 'SQL Server'   },
    { label: 'Azure',        value: 'Azure'        },
  ];

  // ── Projects data ────────────────────────────────────
  allProjects: Project[] = [
    {
      title: 'Church Team Management System',
      category: 'Client Project',
      categoryClass: 'badge--client',
      description:
        'A full-featured church service planning application built for a US-based client. Handles service order management, team scheduling, media file uploads to Azure Blob Storage, drag-and-drop song ordering, role-based access, and multi-file PDF generation and download.',
      features: [
        'Drag-and-drop service order management',
        'Azure Blob Storage media uploads',
        'Role-based team scheduling',
        'Multi-file PDF combining & download',
        'Series & sermon management',
        'SortableJS integration',
      ],
      techStack: ['Classic ASP', 'JScript', 'SQL Server', 'Azure Blob', 'Bootstrap', 'jQuery'],
      period: 'Jan 2026 – Present',
      liveUrl: null,
      isPrivate: true,
    },
    {
      title: 'School Management System',
      category: 'Production',
      categoryClass: 'badge--production',
      description:
        'A production-grade School Management System with scalable RESTful APIs, Angular frontend, secure role-based authentication and authorization, and optimized SQL Server database management for a live client environment.',
      features: [
        'Scalable RESTful API architecture',
        'Role-based authentication & authorization',
        'Responsive Angular UI',
        'Optimized SQL Server queries',
      ],
      techStack: ['ASP.NET Core', 'Angular', 'C#', 'TypeScript', 'SQL Server', 'JWT Auth'],
      period: 'Dec 2025 – Present',
      liveUrl: null,
      isPrivate: true,
    },
    {
      title: 'Admin Panel Web Application',
      category: 'Production',
      categoryClass: 'badge--production',
      description:
        'A full-stack Admin Panel for user and role management with JWT authentication, clean RESTful APIs, Angular frontend with TypeScript, and efficient CRUD operations using SQL Server — built during internship.',
      features: [
        'User & role management',
        'JWT authentication flow',
        'Full CRUD operations',
        'Clean architecture principles',
      ],
      techStack: ['ASP.NET Core', 'Angular', 'C#', 'TypeScript', 'SQL Server', 'JWT Auth'],
      period: 'Aug 2024 – Nov 2024',
      liveUrl: null,
      isPrivate: true,
    },
  ];

  // ── Computed filtered list ────────────────────────────
  filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'All') return this.allProjects;
    return this.allProjects.filter(p =>
      p.techStack.some(t => t.toLowerCase().includes(filter.toLowerCase()))
    );
  });

  setFilter(value: string): void {
    this.activeFilter.set(value);
  }
}