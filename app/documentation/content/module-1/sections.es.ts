/**
 * Module 1 section content (Spanish). Markdown strings keyed by section id.
 * Image slots use [IMAGE:slotId]; slot ids are defined in app/documentation/docImages.ts.
 */
export const sectionsEs: Record<string, string> = {
  "account-types": `En Meta Quest puedes usar distintos tipos de cuentas según el contexto: personal o institucional. Elegir bien evita problemas de gestión y cumple con las políticas de tu centro.

**Resumen**

- **Cuenta personal:** un usuario por cuenta; se puede usar en clase con un setup sencillo. También es posible compartir una misma cuenta entre varias gafas, con limitaciones.
- **Cuenta institucional (Meta Horizon Managed Services):** gestionada por el centro desde [work.meta.com](https://work.meta.com/). Permite administrar dispositivos, apps y usuarios de forma centralizada. Es la opción recomendada para flotas de gafas en entornos educativos.

[IMAGE:work-meta-dashboard]`,

  "personal-account": `Una **cuenta personal** de Meta es una cuenta individual asociada a un usuario. Se puede utilizar en clase: el setup es más sencillo y no requiere servicios empresariales.

**Configuración de gafas y creación de cuenta**

El proceso incluye encender las gafas, elegir idioma, conectar a Wi‑Fi y crear o iniciar sesión con una cuenta Meta. Puedes seguir guías oficiales como:

- [Configuración de Meta Quest 3 (vídeo)](https://www.youtube.com/watch?v=ZgxP9JrRdO8)
- [Crear cuenta Meta Quest 3 sin Facebook](https://screenrant.com/meta-quest-3-account-without-facebook/)

**Uso compartido de una cuenta personal (pros y contras)**

Si varias personas usan la misma cuenta personal en distintas gafas:

- **Pros:** menos cuentas que gestionar, mismo contenido y apps en todas las gafas.
- **Contras:** límites de compartir cuentas, riesgo de mezclar datos y de incumplir condiciones de uso. Conviene documentar buenas prácticas (quién usa qué gafa, no cambiar contraseñas sin aviso) y conocer los límites que Meta aplica al uso compartido.

> **Nota:** Si gestionas más de unas pocas gafas, considera usar una cuenta institucional con Meta Horizon Managed Services para evitar estos problemas.`,

  "institutional-account": `Las **cuentas institucionales** se gestionan con **Meta Horizon Managed Services** (antes Work for Meta) desde [work.meta.com](https://work.meta.com/) para educación y trabajo. Permiten administrar dispositivos, apps y usuarios de forma centralizada, eliminando la necesidad de gestionar cuentas personales y emails en cada gafa. Una vez configurada la plataforma, se acabaron los quebraderos de cabeza con las altas individuales: añadir nuevas apps, quitar apps, asignar grupos de apps a ciertos centros… todo se simplifica mucho.

> **Nota:** Desde febrero de 2026, Meta Horizon Managed Services es **completamente gratuito**. El soporte oficial está garantizado hasta enero de 2030.

---

**Paso 1 — Crear la cuenta empresarial o educativa**

El primer paso es crear la cuenta en [work.meta.com](https://work.meta.com/). Se puede crear como cuenta empresarial o educativa. Una vez creada, accedes al panel de administración de Meta Horizon Managed Services donde se gestiona todo: dispositivos, personas, apps, plantillas y grupos.

[IMAGE:work-meta-dashboard]

---

**Paso 2 — Añadir personas al sistema**

Lo siguiente es añadir personas a la organización. Meta Horizon Managed Services tiene un completo sistema de roles: administradores, colaboradores, etc. Cada persona puede tener permisos diferentes según su función.

> **Recomendación:** Si una entidad externa va a gestionar parte de la configuración, la institución puede simplemente crear la cuenta, invitar al equipo técnico como administrador por email y asignarles los roles necesarios. Una vez configurado todo, el centro podrá gestionar de forma autónoma tareas más sencillas como añadir nuevos dispositivos o vincular apps.

[IMAGE:work-meta-people]

---

**Paso 3 — Añadir aplicaciones**

Antes de crear plantillas o grupos, es recomendable añadir las apps que se van a utilizar. Para añadir apps a la plataforma hay que tener en cuenta:

- Las apps deben ser **Apps Privadas** o publicadas en Meta como **gratuitas y abiertas**.
- **No se pueden añadir** apps de pago ni apps que estén en canales Alpha o Beta.
- La cuenta de Meta Horizon Managed Services **no es una cuenta de desarrollador**. Son perfiles independientes.

**¿Cómo funciona el proceso de añadir una app?**

1. El administrador de Meta Horizon Managed Services facilita la **KEY de la organización** al desarrollador.
2. El desarrollador envía una invitación desde su canal de desarrollo usando esa KEY.
3. La organización acepta la invitación desde el panel.
4. La app aparece en la lista de aplicaciones, lista para asignar a plantillas, grupos o dispositivos.

Para cuentas de terceros, el proceso es el mismo: ellos envían su KEY de organización para que el desarrollador les envíe la invitación.

[IMAGE:work-meta-add-app]

Una vez añadidas, las apps se gestionan desde el panel de "Aplicaciones y contenido":

[IMAGE:work-meta-apps]

---

**Paso 4 — Crear una plantilla de configuración de dispositivos**

La plantilla define cómo se configuran los dispositivos al activarlos. Aquí se establece:

- Si es necesario o no introducir un **PIN**.
- Si es necesario o no introducir un **email**.
- Qué **apps se instalan por defecto** en los dispositivos que usen esta plantilla.

La plantilla simplifica enormemente la configuración para el usuario final: con una buena plantilla, la puesta en marcha de las Quest es muy sencilla, sin necesidad de emails ni PINs.

> **Consejo:** Si solo hay una plantilla, se asigna por defecto a todos los dispositivos al añadirlos, lo que simplifica aún más el proceso. Desde la propia plantilla se pueden asignar las apps que se deseen.

[IMAGE:work-meta-templates]

---

**Paso 5 — Crear grupos de dispositivos**

Los grupos permiten organizar los dispositivos de forma lógica, por ejemplo: "Gafas para el Instituto X", "Gafas para el Centro de FP Y", etc. A cada grupo se le pueden asignar apps y plantillas específicas.

También es posible:
- Desvincular dispositivos de un grupo.
- Cambiar un dispositivo de grupo.
- Asignar apps diferentes a cada grupo.

[IMAGE:work-meta-create-group]

---

**¿Cómo activar las gafas?**

Hay dos vías de activación de dispositivos. Ambas vinculan las gafas a la organización y les aplican la plantilla y apps configuradas.

---

***Método A — Por Wi-Fi (sin cable)***

Para configurar las gafas por Wi-Fi se necesita: una conexión a internet, las gafas a activar y un PC con el panel de [work.meta.com](https://work.meta.com/) abierto en el navegador.

1. Carga las gafas y pon las pilas a los controladores.
2. En el navegador del PC, ve a la zona de **"Activar Dispositivos"**.

[IMAGE:work-meta-activate-instructions]

3. En las gafas: selecciona el **idioma** y la **clave Wi-Fi**. Comienza la actualización del dispositivo (instala la última versión del sistema operativo, etc.).
4. En un paso posterior, aparece el botón **"Administra el dispositivo una organización"**. Las gafas hacen un reinicio.
5. Aparece el botón **"Conectar a tu organización"** y se muestran **6 dígitos** en pantalla (al estilo ABC-DEF).
6. En el navegador del PC, introduce esa clave de 6 dígitos.

[IMAGE:work-meta-activation-wifi]

7. Ambas partes se conectan. Las gafas indican que se están vinculando y el navegador muestra lo mismo. Tras unos segundos, ambos confirman **"Vinculado con la organización"**.
8. En el navegador ya aparece el dispositivo vinculado. Ahora se puede asignar a **grupos**, **plantillas**, etc. desde el panel de administración.

[IMAGE:work-meta-device-linked]

9. En las gafas, las apps asignadas aparecen automáticamente: se actualizan e instalan de forma automática.

[IMAGE:work-meta-headset-configured]

---

***Método B — Por cable USB (gafas apagadas)***

Es posible configurar las gafas **sin necesidad de encenderlas la primera vez**. Se necesita:

- Un PC Windows o Mac.
- El cable USB para conectar al ordenador.
- El PC **debe tener Bluetooth**. Sin esto, no es posible emparejar las gafas.

**Pasos:**

1. Descarga la **herramienta de configuración de dispositivos de Meta Horizon** para PC o Mac. Los links de descarga están dentro del panel de administración de la plataforma web. En Windows, una vez instalada puede aparecer una alerta de seguridad; basta con aceptar la excepción.

[IMAGE:work-meta-tool-download]

2. Las gafas deben estar **apagadas**. Conéctalas al PC por cable USB.

[IMAGE:work-meta-cable-connect]

3. Una vez conectadas, pulsa **al mismo tiempo el botón de encendido y el de bajar volumen**. Aparece en las gafas el menú de "boot".
4. En ese momento la herramienta del PC las reconoce. Pulsa sobre **"Vincular"** y rellena los datos solicitados: nombre de la red Wi-Fi y contraseña. Todo se instala de forma automática.

[IMAGE:work-meta-activation-cable]

5. En las gafas se activa el proceso de actualización y configuración. **No hay que hacer absolutamente nada en las gafas**; todo se hace desde el PC.
6. Una vez vinculadas, se elige una **plantilla** para el dispositivo, igual que en el alta por Wi-Fi. Esa plantilla envía la configuración predeterminada: si es necesario PIN, si es necesario email, y el grupo de apps elegidas en la plataforma.
7. Como resultado, cuando enciendes las gafas, **ya aparece todo configurado**: las apps asignadas se han instalado automáticamente.

[IMAGE:work-meta-headset-configured-cable]

---

**Cosas a tener en cuenta**

- **Resetear un dispositivo:** para desvincular unas gafas y vincularlas a otra organización o liberarlas, basta con usar la opción **"Eliminar Dispositivo"** en el panel. Las gafas se reinician de fábrica y comienzan desde cero.
- **Dos vías de trabajo paralelas:** la publicación de apps en el canal de desarrollo (DEV) sigue siendo el mismo proceso. Pero Meta Horizon Managed Services es un perfil independiente para gestionar los dispositivos y las apps de forma masiva.

**Recursos oficiales**

- [Meta Horizon Managed Services — panel de administración](https://work.meta.com/)
- [Ayuda de Meta Horizon Managed Services](https://work.meta.com/help/1066783137225591?helpref=faq_content)`,

  "getting-started": `Antes de usar las gafas en el aula, conviene dominar lo básico: contenido del paquete, colocación, IPD e idioma.

> **Requisitos de edad:** Meta exige una edad mínima de **10 años** para usar las gafas Quest. Los menores de **10 a 12 años** necesitan una **cuenta parental de Meta** (la cuenta del padre/madre o tutor). A partir de los **13 años**, los alumnos pueden gestionar su propia cuenta Meta. Tenlo en cuenta al planificar actividades con alumnos de distintas edades.

**Contenido del paquete y primeros pasos**

- Sigue la guía [Empezar con Meta Quest 3](https://knowledge.vr-expert.com/kb/get-started-with-the-meta-quest-3/).
- Colocación correcta del headset, ajuste de cintas y posición de las lentes.
- **Lentes ajustables:** las Quest 3 permiten variar la distancia interpupilar deslizando suavemente las lentes. Un indicador numérico entre las lentes mostrará la posición seleccionada.
- **Cintas y ajuste facial:** las cintas superior y lateral son ajustables. Combinando el ajuste de estas con la inclinación de las gafas sobre el rostro podrás encontrar la posición óptima para una visión nítida y cómoda.
- **IPD (distancia interpupilar):** ajusta la rueda entre las lentes para que la imagen no se vea borrosa o doble; mejora el confort.
- **Idioma:** configúralo en Ajustes para que los alumnos vean la interfaz en el idioma del curso.

**Uso con gafas graduadas**

Meta Quest 3 y 3S permiten usarse con gafas graduadas de dimensiones reducidas, según las especificaciones del fabricante, y cuentan con un accesorio que incrementa el espacio entre las gafas VR y las gafas ópticas, evitando presión y aumentando la comodidad. Consulta [Usar Meta Quest 3S con gafas](https://knowledge.vr-expert.com/kb/how-to-wear-the-meta-quest-3s-with-glasses/) para distancia recomendada y accesorios (espaciadores faciales).

[IMAGE:quest-3-components]`,

  "classroom-setup": `Para usar Meta Quest 3(S) en el aula de forma ordenada y segura, configura las gafas y el espacio antes de la clase.

**Configuración de las gafas**

- [Configuración de Meta Quest 3S](https://knowledge.vr-expert.com/kb/how-to-set-up-the-meta-quest-3s/)
- [Empezar con Meta Quest 3S en el aula](https://knowledge.vr-expert.com/kb/getting-started-with-meta-quest-3s-in-the-classroom/)

Incluye: encendido, cuenta (personal o institucional), Wi‑Fi, Boundary / Límite (antes Guardian) y, si aplica, conexión con la app de Meta Horizon para gestión y casting.`,

  "settings": `Los ajustes del sistema permiten adaptar las gafas al espacio y al usuario. El más importante antes de cada sesión es el **Boundary / Límite (antes Guardian)** — sin él configurado, el alumno podría chocar con paredes u objetos.

**Límite (Boundary) — paso a paso**

El Límite (Boundary) es el sistema de seguridad que delimita la zona en la que el alumno puede moverse. Las gafas muestran una rejilla virtual cuando se acerca al borde, evitando que choque con paredes, muebles u otros alumnos.

**Límites sugeridos y escaneo automático**

Las Meta Quest 3/3S usan sus cámaras para escanear el entorno y **sugerir límites automáticamente** en función del espacio libre que detectan a tu alrededor. La primera vez que abres una app sin límites configurados, las gafas te proponen un boundary que puedes aceptar, editar o reemplazar.

Además, la **configuración del espacio asistida** permite que las gafas escaneen en 3D tu entorno rápidamente para detectar paredes, mesas y muebles sin que tengas que añadirlos manualmente.

[IMAGE:boundary-step1]

**Dos modos disponibles:**

- **Estático (stationary):** zona fija de 1×1 m alrededor del usuario. Se crea automáticamente al entrar en VR. Ideal para experiencias sentado o de pie sin moverse.
- **Room-scale (con desplazamiento):** zona más amplia basada en el escaneo del espacio o dibujada manualmente. Espacio mínimo recomendado: 2×2 m sin obstáculos. Recomendado para la mayoría de apps educativas.

**Cómo ajustar o redibujar el límite:**

1. Pulsa [ICON:metabutton] el **botón Meta** del mando derecho para abrir el Explorador.
2. Selecciona [ICON:quicksettings] **Controles de acceso rápido** > **Configuración**.
3. Selecciona **Configuración del entorno** > **Límite** > **Ajustar límite**.
4. Si las gafas sugieren un límite basado en su escaneo, revísalo y acéptalo si se ajusta al espacio. Si no, elige **Room-scale** y dibuja manualmente: apunta con el mando al suelo, pulsa el **gatillo** y traza el perímetro de la zona segura.

   [IMAGE:guardian-boundary-draw]

5. Confirma y listo. La rejilla aparecerá siempre que el alumno se acerque al borde.

> Para cambiar de modo durante una experiencia sin salir de ella: [ICON:metabutton] **botón Meta** > [ICON:quicksettings] **Controles de acceso rápido** > **Límite** > **Cambiar a room-scale** (o estático).

[DETAILS:Consejos para el aula]

- Revisa siempre el límite sugerido antes de aceptarlo — las gafas pueden no detectar obstáculos bajos o mochilas en el suelo.
- Si dibujas manualmente, deja al menos **50 cm de margen** con paredes y muebles.
- Si hay varios alumnos con gafas a la vez, asegúrate de que sus **zonas no se solapan**.
- Las gafas recuerdan los límites de espacios anteriores, pero si cambias de aula necesitarás rehacerlo.
- Puedes mirar hacia abajo para ver el contorno de tu zona de juego (función "Límite visible").

[/DETAILS]

[DETAILS:Recursos]

- [Límite / Boundary (guía oficial Meta)](https://www.meta.com/es-es/help/quest/guardian/)
- [Límites sugeridos y configuración del espacio asistida (Meta)](https://www.meta.com/help/quest/853707093070890/)
- [Configurar límite de juego (VR Expert)](https://knowledge.vr-expert.com/kb/how-to-set-up-a-play-boundary-on-the-meta-quest-3/)

[/DETAILS]

[DETAILS:Otros ajustes importantes]

- **Luces del headset:** indican estado (encendido, carga, actualización). Consulta [Qué significan las luces en Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/what-do-the-different-lights-on-the-meta-quest-3-mean/).
- **Passthrough:** ver el entorno real a través de las cámaras. [Activar passthrough en Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/how-to-activate-passthrough-on-the-meta-quest-3/).
- **Hand tracking:** usar las manos sin mandos. [Activar hand tracking](https://knowledge.vr-expert.com/kb/how-to-turn-on-hand-tracking-on-the-meta-quest-3/).
- **Mandos:** [Emparejar controladores con Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/how-to-pair-the-controllers-with-the-meta-quest-3/). Para muchas aplicaciones solo se utiliza el controlador derecho. Asegúrate de que tenga batería (pila AA o recargable). Al moverlo o presionar cualquier botón, debería ser detectado automáticamente por el sistema.
- **IPD:** [Cambiar la IPD en Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/how-to-change-the-ipd-on-the-meta-quest-3/).
- **Idioma:** [Idiomas soportados](https://knowledge.vr-expert.com/kb/which-languages-does-the-meta-quest-3-support/) y [cómo cambiar el idioma](https://knowledge.vr-expert.com/kb/how-to-change-the-language-on-the-meta-quest-3/).
- **Grabación de pantalla:** [Grabar pantalla con Meta Quest 3](https://knowledge.vr-expert.com/kb/how-to-screen-record-with-the-meta-quest-3/).
- **Modo desarrollador:** solo si necesitas instalar apps desde fuentes externas. [Activar developer mode](https://knowledge.vr-expert.com/kb/how-to-activate-developer-mode-on-the-meta-quest-3/).
- **Actualizaciones:** [Actualizar el sistema operativo de Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/how-to-update-the-operating-system-of-the-meta-quest-3/). Las actualizaciones no se descargan automáticamente; para obtenerlas hay que acceder al apartado "Actualizar" dentro de la app si hay nuevas versiones disponibles.

Puedes complementar con una [guía completa para principiantes de Quest 3S](https://knowledge.vr-expert.com/kb/how-to-use-the-meta-quest-3s-buttons/) (botones y uso general).

[IMAGE:quest-3-ipd]

[/DETAILS]`,

  "mobile-connection": `Conectar las gafas a la **app Meta Horizon** en el móvil facilita la gestión diaria y el casting.

**Beneficios**

- Descargar e instalar apps en el headset desde el móvil.
- Ver estado de batería y ajustes de las gafas.
- Iniciar casting a pantalla o proyector con menos pasos.
- Gestionar varios dispositivos si usas varios Quest.

**Cómo hacerlo**

1. Instala la app **Meta Horizon** desde [App Store](https://apps.apple.com/app/meta-quest/id1365028940) o [Google Play](https://play.google.com/store/apps/details?id=com.oculus.vrshell).
2. Enciende las gafas y abre la app en el móvil.
3. Sigue el flujo de emparejamiento (Bluetooth y Wi‑Fi); las gafas mostrarán un código o confirmación.
4. Una vez vinculadas, podrás ver el dispositivo en la app Meta Horizon y usar las funciones anteriores.`,

  "organization-storage": `Mantener orden en las gafas, mandos y accesorios evita pérdidas y alarga la vida del material.

**Buenas prácticas**

- **Etiquetado:** marca cada headset y su mando correspondiente (número, color o código) para no mezclarlos.
- **Registro de uso:** anota qué gafa usó cada grupo o alumno si es necesario para mantenimiento o incidencias.
- **Almacenamiento:** guarda las gafas en un lugar fijo, protegido de golpes y luz solar directa (la luz puede dañar las lentes).
- **Transporte:** usa fundas o carros diseñados para Quest si las mueves entre aulas.
- **Carga:** utiliza regletas o carros de carga para cargar varias gafas a la vez; revisa que el LED indique carga completa.

**Referencias**

- [Cargar Meta Quest 3](https://knowledge.vr-expert.com/kb/how-to-charge-the-meta-quest-3/)
- [Cambiar pilas de los controladores Meta Quest 3](https://knowledge.vr-expert.com/kb/how-to-change-batteries-on-the-meta-quest-3-controllers/)
- [Eliminar aplicaciones en Meta Quest 3](https://knowledge.vr-expert.com/kb/how-to-delete-applications-on-the-meta-quest-3/)
- [Comprobar espacio de almacenamiento en Meta Quest 3](https://knowledge.vr-expert.com/kb/how-to-check-how-much-storage-space-is-available-on-the-meta-quest-3/)`,

  "specifications": `Conocer las especificaciones del headset ayuda a planificar el uso en el aula (espacio, duración de batería, compatibilidad).

**Puntos útiles**

- **Número de serie:** para garantía e inventario. Dónde encontrarlo: ver guía del modelo en la [KB](https://knowledge.vr-expert.com/kb/how-to-use-the-meta-quest-3s-buttons/).
- **Uso con gafas:** [Usar Meta Quest 3(S) con gafas](https://knowledge.vr-expert.com/kb/how-to-wear-the-meta-quest-3s-with-glasses/).
- **Altavoces y micrófono:** Quest 3(S) incluye ambos integrados.
- **Chipset, RAM, pantalla, FOV, tracking, peso:** [Especificaciones del headset Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/what-are-the-headset-specifications-of-the-meta-quest-3/), [especificaciones de pantalla](https://knowledge.vr-expert.com/kb/what-are-the-display-specifications-of-the-meta-quest-3/), [qué tipo de tracking usa](https://knowledge.vr-expert.com/kb/what-kind-of-tracking-does-meta-quest-3s-use/), [campo de visión](https://knowledge.vr-expert.com/kb/what-is-the-field-of-view-of-the-quest-3s/), [peso](https://knowledge.vr-expert.com/kb/what-is-the-weight-of-the-meta-quest-3/).
- **Botones y uso básico:** [Usar los botones de Meta Quest 3S](https://knowledge.vr-expert.com/kb/how-to-use-the-meta-quest-3s-buttons/).
- **Configuración inicial:** [Cómo configurar Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/how-to-set-up-the-meta-quest-3/).`,

  "store-install": `La **Meta Horizon Store** (dentro del headset o desde la app móvil) es la fuente principal de aplicaciones oficiales.

**Instalación paso a paso**

1. Abre la **Meta Horizon Store** desde el menú del headset o desde la app Meta Horizon en el móvil.
2. Busca la aplicación por nombre o explora categorías.
3. Pulsa **Obtener** o **Comprar** (según sea gratuita o de pago).
4. Espera a que termine la descarga e instalación; la app aparecerá en la biblioteca.

**Aplicaciones recomendadas en educación**

Hay apps gratuitas y de pago orientadas a educación: simulaciones, visitas virtuales, formación en procedimientos, etc. Consulta listas actualizadas en la Store (categoría Educación o similares) o en recursos de tu institución.`,

  "apps-in-headset": `Una vez instaladas, las aplicaciones se gestionan desde el headset (y desde la app móvil si está vinculado).

**Comprobar la versión de la app**

En la biblioteca del headset, selecciona la app (normalmente con los tres puntos o “Información”) para ver detalles; ahí suele indicarse la versión instalada. Útil para asegurarte de que todas las gafas tienen la misma versión antes de la clase.

**Eliminar una app**

Desde la biblioteca, mantén pulsado el icono de la app y elige **Desinstalar** (o **Eliminar**). También puedes usar la guía [Eliminar aplicaciones en Meta Quest 3](https://knowledge.vr-expert.com/kb/how-to-delete-applications-on-the-meta-quest-3/).

**Acceso a aplicaciones desde el menú**

Desde el menú principal de las Meta Quest 3, accede a la barra de aplicaciones. Usando el gatillo del controlador, abre la ventana de aplicaciones instaladas. En la esquina superior derecha, despliega el menú de categorías y desplázate hacia abajo hasta **"Orígenes desconocidos"** si tu aplicación no aparece en la lista principal. Allí se encontrará la app que quieras usar; selecciona su icono o nombre para iniciarla.

**Credenciales de la app y de las gafas**

Las credenciales de la aplicación (por ejemplo, inicio de sesión dentro de la app) no tienen por qué coincidir con la cuenta Meta de las gafas. Las gafas pueden estar en una cuenta institucional mientras la app pide un usuario educativo distinto; gestiona esas credenciales según la política del centro.

**Nota sobre actualizaciones de apps**

La primera vez que abras una aplicación, se iniciará directamente. Las actualizaciones no se descargan automáticamente; para obtenerlas hay que acceder al apartado "Actualizar" dentro de la app si hay nuevas versiones disponibles.`,

  "casting": `El **casting** es el paso más importante antes de pasar las gafas a un alumno. Sin casting, no puedes ver lo que el alumno está viendo — y si no ves lo que hace, no puedes guiarle ni supervisar la experiencia.

El flujo de preparación de las gafas antes de cada sesión es siempre el mismo:

1. [**Conectar al WiFi**](#connectivity-data) — las gafas necesitan estar en la misma red que tu dispositivo.
2. [**Configurar el Límite (Boundary)**](#settings) — delimitar el espacio seguro de movimiento.
3. **Activar el casting** — retransmitir la vista del headset a tu móvil, tablet, TV o proyector.
4. **Pasar las gafas al alumno** — solo cuando ya estés viendo lo que ve el alumno.

> Si no activas el casting antes de entregar las gafas, estarás "a ciegas". No sabrás si el alumno está en la app correcta, si necesita ayuda o si algo va mal. El casting no es opcional — es un paso obligatorio.

**Para qué lo necesitas en el aula**

- **Supervisión:** ves exactamente lo que hace el alumno sin necesidad de quitarle las gafas.
- **Guía en directo:** puedes dar instrucciones mientras el alumno está dentro de la experiencia.
- **Participación del grupo:** el resto de alumnos siguen la actividad en la pantalla y pueden participar en la discusión.

---

**Antes de empezar — lo que necesitas**

Antes de activar el casting, asegúrate de tener todo preparado:

- **Misma red WiFi** para las gafas y el dispositivo receptor (obligatorio).
- **Banda de 5 GHz** recomendada — reduce la latencia y mejora la calidad de imagen.
- **Dispositivo receptor** compatible: app Meta Horizon en móvil/tablet, Chromecast conectado a TV/proyector, o navegador web.
- **Gafas cargadas** (mínimo 30 %) y [**vinculadas** a la app Meta Horizon](#mobile-connection) en tu móvil.


---

**Cómo activar el casting — paso a paso**

1. Asegúrate de que las gafas y tu dispositivo están conectados a la **misma red Wifi**.
2. En las gafas, pulsa [ICON:metabutton] el **botón Meta** del mando derecho para abrir el Explorador.
3. Selecciona [ICON:quicksettings] **Controles de acceso rápido**.

   [IMAGE:wifi-quick-access]

4. Selecciona **Transmitir**.

   [IMAGE:casting-quick-menu]

5. Selecciona el dispositivo al que quieras transmitir (móvil, Chromecast, web, etc.).

   [IMAGE:casting-device-selection]

6. Pulsa **Siguiente** y sigue las instrucciones en pantalla.
   - Si eliges **Móvil**: la retransmisión aparece directamente en la app Meta Horizon de tu teléfono.
   - Si eliges **Chromecast**: la imagen se muestra en la TV o proyector conectado.
   - Si eliges **Web**: abre **[horizon.meta.com/casting](https://horizon.meta.com/casting/)** en un navegador (Chrome recomendado) en cualquier ordenador o dispositivo conectado a la misma red Wifi. Debes estar logueado con la misma cuenta Meta que tienen las gafas.

   [IMAGE:casting-meta-app]

> La opción **Web** es muy práctica en el aula: no necesitas instalar nada, solo un navegador y la misma red Wifi. Puedes proyectar desde el portátil del profesor directamente. Es normal que haya un retardo de 1-3 segundos entre lo que hace el alumno y lo que se ve en pantalla. Tenlo en cuenta al dar instrucciones: el alumno escucha tu voz antes de que tú veas su acción. Practica el ritmo antes de la clase.

---

[DETAILS:Consejos para el aula]

- **Posiciona la pantalla** donde todos los alumnos puedan verla sin moverse de su sitio.
- **Usa la banda de 5 GHz** de tu router. Si la red del centro es inestable, considera usar un **router dedicado** para los headsets.
- **Prueba el casting antes** de que lleguen los alumnos — evitarás perder tiempo de clase solucionando problemas técnicos.
- **Prepara tu narración:** dado el pequeño retardo del casting, planifica qué vas a decir mientras el alumno explora. Funciona bien describir lo que se está viendo o hacer preguntas al grupo.
- **Relay móvil a proyector:** si no tienes Chromecast, haz casting a tu móvil y luego conecta el móvil al proyector por cable. Es una alternativa sencilla que funciona bien.

[/DETAILS]

[DETAILS:Problemas frecuentes]

- **El casting no se inicia:** verifica que las gafas y el dispositivo receptor están en la [misma red Wifi](#connectivity-data). Si la red tiene "aislamiento de clientes" (AP isolation), el casting no funcionará — consulta con el responsable de IT.
- **Pantalla en negro:** reinicia las gafas y el dispositivo receptor. Vuelve a iniciar el casting.
- **Mucha latencia o imagen entrecortada:** reduce el tráfico en la red (pide a los alumnos que desconecten WiFi en sus móviles), acerca las gafas al router.
- **No aparece el dispositivo en la lista:** asegúrate de que el Chromecast está encendido y en la misma red. Reinícialo si es necesario.

Para una guía completa de resolución de problemas de casting, consulta la sección **Problemas de casting** en el Módulo 6 (Resolución de problemas comunes).

[/DETAILS]

[DETAILS:Recursos]

- [Casting con Meta Quest (dispositivos y métodos)](https://www.meta.com/en-gb/help/quest/192719842695017/)
- [Casting con Chromecast (vídeo)](https://www.youtube.com/watch?v=_BgUP5T8_3M)
- [Solucionar problemas de casting con Meta Quest](https://www.meta.com/en-gb/help/quest/214966974548157/)

[/DETAILS]`,

  "connectivity-data": `Conectar las gafas al WiFi es el **primer paso** de la preparación antes de cada sesión. Sin WiFi no podrás hacer casting, instalar apps ni actualizar el sistema. Además, las gafas y tu dispositivo (móvil, Chromecast) deben estar en la **misma red** para que el casting funcione.

**Cómo conectar las gafas al WiFi — paso a paso**

1. Enciende las gafas y ponte el headset.
2. Pulsa [ICON:metabutton] el **botón Meta** del mando derecho para abrir el Explorador.
3. Selecciona [ICON:quicksettings] **Controles de acceso rápido**.

   [IMAGE:wifi-quick-access]

4. Selecciona **Wifi**.

   [IMAGE:wifi-quest-settings]

5. Asegúrate de que el **botón de Wifi esté activado** (toggle encendido).
6. Busca la red wifi de tu aula y selecciona **Conectar**.
7. Introduce la **contraseña** si es necesario.
8. Espera a que se conecte. Si ves el icono de Wifi en la barra superior, ya estás conectado.

> Si la red del centro tiene restricciones fuertes (firewalls, portales cautivos, aislamiento de clientes), el casting puede no funcionar. Valora tener un **router dedicado** para los headsets — es la solución más fiable en entornos educativos.

---

[DETAILS:Recomendaciones para el aula]

- Usa siempre la **banda de 5 GHz** si tu router la ofrece — menos latencia y mejor calidad de casting.
- Conecta todas las gafas a la **misma red** que el Chromecast y tu móvil.
- Si usas varias gafas a la vez, comprueba que el router soporta el número de dispositivos simultáneos.
- Haz una prueba de conexión antes de la clase: abre el navegador de las gafas y carga cualquier página para verificar que hay acceso a internet.

[/DETAILS]

[DETAILS:Otras conexiones]

- **Bluetooth:** [Conectar un dispositivo Bluetooth a Meta Quest 3(S)](https://www.meta.com/help/quest/) (busca en la ayuda oficial “Bluetooth”). Útil para auriculares externos.
- **Conexión con PC (Windows):** [Conectar Meta Quest 3(S) a un ordenador Windows](https://www.meta.com/help/quest/) (para transferir archivos o usar Link/Air Link).
- **Transferencia de archivos:** [Transferir archivos desde un PC Windows a Meta Quest 3(S)](https://www.meta.com/help/quest/) (por cable USB o herramientas oficiales).

[/DETAILS]

[DETAILS:Recursos]

- [Conectar Meta Quest a WiFi (guía oficial Meta)](https://www.meta.com/es-es/help/quest/1816744325172615/)
- [Conectar Meta Quest 3(S) a Wi‑Fi (VR Expert)](https://knowledge.vr-expert.com/kb/how-to-connect-the-meta-quest-3-to-wi-fi/)

[/DETAILS]`,

  "cleaning": `Limpia las gafas y mandos después de cada uso con una toallita no abrasiva y sin alcohol. Limpia las lentes solo con un paño de microfibra seco — nunca rocíes líquido directamente. Deja secar las superficies antes del siguiente usuario.

> Para flujos de limpieza completos y protocolos de higiene en aulas compartidas, consulta el **Módulo 4: Seguridad, bienestar y accesibilidad**.`,

  "accessories": `Los accesorios opcionales pueden mejorar el confort y la durabilidad en entornos educativos.

**Dónde informarte**

- [Qué accesorios hay para Meta Quest 3](https://knowledge.vr-expert.com/kb/what-accessories-are-available-for-the-meta-quest-3/)

Ejemplos típicos: correas de cabeza alternativas, fundas de transporte, espaciadores faciales para usuarios con gafas, protectores de lentes. Elige según el uso (aula, transporte, distintos usuarios).`,

  "pre-class-checklist": `Repasar este checklist antes de cada sesión reduce fallos técnicos y mantiene el foco en la actividad de aprendizaje.

- **Gafas cargadas:** comprobar que el LED indique carga completa (p. ej. verde al 100%).
- **Apps abiertas y probadas:** haber entrado al menos una vez en la app que usarás y comprobar que se abre correctamente.
- **Límite (Boundary) configurado:** Límite dibujado y probado en el espacio real del aula.
- **Casting probado:** si vas a proyectar, verificar que el dispositivo de casting (Chromecast, app, etc.) funciona con las gafas.
- **Plan B preparado:** tener una actividad alternativa si falla la VR (Wi‑Fi, app o dispositivo).`,

  "meta-for-education": `**Meta for Education** es la oferta de Meta diseñada específicamente para centros educativos e instituciones, construida sobre Meta Horizon Managed Services. Tras una fase beta iniciada en abril de 2024, está disponible de forma general desde **febrero de 2025**.

**Por qué es relevante para los centros educativos**

Meta for Education aborda los principales retos de gestionar gafas VR en entornos educativos: administración de dispositivos a escala, casting simplificado, identidad respetuosa con la privacidad y precios predecibles.

**Funcionalidades clave**

- **Facilitated Casting:** transmite y controla hasta 48 dispositivos simultáneamente desde un único panel web — sin necesidad de hacer casting de uno en uno.
- **Gestión de archivos:** distribuye archivos, apps y configuraciones a toda la flota de gafas de forma remota.
- **Modo kiosco:** bloquea los dispositivos compartidos a apps o experiencias específicas, ideal para aulas donde el alumnado solo debe acceder a la actividad asignada.
- **Identidad centrada en la privacidad:** soluciones de identidad diseñadas para contextos educativos, de modo que el alumnado no necesita cuentas personales de Meta.

**Precios y disponibilidad**

Desde **febrero de 2026**, Meta descontinuó los packs de hardware educativo que estaban disponibles anteriormente. El modelo actual para centros educativos es:

- **Comprar gafas Quest consumer** a precio de venta al público (Meta Quest 3, Quest 3S).
- **Activar Meta Horizon Managed Services (HMS) gratis** — HMS es ahora gratuito para todos los despliegues y tiene soporte hasta enero de 2030.

Esto significa que ya no existe un "SKU educativo" separado. Los centros compran el mismo hardware que los consumidores y luego activan la gestión de dispositivos a través de HMS sin coste adicional.

**Más información**

Visita [Meta for Education](https://forwork.meta.com/meta-for-education/) para todos los detalles, casos de éxito y para contactar con Meta sobre tu centro.`,
};
