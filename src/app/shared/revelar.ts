import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

const sinMovimiento = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Hace aparecer un bloque (sube y se desvanece) cuando entra en pantalla.
 * La clase `revelar` solo se agrega desde el navegador: sin JavaScript el contenido se ve igual.
 * `appRevelar="2"` retrasa la aparición en pasos de 90 ms para escalonar listas.
 */
@Directive({ selector: '[appRevelar]' })
export class Revelar {
  readonly retraso = input<number | string>(0, { alias: 'appRevelar' });

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (sinMovimiento() || typeof IntersectionObserver === 'undefined') return;
      el.classList.add('revelar');
      // Se usa una animación (no transition) para no chocar con las transiciones de hover de cada bloque.
      el.style.animationDelay = `${Number(this.retraso() || 0) * 90}ms`;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          el.classList.add('visible');
          obs.disconnect();
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
      );
      obs.observe(el);
      destroyRef.onDestroy(() => obs.disconnect());
    });
  }
}

/**
 * Cuenta desde 0 hasta el valor cuando la cifra entra en pantalla.
 * Úsalo en un elemento con aria-hidden y deja el valor final en un texto .sr-only al lado,
 * así los lectores de pantalla no escuchan la cuenta.
 */
@Directive({ selector: '[appContador]' })
export class Contador {
  readonly valor = input.required<number>({ alias: 'appContador' });
  readonly formato = input<Intl.NumberFormat>();
  readonly sufijo = input('');

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const fmt = this.formato() ?? new Intl.NumberFormat();
      const escribir = (n: number) => (el.textContent = fmt.format(n) + this.sufijo());
      if (sinMovimiento() || typeof IntersectionObserver === 'undefined') {
        escribir(this.valor());
        return;
      }
      escribir(0);

      let cuadro = 0;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          obs.disconnect();
          const inicio = performance.now();
          const duracion = 1400;
          const paso = (ahora: number) => {
            const t = Math.min(1, (ahora - inicio) / duracion);
            escribir(Math.round(this.valor() * (1 - Math.pow(1 - t, 4))));
            if (t < 1) cuadro = requestAnimationFrame(paso);
          };
          cuadro = requestAnimationFrame(paso);
        },
        { threshold: 0.6 },
      );
      obs.observe(el);
      destroyRef.onDestroy(() => {
        obs.disconnect();
        cancelAnimationFrame(cuadro);
      });
    });
  }
}
