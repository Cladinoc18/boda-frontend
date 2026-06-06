import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen flex flex-col bg-wedding-neutral-bone text-wedding-neutral-dark font-sans selection:bg-wedding-primary-light/30">
      <!-- HEADER / NAV -->
      <header class="sticky top-0 z-50 bg-wedding-neutral-bone/80 backdrop-blur-md border-b border-wedding-primary/10 shadow-sm transition-all duration-300">
        <div class="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <!-- Logo / Nombres de los novios -->
          <a routerLink="/" class="group flex items-center gap-2">
            <span class="font-serif text-2xl md:text-3xl text-wedding-primary font-light transition-all duration-300 group-hover:text-wedding-accent">
              J &amp; C
            </span>
            <span class="w-1.5 h-1.5 rounded-full bg-wedding-accent/60"></span>
            <span class="font-serif text-sm tracking-widest text-wedding-neutral-muted uppercase">
              Nuestra Boda
            </span>
          </a>

          <!-- Enlaces de navegación -->
          <nav class="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            <a routerLink="/" routerLinkActive="text-wedding-accent font-medium border-b border-wedding-accent/40" [routerLinkActiveOptions]="{exact: true}" 
               class="px-3 py-1.5 text-xs sm:text-sm text-wedding-neutral-muted hover:text-wedding-neutral-dark hover:translate-y-[-1px] transition-all duration-200 uppercase tracking-wider">
              Inicio
            </a>
            <a routerLink="/agenda" routerLinkActive="text-wedding-accent font-medium border-b border-wedding-accent/40"
               class="px-3 py-1.5 text-xs sm:text-sm text-wedding-neutral-muted hover:text-wedding-neutral-dark hover:translate-y-[-1px] transition-all duration-200 uppercase tracking-wider">
              Agenda
            </a>
            <a routerLink="/rsvp" routerLinkActive="text-wedding-accent font-medium border-b border-wedding-accent/40"
               class="px-3 py-1.5 text-xs sm:text-sm text-wedding-neutral-muted hover:text-wedding-neutral-dark hover:translate-y-[-1px] transition-all duration-200 uppercase tracking-wider">
              Confirmar (RSVP)
            </a>
            <a routerLink="/music" routerLinkActive="text-wedding-accent font-medium border-b border-wedding-accent/40"
               class="px-3 py-1.5 text-xs sm:text-sm text-wedding-neutral-muted hover:text-wedding-neutral-dark hover:translate-y-[-1px] transition-all duration-200 uppercase tracking-wider">
              Música
            </a>
            <a routerLink="/gallery" routerLinkActive="text-wedding-accent font-medium border-b border-wedding-accent/40"
               class="px-3 py-1.5 text-xs sm:text-sm text-wedding-neutral-muted hover:text-wedding-neutral-dark hover:translate-y-[-1px] transition-all duration-200 uppercase tracking-wider">
              Galería
            </a>
            <a routerLink="/regalos" routerLinkActive="text-wedding-accent font-medium border-b border-wedding-accent/40"
               class="px-3 py-1.5 text-xs sm:text-sm text-wedding-neutral-muted hover:text-wedding-neutral-dark hover:translate-y-[-1px] transition-all duration-200 uppercase tracking-wider">
              Regalos
            </a>
          </nav>
        </div>
      </header>

      <!-- VISTA PRINCIPAL -->
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>

      <!-- PIE DE PÁGINA -->
      <footer class="bg-wedding-neutral-cream border-t border-wedding-primary/10 py-12 px-4 text-center mt-12">
        <div class="max-w-4xl mx-auto space-y-4">
          <p class="font-serif italic text-2xl text-wedding-primary-dark">"Somos dos que brillamos, reflejo y realidad"</p>
          <div class="w-16 h-[1px] bg-wedding-primary/40 mx-auto"></div>
          <p class="font-sans text-xs tracking-widest text-wedding-neutral-muted uppercase">
            Jacky &amp; Cristian &bull; 15.08.2026 &bull; Mayapo, La Guajira
          </p>
          <p class="text-[10px] text-wedding-neutral-muted/50 font-light">
            Diseñado con cariño para este día tan especial. &copy; 2026.
          </p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {}
