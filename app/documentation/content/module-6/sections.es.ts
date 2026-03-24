/**
 * Module 6 section content (Spanish). Resolviendo Problemas Comunes de VR en el Aula.
 */
export const sectionsEs: Record<string, string> = {
  "wifi-connection": `Los problemas de Wi-Fi son el problema técnico más común en las aulas VR. Así es cómo diagnosticarlos y solucionarlos rápidamente.

**Síntomas**

- La gafa muestra "Sin conexión a internet"
- Las apps no se cargan o no transmiten contenido
- El casting deja de funcionar o se vuelve lento

**Solución paso a paso**

1. **Reinicia el Wi-Fi en tu teléfono:** En los ajustes del teléfono, desactiva el Wi-Fi y luego vuelve a activarlo. Esto puede ayudar si estás usando la app Meta Horizon para la configuración.
2. **Reinicia la gafa:** Mantén presionado el botón de encendido hasta que aparezca la pantalla de apagado, luego selecciona Reiniciar. Si no funciona, haz un reinicio forzado manteniendo presionado el botón de encendido durante 30 segundos.
3. **Prueba una red diferente:** Si sigues teniendo problemas, intenta conectarte a una red diferente. Puede ser un punto de acceso personal — solo asegúrate de que el teléfono que usas para vincular y la gafa estén en la misma red Wi-Fi.
4. **Olvida y vuelve a añadir la red:** Ve a Ajustes → Wi-Fi → selecciona la red → Olvidar → reconecta con la contraseña.
5. **Verifica restricciones de red:** Algunas redes escolares o corporativas bloquean el tráfico VR. Pregunta a tu equipo de IT si los puertos requeridos por Meta Quest están abiertos. Las redes mesh, redes basadas en certificados y Wi-Fi de hoteles/aeropuertos suelen bloquear casting y streaming.
6. **Problemas de Wi-Fi post-configuración:** Si la gafa ya estaba configurada y el Wi-Fi deja de funcionar, intenta activar y desactivar el Wi-Fi en ajustes rápidos, o ve a Ajustes → Wi-Fi para reconectar.

**Prevención**

- Prueba el Wi-Fi en todas las gafas antes de clase.
- Ten la contraseña del Wi-Fi anotada y accesible.
- Considera usar un router dedicado para las gafas VR si la red de tu centro es inestable o tiene muchas restricciones.
- Asegúrate de que el teléfono usado para vincular y la gafa estén siempre en la misma red Wi-Fi.

📎 **Referencia oficial:** [Solucionar problemas de Wi-Fi en Meta Quest](https://www.meta.com/en-gb/help/quest/324548839092626/) | [Solución de Wi-Fi post-configuración](https://www.meta.com/help/quest/517103729284781/)`,

  "pins-access-codes": `Los problemas con PINs y códigos de acceso pueden impedir que los estudiantes usen las gafas. Entender los diferentes tipos de códigos ayuda a resolverlos más rápido.

**Tipos de PINs y códigos en Meta Quest**

- **Código de emparejamiento del dispositivo:** Un código de 5 dígitos que se muestra en la gafa durante la primera configuración para conectar con la app móvil Meta Horizon. Este código permanece igual incluso después de un restablecimiento de fábrica.
- **Código de inicio de sesión:** Un código alfanumérico de 8 caracteres que se muestra en la gafa al iniciar sesión. Se introduce en [www.meta.com/device](https://www.meta.com/device/).
- **Código de acceso (Passcode):** Un código de seguridad de 4–16 dígitos que protege tu perfil de Meta Horizon en la gafa. Impide que otros accedan a tu perfil, contraseñas guardadas y apps bloqueadas. Es opcional y se borra con un restablecimiento de fábrica.
- **PIN de Meta Quest (compras):** Un PIN de 4 dígitos creado durante la configuración de la cuenta, usado para verificar identidad y simplificar compras en la Meta Horizon Store. Todos los dispositivos de la misma cuenta comparten el mismo PIN.
- **Códigos de email de un solo uso:** Códigos enviados a tu email para verificación de seguridad. Nunca compartas estos códigos e ignora los que no hayas solicitado.

**Solución paso a paso**

1. **Identifica qué código se está pidiendo:** ¿Es un código de emparejamiento, inicio de sesión, código de acceso o PIN de compras? Cada uno tiene un proceso de resolución diferente.
2. **Para códigos de emparejamiento:** El código de 5 dígitos se muestra en la gafa. Asegúrate de que la app Meta Horizon está instalada y actualizada.
3. **Para códigos de inicio de sesión:** Visita [www.meta.com/device](https://www.meta.com/device/) en un ordenador o teléfono e introduce el código de 8 caracteres mostrado en la gafa.
4. **Para códigos de acceso olvidados:** Usa la app Meta Horizon para gestionar o restablecer el código. Si no funciona, un restablecimiento de fábrica borrará el código (pero también todos los datos).
5. **Para problemas con PIN de compras:** Gestiona tu PIN de Meta Quest en [ajustes de cuenta meta.com](https://www.meta.com/help/quest/119389083518185/).
6. **Para cuentas institucionales:** Contacta a tu administrador de Meta Horizon Managed Services.

**Prevención**

- Documenta todos los PINs y códigos de acceso en una hoja de referencia compartida entre instructores (almacenada de forma segura).
- Usa códigos de acceso simples y estandarizados para gafas compartidas en el aula.
- Prueba el acceso con PIN/código antes de cada sesión de clase.
- Mantén la app Meta Horizon actualizada en tu teléfono.

📎 **Referencia oficial:** [Conoce los PINs y códigos de Meta Horizon y Meta Quest](https://www.meta.com/en-gb/help/quest/1396767491334420/) | [Gestionar tu código de acceso](https://www.meta.com/help/quest/1198803198189099/)`,

  "boundary-guardian-problems": `Los problemas con el límite (Guardian) pueden impedir que las experiencias VR inicien o causar advertencias de seguridad durante el uso.

**Por qué la gafa olvida tu límite**

Según la documentación oficial de Meta, la gafa puede olvidar un límite previo si:

- **El espacio físico ha cambiado significativamente** — muebles movidos, decoración de paredes cambiada, o muchas personas moviéndose en la zona de juego.
- **La iluminación ha cambiado significativamente** — ventanas prominentes con diferente iluminación diurna vs. nocturna, o la dirección de la iluminación interior ha cambiado (p. ej., la fuente de luz se movió a un lado diferente de la habitación).

**Solución paso a paso**

1. **Redibuja el límite:** Sitúate lo más cerca posible del centro de la zona de juego prevista al dibujar el límite.
2. **Mira alrededor de la habitación al dibujar:** Solo mirar en una dirección mientras dibujas el límite reduce la probabilidad de que la gafa lo recuerde en el futuro.
3. **Asegura iluminación adecuada:** Evita la luz solar directa en la zona de juego. Una buena regla: si puedes leer un libro en la habitación, la iluminación es suficiente.
4. **Despeja la zona:** Asegúrate de que el área dentro del límite esté libre de obstáculos, superficies reflectantes, espejos y cristales.
5. **Activa el límite estacionario:** Si el espacio es muy limitado, usa la opción de límite estacionario en lugar del de escala de habitación. Esto crea un pequeño límite circular alrededor del usuario.
6. **Reinicia la gafa** si el sistema de límites no responde.

**Prevención**

- Configura los límites antes de que lleguen los estudiantes y mantén la distribución de la sala consistente.
- Usa iluminación consistente en la zona VR — evita cambiar las fuentes de luz entre sesiones.
- Marca los límites físicos en el suelo con cinta adhesiva para poder redibujarlos rápidamente si es necesario.
- Siempre asegúrate de que el área dentro del límite esté libre de obstáculos.

📎 **Referencia oficial:** [Solucionar problemas de límite en Meta Quest](https://www.meta.com/en-gb/help/quest/637588533755549/) | [Configurar tu límite](https://www.meta.com/help/quest/463504908043519/)`,

  "headset-not-turning-on": `Una gafa que no enciende puede ser alarmante, pero normalmente tiene una solución sencilla.

**Solución paso a paso**

1. **Verifica la batería:** Presiona brevemente el botón de encendido. Si el LED parpadea en naranja o rojo, la batería está agotada. Conecta el cargador y espera al menos 10 minutos antes de intentar de nuevo.
2. **Intenta un reinicio forzado:** Mantén presionado el botón de encendido durante 30 segundos. Suéltalo, espera 10 segundos, luego presiónalo de nuevo.
3. **Verifica el cargador y el cable:** Prueba con un cable USB-C diferente y un adaptador de carga diferente. El cable original podría estar dañado.
4. **Busca indicadores LED:** LED verde fijo significa carga completa; naranja fijo significa cargando; sin luz puede indicar un problema más profundo.
5. **Déjala cargando 30 minutos:** A veces las gafas necesitan carga prolongada antes de poder encenderse si la batería estaba completamente agotada.
6. **Usa la herramienta de actualización de software:** Antes de hacer un restablecimiento de fábrica, prueba la [herramienta de actualización de software](https://www.meta.com/help/quest/software_update/) de Meta que puede actualizar tu dispositivo incluso cuando no responde.
7. **Contacta soporte** si nada de lo anterior funciona — la gafa puede tener un problema de hardware.

**Prevención**

- Carga todas las gafas completamente la noche antes de clase.
- Establece una rutina de carga regular (misma hora, mismo lugar, misma persona responsable).
- Verifica los niveles de batería en todas las gafas como parte de tu checklist pre-clase.

📎 **Referencia oficial:** [Cómo reiniciar tu Meta Quest](https://www.meta.com/help/quest/963075691100632/)

🎬 **Video tutorial:** [Meta Quest no enciende — Guía de solución de problemas](https://www.youtube.com/watch?v=3C54xV-t73Y)`,

  "login-problems": `Los problemas de inicio de sesión y autenticación pueden bloquear el acceso a apps y contenido. Así es cómo solucionarlos según la guía oficial de Meta.

**Problemas comunes**

- Mensajes de "Inicio de sesión fallido" o "Error de autenticación"
- Cuenta no reconocida después de cerrar sesión
- Problemas con autenticación de dos factores
- Problemas de inicio de sesión específicos de la app (diferentes al inicio de sesión de la gafa)

**Solución paso a paso**

1. **Asegúrate de que la gafa está conectada a Wi-Fi:** La gafa necesita conexión Wi-Fi para volver a iniciar sesión. Si no hay Wi-Fi, la gafa te pedirá que te conectes.
2. **Verifica la app Meta Horizon:** Si estás conectado en la app de tu teléfono con la misma cuenta, la app debería volver a iniciar sesión automáticamente en la gafa. Asegúrate de que:
   - Tienes la última versión de la app Meta Horizon instalada.
   - El Bluetooth está activado y la app tiene permisos de Bluetooth.
   - La app muestra que la gafa está conectada vía Bluetooth.
3. **Resuelve problemas de cuenta:** Visita [https://auth.meta.com/settings/my/devices/](https://auth.meta.com/settings/my/devices/) — si ves tu gafa listada, deberías poder volver a iniciar sesión. Si te redirige o no puedes cargar la página, sigue las instrucciones para resolver los problemas de cuenta.
4. **Confirma la cuenta correcta:** Asegúrate de iniciar sesión con la misma cuenta usada para añadir tu perfil a la gafa. Verifica en [auth.meta.com/settings/my/devices](https://auth.meta.com/settings/my/devices/).
5. **Actualiza el software de la gafa:** Puede que necesites actualizar la gafa antes de iniciar sesión. Usa la [herramienta de actualización de software](https://www.meta.com/help/quest/software_update/).
6. **Haz un reinicio forzado:** Mantén presionado el botón de encendido durante 30 segundos hasta que el dispositivo se reinicie.
7. **Para inicios de sesión de apps específicas:** Recuerda que algunas apps VR tienen sus propias cuentas separadas de la cuenta Meta.

**Prevención**

- Mantén un documento de referencia con todas las credenciales de cuentas (almacenado de forma segura).
- Prueba los inicios de sesión en todas las gafas antes de clase.
- Asegúrate de que los métodos de recuperación de autenticación de dos factores estén accesibles.
- Mantén la app Meta Horizon actualizada y conectada vía Bluetooth.

📎 **Referencia oficial:** [Solucionar problemas de inicio de sesión en Meta Quest](https://www.meta.com/en-gb/help/quest/580216334910126/) | [Recuperar tu cuenta Meta](https://www.meta.com/help/quest/3319763318177048/)`,

  "cloud-streaming-lag": `El contenido VR transmitido por la nube puede experimentar retrasos o bajo rendimiento. Esto está estrechamente relacionado con la calidad del Wi-Fi, ya que el streaming depende de una conexión de red estable y rápida.

**Síntomas**

- Retraso o delay visible en el seguimiento de manos/controladores
- Visuales borrosos o pixelados
- Audio fuera de sincronización con los visuales
- App congelándose o con tirones

**Solución paso a paso**

1. **Verifica la velocidad de internet:** La transmisión por la nube requiere una conexión estable con al menos 20–50 Mbps. Realiza un test de velocidad en la misma red.
2. **Reduce la carga de la red:** Desconecta dispositivos innecesarios del Wi-Fi. Múltiples gafas transmitiendo simultáneamente pueden saturar la red.
3. **Acércate al router:** La distancia física y las paredes reducen la calidad de la señal Wi-Fi.
4. **Usa Wi-Fi de 5 GHz o 6 GHz:** Si está disponible, conéctate a la banda de 5 GHz o 6 GHz en lugar de la de 2.4 GHz para mejor ancho de banda y menor latencia. Esto también lo recomienda Meta para el casting.
5. **Reinicia la gafa:** Mantén presionado el botón de encendido hasta que aparezca la pantalla de apagado, luego selecciona Reiniciar. Si es necesario, haz un reinicio forzado manteniendo el botón 30 segundos.
6. **Cierra apps en segundo plano:** Otras apps ejecutándose en la gafa consumen recursos. Cierra todo lo que no sea necesario.
7. **Prueba una red diferente:** Algunas redes (mesh, corporativas) pueden limitar o bloquear el tráfico de streaming.

**Prevención**

- Prueba el rendimiento de streaming antes de clase con la cantidad real de gafas que usarás.
- Usa un router dedicado con red de 5 GHz para las gafas VR.
- Ten un plan de respaldo: descarga contenido clave localmente cuando sea posible para evitar depender del streaming.
- Evita usar redes de invitados escolares — suelen tener límites de ancho de banda.

📎 **Referencia oficial:** [Solucionar problemas de Wi-Fi en Meta Quest](https://www.meta.com/en-gb/help/quest/288249631018028/) | [Conectar la gafa a Wi-Fi](https://www.meta.com/help/quest/1816744325172615/)`,

  "software-update-issues": `Las actualizaciones de software pueden causar retrasos y cambios inesperados. Gestiónalas proactivamente usando los procedimientos oficiales de Meta.

**Problemas comunes**

- La actualización se inicia automáticamente durante la clase
- La actualización falla o se queda atascada
- Las apps se comportan diferente después de una actualización
- No hay suficiente espacio de almacenamiento para la actualización

**Cómo verificar y gestionar actualizaciones**

1. Presiona el botón Meta (o botón Oculus) en tu controlador derecho para abrir el menú universal.
2. Selecciona el reloj en el lado izquierdo para abrir Ajustes Rápidos.
3. Selecciona Ajustes en la esquina superior derecha.
4. Selecciona General, luego selecciona Actualización de Software.
5. Desde aquí puedes ver tu versión actual de software y descargar actualizaciones disponibles.

**Configuración de actualizaciones automáticas**

Tu gafa se actualizará automáticamente cuando esté conectada a Wi-Fi y encendida. Con "Encender automáticamente la gafa para actualizar" activado, la gafa se encenderá brevemente para aplicar actualizaciones y se apagará cuando termine. Las cámaras y micrófonos no pueden recopilar ni grabar datos durante este proceso.

Para activar/desactivar: Ajustes → General → Actualización de Software → activar/desactivar "Encender automáticamente la gafa para actualizar."

**Nota:** No puedes usar la actualización automática si tienes un PIN de bloqueo configurado.

**Solución paso a paso para problemas**

1. **Actualiza la noche antes de clase**, nunca justo antes.
2. **Si una actualización se atasca:** Reinicia la gafa e intenta de nuevo. Asegúrate de tener Wi-Fi estable y batería suficiente (más del 50%).
3. **Usa la herramienta de actualización de software:** Visita la [herramienta de actualización de software](https://www.meta.com/help/quest/software_update/) de Meta para actualizar incluso una gafa que no responde.
4. **Verifica el almacenamiento disponible:** Ve a Ajustes → Almacenamiento. Borra archivos o apps innecesarios si el espacio es bajo.
5. **Después de una actualización:** Prueba todas las apps que planeas usar para asegurar que siguen funcionando correctamente.

**Prevención**

- Programa un día regular de actualizaciones (p. ej., cada viernes después de clase).
- Actualiza todas las gafas al mismo tiempo para mantenerlas sincronizadas.
- Siempre prueba las apps después de cualquier actualización antes de usarlas en clase.
- Mantén las gafas cargadas, conectadas a Wi-Fi y sobre una superficie plana para permitir actualizaciones automáticas durante la noche.

📎 **Referencia oficial:** [Actualizar el software de tu Meta Quest](https://www.meta.com/en-gb/help/quest/540602136930952/) | [Notas de versión de Meta Quest](https://www.meta.com/help/quest/172903867975450/)`,

  "casting-issues": `El casting permite compartir la experiencia VR en una pantalla. Cuando falla, la solución depende del dispositivo de destino.

**Casting a un teléfono móvil o tablet**

1. Inicia sesión con la misma cuenta Meta tanto en la gafa como en la [app Meta Horizon](https://www.meta.com/help/quest/1178714089211378/).
2. Confirma que la gafa y el dispositivo están en la misma red Wi-Fi.
3. Si aún no funciona, reinicia la gafa, el teléfono y el dispositivo de casting.
4. Busca actualizaciones de software en todos los dispositivos.
5. Si sigue sin funcionar, reinicia tu router Wi-Fi.

**Casting a un navegador web**

1. Asegúrate de estar conectado con la misma cuenta en tu navegador.
2. Ve a [oculus.com/casting](https://oculus.com/casting) e inicia sesión.
3. Inicia el casting desde la gafa.

**Casting a un dispositivo con Chromecast**

1. Asegúrate de que tu TV soporta Chromecast y que está habilitado en los ajustes de la TV.
2. Si tu red tiene dos bandas, confirma que todos los dispositivos están en la misma banda Wi-Fi. Usa 5 GHz o 6 GHz en lugar de 2.4 GHz para mejor rendimiento.
3. Asegúrate de que la fecha y hora del dispositivo Chromecast sean correctas.
4. Para ayuda adicional, visita el [Centro de Ayuda de Chromecast](https://support.google.com/chromecast/chromecast/).

**Problemas conocidos (de Meta)**

- Las redes mesh, redes corporativas y redes basadas en certificados pueden bloquear el casting por razones de seguridad. Esto es común en redes de invitados domésticas, redes corporativas/comerciales (hoteles, aeropuertos) y algunos sistemas de tethering móvil.
- Las TVs con Chromecast integrado pueden ser compatibles, pero la compatibilidad no está garantizada con todos los modelos.
- El casting y la grabación simultáneos pueden causar problemas.
- El casting puede aumentar el uso de batería o degradar el rendimiento dentro de la app.

**Prevención**

- Prueba la configuración de casting antes de que lleguen los estudiantes, usando la misma configuración de red.
- Ten un método de casting secundario listo (app del teléfono, navegador en oculus.com/casting).
- Usa una conexión por cable (Ethernet) para el dispositivo de casting cuando sea posible.
- Si tu red bloquea el casting, prueba una red diferente o un punto de acceso personal.

📎 **Referencia oficial:** [Solucionar problemas de casting en Meta Quest](https://www.meta.com/en-gb/help/quest/214966974548157/) | [Transmitir a una pantalla con Meta Quest](https://www.meta.com/help/quest/192719842695017/)`,

  "factory-reset": `Un restablecimiento de fábrica solo debe usarse como último recurso. Borra todos los datos, apps y configuraciones de la gafa.

**Antes de restablecer — prueba esto primero**

Meta recomienda intentar estos pasos antes de recurrir a un restablecimiento de fábrica:

1. **Actualiza tu dispositivo** usando la [herramienta de actualización de software](https://www.meta.com/help/quest/software_update/). Esto puede actualizar el software de tu gafa incluso cuando el dispositivo no responde.
2. **Reinicio forzado:** Mantén presionado el botón de encendido durante 30 segundos hasta que escuches que el dispositivo se vuelve a encender.

**Cosas que debes saber antes de empezar**

- Realizar un restablecimiento de fábrica es **irreversible** y eliminará toda la información de la cuenta, juegos descargados y contenido de la gafa.
- El contenido que hayas **comprado** desde tu cuenta no se pierde — puedes volver a descargarlo después de la configuración.
- [Activa la copia de seguridad en la nube](https://www.meta.com/help/quest/399621398228171/) antes de restablecer para guardar los datos y configuraciones de tus apps.
- Asegúrate de que la gafa tiene **al menos 50% de batería** antes de realizar el restablecimiento.

**Método 1 — Desde la gafa**

1. Apaga la gafa.
2. Mantén presionados simultáneamente el **botón de encendido y el botón de bajar volumen (-)** hasta que cargue la pantalla de arranque.
3. Usa los botones de volumen para seleccionar **Factory Reset** y presiona el botón de encendido para confirmar.
4. Usa los botones de volumen para seleccionar **Yes** y presiona el botón de encendido para confirmar.

**Método 2 — Desde la app Meta Horizon**

1. Abre la app Meta Horizon en tu teléfono.
2. Navega a Dispositivos → selecciona tu gafa.
3. Busca la opción de Restablecimiento de Fábrica y confirma.

**Método 3 — Restablecimiento de fábrica remoto**

Si has perdido acceso a una gafa, puedes realizar un restablecimiento de fábrica remoto desde tu cuenta Meta para proteger tus datos e información personal.

**Después de un restablecimiento de fábrica**

- Se requiere la configuración inicial completa de nuevo.
- Todas las apps deben reinstalarse (las apps compradas pueden volver a descargarse).
- Todos los ajustes y códigos de acceso deben reconfigurarse.
- El límite/Guardian debe configurarse de nuevo.

📎 **Referencia oficial:** [Cómo restablecer de fábrica tu Meta Quest](https://www.meta.com/en-gb/help/quest/149134797159340/) | [Copia de seguridad en la nube de Meta Quest](https://www.meta.com/help/quest/399621398228171/)

🎬 **Video tutorial:** [Cómo restablecer de fábrica tu Meta Quest](https://www.youtube.com/watch?v=dQ9IeyFChCI)`,

  "pairing-controllers": `Los problemas de emparejamiento de controladores pueden impedir que los estudiantes interactúen con el contenido VR. Los controladores deben emparejarse usando la app Meta Horizon.

**Importante:** No es posible emparejar controladores sin usar la app Meta Horizon.

**Cómo emparejar controladores (procedimiento oficial)**

1. Asegúrate de que la gafa está encendida, luego abre la app Meta Horizon en tu teléfono.
2. Toca **Menú** en la parte superior de tu feed de Horizon.
3. Toca **Dispositivos**.
4. Selecciona la gafa a la que quieres emparejar controladores.
5. Toca **Ajustes de la gafa**, luego toca **Controladores**.
6. Toca **Emparejar nuevo controlador**.
7. Elige qué controlador quieres emparejar (izquierdo o derecho).
8. Mantén presionados:
   - **Controlador derecho:** Botón Meta/Oculus + botón B
   - **Controlador izquierdo:** Botón Menú + botón Y
   
   Mantén presionado hasta que el LED del controlador parpadee y luego se encienda para finalizar el emparejamiento.

**Cómo desemparejar controladores**

1. Abre la app Meta Horizon → Menú → Dispositivos.
2. Selecciona la gafa → Ajustes de la gafa → Controladores.
3. Toca el controlador a desemparejar → Desemparejar controlador.

**Consejos de solución de problemas (de Meta)**

- Asegúrate de que las lengüetas de las baterías han sido retiradas de ambas carcasas de controladores.
- Cambia o recoloca la batería y verifica que el controlador recibe energía.
- Verifica que la app Meta Horizon está actualizada.
- Asegúrate de que el Bluetooth está activado en tu teléfono, y que tu teléfono y la gafa están en la misma red Wi-Fi.
- Tu dispositivo debe estar encendido y desbloqueado para emparejar un controlador.
- Si tienes un código de acceso pero no puedes usar un controlador, usa el punto blanco en el centro de la vista de la gafa y los botones de volumen para introducir tu código.
- Si usas accesorios de terceros (fundas, cubiertas, pegatinas), retíralos ya que pueden interferir con el emparejamiento o rastreo.

**Gafas de reemplazo por garantía:** Al configurar una gafa de reemplazo, los controladores existentes no se emparejan automáticamente. Usa la funcionalidad de mirada (movimiento de cabeza) para completar la configuración.

**Prevención**

- Etiqueta controladores y gafas para que las parejas se mantengan juntas.
- Verifica los niveles de batería de los controladores en el checklist pre-clase.
- Ten baterías de repuesto disponibles.
- Mantén la app Meta Horizon instalada y actualizada en tu teléfono.

📎 **Referencia oficial:** [Emparejar y desemparejar controladores Touch de Meta Quest](https://www.meta.com/en-gb/help/quest/967070027432609/) | [Solucionar drift de controladores](https://www.meta.com/help/quest/5545675425557880/)`,

  "visual-issues": `Los visuales borrosos, distorsionados o incómodos reducen la experiencia VR. La mayoría de los problemas visuales tienen soluciones físicas simples.

**Problemas comunes**

- Imagen borrosa
- Visuales distorsionados o estirados
- El "punto óptimo" es difícil de encontrar
- Empañamiento en las lentes

**Solución paso a paso**

1. **Ajusta el ajuste de la gafa:** La causa más común de visuales borrosos es una gafa mal ajustada. Ajusta la correa superior, las correas laterales y la rueda trasera hasta que la imagen sea nítida. Las lentes deben quedar directamente frente a tus ojos.
2. **Limpia las lentes:** Usa un paño de microfibra seco para limpiar suavemente las lentes. Las huellas dactilares y manchas causan borrosidad. Nunca uses limpiadores líquidos directamente en las lentes.
3. **Ajusta el IPD (Distancia Interpupilar):** Para Meta Quest Pro y Meta Quest 2, usa el deslizador de IPD. Para Meta Quest 3/3S, usa la rueda de ajuste de IPD. Ajusta para que coincida con la distancia entre los ojos del estudiante — incluso pequeños ajustes pueden mejorar drásticamente la claridad.
4. **Verifica el empañamiento:** Si las lentes se empañan (común cuando la gafa está fría), deja que se caliente a temperatura ambiente antes de usarla. Limpia suavemente con un paño de microfibra.
5. **Para estudiantes con gafas:** Usa el espaciador de gafas incluido con la gafa VR. Asegúrate de que las gafas del estudiante quepan cómodamente dentro sin presionar contra las lentes VR.
6. **Verifica los ajustes de pantalla:** Ve a Ajustes → Pantalla y verifica que el brillo y la tasa de refresco estén configurados apropiadamente.

**Prevención**

- Enseña a los estudiantes cómo ajustar correctamente la gafa antes de su primera sesión VR.
- Mantén paños de microfibra en cada estación VR.
- Permite que las gafas se aclimaten a la temperatura ambiente antes de usarlas.
- Ten espaciadores de gafas disponibles para estudiantes que usen gafas.`,

  "troubleshooting-mindset": `Los problemas técnicos van a ocurrir. Tu mentalidad determina si descarrilan la lección o se convierten en baches menores.

**Principios fundamentales**

- **Mantén la calma:** Los estudiantes toman señales emocionales de ti. Si estás relajado ante un problema técnico, ellos también lo estarán.
- **Ten un Plan B:** Siempre prepara una actividad alternativa que no requiera VR. Un fallo técnico nunca debería significar tiempo de aprendizaje perdido.
- **Conoce tus 3 soluciones principales:** La mayoría de problemas se resuelven: (1) reiniciando la gafa, (2) reconectando Wi-Fi, o (3) verificando la batería.
- **No resuelvas problemas durante la clase:** Si una gafa tiene un problema serio, apártala y usa las gafas restantes. Resuelve el problema después de clase.

**Construyendo una rutina de resolución de problemas**

1. **Antes de clase:** Repasa el checklist técnico (cargadas, conectadas, apps probadas, casting verificado).
2. **Durante la clase:** Si algo falla, aplica la regla de los 30 segundos — intenta una solución rápida. Si no funciona en 30 segundos, continúa y usa tu plan de respaldo.
3. **Después de clase:** Documenta el problema, investiga a fondo y anota la solución para referencia futura.

**Referencia rápida: enlaces oficiales de soporte de Meta**

- [Solución de problemas de Wi-Fi](https://www.meta.com/en-gb/help/quest/324548839092626/)
- [PINs y códigos de acceso](https://www.meta.com/en-gb/help/quest/1396767491334420/)
- [Problemas de límite/Guardian](https://www.meta.com/en-gb/help/quest/637588533755549/)
- [Problemas de inicio de sesión](https://www.meta.com/en-gb/help/quest/580216334910126/)
- [Actualizaciones de software](https://www.meta.com/en-gb/help/quest/540602136930952/)
- [Problemas de casting](https://www.meta.com/en-gb/help/quest/214966974548157/)
- [Restablecimiento de fábrica](https://www.meta.com/en-gb/help/quest/149134797159340/)
- [Emparejamiento de controladores](https://www.meta.com/en-gb/help/quest/967070027432609/)
- [Soporte de Meta Quest](https://www.meta.com/help/support/)

**Mensaje clave**

"El objetivo no es una configuración técnica perfecta — es una gran experiencia de aprendizaje. Los pequeños contratiempos técnicos son normales y manejables."`,
};
