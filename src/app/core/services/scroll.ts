import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private platformId = inject(PLATFORM_ID);

  init(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    // Listen on both window and document
    window.addEventListener('scroll', () => this.updateProgress(), true);
    document.addEventListener('scroll', () => this.updateProgress(), true);
  }

  private updateProgress(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    const bar = document.getElementById('scrollProgress');
    if (bar) bar.style.width = `${Math.min(progress, 100)}%`;
  }

  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
