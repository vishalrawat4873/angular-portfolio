import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/footer/footer';
import { ScrollService } from './core/services/scroll';
import {
  trigger, transition, style, animate, query
} from '@angular/animations';
import { CustomCursorDirective } from './shared/directives/custom-cursor'


export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(24px)' }),
      animate('400ms cubic-bezier(0.4, 0, 0.2, 1)',
        style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true })
  ])
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, CustomCursorDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  animations: [routeAnimations]
})
export class App implements OnInit {
  title = 'vishal-portfolio';

  constructor(public scrollService: ScrollService) {}

  ngOnInit(): void {
    this.scrollService.init();
  }

  getRouteAnimation(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] ?? outlet.isActivated;
  }
}