import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {

  @Input() revealDelay = 0;
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const el = this.el.nativeElement as HTMLElement;

    // Set initial hidden state
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${this.revealDelay}ms, transform 0.6s ease ${this.revealDelay}ms`;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            setTimeout(() => {
              target.style.opacity = '1';
              target.style.transform = 'translateY(0)';
            }, 50);
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Wait for DOM to be fully ready
    setTimeout(() => this.observer.observe(el), 100);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}