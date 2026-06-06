import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rsvp.component.html',
  styleUrls: []
})
export class RsvpComponent implements OnInit {
  rsvpForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  // Menús de necesidades especiales disponibles para los invitados
  menus = [
    { value: 'normal', label: 'Menú Tradicional' },
    { value: 'vegetariano', label: 'Menú Vegetariano' },
    { value: 'celiaco', label: 'Menú Sin Gluten (Celíaco)' },
    { value: 'infantil', label: 'Menú Infantil' },
    { value: 'vegano', label: 'Menú Vegano' }
  ];

  // Opciones de comida principal solicitadas
  comidas = [
    { value: 'Arroz de camarones', label: 'Arroz de Camarones 🍤🍚' },
    { value: 'Pescado', label: 'Pescado Frito 🐟' },
    { value: 'Frichi', label: 'Frichi (Chivo Tradicional de La Guajira) 🐐' }
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.rsvpForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email]],
      telefono: [''],
      asistira: [null, [Validators.required]],
      comida: [''], // Elección de comida del invitado
      restriccionesAlimenticias: [''],
      mensaje: ['']
    });

    // Suscribirse a cambios en "asistira" para exigir comida si confirma asistencia
    this.rsvpForm.get('asistira')?.valueChanges.subscribe((asiste: boolean) => {
      const comidaCtrl = this.rsvpForm.get('comida');
      if (asiste) {
        comidaCtrl?.setValidators([Validators.required]);
      } else {
        comidaCtrl?.clearValidators();
        comidaCtrl?.setValue('');
      }
      comidaCtrl?.updateValueAndValidity();
    });
  }

  // Enviar formulario al backend
  onSubmit() {
    if (this.rsvpForm.invalid) {
      this.rsvpForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';
    this.submitSuccess = false;

    const formRawValue = this.rsvpForm.value;
    
    // Mapear los datos para registrar de manera individual a la persona
    const payload = {
      nombre: formRawValue.nombre,
      email: formRawValue.email || undefined,
      telefono: formRawValue.telefono || undefined,
      asistira: formRawValue.asistira,
      comida: formRawValue.asistira ? formRawValue.comida : undefined,
      restriccionesAlimenticias: formRawValue.restriccionesAlimenticias || undefined,
      mensaje: formRawValue.mensaje || undefined,
      cancionesSugeridas: []
    };

    // Dirección local del backend de NestJS
    const apiUrl = 'https://boda-backend-sbhc.onrender.com/invitados';

    this.http.post(apiUrl, payload)
      .pipe(
        catchError(error => {
          console.error('Error al registrar RSVP:', error);
          this.submitError = error.error?.message 
            ? (Array.isArray(error.error.message) ? error.error.message.join(', ') : error.error.message)
            : 'Ocurrió un error al enviar tu confirmación. Por favor, inténtalo más tarde.';
          this.isSubmitting = false;
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.submitSuccess = true;
          this.isSubmitting = false;
          this.rsvpForm.reset({ asistira: null });
        }
      });
  }
}
