import { Component, input } from '@angular/core';

/**
 * Mapa topográfico decorativo: curvas de nivel calculadas sobre un terreno
 * de ejemplo (tres cerros) con el algoritmo "marching squares".
 * Cada 4 curvas se dibuja una más gruesa (curva maestra), como en los mapas del IGN,
 * y se marca un predio con línea discontinua.
 */
const ANCHO = 720;
const ALTO = 560;
const CELDA = 8;
const NIVELES = 12;
const ALTITUD_BASE = 3400; // m s. n. m. del nivel más bajo
const PASO_ALTITUD = 50;

interface Cerro {
  x: number;
  y: number;
  sx: number;
  sy: number;
  altura: number;
}

const CERROS: Cerro[] = [
  { x: 360, y: 190, sx: 175, sy: 125, altura: 1 },
  { x: 110, y: 470, sx: 130, sy: 110, altura: 0.72 },
  { x: 650, y: 500, sx: 95, sy: 85, altura: 0.42 },
];

function elevacion(x: number, y: number): number {
  let z = 0;
  for (const c of CERROS) {
    const dx = (x - c.x) / c.sx;
    const dy = (y - c.y) / c.sy;
    z += c.altura * Math.exp(-(dx * dx + dy * dy));
  }
  // Pequeña ondulación para que las curvas no queden perfectamente lisas.
  return z + 0.035 * Math.sin(x / 41 + y / 67) * Math.cos(y / 53 - x / 97);
}

interface Curva {
  d: string;
  maestra: boolean;
}

interface Etiqueta {
  x: number;
  y: number;
  texto: string;
}

function calcularCurvas(): { curvas: Curva[]; etiquetas: Etiqueta[] } {
  const columnas = Math.ceil(ANCHO / CELDA) + 1;
  const filas = Math.ceil(ALTO / CELDA) + 1;
  const z: number[][] = [];
  for (let j = 0; j < filas; j++) {
    z.push([]);
    for (let i = 0; i < columnas; i++) z[j].push(elevacion(i * CELDA, j * CELDA));
  }

  const curvas: Curva[] = [];
  const niveles: number[] = [];
  for (let n = 1; n <= NIVELES; n++) niveles.push(n * 0.08);

  niveles.forEach((nivel, n) => {
    const partes: string[] = [];
    const interp = (a: number, b: number) => (nivel - a) / (b - a);
    for (let j = 0; j < filas - 1; j++) {
      for (let i = 0; i < columnas - 1; i++) {
        const tl = z[j][i];
        const tr = z[j][i + 1];
        const br = z[j + 1][i + 1];
        const bl = z[j + 1][i];
        const caso = (tl > nivel ? 8 : 0) | (tr > nivel ? 4 : 0) | (br > nivel ? 2 : 0) | (bl > nivel ? 1 : 0);
        if (caso === 0 || caso === 15) continue;

        const x = i * CELDA;
        const y = j * CELDA;
        const arriba: [number, number] = [x + CELDA * interp(tl, tr), y];
        const derecha: [number, number] = [x + CELDA, y + CELDA * interp(tr, br)];
        const abajo: [number, number] = [x + CELDA * interp(bl, br), y + CELDA];
        const izquierda: [number, number] = [x, y + CELDA * interp(tl, bl)];

        const segmentos: [number, number][][] = {
          1: [[izquierda, abajo]],
          2: [[abajo, derecha]],
          3: [[izquierda, derecha]],
          4: [[arriba, derecha]],
          5: [[izquierda, arriba], [abajo, derecha]],
          6: [[arriba, abajo]],
          7: [[izquierda, arriba]],
          8: [[izquierda, arriba]],
          9: [[arriba, abajo]],
          10: [[izquierda, abajo], [arriba, derecha]],
          11: [[arriba, derecha]],
          12: [[izquierda, derecha]],
          13: [[abajo, derecha]],
          14: [[izquierda, abajo]],
        }[caso] as [number, number][][];

        for (const [a, b] of segmentos) {
          partes.push(`M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`);
        }
      }
    }
    curvas.push({ d: partes.join(''), maestra: (n + 1) % 4 === 0 });
  });

  // Etiquetas de altitud sobre las curvas maestras, al norte del cerro principal (zona que no tapa la tarjeta).
  const etiquetas: Etiqueta[] = [];
  const cima = CERROS[0];
  for (let n = 3; n < 8; n += 4) {
    const nivel = niveles[n];
    const x = cima.x + 40;
    for (let y = cima.y; y > 0; y -= 1) {
      if (elevacion(x, y) < nivel) {
        // 3650 → "3 650" (espacio fino como separador de miles)
        const metros = String(ALTITUD_BASE + (n + 1) * PASO_ALTITUD).replace(/(\d)(?=(\d{3})+$)/,'$1 ');
        etiquetas.push({ x, y, texto: `${metros} m` });
        break;
      }
    }
  }
  return { curvas, etiquetas };
}

const MAPA = calcularCurvas();

@Component({
  selector: 'app-topografia',
  template: `
    <svg
      [attr.viewBox]="'0 0 ' + ancho + ' ' + alto"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      [attr.aria-label]="etiqueta()"
    >
      @for (curva of curvas; track $index) {
        <path [attr.d]="curva.d" [class.maestra]="curva.maestra" />
      }
      @for (e of etiquetas; track e.texto) {
        <text [attr.x]="e.x" [attr.y]="e.y" text-anchor="middle" dominant-baseline="middle">{{ e.texto }}</text>
      }
      @if (predio()) {
        <polygon class="predio" points="150,236 236,214 268,282 196,318 138,290" />
        <g class="pin" transform="translate(204 266)">
          <circle r="13" class="halo" />
          <circle r="5.5" />
        </g>
      }
    </svg>
  `,
  styles: `
    :host {
      display: block;
      position: absolute;
      inset: 0;
      overflow: hidden;
      border-radius: inherit;
    }

    svg {
      width: 100%;
      height: 100%;
      display: block;
      clip-path: circle(0% at 30% 46%);
      animation: descubrir 1.6s 0.15s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    }

    path {
      fill: none;
      stroke: var(--ac-curva);
      stroke-width: 1.1;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }

    path.maestra {
      stroke: var(--ac-curva-fuerte);
      stroke-width: 1.8;
    }

    text {
      font: 600 var(--topo-texto, 11px) var(--ac-fuente);
      fill: var(--ac-tinta-suave);
      paint-order: stroke;
      stroke: var(--ac-fondo);
      stroke-width: 5px;
      stroke-linejoin: round;
    }

    .predio {
      fill: color-mix(in srgb, var(--ac-maiz) 18%, transparent);
      stroke: var(--ac-tierra);
      stroke-width: 2;
      stroke-dasharray: 7 5;
      stroke-linejoin: round;
    }

    .pin circle {
      fill: var(--ac-verde);
    }

    :host-context([data-theme='dark']) .pin circle {
      fill: var(--ac-acento);
    }

    .pin .halo {
      fill: color-mix(in srgb, var(--ac-acento) 22%, transparent);
    }

    @keyframes descubrir {
      to {
        clip-path: circle(130% at 30% 46%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      svg {
        animation: none;
        clip-path: none;
      }
    }
  `,
})
export class Topografia {
  readonly etiqueta = input('');
  /** false para usar el mapa solo como textura de fondo (sin predio ni marcador). */
  readonly predio = input(true);
  protected readonly ancho = ANCHO;
  protected readonly alto = ALTO;
  protected readonly curvas = MAPA.curvas;
  protected readonly etiquetas = MAPA.etiquetas;
}
