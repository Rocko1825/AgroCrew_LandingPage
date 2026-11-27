import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TraducirPipe, idioma } from '../../core/i18n';

interface Clausula {
  titulo: string;
  parrafos: string[];
}

const ES: Clausula[] = [
  {
    titulo: '1. Objeto',
    parrafos: [
      'AgroCrew es una plataforma web académica, desarrollada por estudiantes de la Universidad Peruana de Ciencias Aplicadas (UPC), que ofrece recomendaciones referenciales de cultivos a partir de datos públicos de suelo, clima y riesgo hídrico. Al registrarte o usar la plataforma aceptas estos términos.',
    ],
  },
  {
    titulo: '2. Alcance de las recomendaciones',
    parrafos: [
      'Las evaluaciones, rankings, explicaciones y datos de rentabilidad son referenciales. No reemplazan la asesoría de un ingeniero agrónomo ni garantizan un rendimiento o una ganancia. La decisión de sembrar es siempre de cada productor.',
      'Las explicaciones en lenguaje sencillo pueden ser redactadas por un modelo de inteligencia artificial a partir de los resultados calculados; la IA no modifica los puntajes ni el orden del ranking.',
    ],
  },
  {
    titulo: '3. Fuentes de datos',
    parrafos: [
      'AgroCrew usa información pública del Ministerio de Desarrollo Agrario y Riego (MIDAGRI) y del SERFOR, de la Autoridad Nacional del Agua (ANA) y del servicio Open-Meteo. Estas fuentes pueden no estar disponibles o contener información desactualizada; en ese caso la plataforma lo indica y muestra resultados parciales.',
    ],
  },
  {
    titulo: '4. Cuenta de usuario',
    parrafos: [
      'Eres responsable de mantener la confidencialidad de tu contraseña y de que los datos que registras (por ejemplo, la ubicación y el área de tus predios) sean verídicos. Puedes editar tu perfil o dejar de usar la plataforma en cualquier momento.',
    ],
  },
  {
    titulo: '5. Datos personales',
    parrafos: [
      'Tratamos tus datos personales (nombre, correo, teléfono y predios) solo para brindarte el servicio, conforme a la Ley N.° 29733, Ley de Protección de Datos Personales del Perú, y su reglamento. No vendemos ni compartimos tus datos con terceros con fines comerciales. Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición escribiendo al equipo del proyecto.',
    ],
  },
  {
    titulo: '6. Uso adecuado',
    parrafos: [
      'No está permitido usar la plataforma para fines ilícitos, intentar acceder a cuentas de otras personas ni sobrecargar intencionalmente el servicio.',
    ],
  },
  {
    titulo: '7. Cambios',
    parrafos: [
      'Estos términos pueden actualizarse a medida que el proyecto evolucione. La versión vigente siempre estará publicada en esta página.',
    ],
  },
];

const EN: Clausula[] = [
  {
    titulo: '1. Purpose',
    parrafos: [
      'AgroCrew is an academic web platform, built by students of the Universidad Peruana de Ciencias Aplicadas (UPC), that provides reference crop recommendations based on public soil, climate and water-risk data. By signing up or using the platform you accept these terms.',
    ],
  },
  {
    titulo: '2. Scope of the recommendations',
    parrafos: [
      'Evaluations, rankings, explanations and profitability figures are for reference only. They do not replace the advice of an agronomist and do not guarantee any yield or profit. The decision to plant always belongs to each farmer.',
      'Plain-language explanations may be written by an artificial intelligence model from the calculated results; the AI does not change the scores or the order of the ranking.',
    ],
  },
  {
    titulo: '3. Data sources',
    parrafos: [
      'AgroCrew uses public information from the Ministry of Agrarian Development and Irrigation (MIDAGRI) and SERFOR, the National Water Authority (ANA) and the Open-Meteo service. These sources may be unavailable or outdated; in that case the platform says so and shows partial results.',
    ],
  },
  {
    titulo: '4. User account',
    parrafos: [
      'You are responsible for keeping your password confidential and for the accuracy of the data you register (for example, the location and area of your plots). You can edit your profile or stop using the platform at any time.',
    ],
  },
  {
    titulo: '5. Personal data',
    parrafos: [
      'We process your personal data (name, email, phone and plots) only to provide the service, in accordance with Peruvian Law No. 29733 on Personal Data Protection and its regulations. We do not sell or share your data with third parties for commercial purposes. You may exercise your rights of access, rectification, cancellation and objection by contacting the project team.',
    ],
  },
  {
    titulo: '6. Acceptable use',
    parrafos: [
      'You may not use the platform for unlawful purposes, try to access other people’s accounts or intentionally overload the service.',
    ],
  },
  {
    titulo: '7. Changes',
    parrafos: [
      'These terms may be updated as the project evolves. The current version will always be published on this page.',
    ],
  },
];

@Component({
  selector: 'app-terminos',
  imports: [RouterLink, MatButtonModule, MatIconModule, MatListModule, TraducirPipe],
  templateUrl: './terminos.html',
  styleUrl: './terminos.scss',
})
export class Terminos {
  protected readonly clausulas = idioma === 'en' ? EN : ES;
}
