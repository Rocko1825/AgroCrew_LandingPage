# AgroCrew · Landing page

Landing de AgroCrew hecha con **Angular 22** y **Angular Material 22**.

## Comandos

```bash
npm install        # solo la primera vez
npm start          # servidor de desarrollo en http://localhost:4200
npm run build      # build de producción en dist/agrocrew-landing-material/browser
```

Para desplegar en Netlify, publica la carpeta `dist/agrocrew-landing-material/browser`.
El archivo `public/_redirects` hace que cualquier ruta cargue `index.html`.

## Estructura

```
src/
  environments/entorno.ts      Enlaces externos (app, Swagger, repositorios)
  styles.scss                  Tema de Angular Material + colores de la marca
  _theme-colors.scss           Paletas generadas con `ng generate @angular/material:theme-color`
  app/
    core/i18n.ts               Traducciones ES → EN y pipe `t`
    core/iconos.ts             Íconos SVG registrados en MatIconRegistry
    core/tema.service.ts       Modo claro / oscuro
    core/titulo.strategy.ts    Título de la pestaña traducido
    layout/cabecera.*          mat-toolbar, mat-menu (móvil), matTooltip
    layout/pie.*               Pie de página
    paginas/inicio/*           Portada y secciones
    paginas/terminos/*         Términos y condiciones (mat-nav-list como índice)
    shared/topografia.ts       Mapa de curvas de nivel del hero
```

## Componentes de Angular Material usados

`mat-toolbar`, `mat-button` / `mat-flat-button` / `mat-stroked-button` / `mat-icon-button`,
`mat-icon`, `mat-menu`, `matTooltip`, `mat-card`, `mat-chip-set`, `mat-progress-bar`,
`mat-divider`, `mat-tab-group`, `mat-list`, `mat-nav-list`.

## Idioma y tema

Se guardan en `localStorage` con las mismas claves que la app web
(`agrocrew.idioma` y `agrocrew.tema`), así que la preferencia se mantiene al pasar a la app.
Para agregar un texto traducible, úsalo en la plantilla con `{{ 'Texto en español' | t }}`
y agrega su traducción en `src/app/core/i18n.ts`.
