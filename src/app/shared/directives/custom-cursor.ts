import { Directive, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appCustomCursor]',
  standalone: true
})
export class CustomCursorDirective implements OnInit, OnDestroy {

  private cursor!: HTMLElement;
  private trail: HTMLElement[] = [];

  ngOnInit(): void {
    this.createCursor();
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('click', this.onMouseClick);
    document.body.style.cursor = 'none';
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('click', this.onMouseClick);
    this.cursor?.remove();
    document.body.style.cursor = 'auto';
  }

  private createCursor(): void {
    this.cursor = document.createElement('div');
    this.cursor.id = 'custom-cursor';
    this.cursor.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 32 32" style="overflow:visible">
        <line x1="16" y1="0" x2="16" y2="11" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="16" y1="21" x2="16" y2="32" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="0" y1="16" x2="11" y2="16" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="21" y1="16" x2="32" y2="16" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="16" cy="16" r="5" fill="none" stroke="#ef4444" stroke-width="1.5"/>
        <circle cx="16" cy="16" r="1.5" fill="#ef4444"/>
      </svg>
    `;
    this.cursor.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      top: -100px;
      left: -100px;
      transition: top 0.05s linear, left 0.05s linear;
    `;
    document.body.appendChild(this.cursor);
  }

  private onMouseMove = (e: MouseEvent): void => {
    this.cursor.style.left = e.clientX + 'px';
    this.cursor.style.top  = e.clientY + 'px';

    // Bullet trail
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #ef4444;
      pointer-events: none;
      z-index: 99998;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      transform: translate(-50%, -50%);
      opacity: 0.6;
      transition: opacity 0.4s ease;
    `;
    document.body.appendChild(dot);
    setTimeout(() => { dot.style.opacity = '0'; }, 50);
    setTimeout(() => dot.remove(), 450);
  };

  private onMouseClick = (e: MouseEvent): void => {
    // Bang emoji
    const bang = document.createElement('div');
    bang.textContent = '💥';
    bang.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 99999;
      font-size: 20px;
      animation: bangPop 0.6s ease forwards;
    `;
    document.body.appendChild(bang);
    setTimeout(() => bang.remove(), 700);

    // Sparks
    for (let i = 0; i < 6; i++) {
      const spark = document.createElement('div');
      const angle = (i / 6) * Math.PI * 2;
      const dist  = 25 + Math.random() * 15;
      spark.style.cssText = `
        position: fixed;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: #ef4444;
        pointer-events: none;
        z-index: 99998;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        transform: translate(-50%, -50%);
        transition: all 0.4s ease;
        opacity: 1;
      `;
      document.body.appendChild(spark);
      setTimeout(() => {
        spark.style.left    = (e.clientX + Math.cos(angle) * dist) + 'px';
        spark.style.top     = (e.clientY + Math.sin(angle) * dist) + 'px';
        spark.style.opacity = '0';
      }, 10);
      setTimeout(() => spark.remove(), 500);
    }
  };
}