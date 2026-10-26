import { Routes } from '@angular/router';
import { Home } from './features/home/home';

export const routes: Routes = [
  // ── Main single-page scroll home ──────────────────────────
  {
    path: '',
    component: Home
  },

  // ── Standalone SEO routes (lazy-loaded) ───────────────────
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about').then(m => m.About),
    title: 'About – Vishal Rawat | Full Stack Developer Ahmedabad'
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./features/skills/skills').then(m => m.Skills),
    title: 'Skills – Angular & ASP.NET Developer | Vishal Rawat'
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects').then(m => m.Projects),
    title: 'Projects – Vishal Rawat | Angular & ASP.NET Work'
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./features/experience/experience').then(m => m.Experience),
    title: 'Experience – Vishal Rawat | Full Stack Developer Ahmedabad'
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact').then(m => m.Contact),
    title: 'Contact – Vishal Rawat | Hire a Full Stack Developer'
  },

  // ── 404 wildcard ──────────────────────────────────────────
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found').then(m => m.NotFound),
    title: '404 – Page Not Found | Vishal Rawat'
  }
];
