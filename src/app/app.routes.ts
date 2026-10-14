import { Routes } from '@angular/router';
import { Home } from './features/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about').then(m => m.About)
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./features/skills/skills').then(m => m.Skills)
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects').then(m => m.Projects)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact').then(m => m.Contact)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
