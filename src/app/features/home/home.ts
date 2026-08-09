import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Stat {
  value: string;
  suffix: string;
  label: string;
}

interface Tech {
  name: string;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {

  // ── Typewriter ────────────────────────────────────────
  roles = [
    'Full Stack Developer',
    'Angular Developer',
    'ASP.NET Developer',
    'YouTube Content Creator',
  ];

  currentRole = signal('');
  currentRoleIndex = 0;
  isDeleting = false;
  charIndex = 0;
  private typeTimer: ReturnType<typeof setTimeout> | null = null;

  // ── Stats ─────────────────────────────────────────────
  stats: Stat[] = [
    { value: '6',  suffix: '+', label: 'Months experience'    },
    { value: '10', suffix: '+', label: 'Projects built'       },
    { value: '3',  suffix: 'K', label: 'YouTube subscribers'  },
    { value: '5',  suffix: '+', label: 'Technologies'         },
  ];

  // ── Tech stack ────────────────────────────────────────
  techs: Tech[] = [
    { name: 'Angular',      color: '#DD0031' },
    { name: 'ASP.NET',      color: '#512BD4' },
    { name: 'TypeScript',   color: '#3178C6' },
    { name: 'SQL Server',   color: '#CC2927' },
    { name: 'Azure',        color: '#0089D6' },
    { name: 'Bootstrap',    color: '#7952B3' },
    { name: 'JavaScript',   color: '#F7DF1E' },
    { name: 'CSS / SCSS',   color: '#264de4' },
    { name: 'jQuery',       color: '#0769AD' },
    { name: 'Git',          color: '#F05032' },
  ];

  ngOnInit(): void {
    this.runTypewriter();
  }

  ngOnDestroy(): void {
    if (this.typeTimer) clearTimeout(this.typeTimer);
  }

  private runTypewriter(): void {
    const fullText = this.roles[this.currentRoleIndex];
    const typeSpeed   = 80;
    const deleteSpeed = 40;
    const pauseAfterType   = 2000;
    const pauseAfterDelete = 400;

    if (!this.isDeleting) {
      // Typing forward
      this.currentRole.set(fullText.slice(0, this.charIndex + 1));
      this.charIndex++;

      if (this.charIndex === fullText.length) {
        // Finished typing — pause then start deleting
        this.typeTimer = setTimeout(() => {
          this.isDeleting = true;
          this.runTypewriter();
        }, pauseAfterType);
        return;
      }
    } else {
      // Deleting
      this.currentRole.set(fullText.slice(0, this.charIndex - 1));
      this.charIndex--;

      if (this.charIndex === 0) {
        // Finished deleting — move to next role
        this.isDeleting = false;
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
        this.typeTimer = setTimeout(() => this.runTypewriter(), pauseAfterDelete);
        return;
      }
    }

    this.typeTimer = setTimeout(
      () => this.runTypewriter(),
      this.isDeleting ? deleteSpeed : typeSpeed
    );
  }
}