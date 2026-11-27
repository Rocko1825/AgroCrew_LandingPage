import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { t } from './i18n';

/** Traduce el título de cada ruta antes de ponerlo en la pestaña del navegador. */
@Injectable({ providedIn: 'root' })
export class TituloTraducido extends TitleStrategy {
  private readonly title = inject(Title);

  override updateTitle(estado: RouterStateSnapshot): void {
    const titulo = this.buildTitle(estado);
    if (titulo) this.title.setTitle(t(titulo));
  }
}
