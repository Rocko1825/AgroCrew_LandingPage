import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TraducirPipe } from '../core/i18n';
import { entorno } from '../../environments/entorno';

@Component({
  selector: 'app-pie',
  imports: [RouterLink, TraducirPipe],
  templateUrl: './pie.html',
  styleUrl: './pie.scss',
})
export class Pie {
  protected readonly anio = new Date().getFullYear();
  protected readonly entorno = entorno;
}
