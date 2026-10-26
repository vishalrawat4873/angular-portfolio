import { Component, HostListener, signal, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface NavLink {
  label: string;
  sectionId: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  isMenuOpen = signal(false);
  isScrolled = signal(false);
  activeSection = signal('home');

  navLinks: NavLink[] = [
    { label: 'Home',     sectionId: 'home'     },
    { label: 'About',    sectionId: 'about'    },
    { label: 'Skills',   sectionId: 'skills'   },
    { label: 'Projects',   sectionId: 'projects'   },
    { label: 'Experience', sectionId: 'experience' },
    { label: 'Contact',    sectionId: 'contact'    },
  ];

  private scrollHandler = () => this.updateActiveSection();

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.scrollHandler);
      // Initial check after DOM loads
      setTimeout(() => this.updateActiveSection(), 400);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollHandler);
    }
  }

  private updateActiveSection(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const offset = 120; // navbar height + buffer

    // Get scroll position from top
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

  scrollTo(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
