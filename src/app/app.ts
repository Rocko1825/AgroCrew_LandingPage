import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecera } from './layout/cabecera';
import { Pie } from './layout/pie';
import { TraducirPipe } from './core/i18n';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cabecera, Pie, TraducirPipe],
  template: `
    <a class="saltar" href="#contenido">{{ 'Saltar al contenido' | t }}</a>
    <app-cabecera />
    <main id="contenido">
      <router-outlet />
    </main>
    <app-pie />
  `,
  styles: `
    .saltar {
      position: absolute;
      left: 12px;
      top: -60px;
      z-index: 100;
      padding: 10px 14px;
      border-radius: 8px;
      background: var(--ac-verde);
      color: #fff;
    }
    .saltar:focus {
      top: 12px;
    }
  `,
})
export class App {}
