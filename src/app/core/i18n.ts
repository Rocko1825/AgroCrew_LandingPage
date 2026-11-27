import { Pipe, PipeTransform } from '@angular/core';

/**
 * Traducción simple español → inglés.
 * El texto en español es la clave; si no hay traducción se muestra el texto original.
 * Usa la misma clave de localStorage que la app web ('agrocrew.idioma').
 */
export type Idioma = 'es' | 'en';

const CLAVE = 'agrocrew.idioma';

function leerIdioma(): Idioma {
  try {
    const guardado = localStorage.getItem(CLAVE);
    if (guardado === 'es' || guardado === 'en') return guardado;
  } catch {
    /* sin acceso a localStorage */
  }
  return 'es';
}

export const idioma: Idioma = leerIdioma();

/** Cambia el idioma y recarga la página para volver a dibujarla. */
export function cambiarIdioma(nuevo: Idioma): void {
  try {
    localStorage.setItem(CLAVE, nuevo);
  } catch {
    /* sin acceso a localStorage */
  }
  location.reload();
}

export function t(texto: string): string {
  return idioma === 'en' ? (EN[texto] ?? texto) : texto;
}

@Pipe({ name: 't' })
export class TraducirPipe implements PipeTransform {
  transform(texto: string): string {
    return t(texto);
  }
}

