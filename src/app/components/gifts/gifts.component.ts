import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gifts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-16 animate-fade-in space-y-16">
      
      <!-- CABECERA -->
      <div class="text-center space-y-4">
        <span class="font-sans text-xs tracking-[0.2em] text-wedding-primary uppercase font-semibold">
          Detalles de Boda
        </span>
        <h1 class="font-serif text-4xl sm:text-5xl text-wedding-neutral-dark font-light">
          Lluvia de Sobres
        </h1>
        <p class="font-sans text-sm text-wedding-neutral-muted max-w-lg mx-auto leading-relaxed">
          Tu presencia en nuestro gran día es el regalo más valioso que podríamos recibir. Sin embargo, si deseas tener un detalle con nosotros, te compartimos cómo puedes hacerlo.
        </p>
        <div class="w-12 h-[1px] bg-wedding-primary/30 mx-auto pt-2"></div>
      </div>

      <!-- OPCIONES DE REGALO -->
      <div class="grid md:grid-cols-2 gap-8">
        
        <!-- Tarjeta Cofre Físico -->
        <div class="bg-white border border-wedding-primary/10 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-16 h-16 bg-wedding-primary-light/5 rounded-bl-full flex items-center justify-center text-xl text-wedding-primary">
            ✉️
          </div>
          
          <div class="space-y-4">
            <h3 class="font-serif text-2xl text-wedding-neutral-dark font-light">
              Lluvia de Sobres Física
            </h3>
            <p class="font-sans text-sm text-wedding-neutral-muted leading-relaxed">
              Si prefieres darnos tu regalo o dedicatoria por medio de un sobre tradicional en físico, dispondremos de un **cofre especial** en el salón del evento durante la recepción para que puedas depositarlo de manera cómoda.
            </p>
          </div>
          
          <div class="bg-wedding-neutral-cream/40 rounded-lg p-4 text-center">
            <span class="text-xs font-semibold text-wedding-primary uppercase tracking-wider font-sans block">
              📥 Cofre disponible en el evento
            </span>
          </div>
        </div>

        <!-- Tarjeta Transferencia Digital -->
        <div class="bg-white border border-wedding-primary/10 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-16 h-16 bg-wedding-accent-light/5 rounded-bl-full flex items-center justify-center text-xl text-wedding-accent">
            📱🔑
          </div>
          
          <div class="space-y-4">
            <h3 class="font-serif text-2xl text-wedding-neutral-dark font-light">
              Transferencia / Bre-B
            </h3>
            <p class="font-sans text-sm text-wedding-neutral-muted leading-relaxed">
              Si te resulta más cómodo hacernos llegar tu obsequio mediante transferencia digital, puedes hacerlo de manera rápida a través del sistema de llaves **Bre-B** o a nuestra cuenta bancaria directa:
            </p>
          </div>

          <div class="bg-wedding-neutral-cream/40 rounded-lg p-5 space-y-3 font-sans text-xs">
            <div class="flex justify-between border-b border-wedding-primary/10 pb-1.5">
              <span class="font-semibold text-wedding-neutral-muted">Llave Bre-B:</span>
              <span class="text-wedding-neutral-dark font-medium">1052411814</span>
            </div>
            <div class="flex justify-between border-b border-wedding-primary/10 pb-1.5">
              <span class="font-semibold text-wedding-neutral-muted">Banco:</span>
              <span class="text-wedding-neutral-dark font-medium">Bancolombia</span>
            </div>
            <div class="flex justify-between border-b border-wedding-primary/10 pb-1.5">
              <span class="font-semibold text-wedding-neutral-muted">Tipo de Cuenta:</span>
              <span class="text-wedding-neutral-dark font-medium">Ahorros</span>
            </div>
            <div class="flex justify-between border-b border-wedding-primary/10 pb-1.5">
              <span class="font-semibold text-wedding-neutral-muted">Número:</span>
              <span class="text-wedding-neutral-dark font-medium">262-446-03148</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold text-wedding-neutral-muted">Titular:</span>
              <span class="text-wedding-neutral-dark font-medium">Cristian Ladino</span>
            </div>
          </div>
        </div>

      </div>

      <!-- NOTA DE REASURACIÓN -->
      <div class="text-center bg-wedding-neutral-cream/20 border border-dashed border-wedding-primary/20 rounded-xl p-8 max-w-xl mx-auto space-y-2">
        <span class="text-xl">🤍</span>
        <h4 class="font-serif text-lg text-wedding-neutral-dark font-light">No es Obligatorio</h4>
        <p class="font-sans text-xs text-wedding-neutral-muted leading-relaxed">
          Recuerda que no tienes ninguna obligación de darnos un obsequio; lo más importante para nosotros es poder contar con tu compañía y celebrar juntos este día tan feliz.
        </p>
      </div>

    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class GiftsComponent {}
