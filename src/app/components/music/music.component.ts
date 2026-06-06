import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface SuggestedSong {
  _id?: string;
  titulo: string;
  artista: string;
  sugeridoPor: string;
  createdAt?: string;
}

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-16 animate-fade-in space-y-16">
      
      <!-- CABECERA -->
      <div class="text-center space-y-4">
        <span class="font-sans text-xs tracking-[0.2em] text-wedding-primary uppercase font-semibold">
          La Playlist de la Fiesta
        </span>
        <h1 class="font-serif text-4xl sm:text-5xl text-wedding-neutral-dark font-light">
          Sugiere Canciones
        </h1>
        <p class="font-sans text-sm text-wedding-neutral-muted max-w-lg mx-auto">
          ¿Hay alguna canción que no puede faltar en la fiesta? Selecciona tu nombre, dinos cuál es y la sumaremos a la pista de baile (máx. 2 canciones por persona).
        </p>
      </div>

      <div class="grid md:grid-cols-5 gap-10 items-start">
        <!-- FORMULARIO DE SUGERENCIAS -->
        <div class="bg-white border border-wedding-primary/10 rounded-xl p-6 sm:p-8 shadow-md md:col-span-2 space-y-6">
          <h2 class="font-serif text-2xl text-wedding-neutral-dark font-light pb-2 border-b border-wedding-primary/10">
            Añadir Canción
          </h2>

          <div *ngIf="submitSuccess" class="p-4 bg-wedding-primary/10 text-wedding-primary-dark text-xs sm:text-sm rounded-md text-center animate-fade-in">
            <span class="block text-2xl mb-1">🎵</span>
            <strong>¡Sugerencia enviada!</strong>
            <p class="text-wedding-neutral-muted text-xs mt-1">La canción se ha agregado a la lista del evento.</p>
          </div>

          <form [formGroup]="musicForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <!-- Título -->
            <div class="space-y-1">
              <label for="titulo" class="label-gold">Título de la Canción</label>
              <input 
                type="text" 
                id="titulo" 
                formControlName="titulo" 
                placeholder="Ej. Dancing Queen" 
                class="input-gold"
                [class.border-red-400]="musicForm.get('titulo')?.touched && musicForm.get('titulo')?.invalid"
              />
              <div *ngIf="musicForm.get('titulo')?.touched && musicForm.get('titulo')?.invalid" class="text-xs text-red-500 font-sans mt-1">
                El título de la canción es requerido.
              </div>
            </div>

            <!-- Artista -->
            <div class="space-y-1">
              <label for="artista" class="label-gold">Artista / Grupo</label>
              <input 
                type="text" 
                id="artista" 
                formControlName="artista" 
                placeholder="Ej. ABBA" 
                class="input-gold"
                [class.border-red-400]="musicForm.get('artista')?.touched && musicForm.get('artista')?.invalid"
              />
              <div *ngIf="musicForm.get('artista')?.touched && musicForm.get('artista')?.invalid" class="text-xs text-red-500 font-sans mt-1">
                El nombre del artista es requerido.
              </div>
            </div>

            <!-- Selector de Nombre (Invitados Confirmados) -->
            <div class="space-y-1">
              <label for="sugeridoPor" class="label-gold">Tu Nombre</label>
              <select 
                id="sugeridoPor" 
                formControlName="sugeridoPor" 
                class="input-gold"
                [class.border-red-400]="musicForm.get('sugeridoPor')?.touched && musicForm.get('sugeridoPor')?.invalid"
              >
                <option value="" disabled selected>Selecciona tu nombre...</option>
                <option *ngFor="let name of confirmedGuests" [value]="name">{{ name }}</option>
              </select>
              <div *ngIf="musicForm.get('sugeridoPor')?.touched && musicForm.get('sugeridoPor')?.invalid" class="text-xs text-red-500 font-sans mt-1">
                Debes seleccionar tu nombre de la lista.
              </div>
              <p class="text-[10px] text-wedding-neutral-muted italic mt-2 leading-relaxed">
                *Si tu nombre no aparece, primero debes confirmar tu asistencia en la sección de RSVP.
              </p>
            </div>

            <!-- Botón -->
            <button 
              type="submit" 
              [disabled]="isSubmitting || confirmedGuests.length === 0"
              class="btn-gold w-full flex items-center justify-center gap-2 py-3 disabled:opacity-50"
            >
              <span *ngIf="!isSubmitting">Sugerir Canción</span>
              <span *ngIf="isSubmitting">Enviando...</span>
            </button>
            <p class="text-[10px] text-wedding-neutral-muted text-center mt-2 font-sans italic">
              *Puedes sugerir máximo 2 canciones
            </p>
          </form>
        </div>

        <!-- LISTA DE CANCIONES SUGERIDAS -->
        <div class="md:col-span-3 space-y-6">
          <h2 class="font-serif text-2xl text-wedding-neutral-dark font-light pb-2 border-b border-wedding-primary/10">
            Recomendaciones de los Invitados
          </h2>

          <div *ngIf="isLoading" class="text-center py-10 font-sans text-sm text-wedding-neutral-muted">
            Cargando la lista de canciones...
          </div>

          <div *ngIf="!isLoading && songs.length === 0" class="text-center py-10 border border-dashed border-wedding-primary/20 rounded-lg bg-wedding-neutral-cream/20 font-sans text-sm text-wedding-neutral-muted">
            Aún no hay canciones sugeridas. ¡Sé el primero en recomendar una!
          </div>

          <!-- Cuadrícula de canciones -->
          <div *ngIf="!isLoading && songs.length > 0" class="grid sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
            <div *ngFor="let song of songs" class="bg-white border border-wedding-primary/5 rounded-lg p-4 shadow-sm flex items-center justify-between gap-2 hover:border-wedding-primary/30 transition-all duration-300">
              <div class="flex items-center gap-4 min-w-0 flex-grow">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-wedding-neutral-cream flex items-center justify-center text-lg text-wedding-primary">
                  💿
                </div>
                <div class="min-w-0 flex-grow">
                  <p class="font-sans font-medium text-wedding-neutral-dark text-sm truncate">{{ song.titulo }}</p>
                  <p class="font-sans text-xs text-wedding-primary truncate">{{ song.artista }}</p>
                  <p class="text-[10px] text-wedding-neutral-muted mt-1 font-light italic truncate">
                    Sugerido por: {{ song.sugeridoPor }}
                  </p>
                </div>
              </div>

              <!-- Botón Eliminar -->
              <button 
                *ngIf="song._id"
                (click)="deleteSong(song)"
                class="flex-shrink-0 text-wedding-neutral-muted hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                title="Eliminar sugerencia"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-track {
      background: #f4efe9;
    }
    ::-webkit-scrollbar-thumb {
      background: #c1a283;
      border-radius: 2px;
    }
  `]
})
export class MusicComponent implements OnInit {
  musicForm!: FormGroup;
  songs: SuggestedSong[] = [];
  confirmedGuests: string[] = []; // Lista de invitados confirmados
  isLoading = true;
  isSubmitting = false;
  submitSuccess = false;

  private musicApiUrl = 'https://boda-backend-sbhc.onrender.com/music';
  private guestsApiUrl = 'https://boda-backend-sbhc.onrender.com/invitados';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initForm();
    this.fetchSongs();
    this.fetchConfirmedGuests();
  }

  private initForm() {
    this.musicForm = this.fb.group({
      titulo: ['', [Validators.required]],
      artista: ['', [Validators.required]],
      sugeridoPor: ['', [Validators.required]] // Será seleccionado del dropdown
    });
  }

  fetchSongs() {
    this.isLoading = true;
    this.http.get<SuggestedSong[]>(this.musicApiUrl)
      .pipe(
        catchError(error => {
          console.error('Error al obtener canciones:', error);
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe(songs => {
        this.songs = songs;
        this.isLoading = false;
      });
  }

  fetchConfirmedGuests() {
    this.http.get<any[]>(this.guestsApiUrl)
      .pipe(
        catchError(error => {
          console.error('Error al obtener invitados:', error);
          return of([]);
        })
      )
      .subscribe(invitados => {
        // Filtrar solo las personas que marcaron asistira = true
        this.confirmedGuests = invitados
          .filter(inv => inv.asistira === true)
          .map(inv => inv.nombre)
          .sort((a, b) => a.localeCompare(b));
      });
  }

  onSubmit() {
    if (this.musicForm.invalid) {
      this.musicForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;

    const payload = {
      titulo: this.musicForm.value.titulo,
      artista: this.musicForm.value.artista,
      sugeridoPor: this.musicForm.value.sugeridoPor // Nombre seleccionado
    };

    this.http.post<SuggestedSong>(this.musicApiUrl, payload)
      .pipe(
        catchError(error => {
          console.error('Error al sugerir canción:', error);
          // Capturar y mostrar mensaje de error del backend (como límite excedido)
          const errorMessage = error.error?.message || 'Error al conectar con el servidor para sugerir la canción.';
          alert(`Error: ${errorMessage}`);
          this.isSubmitting = false;
          return of(null);
        })
      )
      .subscribe(song => {
        this.isSubmitting = false;
        if (song) {
          this.submitSuccess = true;
          this.musicForm.reset({ sugeridoPor: '' });
          
          this.songs.unshift(song);

          setTimeout(() => {
            this.submitSuccess = false;
          }, 4000);
        }
      });
  }

  // Eliminar canción con PIN de seguridad de Administrador
  deleteSong(song: SuggestedSong) {
    if (!song._id) return;

    const pin = prompt('Ingresa el PIN de Administrador para eliminar esta canción:');
    
    if (pin === null || pin.trim() === '') {
      return;
    }

    const deleteUrl = `${this.musicApiUrl}/${song._id}?pin=${encodeURIComponent(pin.trim())}`;

    this.http.delete<{ message: string }>(deleteUrl)
      .pipe(
        catchError(err => {
          console.error('Error al eliminar la canción:', err);
          const errorMessage = err.error?.message || 'Error al conectar con el servidor para eliminar la canción.';
          alert(`Error: ${errorMessage}`);
          return of(null);
        })
      )
      .subscribe((res) => {
        if (res) {
          alert('La sugerencia de canción ha sido eliminada con éxito.');
          this.songs = this.songs.filter(s => s._id !== song._id);
        }
      });
  }
}
