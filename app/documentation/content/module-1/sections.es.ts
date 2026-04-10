/**
 * Module 1 section content (Spanish). Markdown strings keyed by section id.
 * Image slots use [IMAGE:slotId]; slot ids are defined in app/documentation/docImages.ts.
 */
export const sectionsEs: Record<string, string> = {
  "account-types": `En Meta Quest puedes usar distintos tipos de cuentas según el contexto: personal o institucional. Elegir bien evita problemas de gestión y cumple con las políticas de tu centro.

**Resumen**

- **Cuenta personal:** un usuario por cuenta; se puede usar en clase con un setup sencillo. También es posible compartir una misma cuenta entre varias gafas, con limitaciones.
- **Cuenta institucional (Work for Meta):** gestionada por el centro desde [work.meta.com](https://work.meta.com/). Permite administrar dispositivos, apps y usuarios de forma centralizada. Es la opción recomendada para flotas de gafas en entornos educativos.

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

> **Nota:** Si gestionas más de unas pocas gafas, considera usar una cuenta institucional con Work for Meta para evitar estos problemas.`,

  "institutional-account": `Las **cuentas institucionales** se gestionan con **Work for Meta** ([work.meta.com](https://work.meta.com/)) para educación y trabajo. Permiten administrar dispositivos, apps y usuarios de forma centralizada, eliminando la necesidad de gestionar cuentas personales y emails en cada gafa. Una vez configurada la plataforma, se acabaron los quebraderos de cabeza con las altas individuales: añadir nuevas apps, quitar apps, asignar grupos de apps a ciertos centros… todo se simplifica mucho.

---

**Paso 1 — Crear la cuenta empresarial o educativa**

El primer paso es crear la cuenta en [work.meta.com](https://work.meta.com/). Se puede crear como cuenta empresarial o educativa. Una vez creada, accedes al panel de administración donde se gestiona todo: dispositivos, personas, apps, plantillas y grupos.

[IMAGE:work-meta-dashboard]

---

**Paso 2 — Añadir personas al sistema**

Lo siguiente es añadir personas a la organización. Work for Meta tiene un completo sistema de roles: administradores, colaboradores, etc. Cada persona puede tener permisos diferentes según su función.

> **Recomendación:** Si una entidad externa va a gestionar parte de la configuración, la institución puede simplemente crear la cuenta, invitar al equipo técnico como administrador por email y asignarles los roles necesarios. Una vez configurado todo, el centro podrá gestionar de forma autónoma tareas más sencillas como añadir nuevos dispositivos o vincular apps.

[IMAGE:work-meta-people]

---

**Paso 3 — Añadir aplicaciones**

Antes de crear plantillas o grupos, es recomendable añadir las apps que se van a utilizar. Para añadir apps a la plataforma hay que tener en cuenta:

- Las apps deben ser **Apps Privadas** o publicadas en Meta como **gratuitas y abiertas**.
- **No se pueden añadir** apps de pago ni apps que estén en canales Alpha o Beta.
- La cuenta de Work for Meta **no es una cuenta de desarrollador**. Son perfiles independientes.

**¿Cómo funciona el proceso de añadir una app?**

1. El administrador de Work for Meta facilita la **KEY de la organización** al desarrollador.
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
- **Dos vías de trabajo paralelas:** la publicación de apps en el canal de desarrollo (DEV) sigue siendo el mismo proceso. Pero Work for Meta es un perfil independiente para gestionar los dispositivos y las apps de forma masiva.

**Recursos oficiales**

- [Work for Meta — panel de administración](https://work.meta.com/)
- [Ayuda de Work for Meta](https://work.meta.com/help/1066783137225591?helpref=faq_content)`,

  "getting-started": `Antes de usar las gafas en el aula, conviene dominar lo básico: contenido del paquete, colocación, IPD e idioma.

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

Incluye: encendido, cuenta (personal o institucional), Wi‑Fi, Guardian/límites de juego y, si aplica, conexión con la app móvil para gestión y casting.`,

  "settings": `Los ajustes del sistema permiten adaptar las gafas al espacio y al usuario. Revisa estos puntos antes de cada sesión.

**Conceptos clave**

- **Luces del headset:** indican estado (encendido, carga, actualización). Consulta [Qué significan las luces en Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/what-do-the-different-lights-on-the-meta-quest-3-mean/).
- **Passthrough:** ver el entorno real a través de las cámaras. [Activar passthrough en Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/how-to-activate-passthrough-on-the-meta-quest-3/).
- **Guardian / límite de juego:** define la zona segura. [Configurar límite de juego (boundary)](https://knowledge.vr-expert.com/kb/how-to-set-up-a-play-boundary-on-the-meta-quest-3/). Durante la configuración:
  - Selecciona el tipo de interacción: estática o con movimiento libre. Para la mayoría de aplicaciones, elige "Con desplazamiento".
  - Si la detección automática del suelo no es precisa, indica manualmente la ubicación del suelo.
  - Define la zona segura dibujando sobre el suelo con el gatillo del controlador, delimitando el área de movimiento disponible.
- **Hand tracking:** usar las manos sin mandos. [Activar hand tracking](https://knowledge.vr-expert.com/kb/how-to-turn-on-hand-tracking-on-the-meta-quest-3/).
- **Mandos:** [Emparejar controladores con Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/how-to-pair-the-controllers-with-the-meta-quest-3/). Para muchas aplicaciones solo se utiliza el controlador derecho. Asegúrate de que tenga batería (pila AA o recargable). Al moverlo o presionar cualquier botón, debería ser detectado automáticamente por el sistema.
- **IPD:** [Cambiar la IPD en Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/how-to-change-the-ipd-on-the-meta-quest-3/).
- **Idioma:** [Idiomas soportados](https://knowledge.vr-expert.com/kb/which-languages-does-the-meta-quest-3-support/) y [cómo cambiar el idioma](https://knowledge.vr-expert.com/kb/how-to-change-the-language-on-the-meta-quest-3/).
- **Grabación de pantalla:** [Grabar pantalla con Meta Quest 3](https://knowledge.vr-expert.com/kb/how-to-screen-record-with-the-meta-quest-3/).
- **Modo desarrollador:** solo si necesitas instalar apps desde fuentes externas. [Activar developer mode](https://knowledge.vr-expert.com/kb/how-to-activate-developer-mode-on-the-meta-quest-3/).
- **Actualizaciones:** [Actualizar el sistema operativo de Meta Quest 3(S)](https://knowledge.vr-expert.com/kb/how-to-update-the-operating-system-of-the-meta-quest-3/). Las actualizaciones no se descargan automáticamente; para obtenerlas hay que acceder al apartado "Actualizar" dentro de la app si hay nuevas versiones disponibles.

Puedes complementar con una [guía completa para principiantes de Quest 3S](https://knowledge.vr-expert.com/kb/how-to-use-the-meta-quest-3s-buttons/) (botones y uso general).

[IMAGE:quest-3-ipd]`,

  "mobile-connection": `Conectar las gafas a la **app Meta Quest (Horizon)** en el móvil facilita la gestión diaria y el casting.

**Beneficios**

- Descargar e instalar apps en el headset desde el móvil.
- Ver estado de batería y ajustes de las gafas.
- Iniciar casting a pantalla o proyector con menos pasos.
- Gestionar varios dispositivos si usas varios Quest.

**Cómo hacerlo**

1. Instala la app **Meta Quest** desde [App Store](https://apps.apple.com/app/meta-quest/id1365028940) o [Google Play](https://play.google.com/store/apps/details?id=com.oculus.vrshell).
2. Enciende las gafas y abre la app en el móvil.
3. Sigue el flujo de emparejamiento (Bluetooth y Wi‑Fi); las gafas mostrarán un código o confirmación.
4. Una vez vinculadas, podrás ver el dispositivo en la app y usar las funciones anteriores.`,

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

  "app-lab": `**App Lab** es la vía de Meta para distribuir aplicaciones en fase beta o no publicadas en la tienda principal. En educación se usa para acceder a apps específicas mediante enlace o invitación.

**Flujo típico**

1. **Recepción del enlace o invitación:** el instructor o el desarrollador recibe un enlace de App Lab por correo o web.
2. **Aceptación:** al abrir el enlace y aceptar, la app se asocia a la cuenta Meta con la que estás identificado en ese momento.
3. **Instalación en una gafa:** con las gafas encendidas y con la misma cuenta, la app aparece en la biblioteca o se puede instalar desde el enlace.
4. **Replicación en varias gafas:** si todas las gafas usan la misma cuenta (personal compartida o institucional), la app instalada en una puede instalarse en las demás desde la app móvil o desde el headset.

**Por qué se usa en educación**

Permite usar aplicaciones educativas o experimentales que aún no están en la Store oficial, con un proceso controlado por enlace.

**Problemas habituales**

- **La app no aparece:** comprueba que las gafas estén iniciadas con la cuenta en la que aceptaste la invitación; si aceptaste antes de configurar las gafas, vuelve a abrir el enlace con las gafas ya configuradas.
- **La app no se descarga:** revisa la conexión Wi‑Fi y que no haya demasiadas descargas en cola; libera espacio si es necesario.`,

  "store-install": `La **Meta Quest Store** (dentro del headset o desde la app móvil) es la fuente principal de aplicaciones oficiales.

**Instalación paso a paso**

1. Abre la **Store** desde el menú del headset o desde la app Meta Quest en el móvil.
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

  "casting": `El **casting** permite mostrar en una pantalla o proyector lo que ve el usuario dentro del headset. Es muy útil para que el resto del aula siga la experiencia y para que el instructor supervise y guíe.

**Para qué sirve**

- Observación guiada: el grupo ve la misma escena que quien lleva las gafas.
- Feedback en tiempo real: el instructor puede comentar lo que ve.
- Control del grupo: mantener la atención y el orden durante la actividad VR.

**Cómo activarlo**

- **Desde las gafas:** en el menú rápido (botón Meta), busca **Casting** o **Transmitir** y elige el dispositivo de destino (Chromecast, app Meta Quest en móvil/PC, etc.).
- **Desde la app móvil:** si las gafas están vinculadas, en la app suele haber un botón para iniciar casting hacia TV o proyector (p. ej. vía Chromecast).

**Recursos**

- [Casting con Meta Quest (dispositivos y métodos)](https://www.meta.com/en-gb/help/quest/192719842695017/)
- [Casting con Chromecast (vídeo)](https://www.youtube.com/watch?v=_BgUP5T8_3M)
- [Solucionar problemas de casting con Meta Quest](https://www.meta.com/en-gb/help/quest/214966974548157/)`,

  "connectivity-data": `Para instalar apps, actualizar el sistema y usar servicios en la nube, las gafas necesitan conectividad; también puedes conectarlas a un PC o a dispositivos Bluetooth.

**Wi‑Fi**

- [Conectar Meta Quest 3(S) a Wi‑Fi](https://knowledge.vr-expert.com/kb/how-to-connect-the-meta-quest-3-to-wi-fi/)
- En el aula, usa una red estable; si la red del centro tiene restricciones o firewalls fuertes, valora un router dedicado para los headsets.

**Bluetooth**

- [Conectar un dispositivo Bluetooth a Meta Quest 3(S)](https://www.meta.com/help/quest/) (busca en la ayuda oficial “Bluetooth”).

**Conexión con PC (Windows)**

- [Conectar Meta Quest 3(S) a un ordenador Windows](https://www.meta.com/help/quest/) (útil para transferir archivos o usar Link/Air Link si lo necesitas).

**Transferencia de archivos**

- [Transferir archivos desde un PC Windows a Meta Quest 3(S)](https://www.meta.com/help/quest/) (por cable USB o herramientas oficiales).`,

  "cleaning": `Limpia las gafas y mandos después de cada uso con una toallita no abrasiva y sin alcohol. Limpia las lentes solo con un paño de microfibra seco — nunca rocíes líquido directamente. Deja secar las superficies antes del siguiente usuario.

> Para flujos de limpieza completos y protocolos de higiene en aulas compartidas, consulta el **Módulo 4: Seguridad, bienestar y accesibilidad**.`,

  "accessories": `Los accesorios opcionales pueden mejorar el confort y la durabilidad en entornos educativos.

**Dónde informarte**

- [Qué accesorios hay para Meta Quest 3](https://knowledge.vr-expert.com/kb/what-accessories-are-available-for-the-meta-quest-3/)

Ejemplos típicos: correas de cabeza alternativas, fundas de transporte, espaciadores faciales para usuarios con gafas, protectores de lentes. Elige según el uso (aula, transporte, distintos usuarios).`,

  "pre-class-checklist": `Repasar este checklist antes de cada sesión reduce fallos técnicos y mantiene el foco en la actividad de aprendizaje.

- **Gafas cargadas:** comprobar que el LED indique carga completa (p. ej. verde al 100%).
- **Apps abiertas y probadas:** haber entrado al menos una vez en la app que usarás y comprobar que se abre correctamente.
- **Boundary configurado:** Guardian/límite de juego dibujado y probado en el espacio real del aula.
- **Casting probado:** si vas a proyectar, verificar que el dispositivo de casting (Chromecast, app, etc.) funciona con las gafas.
- **Plan B preparado:** tener una actividad alternativa si falla la VR (Wi‑Fi, app o dispositivo).`,
};
