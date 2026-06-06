import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'agenda',
    loadComponent: () => import('./components/agenda/agenda.component').then(m => m.AgendaComponent)
  },
  {
    path: 'rsvp',
    loadComponent: () => import('./components/rsvp/rsvp.component').then(m => m.RsvpComponent)
  },
  {
    path: 'music',
    loadComponent: () => import('./components/music/music.component').then(m => m.MusicComponent)
  },
  {
    path: 'gallery',
    loadComponent: () => import('./components/gallery/gallery.component').then(m => m.GalleryComponent)
  },
  {
    path: 'regalos',
    loadComponent: () => import('./components/gifts/gifts.component').then(m => m.GiftsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
