import { inject, provideAppInitializer } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Íconos de AgroCrew (los mismos trazos que usa la app web), registrados en
 * Angular Material para usarlos con <mat-icon svgIcon="nombre" />.
 */
const TRAZOS: Record<string, string[]> = {
  hoja: ['M5 19c0-8 6-14 14-14 0 8-6 14-14 14z', 'M5 19l8-8'],
  brote: ['M12 21v-8', 'M12 13c0-4-3-6-7-6 0 4 3 6 7 6z', 'M12 11c0-4 3-6 7-6 0 4-3 6-7 6z'],
  ubicacion: ['M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z', 'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'],
  usuarios: ['M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M2 21a7 7 0 0 1 14 0', 'M16 3.5a4 4 0 0 1 0 7', 'M18 14a7 7 0 0 1 4 7'],
  sol: ['M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z', 'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'],
  luna: ['M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z'],
  globo: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M3 12h18', 'M12 3c3 3 3 15 0 18c-3-3-3-15 0-18'],
  gota: ['M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z'],
  escudo: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z'],
  capas: ['M3 8l9-4 9 4-9 4z', 'M3 12l9 4 9-4', 'M3 16l9 4 9-4'],
  check: ['M5 12l5 5L20 7'],
  atras: ['M15 6l-6 6 6 6'],
  cerrar: ['M6 6l12 12M18 6L6 18'],
  chispa: ['M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z'],
  menu: ['M4 7h16M4 12h16M4 17h16'],
  codigo: ['M8 7l-5 5 5 5', 'M16 7l5 5-5 5', 'M14 4l-4 16'],
  servidor: ['M4 4h16v6H4z', 'M4 14h16v6H4z', 'M8 7h.01', 'M8 17h.01'],
  pantalla: ['M3 4h18v12H3z', 'M8 20h8', 'M12 16v4'],
  externo: ['M14 4h6v6', 'M20 4l-9 9', 'M18 14v6H4V6h6'],
  flecha: ['M5 12h14', 'M13 6l6 6-6 6'],
};

function svg(trazos: string[]): string {
  const paths = trazos.map((d) => `<path d="${d}"/>`).join('');
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    `stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`
  );
}

export function provideIconos() {
  return provideAppInitializer(() => {
    const registro = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    for (const [nombre, trazos] of Object.entries(TRAZOS)) {
      // Los SVG son constantes de este archivo, no vienen del usuario.
      registro.addSvgIconLiteral(nombre, sanitizer.bypassSecurityTrustHtml(svg(trazos)));
    }
  });
}
