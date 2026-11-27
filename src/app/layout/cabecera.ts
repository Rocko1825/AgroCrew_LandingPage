import { Component, afterNextRender, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TemaService } from '../core/tema.service';
import { TraducirPipe, cambiarIdioma, idioma } from '../core/i18n';
import { entorno } from '../../environments/entorno';

@Component({
  selector: 'app-cabecera',
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    TraducirPipe,
  ],
  templateUrl: './cabecera.html',
  styleUrl: './cabecera.scss',
  host: {
    '(window:scroll)': 'alDesplazar()',
  },
})
export class Cabecera {
  protected readonly tema = inject(TemaService);
  protected readonly idioma = idioma;
  protected readonly appUrl = entorno.appUrl;
  protected readonly conBorde = signal(false);

  private readonly router = inject(Router);
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  /** En el inicio, mientras no se haya hecho scroll, la barra es transparente sobre la portada. */
  protected readonly transparente = computed(
    () => this.url().split(/[?#]/)[0] === '/' && !this.conBorde(),
  );

  constructor() {
    // Si la página se abre ya desplazada (recarga a mitad de página), la barra empieza sólida.
    afterNextRender(() => this.alDesplazar());
  }

  protected readonly enlaces = [
    { ancla: 'funcionalidades', texto: 'Funcionalidades' },
    { ancla: 'como-funciona', texto: 'Cómo funciona' },
    { ancla: 'para-quien', texto: 'Para quién es' },
    { ancla: 'impacto', texto: 'Impacto' },
    { ancla: 'proyecto', texto: 'El proyecto' },
  ];

  protected alDesplazar(): void {
    this.conBorde.set(window.scrollY > 8);
  }

  protected alternarIdioma(): void {
    cambiarIdioma(this.idioma === 'es' ? 'en' : 'es');
  }
}
