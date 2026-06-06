import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface Photo {
  _id?: string;
  url: string;
  publicId: string;
  seccion: 'oficiales' | 'invitados';
  subidoPor: string;
  aprobado: boolean;
  createdAt?: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-6xl mx-auto px-4 py-16 animate-fade-in space-y-12">
      
      <!-- CABECERA -->
      <div class="text-center space-y-4">
        <span class="font-sans text-xs tracking-[0.2em] text-wedding-primary uppercase font-semibold">
          Nuestros Recuerdos
        </span>
        <h1 class="font-serif text-4xl sm:text-5xl text-wedding-neutral-dark font-light">
          Galería de Fotos
        </h1>
        <p class="font-sans text-sm text-wedding-neutral-muted max-w-lg mx-auto">
          Disfruta de las fotos oficiales del evento o comparte las tuyas directamente desde tu teléfono para sumarlas a los recuerdos de los novios.
        </p>
      </div>

      <!-- FORMULARIO DE AUTORIZACIÓN (NOMBRE Y PIN) -->
      <section class="max-w-2xl mx-auto bg-white border border-wedding-primary/10 rounded-xl p-6 shadow-sm space-y-4">
        <h3 class="font-serif text-lg text-wedding-neutral-dark font-light flex items-center gap-2">
          <span>🔒</span> Datos para subir fotos
        </h3>
        <p class="text-xs text-wedding-neutral-muted">
          Ingresa tu nombre y el PIN de seguridad impreso en la invitación para habilitar la zona de carga de fotos.
        </p>
        
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="label-gold">Tu Nombre</label>
            <input 
              type="text" 
              placeholder="Ej. Primo Andrés" 
              class="input-gold" 
              [(ngModel)]="uploaderName" 
            />
          </div>
          <div class="space-y-1">
            <label class="label-gold">PIN de la Invitación</label>
            <input 
              type="text" 
              placeholder="Ej. bodamayapo2026" 
              class="input-gold" 
              [(ngModel)]="weddingPin" 
            />
          </div>
        </div>
      </section>

      <!-- ZONA DE CARGA (DRAG & DROP) -->
      <section class="max-w-2xl mx-auto">
        <div 
          (dragover)="onDragOver($event)"
          (dragleave)="onDragLeave($event)"
          (drop)="onDrop($event)"
          [class.border-wedding-accent]="isDragging"
          [ngClass]="{ 'bg-wedding-primary-light/5': isDragging }"
          class="border-2 border-dashed border-wedding-primary/30 rounded-xl p-8 text-center bg-white shadow-sm hover:border-wedding-primary transition-all duration-300 relative"
        >
          <input 
            type="file" 
            id="fileUpload" 
            (change)="onFileSelected($event)" 
            accept="image/*" 
            class="hidden" 
          />
          
          <div class="space-y-4" *ngIf="!isUploading">
            <span class="text-4xl block">📸</span>
            <div class="space-y-1">
              <p class="font-sans text-sm font-medium text-wedding-neutral-dark">
                Arrastra tus fotos aquí o 
                <label for="fileUpload" class="text-wedding-accent hover:text-wedding-accent-dark cursor-pointer font-semibold underline transition-colors duration-200">
                  búscalas en tu dispositivo
                </label>
              </p>
              <p class="text-[11px] text-wedding-neutral-muted">Formatos soportados: JPG, PNG. Máx. 10MB.</p>
            </div>
          </div>

          <!-- Spinner de Carga Simulado -->
          <div class="space-y-4 py-4" *ngIf="isUploading">
            <div class="inline-flex items-center justify-center w-12 h-12">
              <svg class="animate-spin h-8 w-8 text-wedding-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p class="font-sans text-xs text-wedding-neutral-muted">Subiendo y procesando imagen en la nube...</p>
          </div>
        </div>

        <!-- Mensaje de Estado / Feedback del Criterio de Subida -->
        <div *ngIf="uploadFeedback" class="mt-4 p-4 rounded-md text-xs sm:text-sm font-sans text-center transition-all duration-200"
             [ngClass]="{
               'bg-green-50 border border-green-200 text-green-800': uploadStatus === 'success',
               'bg-red-50 border border-red-200 text-red-800': uploadStatus === 'error'
             }">
          {{ uploadFeedback }}
        </div>
      </section>

      <!-- FILTROS DE CATEGORÍA -->
      <div class="flex justify-center gap-3 border-b border-wedding-primary/10 pb-4">
        <button 
          (click)="setFilter('todos')" 
          [class.text-wedding-accent]="filter === 'todos'"
          [class.border-wedding-accent]="filter === 'todos'"
          class="font-sans text-xs tracking-wider uppercase font-semibold pb-2 border-b-2 border-transparent hover:text-wedding-accent hover:border-wedding-accent/30 transition-all duration-200"
        >
          Ver Todas
        </button>
        <button 
          (click)="setFilter('oficiales')" 
          [class.text-wedding-accent]="filter === 'oficiales'"
          [class.border-wedding-accent]="filter === 'oficiales'"
          class="font-sans text-xs tracking-wider uppercase font-semibold pb-2 border-b-2 border-transparent hover:text-wedding-accent hover:border-wedding-accent/30 transition-all duration-200"
        >
          Oficiales
        </button>
        <button 
          (click)="setFilter('invitados')" 
          [class.text-wedding-accent]="filter === 'invitados'"
          [class.border-wedding-accent]="filter === 'invitados'"
          class="font-sans text-xs tracking-wider uppercase font-semibold pb-2 border-b-2 border-transparent hover:text-wedding-accent hover:border-wedding-accent/30 transition-all duration-200"
        >
          De Invitados
        </button>
      </div>

      <!-- GRILLA DE IMÁGENES -->
      <div *ngIf="isLoading" class="text-center py-12 font-sans text-sm text-wedding-neutral-muted">
        Cargando la galería...
      </div>

      <div *ngIf="!isLoading && filteredPhotos.length === 0" class="text-center py-16 bg-wedding-neutral-cream/20 border border-dashed border-wedding-primary/10 rounded-xl font-sans text-sm text-wedding-neutral-muted">
        No se encontraron fotos en esta sección.
      </div>

      <div *ngIf="!isLoading && filteredPhotos.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fade-in">
        <div *ngFor="let photo of filteredPhotos" (click)="openModal(photo)" class="group bg-white border border-wedding-primary/5 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative cursor-pointer">
          <!-- Contenedor con ratio aspecto fijo -->
          <div class="aspect-[4/3] overflow-hidden bg-wedding-neutral-cream relative">
            <img 
              [src]="photo.url" 
              alt="Foto de Boda" 
              class="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" 
            />
            <!-- Overlay con detalles al pasar el mouse -->
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
              <span class="text-[10px] uppercase tracking-wider text-wedding-primary-light">
                Sección: {{ photo.seccion === 'oficiales' ? 'Oficiales' : 'Invitados' }}
              </span>
              <p class="font-sans text-xs font-semibold">Subido por: {{ photo.subidoPor }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL DETALLE DE FOTO -->
      <div *ngIf="selectedPhoto" (click)="closeModal()" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
        <div (click)="$event.stopPropagation()" class="bg-white rounded-xl overflow-hidden max-w-4xl w-full shadow-2xl relative max-h-[90vh] flex flex-col md:flex-row animate-scale-up">
          
          <!-- Botón de Cerrar -->
          <button (click)="closeModal()" class="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors duration-200 text-lg font-bold">
            ✕
          </button>

          <!-- Imagen en Grande -->
          <div class="md:w-2/3 bg-black flex items-center justify-center min-h-[300px] md:max-h-[80vh]">
            <img [src]="selectedPhoto.url" alt="Foto Ampliada" class="max-w-full max-h-[50vh] md:max-h-[80vh] object-contain" />
          </div>

          <!-- Detalles de la Foto -->
          <div class="md:w-1/3 p-6 flex flex-col justify-between bg-wedding-neutral-cream/30 space-y-6">
            <div class="space-y-4">
              <span class="font-sans text-[10px] tracking-[0.2em] text-wedding-primary uppercase font-bold block">
                Detalles del Recuerdo
              </span>
              
              <div class="space-y-3 font-sans text-sm">
                <div>
                  <span class="text-xs font-semibold text-wedding-neutral-muted uppercase block mb-1">Subido Por</span>
                  <p class="text-wedding-neutral-dark font-medium text-base">{{ selectedPhoto.subidoPor }}</p>
                </div>

                <div>
                  <span class="text-xs font-semibold text-wedding-neutral-muted uppercase block mb-1">Categoría</span>
                  <span class="inline-block px-2.5 py-1 text-xs rounded-full font-semibold uppercase tracking-wider mt-1"
                        [ngClass]="{
                          'bg-wedding-primary/10 text-wedding-primary-dark': selectedPhoto.seccion === 'oficiales',
                          'bg-wedding-accent/10 text-wedding-accent': selectedPhoto.seccion === 'invitados'
                        }">
                    {{ selectedPhoto.seccion === 'oficiales' ? 'Oficial' : 'Invitados' }}
                  </span>
                </div>

                <div *ngIf="selectedPhoto.createdAt">
                  <span class="text-xs font-semibold text-wedding-neutral-muted uppercase block mb-1">Fecha de Subida</span>
                  <p class="text-wedding-neutral-dark font-light text-xs">
                    {{ selectedPhoto.createdAt | date:'d/MM/yyyy, h:mm a' }}
                  </p>
                </div>
              </div>
            </div>

            <div class="border-t border-wedding-primary/10 pt-4 flex flex-col space-y-2">
              <p class="text-[11px] text-wedding-neutral-muted leading-relaxed">
                Este recuerdo forma parte del álbum digital de Cristian & Jacky. ¡Gracias por compartirlo!
              </p>
              <button (click)="closeModal()" class="btn-gold-outline w-full py-2 text-xs tracking-wider uppercase">
                Cerrar Ventana
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
  `]
})
export class GalleryComponent implements OnInit {
  photos: Photo[] = [];
  filteredPhotos: Photo[] = [];
  filter: 'todos' | 'oficiales' | 'invitados' = 'todos';
  isLoading = true;
  isDragging = false;
  isUploading = false;
  selectedPhoto: Photo | null = null;

  // Variables para la validación del invitado
  uploaderName = '';
  weddingPin = '';

  // Mensajes de retroalimentación
  uploadFeedback = '';
  uploadStatus: 'success' | 'error' | '' = '';

  private apiUrl = 'https://boda-backend-sbhc.onrender.com/gallery';

  // Configuración de Cloudinary para producción (Unsigned uploads)
  // Reemplazar con datos reales al crear la cuenta de Cloudinary
  private cloudinaryCloudName = 'dhevife8w'; 
  private cloudinaryUploadPreset = 'boda_preset';

  // Arreglo de respaldo vacío para iniciar sin fotos precargadas
  private fallbackPhotos: Photo[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPhotos();
  }

  openModal(photo: Photo) {
    this.selectedPhoto = photo;
  }

  closeModal() {
    this.selectedPhoto = null;
  }

  fetchPhotos() {
    this.isLoading = true;
    this.http.get<Photo[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Error al obtener fotos del backend:', error);
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe(photos => {
        if (photos && photos.length > 0) {
          this.photos = photos;
        } else {
          this.photos = [...this.fallbackPhotos];
        }
        this.applyFilter();
        this.isLoading = false;
      });
  }

  setFilter(newFilter: 'todos' | 'oficiales' | 'invitados') {
    this.filter = newFilter;
    this.applyFilter();
  }

  private applyFilter() {
    if (this.filter === 'todos') {
      this.filteredPhotos = this.photos;
    } else {
      this.filteredPhotos = this.photos.filter(p => p.seccion === this.filter);
    }
  }

  // DRAG & DROP MANEJADORES
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.uploadFile(files[0]);
    }
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.uploadFile(files[0]);
    }
  }

  // Subida de archivo con validaciones y asignación automática por PIN
  private uploadFile(file: File) {
    // 1. Validar campos
    if (!this.uploaderName || !this.uploaderName.trim()) {
      this.showFeedback('Por favor, ingresa tu nombre en la sección "Datos para subir fotos" antes de arrastrar el archivo.', 'error');
      return;
    }

    if (!this.weddingPin || !this.weddingPin.trim()) {
      this.showFeedback('Por favor, ingresa el PIN de seguridad de la invitación.', 'error');
      return;
    }

    // 2. Validar tipo
    if (!file.type.startsWith('image/')) {
      this.showFeedback('Por favor, selecciona únicamente archivos de imagen (JPG, PNG, WEBP).', 'error');
      return;
    }

    // 3. Validar peso
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      this.showFeedback('La imagen es demasiado grande. El límite permitido es de 10 MB.', 'error');
      return;
    }

    this.isUploading = true;
    this.uploadFeedback = '';
    this.uploadStatus = '';

    // Preparar FormData para subir a Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.cloudinaryUploadPreset);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${this.cloudinaryCloudName}/image/upload`;

    // Subir imagen física a Cloudinary
    this.http.post<any>(cloudinaryUrl, formData)
      .pipe(
        catchError(err => {
          console.error('Error al subir imagen a Cloudinary:', err);
          this.showFeedback('Error al subir la imagen al servidor de almacenamiento en la nube.', 'error');
          this.isUploading = false;
          return of(null);
        })
      )
      .subscribe(cloudinaryRes => {
        if (!cloudinaryRes) return;

        // Registrar los metadatos obtenidos de Cloudinary en el backend
        const payload = {
          url: cloudinaryRes.secure_url,
          publicId: cloudinaryRes.public_id,
          subidoPor: this.uploaderName.trim(),
          pin: this.weddingPin.trim()
        };

        this.http.post<Photo>(this.apiUrl, payload)
          .pipe(
            catchError(err => {
              console.error('Error al registrar la foto en el backend:', err);
              const errorMessage = err.error?.message 
                ? (Array.isArray(err.error.message) ? err.error.message.join(', ') : err.error.message)
                : 'Error al autorizar y registrar la foto en el servidor.';
              
              this.showFeedback(errorMessage, 'error');
              this.isUploading = false;
              return of(null);
            })
          )
          .subscribe(savedPhoto => {
            this.isUploading = false;
            if (savedPhoto) {
              if (savedPhoto.aprobado) {
                this.showFeedback('¡Foto oficial subida y publicada exitosamente!', 'success');
              } else {
                this.showFeedback(
                  '¡Foto subida con éxito! Estará visible en la sección de Invitados una vez sea aprobada por los novios.',
                  'success'
                );
              }

              // Añadir al listado local
              this.photos.unshift(savedPhoto);
              this.applyFilter();
            }
          });
      });
  }

  private showFeedback(message: string, status: 'success' | 'error') {
    this.uploadFeedback = message;
    this.uploadStatus = status;
  }
}
