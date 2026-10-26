import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Static routes — all prerendered at build time
  { path: '',            renderMode: RenderMode.Prerender },
  { path: 'about',       renderMode: RenderMode.Prerender },
  { path: 'skills',      renderMode: RenderMode.Prerender },
  { path: 'projects',    renderMode: RenderMode.Prerender },
  { path: 'experience',  renderMode: RenderMode.Prerender },
  { path: 'contact',     renderMode: RenderMode.Prerender },

  // 404 — server-rendered on demand (wildcard cannot be prerendered)
  { path: '**',          renderMode: RenderMode.Server },
];
