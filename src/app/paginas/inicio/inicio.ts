import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TraducirPipe, idioma } from '../../core/i18n';
import { Contador, Revelar } from '../../shared/revelar';
import { entorno } from '../../../environments/entorno';

@Component({
  selector: 'app-inicio',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    TraducirPipe,
    Revelar,
    Contador,
  ],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
  protected readonly entorno = entorno;
  protected readonly numero =new Intl.NumberFormat(idioma === 'en' ? 'en-US' : 'es-PE');

  /** Ejemplo de ranking que se muestra en la tarjeta del hero. */
  protected readonly ranking = [
    { cultivo: 'Papa', puntaje: 92 },
    { cultivo: 'Quinua', puntaje: 86 },
    { cultivo: 'Maíz amiláceo', puntaje: 74 },
    { cultivo: 'Haba', puntaje: 61 },
  ];

  protected readonly cifras = [
    { valor: 1893, sufijo: '', texto: 'distritos del Perú disponibles para registrar predios' },
    { valor: 10693, sufijo: '', texto: 'puntos críticos de inundación de la ANA' },
    { valor: 20, sufijo: '+', texto: 'cultivos de costa, sierra y selva en el catálogo' },
    { valor: 5, sufijo: '', texto: 'grupos de capacidad de uso mayor del suelo (MIDAGRI)' },
  ];

  protected formatear(n: number, sufijo = ''): string {
    return this.numero.format(n) + sufijo;
  }

  /** "01", "02"… para las etiquetas numeradas. */
  protected indice(i: number): string {
    return String(i + 1).padStart(2, '0');
  }

  protected readonly funcionalidades = [
    {
      id: 'ranking',
      icono: 'chispa',
      titulo: 'Ranking de cultivos compatibles',
      texto:
        'Un puntaje de 0 a 100 para cada cultivo según suelo, altitud, temperatura, lluvia y riesgo hídrico, con una explicación redactada por inteligencia artificial.',
    },
    {
      id: 'suelo',
      icono: 'capas',
      titulo: 'Aptitud del suelo',
      texto: 'La capacidad de uso mayor (CUM) oficial del MIDAGRI, explicada sin códigos técnicos.',
    },
    {
      id: 'clima',
      icono: 'sol',
      titulo: 'Clima real de tu zona',
      texto: 'Temperatura y lluvia de los últimos años y el pronóstico de los próximos 7 días.',
    },
    {
      id: 'riesgo',
      icono: 'gota',
      titulo: 'Riesgo hídrico y alertas',
      texto:
        'Te avisamos si tu predio está cerca de un punto crítico de inundación de la ANA o si se pronostican lluvias intensas, con acciones preventivas concretas.',
    },
  ];

  protected readonly pasos = [
    {
      icono: 'ubicacion',
      titulo: 'Registra tu predio',
      texto:
        'Marca tu terreno en el mapa o búscalo por su código catastral. Solo necesitas el área y la fuente de agua.',
    },
    {
      icono: 'capas',
      titulo: 'Cruzamos datos oficiales',
      texto:
        'Consultamos el suelo (MIDAGRI), el clima de los últimos años (Open-Meteo) y los puntos críticos de la ANA cerca de ti.',
    },
    {
      icono: 'chispa',
      titulo: 'Recibe tu ranking',
      texto:
        'Te mostramos los cultivos más compatibles, por qué, y una explicación sencilla. Además, alertas si hay riesgo de lluvias o inundación.',
    },
  ];

  protected readonly segmentos = [
    {
      id: 'productores',
      icono: 'brote',
      titulo: 'Productores',
      resumen:
        'Pequeños y medianos agricultores que quieren decidir qué sembrar con información confiable.',
      puntos: [
        'Ranking de cultivos para cada predio',
        'Alertas de lluvias intensas e inundación',
        'Rentabilidad referencial por hectárea',
        'Historial de evaluaciones',
      ],
    },
    {
      id: 'asesores',
      icono: 'usuarios',
      titulo: 'Asesores técnicos',
      resumen: 'Extensionistas y agrónomos que acompañan a varios productores en una zona.',
      puntos: [
        'Indicadores de aptitud por departamento',
        'Cultivos más recomendados por zona',
        'Exposición al riesgo hídrico',
        'Exportación de reportes a CSV',
      ],
    },
    {
      id: 'instituciones',
      icono: 'escudo',
      titulo: 'Instituciones y administradores',
      resumen:
        'Gobiernos locales, cooperativas y el equipo que mantiene el catálogo agronómico.',
      puntos: [
        'Catálogo de cultivos y requerimientos',
        'Datos económicos referenciales',
        'Gestión de usuarios y roles',
        'Métricas de uso y validación',
      ],
    },
  ];

  protected readonly beneficios = [
    {
      icono: 'gota',
      titulo: 'Menos agua y menos pérdidas',
      texto:
        'Elegir un cultivo adecuado al clima y al suelo evita riegos innecesarios y cosechas perdidas.',
    },
    {
      icono: 'hoja',
      titulo: 'Suelos que se conservan',
      texto:
        'Respetar la capacidad de uso mayor del suelo reduce la erosión y el uso excesivo de fertilizantes.',
    },
    {
      icono: 'escudo',
      titulo: 'Prevención ante inundaciones',
      texto:
        'Las alertas tempranas ayudan a proteger la cosecha y a las familias frente a lluvias intensas.',
    },
  ];

  protected readonly fuentes = [
    { nombre: 'MIDAGRI', tema: 'Suelo', icono: 'capas', dato: 'Capacidad de uso mayor del suelo y catastro rural' },
    { nombre: 'ANA', tema: 'Agua', icono: 'gota', dato: 'Puntos críticos de inundación y desborde' },
    { nombre: 'Open-Meteo', tema: 'Clima', icono: 'sol', dato: 'Clima histórico y pronóstico de 7 días' },
    { nombre: 'Google Gemini', tema: 'IA', icono: 'chispa', dato: 'Explicaciones en lenguaje sencillo' },
  ];

  protected readonly tecnologias = [
    'Spring Boot 3',
    'Java 21',
    'PostgreSQL',
    'JWT',
    'Angular 22',
    'Angular Material',
    'AWS Elastic Beanstalk',
    'Netlify',
    'Leaflet',
  ];

  protected readonly enlacesProyecto = [
    {
      icono: 'servidor',
      titulo: 'API en AWS (Swagger)',
      detalle: 'Documentación interactiva de los endpoints',
      url: entorno.apiDocsUrl,
    },
    {
      icono: 'codigo',
      titulo: 'Repositorio del backend',
      detalle: 'GitHub · Spring Boot',
      url: entorno.repoBackend,
    },
    {
      icono: 'pantalla',
      titulo: 'Repositorio del frontend',
      detalle: 'GitHub · Angular',
      url: entorno.repoFrontend,
    },
  ];
}
