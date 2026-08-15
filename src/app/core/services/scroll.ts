import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {

  init(): void {
    // Listen on both window and document
    window.addEventListener('scroll', () => this.updateProgress(), true);
    document.addEventListener('scroll', () => this.updateProgress(), true);
  }

  private updateProgress(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    const bar = document.getElementById('scrollProgress');
    if (bar) bar.style.width = `${Math.min(progress, 100)}%`;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}