const EN: Record<string, string> = {
  // General y navegación
  'Saltar al contenido': 'Skip to content',
  'Secciones': 'Sections',
  'Funcionalidades': 'Features',
  'Cómo funciona': 'How it works',
  'Para quién es': 'Who it is for',
  'Impacto': 'Impact',
  'El proyecto': 'The project',
  'Entrar a la app': 'Open the app',
  'Activar modo claro': 'Switch to light mode',
  'Activar modo oscuro': 'Switch to dark mode',
  'Ver en inglés': 'View in English',
  'Ver en español': 'View in Spanish',
  'Abrir menú': 'Open menu',
  'Explorar': 'Explore',
  'Proyecto': 'Project',
  'API (Swagger)': 'API (Swagger)',
  'Código del backend': 'Backend code',
  'Código del frontend': 'Frontend code',
  'Términos y condiciones': 'Terms and conditions',
  'Términos y condiciones · AgroCrew': 'Terms and conditions · AgroCrew',
  'AgroCrew · Descubre qué cultivos van con tu terreno': 'AgroCrew · Find the crops that suit your land',
  'Aviso:': 'Notice:',
  'Las recomendaciones de AgroCrew son referenciales: no reemplazan la asesoría de un ingeniero agrónomo ni garantizan un rendimiento.':
    'AgroCrew recommendations are for reference only: they do not replace the advice of an agronomist or guarantee any yield.',
  'Proyecto académico UPC': 'UPC academic project',
  'Descubre qué cultivos son compatibles con tu terreno, con datos oficiales de suelo, clima y riesgo.':
    'Find out which crops suit your land, using official soil, climate and risk data.',
  'Se abre en una pestaña nueva': 'Opens in a new tab',

  // Portada
  'Descubre qué cultivos son compatibles con tu terreno': 'Find out which crops are right for your land',
  'AgroCrew cruza datos oficiales de suelo, clima y riesgo hídrico de tu predio y te dice qué sembrar, por qué y qué riesgos vigilar. Gratis y en lenguaje sencillo.':
    'AgroCrew combines official soil, climate and water-risk data for your plot and tells you what to plant, why, and which risks to watch. Free and in plain language.',
  'Evaluar mi terreno': 'Evaluate my land',
  'Ver cómo funciona': 'See how it works',
  'Datos de MIDAGRI, ANA y Open-Meteo': 'Data from MIDAGRI, ANA and Open-Meteo',
  'Sin instalar nada': 'Nothing to install',
  'En español e inglés': 'In Spanish and English',
  'Evaluación de ejemplo': 'Sample evaluation',
  'Puntaje de compatibilidad de 0 a 100': 'Compatibility score from 0 to 100',
  'Mapa topográfico de un predio de ejemplo': 'Topographic map of a sample plot',
  'AgroCrew en cifras': 'AgroCrew in numbers',
  'distritos del Perú disponibles para registrar predios': 'districts of Peru available to register plots',
  'puntos críticos de inundación de la ANA': 'ANA flood critical points',
  'cultivos de costa, sierra y selva en el catálogo': 'coast, highland and jungle crops in the catalog',
  'grupos de capacidad de uso mayor del suelo (MIDAGRI)': 'major land-use capability groups (MIDAGRI)',

  // Funcionalidades
  'Todo lo que necesitas saber de tu terreno, en un solo lugar': 'Everything you need to know about your land, in one place',
  'Cuatro herramientas que trabajan juntas para que tomes mejores decisiones antes de sembrar.':
    'Four tools that work together so you can make better decisions before planting.',
  'Ranking de cultivos compatibles': 'Ranking of compatible crops',
  'Un puntaje de 0 a 100 para cada cultivo según suelo, altitud, temperatura, lluvia y riesgo hídrico, con una explicación redactada por inteligencia artificial.':
    'A 0–100 score for each crop based on soil, altitude, temperature, rainfall and water risk, with an explanation written by artificial intelligence.',
  'Papa': 'Potato',
  'Quinua': 'Quinoa',
  'Maíz amiláceo': 'Starchy maize',
  'Haba': 'Broad bean',
  'Aptitud del suelo': 'Soil suitability',
  'La capacidad de uso mayor (CUM) oficial del MIDAGRI, explicada sin códigos técnicos.':
    'The official MIDAGRI land-use capability (CUM), explained without technical codes.',
  'Grupo A · tierras aptas para cultivo en limpio': 'Group A · land suitable for annual crops',
  'Clima real de tu zona': 'Real climate of your area',
  'Temperatura y lluvia de los últimos años y el pronóstico de los próximos 7 días.':
    'Temperature and rainfall of recent years and the forecast for the next 7 days.',
  'Riesgo hídrico y alertas': 'Water risk and alerts',
  'Te avisamos si tu predio está cerca de un punto crítico de inundación de la ANA o si se pronostican lluvias intensas, con acciones preventivas concretas.':
    'We warn you if your plot is near an ANA flood critical point or if heavy rain is forecast, with concrete preventive actions.',
  'Riesgo alto de inundación': 'High flood risk',
  'A 2.4 km de tu predio · hace 5 min': '2.4 km from your plot · 5 min ago',

  // Cómo funciona
  'De tu terreno a una recomendación en tres pasos': 'From your land to a recommendation in three steps',
  'Registra tu predio': 'Register your plot',
  'Marca tu terreno en el mapa o búscalo por su código catastral. Solo necesitas el área y la fuente de agua.':
    'Mark your land on the map or find it by its cadastral code. You only need the area and the water source.',
  'Cruzamos datos oficiales': 'We combine official data',
  'Consultamos el suelo (MIDAGRI), el clima de los últimos años (Open-Meteo) y los puntos críticos de la ANA cerca de ti.':
    'We check the soil (MIDAGRI), the climate of recent years (Open-Meteo) and the ANA critical points near you.',
  'Recibe tu ranking': 'Get your ranking',
  'Te mostramos los cultivos más compatibles, por qué, y una explicación sencilla. Además, alertas si hay riesgo de lluvias o inundación.':
    'We show you the most compatible crops, why, and a simple explanation. Plus alerts if there is a risk of rain or flooding.',

  // Para quién es
  'Pensado para quienes trabajan la tierra y quienes los acompañan': 'Built for those who work the land and those who support them',
  'Tipos de usuario': 'User types',
  'Productores': 'Farmers',
  'Pequeños y medianos agricultores que quieren decidir qué sembrar con información confiable.':
    'Small and medium farmers who want to decide what to plant with reliable information.',
  'Ranking de cultivos para cada predio': 'Crop ranking for each plot',
  'Alertas de lluvias intensas e inundación': 'Heavy rain and flood alerts',
  'Rentabilidad referencial por hectárea': 'Reference profitability per hectare',
  'Historial de evaluaciones': 'Evaluation history',
  'Asesores técnicos': 'Technical advisors',
  'Extensionistas y agrónomos que acompañan a varios productores en una zona.':
    'Extension workers and agronomists who support several farmers in an area.',
  'Indicadores de aptitud por departamento': 'Suitability indicators by department',
  'Cultivos más recomendados por zona': 'Most recommended crops by area',
  'Exposición al riesgo hídrico': 'Exposure to water risk',
  'Exportación de reportes a CSV': 'Report export to CSV',
  'Instituciones y administradores': 'Institutions and administrators',
  'Gobiernos locales, cooperativas y el equipo que mantiene el catálogo agronómico.':
    'Local governments, cooperatives and the team that maintains the agronomic catalog.',
  'Catálogo de cultivos y requerimientos': 'Crop catalog and requirements',
  'Datos económicos referenciales': 'Reference economic data',
  'Gestión de usuarios y roles': 'User and role management',
  'Métricas de uso y validación': 'Usage and validation metrics',
  'Crear mi cuenta gratis': 'Create my free account',
  'Agricultores en el campo': 'Farmers in the field',

  // Impacto
  'Contribuimos al ODS 2: Hambre cero': 'We contribute to SDG 2: Zero hunger',
  'Meta 2.4': 'Target 2.4',
  'Asegurar sistemas sostenibles de producción de alimentos y aplicar prácticas agrícolas resilientes que aumenten la productividad, ayuden a mantener los ecosistemas y fortalezcan la adaptación al cambio climático.':
    'Ensure sustainable food production systems and implement resilient agricultural practices that increase productivity, help maintain ecosystems and strengthen capacity for adaptation to climate change.',
  'Menos agua y menos pérdidas': 'Less water, fewer losses',
  'Elegir un cultivo adecuado al clima y al suelo evita riegos innecesarios y cosechas perdidas.':
    'Choosing a crop suited to the climate and soil avoids unnecessary irrigation and lost harvests.',
  'Suelos que se conservan': 'Soils that last',
  'Respetar la capacidad de uso mayor del suelo reduce la erosión y el uso excesivo de fertilizantes.':
    'Respecting the land-use capability of the soil reduces erosion and excessive fertilizer use.',
  'Prevención ante inundaciones': 'Flood prevention',
  'Las alertas tempranas ayudan a proteger la cosecha y a las familias frente a lluvias intensas.':
    'Early alerts help protect harvests and families from heavy rain.',

  // Datos oficiales
  'Datos oficiales': 'Official data',
  'Información pública y confiable': 'Public, reliable information',
  'Capacidad de uso mayor del suelo y catastro rural': 'Land-use capability and rural cadastre',
  'Puntos críticos de inundación y desborde': 'Flood and overflow critical points',
  'Clima histórico y pronóstico de 7 días': 'Historical climate and 7-day forecast',
  'Explicaciones en lenguaje sencillo': 'Plain-language explanations',

  // El proyecto
  'Conoce cómo está construido AgroCrew': 'See how AgroCrew is built',
  'Una API REST en Spring Boot desplegada en AWS y una aplicación web en Angular. El código es abierto: revisa la documentación de la API o los repositorios.':
    'A Spring Boot REST API deployed on AWS and an Angular web app. The code is open: check the API documentation or the repositories.',
  'API en AWS (Swagger)': 'API on AWS (Swagger)',
  'Documentación interactiva de los endpoints': 'Interactive endpoint documentation',
  'Repositorio del backend': 'Backend repository',
  'Repositorio del frontend': 'Frontend repository',
  '¿Listo para conocer tu terreno?': 'Ready to get to know your land?',
  'Crea tu cuenta, registra tu predio y recibe tu primera recomendación en minutos.':
    'Create your account, register your plot and get your first recommendation in minutes.',
  'Empezar ahora': 'Get started',

  // Títulos divididos (parte normal + parte ligera) y etiquetas del rediseño
  'Descubre qué cultivos': 'Find out which crops',
  'son compatibles con tu terreno': 'are right for your land',
  'Todo lo que necesitas saber de tu terreno,': 'Everything you need to know about your land,',
  'en un solo lugar': 'in one place',
  'De tu terreno a una recomendación': 'From your land to a recommendation',
  'en tres pasos': 'in three steps',
  'Pensado para quienes trabajan la tierra': 'Built for those who work the land',
  'y quienes los acompañan': 'and those who support them',
  'Contribuimos al ODS 2:': 'We contribute to SDG 2:',
  'Hambre cero': 'Zero hunger',
  'Suelo': 'Soil',
  'Agua': 'Water',
  'Clima': 'Climate',
  'IA': 'AI',
  'Tecnologías': 'Technologies',
  'Mapa con predios registrados y puntos críticos de inundación de la ANA':
    'Map with registered plots and ANA flood critical points',
  'Predio': 'Plot',
  'Punto crítico ANA': 'ANA critical point',

  // Términos
  'Volver al inicio': 'Back to home',
  'Última actualización: noviembre de 2026': 'Last updated: November 2026',
  'Contenido': 'Contents',
};
