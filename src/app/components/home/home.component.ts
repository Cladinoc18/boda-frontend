import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="animate-fade-in space-y-20 pb-20">
      <!-- HERO SECTION -->
      <section class="relative min-h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden bg-wedding-neutral-cream/40">
        <!-- Adornos de fondo sutiles -->
        <div class="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div class="absolute top-10 left-10 w-96 h-96 rounded-full bg-wedding-primary filter blur-3xl"></div>
          <div class="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-wedding-accent filter blur-3xl"></div>
        </div>

        <div class="relative z-10 max-w-4xl mx-auto space-y-8 py-16">
          <span class="font-sans text-xs sm:text-sm tracking-[0.3em] text-wedding-neutral-muted uppercase block">
            ¡Nos Casamos!
          </span>

          <h1 class="font-serif text-5xl sm:text-7xl md:text-8xl text-wedding-neutral-dark font-light leading-none">
            Jacky <span class="font-serif italic text-wedding-primary text-4xl sm:text-6xl md:text-7xl font-normal">&amp;</span> Cristian
          </h1>

          <div class="w-24 h-[1px] bg-wedding-primary/40 mx-auto my-6"></div>

          <p class="font-serif italic text-lg sm:text-2xl text-wedding-neutral-muted">
            Hay momentos en la vida que son irrepetibles, y compartirlos con quienes más amamos los hace eternos.
          </p>

          <p class="font-sans text-sm sm:text-base tracking-[0.2em] text-wedding-neutral-dark font-semibold uppercase">
            15 de Agosto de 2026
          </p>

          <div class="pt-6">
            <a routerLink="/rsvp" class="btn-gold px-8 py-4 text-xs tracking-widest uppercase hover:scale-[1.03] active:scale-[0.98] transition-all duration-200">
              Confirmar Asistencia
            </a>
          </div>
        </div>
      </section>

      <!-- SECCIÓN CUENTA REGRESIVA -->
      <section class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="font-serif text-3xl sm:text-4xl text-wedding-neutral-dark mb-4 font-light">
          Cuenta Regresiva
        </h2>
        <p class="font-sans text-sm text-wedding-neutral-muted mb-10 max-w-md mx-auto">
          Faltan muy pocos días para dar el gran paso y celebrar el inicio de nuestra historia juntos.
        </p>

        <!-- Reloj de cuenta regresiva -->
        <div class="grid grid-cols-4 gap-2 sm:gap-6 max-w-2xl mx-auto">
          <!-- Días -->
          <div class="bg-white border border-wedding-primary/10 rounded-lg p-3 sm:p-6 shadow-sm flex flex-col items-center justify-center">
            <span class="font-serif text-3xl sm:text-5xl md:text-6xl text-wedding-primary font-light">
              {{ timeRemaining.days | number:'2.0-0' }}
            </span>
            <span class="font-sans text-[10px] sm:text-xs tracking-widest text-wedding-neutral-muted uppercase mt-1 sm:mt-2">
              Días
            </span>
          </div>
          <!-- Horas -->
          <div class="bg-white border border-wedding-primary/10 rounded-lg p-3 sm:p-6 shadow-sm flex flex-col items-center justify-center">
            <span class="font-serif text-3xl sm:text-5xl md:text-6xl text-wedding-primary font-light">
              {{ timeRemaining.hours | number:'2.0-0' }}
            </span>
            <span class="font-sans text-[10px] sm:text-xs tracking-widest text-wedding-neutral-muted uppercase mt-1 sm:mt-2">
              Horas
            </span>
          </div>
          <!-- Minutos -->
          <div class="bg-white border border-wedding-primary/10 rounded-lg p-3 sm:p-6 shadow-sm flex flex-col items-center justify-center">
            <span class="font-serif text-3xl sm:text-5xl md:text-6xl text-wedding-primary font-light">
              {{ timeRemaining.minutes | number:'2.0-0' }}
            </span>
            <span class="font-sans text-[10px] sm:text-xs tracking-widest text-wedding-neutral-muted uppercase mt-1 sm:mt-2">
              Minutos
            </span>
          </div>
          <!-- Segundos -->
          <div class="bg-white border border-wedding-primary/10 rounded-lg p-3 sm:p-6 shadow-sm flex flex-col items-center justify-center">
            <span class="font-serif text-3xl sm:text-5xl md:text-6xl text-wedding-accent font-light">
              {{ timeRemaining.seconds | number:'2.0-0' }}
            </span>
            <span class="font-sans text-[10px] sm:text-xs tracking-widest text-wedding-neutral-muted uppercase mt-1 sm:mt-2">
              Segundos
            </span>
          </div>
        </div>
      </section>

      <!-- FRASES CORTAS DE INVITACIÓN -->
      <section class="bg-wedding-neutral-cream py-16 px-4 text-center border-y border-wedding-primary/5">
        <div class="max-w-xl mx-auto space-y-6">
          <div class="text-wedding-primary text-3xl font-cormorant italic">❦</div>
          <blockquote class="font-serif text-xl sm:text-2xl text-wedding-neutral-dark font-light leading-relaxed">
            "Por encima de todo, vístanse de amor, que es el vínculo perfecto."
          </blockquote>
          <cite class="font-sans text-xs tracking-wider text-wedding-neutral-muted uppercase block not-italic">
            Colosenses 3:14
          </cite>
        </div>
      </section>

      <!-- SECCIÓN REDIRECCIÓN REGALOS -->
      <div class="text-center pt-8">
        <a routerLink="/regalos" class="btn-gold-outline px-8 py-3.5 text-xs tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 inline-flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          Lluvia de Sobres
        </a>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  // Fecha objetivo del matrimonio: 15 de Agosto de 2026 a las 17:00:00
  private targetDate = new Date('2026-08-15T17:00:00');
  private timerId: any;

  timeRemaining: TimeRemaining = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  ngOnInit() {
    this.calculateTime();
    this.timerId = setInterval(() => {
      this.calculateTime();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  private calculateTime() {
    const now = new Date().getTime();
    const difference = this.targetDate.getTime() - now;

    if (difference <= 0) {
      this.timeRemaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      if (this.timerId) clearInterval(this.timerId);
      return;
    }

    const msInDay = 24 * 60 * 60 * 1000;
    const msInHour = 60 * 60 * 1000;
    const msInMinute = 60 * 1000;

    const days = Math.floor(difference / msInDay);
    const hours = Math.floor((difference % msInDay) / msInHour);
    const minutes = Math.floor((difference % msInHour) / msInMinute);
    const seconds = Math.floor((difference % msInMinute) / 1000);

    this.timeRemaining = { days, hours, minutes, seconds };
  }
}
