import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-volver-arriba',
  standalone: true,
  template: `
    @if (visible()) {
      <button
        type="button"
        class="btn-volver-arriba"
        (click)="subir()"
        aria-label="Volver arriba"
        title="Volver arriba"
      >
        ↑
      </button>
    }
  `,
  styles: [
    `
      .btn-volver-arriba {
        position: fixed;
        right: 1.5rem;
        bottom: 1.5rem;
        z-index: 1000;
        width: 44px;
        height: 44px;
        border: none;
        border-radius: 50%;
        background: #2f5d3a;
        color: #ffffff;
        font-size: 1.25rem;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition:
          transform 0.2s ease,
          background 0.2s ease;
      }

      .btn-volver-arriba:hover {
        background: #23472c;
        transform: translateY(-2px);
      }
    `,
  ],
})
export class VolverArriba {
  visible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.visible.set(window.scrollY > 350);
  }

  subir(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
