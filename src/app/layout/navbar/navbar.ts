import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  isMenuOpen = signal(false);
  isScrolled = signal(false);

  navLinks: NavLink[] = [
    { label: 'Home',     route: '/'         },
    { label: 'About',    route: '/about'    },
    { label: 'Skills',   route: '/skills'   },
    { label: 'Projects', route: '/projects' },
    { label: 'Contact',  route: '/contact'  },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu(): void {
    this.isMenuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}
