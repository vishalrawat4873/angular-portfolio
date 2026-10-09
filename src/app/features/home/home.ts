import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollRevealDirective } from '../../shared//directives//scroll-reveal';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, ScrollRevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {

  // ── Typewriter ────────────────────────────────────────
  roles = ['Full Stack Developer', 'Angular Developer', 'ASP.NET Developer', 'YouTube Content Creator'];
  currentRole = signal('');
  currentRoleIndex = 0;
  isDeleting = false;
  charIndex = 0;
  private typeTimer: ReturnType<typeof setTimeout> | null = null;

  // ── Stats ─────────────────────────────────────────────
  stats = [
    { value: '6',  suffix: '+', label: 'Months experience'   },
    { value: '10', suffix: '+', label: 'Projects built'      },
    { value: '3',  suffix: 'K', label: 'YouTube subscribers' },
    { value: '5',  suffix: '+', label: 'Technologies'        },
  ];

  // ── Tech stack ────────────────────────────────────────
  techs = [
    { name: 'Angular',    color: '#DD0031' },
    { name: 'ASP.NET',    color: '#512BD4' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'SQL Server', color: '#CC2927' },
    { name: 'Azure',      color: '#0089D6' },
    { name: 'Bootstrap',  color: '#7952B3' },
    { name: 'JavaScript', color: '#F7DF1E' },
    { name: 'CSS / SCSS', color: '#264de4' },
    { name: 'jQuery',     color: '#0769AD' },
    { name: 'Git',        color: '#F05032' },
  ];

  // ── Skills ────────────────────────────────────────────
  categories = [
    { icon: 'ti-device-desktop',     name: 'Frontend',       chips: ['Angular 18', 'TypeScript', 'HTML5', 'CSS3 / SCSS', 'Bootstrap', 'JavaScript'] },
    { icon: 'ti-server',     name: 'Backend',        chips: ['ASP.NET Core', 'C#', 'REST APIs', 'JWT Auth', 'Clean Architecture'] },
    { icon: 'ti-database',   name: 'Database',       chips: ['SQL Server', 'SSMS', 'LINQ', 'EF Core', 'Stored Procedures'] },
    { icon: 'ti-shield-lock',name: 'Auth & Security',chips: ['JWT', 'Role-based Auth', 'OAuth basics'] },
    { icon: 'ti-code',       name: 'Languages',      chips: ['C#', 'TypeScript', 'JavaScript', 'Python', 'SQL'] },
    { icon: 'ti-users',      name: 'Soft Skills',    chips: ['Teamwork', 'Leadership', 'Problem Solving', 'Communication'] },
  ];

  skillBars = [
    { name: 'ASP.NET Core + C#',    percentage: 80, color: '#512BD4' },
    { name: 'Angular + TypeScript', percentage: 75, color: '#DD0031' },
    { name: 'HTML + CSS + SCSS',    percentage: 85, color: '#264de4' },
    { name: 'SQL Server',           percentage: 70, color: '#CC2927' },
    { name: 'Git + GitHub',         percentage: 70, color: '#F05032' },
    { name: 'JavaScript',           percentage: 75, color: '#F7DF1E' },
  ];

  tools = [
    { name: 'Visual Studio', color: '#512BD4' },
    { name: 'VS Code',       color: '#007ACC' },
    { name: 'Git',           color: '#F05032' },
    { name: 'Postman',       color: '#FF6C37' },
    { name: 'SSMS',          color: '#CC2927' },
    { name: 'GitHub',        color: '#6e7681' },
    { name: 'Cursor AI',     color: '#7B61FF' },
    { name: 'GitHub Copilot',color: '#10B981' },
  ];

  animatedBars = false;

  // ── Projects ──────────────────────────────────────────
  activeFilter = signal('All');

  filters = [
    { label: 'All',          value: 'All'          },
    { label: 'ASP.NET Core', value: 'ASP.NET Core' },
    { label: 'Angular',      value: 'Angular'      },
    { label: 'Classic ASP',  value: 'Classic ASP'  },
    { label: 'SQL Server',   value: 'SQL Server'   },
    { label: 'Azure',        value: 'Azure'        },
  ];

  allProjects = [
    {
      title: 'Church Management System',
      category: 'Client Project',
      categoryClass: 'badge--client',
      description: 'A full-featured church service planning application for a US-based client. Handles service order management, team scheduling, media uploads to Azure Blob Storage, drag-and-drop song ordering, and multi-file PDF generation.',
      features: ['Drag-and-drop service ordering', 'Azure Blob media uploads', 'Role-based team management', 'PDF combining & download', 'Series management'],
      techStack: ['Classic ASP', 'JScript', 'SQL Server', 'Azure Blob', 'Bootstrap', 'jQuery'],
      period: 'Jan 2026 – Present',
      liveUrl: null,
      isPrivate: true,
    },
    {
      title: 'School Management System',
      category: 'Production',
      categoryClass: 'badge--production',
      description: 'A production-grade School Management System with scalable RESTful APIs, Angular frontend, secure role-based authentication, and optimized SQL Server database management.',
      features: ['Scalable RESTful API architecture', 'Role-based authentication', 'Responsive Angular UI', 'Optimized SQL Server queries'],
      techStack: ['ASP.NET Core', 'Angular', 'C#', 'TypeScript', 'SQL Server', 'JWT Auth'],
      period: 'Dec 2025 – Present',
      liveUrl: null,
      isPrivate: true,
    },
    {
      title: 'Admin Panel Web Application',
      category: 'Production',
      categoryClass: 'badge--production',
      description: 'A full-stack Admin Panel for user and role management with JWT authentication, RESTful APIs, Angular frontend, and efficient CRUD operations using SQL Server.',
      features: ['User & role management', 'JWT authentication flow', 'Full CRUD operations', 'Clean architecture principles'],
      techStack: ['ASP.NET Core', 'Angular', 'C#', 'TypeScript', 'SQL Server', 'JWT Auth'],
      period: 'Aug 2024 – Nov 2024',
      liveUrl: null,
      isPrivate: true,
    },
  ];

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

  // ── Contact ───────────────────────────────────────────
  isSubmitting = signal(false);
  isSubmitted  = signal(false);

  contactLinks = [
    { label: 'Email',    value: 'vishalrawatssr@gmail.com',  icon: 'ti-mail',           url: 'mailto:vishalrawatssr@gmail.com',                         colorClass: 'icon--blue'   },
    { label: 'LinkedIn', value: 'vishal-rawat',              icon: 'ti-brand-linkedin',  url: 'https://www.linkedin.com/in/vishal-rawat-b82358212/',     colorClass: 'icon--blue'   },
    { label: 'YouTube',  value: '@vishalrawat770 · 3K subs', icon: 'ti-brand-youtube',   url: 'https://www.youtube.com/@vishalrawat770',                 colorClass: 'icon--red'    },
    { label: 'GitHub',   value: 'My projects & code',        icon: 'ti-brand-github',    url: 'https://github.com/vishalrawat4873',                      colorClass: 'icon--purple' },
  ];

  socialLinks = [
    { label: 'LinkedIn', icon: 'ti-brand-linkedin', url: 'https://www.linkedin.com/in/vishal-rawat-b82358212/' },
    { label: 'YouTube',  icon: 'ti-brand-youtube',  url: 'https://www.youtube.com/@vishalrawat770'             },
    { label: 'GitHub',   icon: 'ti-brand-github',   url: 'https://github.com/vishalrawat4873'                  },
  ];

  purposeOptions = ['Full-time opportunity', 'Freelance project', 'Open source collaboration', 'Just saying hello'];

  form: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      purpose: ['Full-time opportunity'],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && control.touched);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isSubmitting.set(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    this.isSubmitting.set(false);
    this.isSubmitted.set(true);
    this.form.reset();
    this.snackBar.open('Message sent! I\'ll get back to you soon.', 'Close', { duration: 4000 });
  }

  // ── Scroll to section ─────────────────────────────────
  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  // ── Typewriter ────────────────────────────────────────
  ngOnInit(): void {
    this.runTypewriter();

    // Animate skill bars when skills section visible
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) this.animatedBars = true; },
      { threshold: 0.3 }
    );
    setTimeout(() => {
      const el = document.getElementById('skills');
      if (el) observer.observe(el);
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.typeTimer) clearTimeout(this.typeTimer);
  }

  private runTypewriter(): void {
    const fullText   = this.roles[this.currentRoleIndex];
    const typeSpeed  = 80;
    const deleteSpeed = 40;
    const pauseAfterType   = 2000;
    const pauseAfterDelete = 400;

    if (!this.isDeleting) {
      this.currentRole.set(fullText.slice(0, this.charIndex + 1));
      this.charIndex++;
      if (this.charIndex === fullText.length) {
        this.typeTimer = setTimeout(() => { this.isDeleting = true; this.runTypewriter(); }, pauseAfterType);
        return;
      }
    } else {
      this.currentRole.set(fullText.slice(0, this.charIndex - 1));
      this.charIndex--;
      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        this.typeTimer = setTimeout(() => this.runTypewriter(), pauseAfterDelete);
        return;
      }
    }
    this.typeTimer = setTimeout(() => this.runTypewriter(), this.isDeleting ? deleteSpeed : typeSpeed);
  }
}