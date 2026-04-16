/**
 * Module 6 section content (Spanish). Markdown strings keyed by section id.
 * "Resolviendo Problemas Comunes de VR en el Aula"
 */
export const sectionsEs: Record<string, string> = {
  "wifi-connection": `Los problemas de WiFi son el fallo más común de los visores VR en las escuelas. Una conexión caída puede paralizar toda una clase, así que conocer la secuencia de solución ahorra un tiempo valioso.

**Problema**

- El visor no se conecta al WiFi o la conexión se cae repetidamente durante el uso

**Verificación Rápida**

- ¿Está el WiFi activado en Controles de acceso rápido?
- ¿Está seleccionada la red correcta?
- ¿La señal tiene al menos dos barras?

---

**Pasos de Solución**

- Desactiva el WiFi, espera diez segundos y vuelve a activarlo
- Olvida la red y vuelve a conectarte ingresando la contraseña de nuevo
- Reinicia el visor — esto resuelve la mayoría de errores de conexión temporales

**Si Sigue Sin Funcionar**

- Intenta conectarte a un punto de acceso del teléfono para confirmar que el hardware WiFi del visor funciona
- Pregunta a sistemas si la red de la escuela bloquea el tráfico de visores VR o requiere un portal de autenticación

> "Un router dedicado para los visores evita la mayoría de conflictos con la red escolar."

[IMAGE:wifi-diagnostic]`,

  "pins-access-codes": `Los errores de PIN y código de acceso impiden que los estudiantes entren al visor. Resolverlos rápidamente mantiene la clase en horario.

**Problema**

- No se puede ingresar el PIN en la pantalla de desbloqueo, o el código es rechazado aunque parece correcto

**Verificación Rápida**

- ¿Es la cuenta de Meta correcta la que está vinculada a este visor?
- ¿Se ha cambiado el PIN recientemente por otro profesor o administrador?

---

**Pasos de Solución**

- Abre la app de Meta en un teléfono emparejado y verifica la cuenta asociada al visor
- Usa el flujo de "Olvidé mi PIN" en la app de Meta para restablecer el código de desbloqueo
- Para cuentas institucionales, consulta con el administrador — los visores gestionados de forma masiva suelen usar un PIN compartido que cambia periódicamente

**Si Sigue Sin Funcionar**

- Inicia sesión en la cuenta de Meta desde un navegador, restablece la contraseña y vuelve a vincular el visor
- Contacta al soporte de Meta si la cuenta está bloqueada o marcada

> "Mantén una tarjeta impresa en cada estuche del visor con el PIN actual — actualízala cada vez que cambie."`,

  "boundary-guardian-problems": `El sistema Boundary / Límite (antes Guardian) usa las cámaras del visor para mapear el espacio físico. Cuando falla, los estudiantes no pueden pasar de la pantalla de configuración.

**Problema**

- El Límite (Boundary) no se configura, se reinicia constantemente o muestra una advertencia de "seguimiento perdido"

**Verificación Rápida**

- ¿Está la habitación bien iluminada? La poca luz es la causa más frecuente
- ¿Hay espejos, ventanas grandes o superficies reflectantes cerca?
- ¿Está el área de juego libre de obstáculos?

---

**Pasos de Solución**

- Enciende luces adicionales — las cámaras necesitan iluminación consistente y uniforme
- Cubre o evita espejos y superficies muy reflectantes que confunden las cámaras de seguimiento

[IMAGE:guardian-mirror]
- Redibuja el límite desde cero: ve a Configuración → Configuración del entorno → Límite → Borrar historial de límites
- Asegúrate de que el suelo sea visible y no tenga un solo color uniforme

**Si Sigue Sin Funcionar**

- Cambia al modo de Límite Estacionario, que requiere menos mapeo del espacio
- Limpia las cámaras externas del visor con un paño de microfibra seco

> "Configura Boundary antes de que lleguen los estudiantes — ahorra cinco minutos de clase."`,

  "headset-not-turning-on": `Un visor que no enciende es alarmante pero generalmente tiene una solución simple relacionada con la batería o un sistema congelado.

**Problema**

- Presionar el botón de encendido no produce respuesta — sin pantalla, sin LED, sin sonido

**Verificación Rápida**

- ¿Se enciende el LED de carga al conectar el cable? (Naranja = cargando, verde = completo)
- ¿Has mantenido presionado el botón de encendido durante tres segundos completos?

[IMAGE:charging-led]

---

**Pasos de Solución**

- Conecta el visor a su cargador y espera al menos quince minutos antes de intentar de nuevo
- Prueba un cable USB-C diferente — los cables dañados son un problema frecuente
- Reinicio forzado: mantén presionados el **botón de encendido y el botón de bajar volumen** simultáneamente durante treinta segundos, luego suelta

**Si Sigue Sin Funcionar**

- Revisa el puerto de carga por pelusa o suciedad y limpia con cuidado con un palillo seco
- Prueba un adaptador de corriente diferente — algunos cargadores de bajo voltaje no pueden encender el visor

> "Carga los visores durante la noche antes del día de clase. Un visor sin batería es un problema prevenible."

[IMAGE:quest-3-hardware]`,

  "login-problems": `Los fallos de inicio de sesión bloquean el acceso a apps y contenido. La causa suele ser una discrepancia de credenciales entre el visor y el sistema de cuentas de Meta.

**Problema**

- El visor muestra una pantalla de inicio de sesión pero rechaza el correo electrónico, la contraseña o el código de doble factor

**Verificación Rápida**

- ¿Está el correo electrónico escrito correctamente, incluyendo el dominio?
- ¿La cuenta está realmente vinculada a este visor específico?

---

**Pasos de Solución**

- Verifica las credenciales de la cuenta iniciando sesión primero en un teléfono o navegador
- Abre la app de Meta en el teléfono emparejado y confirma que el visor aparece en Dispositivos
- Si la autenticación de doble factor está activada, asegúrate de que el teléfono que recibe los códigos esté cerca
- Para cuentas institucionales, confirma con el administrador que la cuenta sigue activa

**Si Sigue Sin Funcionar**

- Restablece la contraseña a través de la página de recuperación de cuenta de Meta
- Elimina el visor de la cuenta y vuelve a agregarlo a través del flujo de configuración de la app de Meta

> "Prueba todos los inicios de sesión el día anterior a la clase de VR — nunca descubras un problema frente a los estudiantes."`,

  "cloud-streaming-lag": `Las apps de VR transmitidas desde la nube dependen completamente de la velocidad de la red. El retraso y el tartamudeo hacen la experiencia inutilizable y pueden causar malestar por movimiento.

**Problema**

- Los visuales de la app tartamudean, se congelan o muestran artefactos de compresión visibles durante el uso

**Verificación Rápida**

- ¿La velocidad de internet es de al menos 50 Mbps de descarga? Haz una prueba de velocidad en la misma red
- ¿Hay otros dispositivos consumiendo ancho de banda en la misma red?

---

**Pasos de Solución**

- Reduce el tráfico de red: pausa descargas, streaming y actualizaciones en otros dispositivos
- Acerca el visor al router WiFi o punto de acceso
- Cambia a la banda WiFi de 5 GHz si está disponible — ofrece velocidades más rápidas con menos interferencia
- Descarga la app al visor en lugar de transmitirla, si hay una versión local disponible

**Si Sigue Sin Funcionar**

- Conecta el router directamente a la toma de red principal de la escuela con un cable Ethernet
- Programa las sesiones de VR en horas de bajo tráfico de red cuando menos usuarios están conectados

> "Las apps descargadas siempre funcionan mejor que las transmitidas. Descarga siempre que sea posible."`,

  "software-update-issues": `Las actualizaciones fallidas o atascadas pueden dejar un visor inutilizable. Paciencia y las condiciones adecuadas resuelven la mayoría de los problemas de actualización.

**Problema**

- La actualización se descarga pero no se instala, se queda en un porcentaje de progreso o se reinicia sin completar

**Verificación Rápida**

- ¿La batería está por encima del 50%? Las actualizaciones no se instalan con poca batería
- ¿La conexión WiFi es estable y rápida?
- ¿Hay suficiente espacio de almacenamiento? Revisa en Configuración → Almacenamiento

---

**Pasos de Solución**

- Conecta el cargador y una red WiFi fuerte antes de reintentar
- Fuerza la búsqueda de actualizaciones: ve a Configuración → Sistema → Actualización de Software → Buscar Actualización
- Si está atascado, reinicia el visor y déjalo intentar la actualización de nuevo automáticamente
- Libera espacio eliminando apps o archivos multimedia sin usar si el almacenamiento es bajo

**Si Sigue Sin Funcionar**

- Deja el visor enchufado y conectado al WiFi durante la noche — algunas actualizaciones se instalan en tiempo de inactividad
- Si el visor está completamente atascado, realiza un reinicio forzado (encendido + bajar volumen durante 30 segundos)

> "Nunca empieces una clase con un visor a mitad de actualización. Busca actualizaciones el día anterior."`,

  "casting-issues": `El casting te permite compartir la vista de VR de un estudiante en una pantalla o navegador para que toda la clase pueda ver lo que el estudiante ve. Cuando falla, pierdes esa visibilidad compartida.

**Problema**

- El casting no inicia, se desconecta repetidamente o muestra una pantalla negra en el dispositivo receptor

**Verificación Rápida**

- ¿Están el visor y el dispositivo receptor en la **misma red WiFi**?
- ¿El dispositivo receptor es un Chromecast, smart TV o navegador compatible?

---

**Pasos de Solución**

- Inicia el casting desde el visor: ve a Controles de acceso rápido → Transmitir → selecciona el dispositivo
- Reinicia tanto el visor como el dispositivo receptor
- Si usas casting por navegador, abre **horizon.meta.com/casting** en Chrome en la misma red
- Intenta transmitir a través de la app de Meta en un teléfono como ruta alternativa

**Si Sigue Sin Funcionar**

- Revisa la configuración del router — algunas redes aíslan los dispositivos entre sí (aislamiento AP), lo que bloquea el casting
- Usa una app de duplicación de pantalla en un portátil conectado por USB como respaldo con cable

> "Prueba el casting en la pantalla de tu aula antes de que lleguen los estudiantes. Toma treinta segundos."

[IMAGE:casting-setup]`,

  "factory-reset": `Un restablecimiento de fábrica borra todo del visor y lo devuelve a su estado original. Es el **último recurso** cuando nada más funciona.

**Problema**

- Fallos persistentes, errores irresolubles o un visor atascado en un bucle de arranque después de agotar todas las demás soluciones

**Verificación Rápida**

- ¿Has intentado todas las demás soluciones relevantes de este módulo primero?
- ¿Has respaldado datos importantes, partidas guardadas o configuraciones de apps?

---

**Pasos de Solución (Método por Software)**

- Ve a Configuración → Sistema → Restablecimiento de Fábrica → confirmar
- El visor se reiniciará y borrará todos los datos — esto toma varios minutos

**Pasos de Solución (Método por Hardware — si el visor no arranca)**

- Apaga el visor completamente
- Mantén presionados **encendido + bajar volumen** hasta que aparezca el menú de arranque
- Usa los botones de volumen para navegar a "Restablecimiento de Fábrica" y presiona el botón de encendido para confirmar

**Después del Restablecimiento**

- Necesitarás volver a emparejar el visor con un teléfono, iniciar sesión, configurar Boundary y reinstalar todas las apps
- Vuelve a descargar las apps y reconfigura los ajustes institucionales

> "El restablecimiento de fábrica arregla casi todo — pero también borra todo. Úsalo solo cuando sea necesario."`,

  "pairing-controllers": `Los controles que no responden dejan a los estudiantes sin poder interactuar con el contenido de VR. La solución suele ser las baterías o un paso de re-emparejamiento.

**Problema**

- El control no responde a los botones, no es rastreado por el visor o aparece como desconectado

**Verificación Rápida**

- ¿Las baterías están nuevas? Las baterías débiles causan desconexiones intermitentes
- ¿El control aparece en Configuración → Dispositivos → Controles?

---

**Pasos de Solución**

- Retira las baterías, espera diez segundos y vuelve a insertarlas firmemente
- Vuelve a emparejar el control: ve a Configuración → Dispositivos → Controles → Emparejar Nuevo Control y sigue las instrucciones en pantalla
- Si el control estaba emparejado con otro visor, desemparéjalo allí primero
- Para un control nuevo, sigue el flujo de emparejamiento inicial durante la configuración del visor

**Si Sigue Sin Funcionar**

- Prueba baterías que sepas que funcionan de un control operativo para descartar un problema de baterías
- Revisa si hay daño físico — un control que se cayó puede tener un contacto de batería suelto

> "Ten baterías de repuesto en cada estuche del visor. Los controles sin batería son la interrupción más común a mitad de clase."`,

  "visual-issues": `Las imágenes borrosas o distorsionadas reducen la inmersión y causan fatiga visual. La solución casi siempre es un ajuste físico, no una configuración de software.

**Problema**

- La imagen se ve borrosa, tiene una neblina o se ve distorsionada en los bordes

**Verificación Rápida**

- ¿Está el visor colocado correctamente en la cara, con los lentes centrados sobre los ojos?
- ¿Todavía tiene la película protectora de plástico en los lentes?

---

**Pasos de Solución**

- Ajusta las correas para que el visor quede firme sin presionar demasiado la cara
- Mueve el visor ligeramente hacia arriba y abajo en la cara hasta que la imagen se enfoque — el "punto ideal" es cuando el texto se ve nítido
- Ajusta el IPD (distancia interpupilar) con el deslizador o configuración para que coincida con la separación de los ojos del estudiante
- Limpia los lentes suavemente con un paño de microfibra seco — sin líquidos, sin toallas de papel

**Si Sigue Sin Funcionar**

- Revisa si hay rayones en los lentes — los lentes rayados degradan la calidad de imagen permanentemente
- Algunos estudiantes necesitan usar sus gafas dentro del visor; usa el espaciador para gafas si está disponible

> "Dedica treinta segundos a ajustar el visor antes de cada sesión. Un visor bien ajustado hace que todo se vea mejor."

[IMAGE:ipd-adjustment]`,

  "troubleshooting-mindset": `Los problemas técnicos en una clase de VR son inevitables. Tu respuesta a ellos determina si la clase aprende o pierde el ritmo.

**El Enfoque Tranquilo**

- Mantén la calma — los estudiantes reflejan tu reacción. Si tratas el problema como algo rutinario, ellos también lo harán
- La mayoría de los problemas de VR se resuelven con un simple reinicio. Intenta eso primero antes de investigar más
- No dediques más de dos minutos a solucionar un visor durante la clase — cámbialo por uno de repuesto o pon al estudiante con un compañero

---

**Ten un Plan B Listo**

- Prepara una actividad de respaldo sin VR que cubra el mismo objetivo de aprendizaje
- Una discusión breve, una hoja de trabajo o un video pueden llenar el vacío mientras arreglas el visor después de clase
- Rota a los estudiantes con menos visores funcionando en lugar de esperar a que todos estén reparados

---

**Mantén la Perspectiva**

- El objetivo de aprendizaje importa más que la tecnología. Una clase sin VR puede igual ser exitosa
- Documenta los problemas recurrentes para resolverlos antes de la próxima sesión
- Cada problema técnico que resuelves hace que la siguiente clase de VR sea más fluida

> "Los mejores profesores de VR no son expertos en tecnología — están preparados para cuando la tecnología falla."

[IMAGE:troubleshoot-mindset]`,
};
