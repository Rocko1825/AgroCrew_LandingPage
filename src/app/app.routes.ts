import { Routes } from '@angular/router';

// Mismas rutas que la landing anterior: inicio, términos y cualquier otra ruta vuelve al inicio.
export const routes: Routes = [
  {
    path: '',
    title: 'AgroCrew · Descubre qué cultivos van con tu terreno',
    loadComponent: () => import('./paginas/inicio/inicio').then((m) => m.Inicio),
  },
  {
    path: 'terminos',
    title: 'Términos y condiciones · AgroCrew',
    loadComponent: () => import('./paginas/terminos/terminos').then((m) => m.Terminos),
  },
  { path: '**', redirectTo: '' },
];
