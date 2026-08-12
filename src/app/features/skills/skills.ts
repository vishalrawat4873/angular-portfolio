import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillCategory {
  icon: string;
  name: string;
  chips: string[];
}

interface SkillBar {
  name: string;
  percentage: number;
  color: string;
}

interface Tool {
  name: string;
  color: string;
}

interface Learning {
  icon: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills implements OnInit {

  // ── Category cards ───────────────────────────────────
  categories: SkillCategory[] = [
    {
      icon: 'ti-layers',
      name: 'Frontend',
      chips: ['Angular 18', 'TypeScript', 'HTML5', 'CSS3 / SCSS', 'Bootstrap', 'JavaScript']
    },
    {
      icon: 'ti-server',
      name: 'Backend',
      chips: ['ASP.NET Core', 'C#', 'REST APIs', 'JWT Auth', 'Clean Architecture']
    },
    {
      icon: 'ti-database',
      name: 'Database',
      chips: ['SQL Server', 'SSMS', 'LINQ', 'EF Core', 'Stored Procedures']
    },
    {
      icon: 'ti-shield-lock',
      name: 'Auth & Security',
      chips: ['JWT', 'Role-based Auth', 'OAuth basics', 'HTTPS']
    },
    {
      icon: 'ti-code',
      name: 'Languages',
      chips: ['C#', 'TypeScript', 'JavaScript', 'Python', 'SQL']
    },
    {
      icon: 'ti-users',
      name: 'Soft Skills',
      chips: ['Teamwork', 'Leadership', 'Problem Solving', 'Communication', 'Time Management']
    }
  ];

  // ── Proficiency bars ─────────────────────────────────
  skillBars: SkillBar[] = [
  { name: 'ASP.NET Core + C#',    percentage: 80, color: '#512BD4' },
  { name: 'Angular + TypeScript', percentage: 75, color: '#DD0031' },
  { name: 'HTML + CSS + SCSS',    percentage: 85, color: '#264de4' },
  { name: 'SQL Server',           percentage: 70, color: '#CC2927' },
  { name: 'Git + GitHub',         percentage: 70, color: '#F05032' },
  { name: 'JavaScript',           percentage: 75, color: '#F7DF1E' },
];

  // ── Tools ────────────────────────────────────────────
  tools: Tool[] = [
    { name: 'Visual Studio', color: '#512BD4' },
    { name: 'VS Code',       color: '#007ACC' },
    { name: 'Git',           color: '#F05032' },
    { name: 'Postman',       color: '#FF6C37' },
    { name: 'SSMS',          color: '#CC2927' },
    { name: 'GitHub',        color: '#6e7681' },
    { name: 'Cursor AI',     color: '#7B61FF' },
    { name: 'GitHub Copilot',color: '#10B981' },
    { name: 'ChatGPT',       color: '#10A37F' },
    { name: 'Figma',         color: '#F24E1E' },
  ];

  // ── Currently learning ───────────────────────────────
  learning: Learning[] = [
    { icon: 'ti-brand-azure',  name: 'Azure',        description: 'Cloud deployment & services' },
    { icon: 'ti-chart-dots',   name: 'System Design', description: 'Architecture & scalability'  },
    { icon: 'ti-tournament',   name: 'DSA with C#',  description: 'LeetCode daily practice'     },
  ];

  // ── Animate bars on scroll ───────────────────────────
  animatedBars = false;

  @ViewChildren('barFill') barFills!: QueryList<ElementRef>;

  ngOnInit(): void {
    // Intersection Observer — animate bars when they scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.animatedBars) {
            this.animatedBars = true;
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe after a short delay to let DOM render
    setTimeout(() => {
      const barsSection = document.querySelector('.skills__bars');
      if (barsSection) observer.observe(barsSection);
    }, 100);
  }
}