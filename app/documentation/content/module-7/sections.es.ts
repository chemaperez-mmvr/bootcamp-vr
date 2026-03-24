/**
 * Module 7 section content (Spanish). Aplicaciones VR Educativas: Tipos, Usos y Selección Inteligente.
 */
export const sectionsEs: Record<string, string> = {
  "what-is-educational-app": `No toda app VR es educativa. Entender la diferencia te ayuda a elegir con criterio.

**¿Qué hace que una app sea "educativa"?**

Una app VR educativa está diseñada para apoyar objetivos de aprendizaje específicos a través de la participación activa. Va más allá de la visualización pasiva — el estudiante *hace* algo significativo.

**Cómo se diferencia de un juego**

- Un juego prioriza el entretenimiento y la puntuación.
- Una app educativa prioriza el desarrollo de habilidades, la comprensión o la competencia.
- Algunas apps difuminan la línea (aprendizaje gamificado), pero la pregunta clave es: *¿El estudiante aprende algo transferible?*

**Cómo se diferencia de un vídeo 360°**

- Un vídeo 360° es pasivo — el estudiante mira pero no interactúa.
- Una app educativa implica interacción, decisiones y acciones.
- Los vídeos 360° pueden ser útiles para construir contexto, pero no son el caso de uso más fuerte de VR.

**Señales de que una app NO es educativa**

- Sin objetivo de aprendizaje claro.
- Sin interacción significativa (solo mirar o deambular).
- Sin retroalimentación sobre las acciones del estudiante.
- Sin forma de conectar la experiencia con el aprendizaje real.
- El entretenimiento es el propósito principal.`,

  "where-to-find-apps": `Las apps VR educativas se pueden encontrar a través de varios canales. Saber dónde buscar ahorra tiempo y evita frustraciones.

**Tienda oficial de Meta**

- El mercado principal para apps de Meta Quest: [Meta Horizon Store](https://www.meta.com/experiences/)
- Las apps aquí han sido revisadas y aprobadas por Meta.
- Busca en categorías educativas o usa listas curadas.
- También puedes navegar y comprar apps desde un ordenador y se descargarán automáticamente en tu gafa.

**App Lab**

- Un canal de distribución secundario para Meta Quest: [App Lab en Meta Quest](https://www.meta.com/experiences/section/app-lab/)
- Las apps no están completamente listadas en la tienda principal — se accede vía enlace directo o invitación.
- Muy utilizado en educación porque muchas apps especializadas se lanzan aquí primero.
- Instalación: recibir enlace → aceptar → la app se instala en la gafa vinculada a esa cuenta.
- También puedes descubrir apps de App Lab a través de directorios como [SideQuest](https://sidequestvr.com/).

**Apps privadas / institucionales**

- Algunas organizaciones desarrollan apps VR personalizadas para formación interna.
- Se distribuyen a través de [Meta Horizon Managed Services](https://work.meta.com/) o sideloading.
- Típicamente requieren cuentas institucionales y configuración de administrador.

**Apps WebXR**

- Experiencias VR que se ejecutan en el navegador web de la gafa — no requieren instalación.
- Construidas sobre el [estándar WebXR](https://immersiveweb.dev/), soportado por la mayoría de las gafas VR modernas.
- Ecosistema en crecimiento, aunque el rendimiento puede ser menor que el de apps nativas.
- Útiles para demostraciones rápidas o cuando no puedes instalar apps.
- Explora experiencias WebXR en directorios como [WebXR Experiments](https://experiments.withgoogle.com/collection/webxr).`,

  "exploration-apps": `Las apps de exploración permiten a los estudiantes observar, navegar y descubrir entornos virtuales.

**Qué son**

- Entornos diseñados para observar, recorrer y construir comprensión espacial.
- Los estudiantes se mueven por un espacio con un propósito de observación específico.

**Para qué sirven**

- Introducción a un tema — dar contexto a los estudiantes antes de profundizar en la teoría.
- Contextualización — situar a los estudiantes en un entorno que no pueden visitar físicamente (un sitio histórico, el cuerpo humano, el espacio exterior).
- Activación de conocimientos previos — dejar que los estudiantes exploren y conecten lo que ya saben.

**Cuándo usarlas**

- Inicio de unidad o lección.
- Con grupos grandes (fácil de rotar, baja complejidad).
- Cuando el tiempo es limitado — la exploración puede ser corta y seguir siendo efectiva.

**Riesgos habituales**

- **Uso pasivo:** Los estudiantes deambulan sin propósito. Siempre combina la exploración con una tarea o preguntas guiadas.
- **"Efecto museo":** Los estudiantes miran alrededor pero no se involucran profundamente. Dales algo específico que encontrar, observar o responder.`,

  "simulation-apps": `Las apps de simulación reproducen situaciones del mundo real con interacción y consecuencias. Este es el caso de uso más fuerte de VR para educación.

**Qué son**

- Reproducciones digitales de escenarios realistas.
- Los estudiantes interactúan con el entorno y sus acciones tienen consecuencias.
- Diseñadas para practicar habilidades en un contexto seguro y repetible.

**Para qué sirven**

- Práctica segura — cometer errores sin consecuencias reales.
- Entrenamiento procedimental — aprender procesos paso a paso (procedimientos médicos, operación de equipos, protocolos de seguridad).
- Toma de decisiones — responder a situaciones realistas donde las decisiones importan.

**Cuándo usarlas**

- Cuando se enseñan habilidades prácticas.
- En formación profesional (salud, industria, servicios de emergencia).
- Cuando la práctica real es peligrosa, costosa o logísticamente imposible.

**Por qué este es el caso de uso más fuerte de VR**

- Alta transferencia al rendimiento real — los estudiantes practican *haciendo*, no solo mirando.
- Aprendizaje activo — la participación es inherente a la experiencia.
- Resultados medibles — el rendimiento puede ser observado y evaluado.

**Riesgos habituales**

- **Falta de briefing:** Los estudiantes entran sin entender el objetivo de aprendizaje.
- **No hacer debriefing:** La experiencia termina sin reflexión, así que el aprendizaje no se consolida.`,

  "guided-training-apps": `Las apps de entrenamiento guiado llevan a los estudiantes a través de procesos paso a paso con retroalimentación inmediata.

**Qué son**

- Experiencias estructuradas y secuenciales donde los estudiantes siguen un camino definido.
- Cada paso proporciona retroalimentación (correcto/incorrecto, siguiente instrucción).
- El camino de aprendizaje es cerrado — hay una forma específica de completar la tarea.

**Para qué sirven**

- Aprendizaje inicial de habilidades — los estudiantes aprenden la secuencia correcta antes de practicar libremente.
- Estándares y protocolos — asegurar que los estudiantes conozcan la "forma correcta" antes de introducir variaciones.
- Evaluación básica — verificar si los estudiantes pueden seguir el procedimiento correcto.

**Cuándo usarlas**

- Primer contacto con un nuevo procedimiento o habilidad.
- Cuando se requiere cumplimiento con un protocolo específico.
- Para certificación básica o verificación de competencias.

**Relación con las apps de simulación**

El entrenamiento guiado es a menudo un precursor de la simulación. Los estudiantes aprenden los pasos (entrenamiento guiado), luego practican aplicándolos en escenarios realistas (simulación).`,

  "evaluation-apps": `Las apps de evaluación usan VR para verificar si los estudiantes pueden realizar tareas o tomar decisiones correctas.

**Qué son**

- Apps que registran las acciones del estudiante y generan datos de rendimiento.
- Pueden incluir métricas automáticas (tiempo, precisión, errores) o puntos de observación estructurados.
- Los resultados son objetivos y medibles.

**Para qué sirven**

- Evaluar competencias al final de una unidad de aprendizaje.
- Validar habilidades antes de la certificación o la práctica real.
- Proporcionar evidencia de aprendizaje para fines institucionales o regulatorios.

**Cuándo usarlas**

- Final de módulo o programa de formación.
- Exámenes prácticos o verificaciones de habilidades.
- Cuando se necesita una evaluación objetiva y repetible.

**Consideraciones clave**

- Las apps de evaluación deben medir habilidades que realmente se enseñaron y practicaron.
- Combina los datos de evaluación VR con las perspectivas del debriefing para una imagen completa.
- Asegúrate de que los estudiantes hayan tenido práctica suficiente antes de usar VR para evaluación.`,

  "communication-soft-skills-apps": `Las apps de comunicación y habilidades blandas simulan interacciones interpersonales usando avatares o personajes impulsados por IA.

**Qué son**

- Conversaciones simuladas con personajes virtuales.
- Los estudiantes toman decisiones comunicativas (qué decir, cómo responder, tono y lenguaje corporal).
- Diseñadas para practicar habilidades interpersonales y profesionales.

**Para qué sirven**

- Formación en comunicación — practicar conversaciones difíciles en un espacio seguro.
- Atención al cliente — manejar quejas, solicitudes y situaciones emocionales.
- Preparación para entrevistas — practicar entrevistas de trabajo con retroalimentación realista.
- Interacción con pacientes o clientes — escenarios de salud, orientación, trabajo social.

**Cuándo usarlas**

- Cuando las habilidades interpersonales son un objetivo de aprendizaje clave.
- Cuando el role-play real es difícil de organizar o los estudiantes se sienten demasiado cohibidos.
- Como preparación antes de interacciones del mundo real.

**Consideraciones clave**

- Los personajes impulsados por IA varían en calidad — prueba la app a fondo antes de usarla en clase.
- Haz debriefing de los ejercicios de comunicación con cuidado, enfocándote en *por qué* ciertas respuestas funcionan mejor que otras.`,

  "choosing-app-by-objective": `Elegir el tipo de app correcto según tu objetivo de aprendizaje previene el error común de usar una app "bonita pero inútil".

**Mapa de decisión: Objetivo → Tipo de app**

- **Introducir un tema** → App de exploración
- **Practicar un procedimiento** → App de simulación
- **Aprender un protocolo paso a paso** → App de entrenamiento guiado
- **Evaluar habilidades o competencias** → App de evaluación / Skill check
- **Practicar comunicación** → App conversacional / Habilidades blandas

**Ejemplos por sector**

**Salud**
- Exploración: Laboratorio de anatomía virtual
- Simulación: Escenario de respuesta a emergencias
- Entrenamiento guiado: Protocolo de higiene de manos quirúrgica
- Evaluación: Evaluación de triaje de pacientes

**Formación Profesional (FP)**
- Exploración: Tour por planta industrial
- Simulación: Práctica de operación de equipos
- Entrenamiento guiado: Recorrido por procedimiento de seguridad
- Evaluación: Certificación de habilidades prácticas

**Educación secundaria**
- Exploración: Visita a sitio histórico
- Simulación: Experimento de laboratorio de ciencias
- Entrenamiento guiado: Procedimiento de química paso a paso

**Formación corporativa**
- Exploración: Tour de orientación de la empresa
- Simulación: Escenario de gestión de crisis
- Comunicación: Formación en atención al cliente`,

  "evaluating-app-before-class": `Antes de usar cualquier app VR en clase, evalúala sistemáticamente. Esto previene tiempo perdido y frustración.

**Checklist pedagógica**

- **¿Qué aprende el alumno?** ¿Puedes enunciar claramente el objetivo de aprendizaje que la app apoya?
- **¿Qué hace exactamente el alumno?** ¿La interacción es significativa o solo es hacer clic en pantallas?
- **¿Qué retroalimentación recibe el alumno?** ¿La app le dice al estudiante si lo está haciendo bien o cometiendo errores?
- **¿Qué evidencia queda?** ¿Puedes capturar u observar resultados de aprendizaje (puntuaciones, grabaciones, observaciones)?

**Checklist técnica**

- **Tiempo de carga:** ¿La app carga lo suficientemente rápido para uso en aula (menos de 30 segundos)?
- **Facilidad de uso:** ¿Los estudiantes pueden navegar sin instrucciones extensas?
- **Requisitos de espacio:** ¿La app funciona en tu espacio disponible (sentado, de pie, escala de habitación)?
- **Estabilidad:** ¿La app se cuelga o congela? Pruébala completamente antes de clase.

**Checklist de aula**

- **Duración real:** ¿Cuánto dura una ejecución completa? ¿Encaja en tu horario de sesión?
- **Número de alumnos:** ¿Pueden varios estudiantes usarla simultáneamente o requiere rotación?
- **Necesidad de casting:** ¿La app soporta casting para observadores?
- **Plan B:** ¿Qué harás si la app falla? Siempre ten una alternativa sin VR preparada.`,

  "integrating-apps-in-class": `Pasar de "usar una app" a "dar una clase con VR" requiere integración intencional en la estructura de la lección.

**Antes de la VR**

- Enuncia el objetivo de aprendizaje claramente — los estudiantes deben saber *por qué* entran en VR.
- Explica la tarea — sé breve y específico (briefing de 60 segundos).
- NO expliques cada función de la app — solo lo necesario para la tarea.

**Durante la VR**

- **Qué observa el instructor:** Participación del estudiante, acciones correctas/incorrectas, señales de confusión o malestar.
- **Qué hacen los demás alumnos:** Observación activa vía casting, preguntas guiadas, tareas complementarias.
- **Cuándo intervenir:** Solo si un estudiante está atascado, confundido o en malestar. Evita interrumpir el flujo innecesariamente.

**Después de la VR**

- **Debriefing específico según tipo de app:**
  - Apps de exploración → "¿Qué notaste? ¿Qué te sorprendió?"
  - Apps de simulación → "¿Qué decisiones tomaste? ¿Qué cambiarías?"
  - Apps de evaluación → "¿Cómo fue tu rendimiento? ¿Dónde necesitas más práctica?"
- **Actividad de transferencia:** Conecta la experiencia VR con la aplicación en el mundo real a través de discusión, escritura o práctica adicional.`,

  "tutorial-template": `Cada app VR usada en tu programa debería tener un tutorial estandarizado. Esta plantilla facilita documentar y compartir orientación específica por app.

**Estructura estándar del tutorial**

1. **Tipo de app:** ¿Qué tipo de app es? (exploración, simulación, entrenamiento guiado, evaluación, comunicación)
2. **Objetivos de aprendizaje:** ¿Qué objetivos apoya esta app?
3. **Duración ideal en aula:** ¿Cuánto tiempo deben pasar los estudiantes en la app por sesión?
4. **Preparación técnica previa:** ¿Qué necesita configurarse antes de clase? (descargas, cuentas, ajustes, espacio)
5. **Guía paso a paso:** Instrucciones básicas para usar la app en clase.
6. **Errores comunes:** Problemas conocidos, bugs o puntos confusos — y cómo manejarlos.
7. **Ideas de actividades:** Actividades de aprendizaje sugeridas construidas alrededor de la app.
8. **Checklist rápida:** Lista de verificación pre-clase escaneable.

**Ejemplo de índice de tutorial**

- Introducción — ¿Qué es esta app y por qué usarla?
- Preparación — Configuración técnica y requisitos.
- Uso básico — Funciones principales y navegación.
- Uso avanzado (opcional) — Funciones para usuarios experimentados.
- Actividad modelo — Un plan de lección completo usando esta app.
- Evaluación — Cómo evaluar el rendimiento del estudiante con esta app.

Esta plantilla asegura consistencia en todas las apps de tu programa VR y facilita que nuevos instructores puedan empezar rápidamente.`,

  "common-mistakes-apps": `Evita estos errores comunes al usar apps VR en educación. Son fáciles de cometer pero igual de fáciles de prevenir.

**Usar apps sin objetivo claro**

La app se ve impresionante, pero si no hay un objetivo de aprendizaje, es entretenimiento, no educación. Siempre empieza con el objetivo, luego elige la app.

**Usar apps demasiado largas**

Si una sesión con una app toma más de 30 minutos, probablemente no encaja en una rotación típica de aula. Busca experiencias que se completen en 5–15 minutos.

**No probar la app antes de clase**

Las sorpresas durante la clase desperdician tiempo y dañan la credibilidad. Siempre haz una ejecución completa de cualquier app antes de usarla con estudiantes.

**No preparar al alumno**

Saltar a VR sin un briefing lleva a confusión, exploración sin rumbo y aprendizaje perdido. Un briefing de 60 segundos previene esto.

**No cerrar con reflexión**

Sin debriefing, la experiencia VR queda como un evento aislado sin impacto de aprendizaje duradero. Incluso un debriefing de 2 minutos es mejor que nada.

**Elegir novedad sobre adecuación**

La app más nueva o visualmente impresionante no siempre es la mejor elección. Prioriza apps que se alineen con tus objetivos de aprendizaje específicos, aunque se vean más simples.`,
};
