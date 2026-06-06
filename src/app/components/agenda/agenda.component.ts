import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AgendaItem {
  time: string;
  title: string;
  location: string;
  description: string;
  mapsUrl: string;
  icon: string;
  noMapText?: string;
}

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-16 animate-fade-in space-y-16">
      <div class="text-center space-y-4">
        <span class="font-sans text-xs tracking-[0.2em] text-wedding-primary uppercase font-semibold">
          El Gran Día
        </span>
        <h1 class="font-serif text-4xl sm:text-5xl text-wedding-neutral-dark font-light">
          Agenda &amp; Ubicación
        </h1>
        <p class="font-sans text-sm text-wedding-neutral-muted max-w-lg mx-auto">
          Queremos que nos acompañes en cada paso de esta celebración. A continuación te presentamos el cronograma y cómo llegar.
        </p>
      </div>

      <!-- CRONOGRAMA INTERACTIVO (TIMELINE) -->
      <div class="relative border-l border-wedding-primary/20 ml-4 md:ml-32 space-y-12 py-4">
        <div *ngFor="let item of agendaItems; let i = index" class="relative pl-8 md:pl-12">
          <!-- Círculo indicador con icono -->
          <div class="absolute -left-[19px] top-1 bg-wedding-neutral-bone border-2 border-wedding-primary text-wedding-primary rounded-full w-9 h-9 flex items-center justify-center shadow-sm">
            <span class="text-base">{{ item.icon }}</span>
          </div>

          <!-- Hora en Desktop a la izquierda -->
          <div class="hidden md:block absolute -left-32 top-2 w-24 text-right">
            <span class="font-sans font-semibold text-wedding-accent text-sm tracking-wider uppercase">
              {{ item.time }}
            </span>
          </div>

          <!-- Tarjeta de evento -->
          <div class="bg-white border border-wedding-primary/10 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
            <!-- Hora en móvil -->
            <div class="md:hidden">
              <span class="font-sans font-semibold text-wedding-accent text-xs tracking-wider uppercase">
                {{ item.time }}
              </span>
            </div>

            <div class="space-y-1">
              <h3 class="font-serif text-xl sm:text-2xl text-wedding-neutral-dark font-light">
                {{ item.title }}
              </h3>
              <p class="font-sans font-medium text-wedding-primary text-xs tracking-wide">
                📍 {{ item.location }}
              </p>
            </div>

            <p class="font-sans text-sm text-wedding-neutral-muted leading-relaxed">
              {{ item.description }}
            </p>

            <div class="pt-2" *ngIf="item.mapsUrl">
              <a [href]="item.mapsUrl" target="_blank" rel="noopener noreferrer" 
                 class="btn-gold-outline inline-flex items-center gap-2 py-2 px-4 text-xs font-sans">
                Ver en Google Maps
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>

            <div class="pt-2" *ngIf="!item.mapsUrl && item.noMapText">
              <span class="inline-flex items-center gap-2 py-2.5 px-5 text-xs font-sans font-semibold text-wedding-accent-dark bg-wedding-primary-light/10 rounded-md border border-wedding-primary/20">
                🚌 {{ item.noMapText }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- SECCIÓN INFORMACIÓN GENERAL (RECOMENDACIONES) -->
      <section class="grid md:grid-cols-2 gap-8 pt-8">
        <div class="bg-wedding-neutral-cream/40 border border-wedding-primary/10 rounded-lg p-8 space-y-4">
          <h3 class="font-serif text-xl text-wedding-neutral-dark font-light flex items-center gap-2">
            <span>🤵👗</span> Código de Vestimenta
          </h3>
          <p class="font-sans text-sm text-wedding-neutral-muted leading-relaxed">
            Queremos que disfrutes al máximo y te sientas cómodo, luciendo impecable y elegante en este día tan especial. Agradecemos evitar el color blanco y tonos hueso/crema en la vestimenta para uso exclusivo de la novia.
          </p>
        </div>

        <div class="bg-wedding-neutral-cream/40 border border-wedding-primary/10 rounded-lg p-8 space-y-4">
          <h3 class="font-serif text-xl text-wedding-neutral-dark font-light flex items-center gap-2">
            <span>🚗🏨</span> Transporte &amp; Hospedaje
          </h3>
          <p class="font-sans text-sm text-wedding-neutral-muted leading-relaxed">
            Para tu comodidad, brindaremos transporte hacia la playa desde el aeropuerto. Escríbenos para ayudarte con la logística de tus traslados y recomendarte cabañas locales frente al mar. Para más información en el siguiente enlace:
            <a href="https://jackyesgutierrez.my.canva.site/hoteles" target="_blank" rel="noopener noreferrer" class="text-wedding-primary hover:underline">Hoteles Recomendados</a>.
          </p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AgendaComponent {
  agendaItems: AgendaItem[] = [
    {
      time: '10:00 Hrs',
      title: 'Ceremonia Religiosa (No Obligatoria)',
      location: 'Capilla Santo Domingo de Guzmán, Mayapo',
      description: 'Nuestra bendición y unión sagrada se llevará a cabo en la hermosa Capilla Santo Domingo de Guzmán. Te sugerimos asistir con vestimenta cómoda y formal y llegar 15 minutos antes.',
      mapsUrl: '',
      noMapText: '¡Nosotros te llevamos!',
      icon: '⛪'
    },
    {
      time: '15:30 Hrs',
      title: 'Ceremonia Oficial',
      location: 'Playa Escondida (Hotel Orión), Mayapo',
      description: 'Nos reuniremos en Playa Escondida frente al mar para la ceremonia simbólica. Teniendo como testigo la puesta de sol, celebraremos al finalizar con un cóctel de bienvenida, brisa caribeña y música.',
      mapsUrl: 'https://maps.google.com/?q=Hotel+Orion+Mayapo,+La+Guajira',
      icon: '🌅'
    },
    {
      time: '18:00 Hrs',
      title: 'Cena & Fiesta',
      location: 'Restaurante del Hotel Orión, Mayapo',
      description: 'Compartiremos un banquete caribeño especial en el área del restaurante del Hotel Orión. Brindaremos por nuestro futuro y bailaremos junto a la playa hasta que termine la noche.',
      mapsUrl: 'https://maps.google.com/?q=Hotel+Orion+Mayapo,+La+Guajira',
      icon: '🍹'
    }
  ];
}
