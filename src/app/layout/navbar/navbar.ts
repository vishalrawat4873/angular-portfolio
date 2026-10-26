import { Component, HostListener, signal, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

interface NavLink {
  label: string;
  /** Used for scroll target on home page AND the route path */
  sectionId: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private routerSub?: Subscription;

  isMenuOpen = signal(false);
  isScrolled = signal(false);
  activeSection = signal('home');
  /** True when the current URL is the home page (/) */
  isHomePage = signal(true);

  navLinks: NavLink[] = [
    { label: 'Home',       sectionId: 'home'       },
    { label: 'About',      sectionId: 'about'      },
    { label: 'Skills',     sectionId: 'skills'     },
    { label: 'Projects',   sectionId: 'projects'   },
    { label: 'Experience', sectionId: 'experience' },
    { label: 'Contact',    sectionId: 'contact'    },
  ];

  private scrollHandler = () => this.updateActiveSection();

  ngOnInit(): void {
    // Track route changes
    this.routerSub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const onHome = e.urlAfterRedirects === '/' || e.urlAfterRedirects === '';
        this.isHomePage.set(onHome);
        if (onHome) {
          this.activeSection.set('home');
        } else {
          // Highlight corresponding nav link for current route
          const seg = e.urlAfterRedirects.replace('/', '');
          this.activeSection.set(seg || 'home');
        }
      });

    // Set initial state (for SSR/prerender the URL may be the current route)
    if (isPlatformBrowser(this.platformId)) {
      const path = window.location.pathname;
      const onHome = path === '/' || path === '';
      this.isHomePage.set(onHome);

      window.addEventListener('scroll', this.scrollHandler);
      setTimeout(() => this.updateActiveSection(), 400);
    }
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  private updateActiveSection(): void {
    if (!isPlatformBrowser(this.platformId) || !this.isHomePage()) {
      return;
    }

    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const offset = 120;
    const scrollY = window.scrollY + offset;

    let current = 'home';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) {
        current = id;
      }
    }
    this.activeSection.set(current);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled.set(window.scrollY > 50);
    }
  }

  /**
   * Smart navigation:
   * - On home page → smooth scroll to section id
   * - On any other page → navigate to route path
   */
  navigate(sectionId: string): void {
    this.closeMenu();

    if (sectionId === 'home') {
      this.router.navigate(['/']);
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
      }
      return;
    }

    if (this.isHomePage() && isPlatformBrowser(this.platformId)) {
      // Scroll to section on the home page
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
        return;
      }
    }

    // Navigate to standalone route
    this.router.navigate(['/' + sectionId]);
  }

  toggleMenu(): void {
    this.isMenuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
