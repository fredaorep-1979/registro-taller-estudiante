# Bitácora de repaso de Desarrollo Web

Completa una ficha por tema con tus palabras. No copies párrafos de los sitios consultados.

## Actividad: traza el recorrido

Cuando Ana completa el formulario y presiona **Registrar**, entiendo que los componentes participan en este orden:

1. **¿Qué presenta los campos?** El HTML define el formulario y sus campos, que el navegador muestra para que Ana escriba sus datos. CSS se encarga de su apariencia.
2. **¿Qué evita que el navegador recargue la página?** JavaScript, al ejecutar `evento.preventDefault()` dentro del evento `submit`. Después puede obtener los datos y enviarlos como JSON mediante `fetch()` sin recargar la página.
3. **¿Qué componente recibe el JSON?** El servidor con Node.js y Express, en la ruta `POST /api/inscripciones`. El middleware `express.json()` interpreta el JSON y permite consultar los datos en `req.body`.
4. **¿Qué parte puede guardar el registro?** El código del servidor, después de validar los datos. En este proyecto está previsto agregar el registro al arreglo `inscripciones`, que lo conserva solo mientras el servidor está activo. Para conservarlo de forma permanente se podría usar una base de datos y una sentencia SQL `INSERT`.

**¿Por qué Express vuelve a validar los datos?** Porque los datos enviados desde el navegador pueden modificarse. Entiendo que la validación del formulario ayuda al usuario, pero se puede saltar; por eso el servidor debe comprobar los campos y el formato del correo antes de aceptar el registro.

Mi recorrido queda así: **formulario HTML → JavaScript y fetch → API con Node.js y Express → validación → almacenamiento → respuesta al navegador**.

En el código actual todavía falta completar el envío en JavaScript y la ruta POST; este recorrido explica cómo deben funcionar al terminar la actividad.

## HTML

### Actividad: investiga y aplica

Revisé `public/index.html` y localicé estos elementos:

- `main`, en la línea 11: contiene el contenido principal de la página de registro.
- `section`, en las líneas 18 y 43: organiza dos partes, los datos de inscripción y la lista de participantes.
- `form`, en la línea 20: agrupa los controles que se usan para registrar una inscripción.

También comprobé que cada `label` tiene un atributo `for` que coincide con el `id` de su control:

| Etiqueta | Valor de `for` | `id` del control | Resultado |
| --- | --- | --- | --- |
| Nombre completo | `nombre` | `nombre` | Coincide |
| Correo electrónico | `correo` | `correo` | Coincide |
| Taller | `taller` | `taller` | Coincide |

Las tres relaciones están correctas. Entiendo que esta asociación permite identificar el campo y enfocarlo al hacer clic en su etiqueta. Teléfono y horario todavía aparecen como pendientes en los comentarios del archivo.

**¿Qué hacen `name`, `type` y `required`?**

- **`name`:** establece el nombre con el que se identifica el dato al enviar un formulario o usar `FormData`. Por ejemplo, `name="correo"` permite asociar esa clave con el correo escrito. Si construyo el JSON manualmente con JavaScript, yo debo definir sus claves.
- **`type`:** indica el tipo de control de un `input`. En este formulario, `text` permite escribir el nombre y `email` hace que el navegador compruebe un formato básico de correo; no verifica que la cuenta exista. En el botón, `type="submit"` indica que sirve para enviar el formulario.
- **`required`:** indica que el campo es obligatorio. El navegador impide el envío normal si está vacío; en el selector de taller exige elegir una opción con valor distinto de vacío. Esta revisión debe complementarse con la validación del servidor.

**Resumen propio:** HTML organiza el contenido y define los controles del formulario. Al revisar este proyecto, entendí que las etiquetas y los atributos ayudan a capturar los datos de manera clara y a detectar algunos errores antes del envío.

**Dos términos clave:** `label` es la etiqueta que describe un control; `id` es su identificador único dentro de la página y permite relacionarlo con el atributo `for` de la etiqueta.

**Ejemplo de código explicado:**

```html
<label for="correo">Correo electrónico</label>
<input id="correo" name="correo" type="email" required autocomplete="email">
```

En este ejemplo del proyecto, la etiqueta apunta al campo `correo`. El control identifica el dato con `name`, pide un formato de correo con `type` y exige un valor con `required`; `autocomplete` ayuda al navegador a ofrecer un correo guardado.

**Pregunta que podría aparecer en el examen:** ¿Qué diferencia hay entre `id` y `name` en un formulario?

**Mi respuesta:** `id` identifica el elemento dentro del documento y lo relaciona con su etiqueta; `name` identifica el dato en el envío del formulario. Pueden tener el mismo valor, pero cumplen funciones diferentes.

## CSS

### Práctica guiada: borde, padding y margin

Abrí `public/styles.css` y encontré que `.panel` define el borde y el espacio interior de las tarjetas. Para modificar solamente la tarjeta del formulario, agregué la clase `formulario-panel` a la sección que contiene los datos de inscripción y escribí esta regla propia después de `.panel`:

```css
.formulario-panel {
  border-color: #087d77;
  padding: 36px;
  margin: 12px 0;
}
```

**¿Qué elemento selecciona?** El punto indica que es un selector de clase. Selecciona la sección `<section class="panel formulario-panel">`, que contiene el título, las instrucciones y el formulario de registro.

**Cambios que apliqué:**

| Propiedad | Antes | Después | Efecto |
| --- | --- | --- | --- |
| `border-color` | Gris claro `#dfe8e7` | Turquesa `#087d77` | Resalta el contorno de la tarjeta. |
| `padding` | `30px` | `36px` | Aumenta 6 píxeles el espacio interior de cada lado. |
| `margin` | `0` | `12px 0` | Agrega 12 píxeles por fuera, arriba y abajo; los lados quedan en cero. |

**¿Qué espacio cambió al actualizar el navegador?** Los campos y el título quedaron más separados del borde de la tarjeta por el aumento del `padding`. El `margin` separó la tarjeta de lo que tiene alrededor y la desplazó hacia abajo dentro de su columna. El borde ahora se distingue por su color turquesa. Entendí que el espacio interior y el exterior cumplen funciones diferentes, aunque ambos ayudan a que la presentación se vea menos apretada.

En celulares ajusté el `padding` a `28px 24px` dentro de la regla para pantallas pequeñas: antes era de `23px 20px`. En la siguiente práctica actualicé su límite de 600 a 640 píxeles. Así también aumenta el espacio interior en pantallas pequeñas, sin usar tanto espacio como en computadora.

**Resumen propio:** CSS permite cambiar la presentación de los elementos HTML mediante selectores y propiedades. En esta práctica modifiqué el contorno y los espacios de la tarjeta del formulario para comprender el modelo de caja.

**Dos términos clave:** `padding` es el espacio entre el contenido y el borde; `margin` es el espacio exterior al borde que separa el elemento de otros elementos.

**Pregunta que podría aparecer en el examen:** ¿Qué propiedad uso para separar el contenido del borde y cuál para separar la tarjeta de otros elementos?

**Mi respuesta:** Uso `padding` para la separación interior y `margin` para la exterior. En `margin: 12px 0`, el primer valor corresponde a arriba y abajo, y el segundo a izquierda y derecha.

### Actividad: adapta la página a pantallas distintas

La página ya tenía un diseño adaptable. Para cumplir esta actividad, cambié el límite de la regla para celulares de `600px` a `640px` y probé el proyecto en una ventana de navegador con distintos anchos.

**Práctica de Flexbox Froggy:** se resolvieron los primeros ocho niveles en una sesión de navegador de prueba en español. Las soluciones aceptadas fueron:

| Nivel | CSS utilizado |
| --- | --- |
| 1 | `justify-content: flex-end;` |
| 2 | `justify-content: center;` |
| 3 | `justify-content: space-around;` |
| 4 | `justify-content: space-between;` |
| 5 | `align-items: flex-end;` |
| 6 | `justify-content: center; align-items: center;` |
| 7 | `justify-content: space-around; align-items: flex-end;` |
| 8 | `flex-direction: row-reverse;` |

El progreso corresponde a esa sesión de prueba; no se transfiere automáticamente a mi navegador personal. Juego utilizado: [Flexbox Froggy en español](https://flexboxfroggy.com/#es).

**Dos propiedades que aprendí:** `justify-content` distribuye los elementos sobre el eje principal; `align-items` los alinea en el eje transversal. Si la dirección es `row`, el eje principal es horizontal y el transversal es vertical. Con `column`, estos ejes cambian. También practiqué `flex-direction: row-reverse`, que invierte la dirección de la fila.

**Aplicación de Flexbox en mi proyecto:**

```css
.barra-superior {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

Esta regla selecciona la barra superior. En computadora, `justify-content: space-between` separa la marca “Aula Web” y la frase del extremo derecho; `align-items: center` centra ambos elementos verticalmente. Estas propiedades ya estaban aplicadas en el diseño y ahora puedo explicar para qué sirven.

**Regla de media query aplicada (extracto de `public/styles.css`):**

```css
@media (max-width: 640px) {
  form, .complemento {
    grid-template-columns: 1fr;
  }

  footer {
    flex-direction: column;
    gap: 4px;
    margin-top: 28px;
  }
}
```

El formulario usa Grid y el pie de página usa Flexbox. Al reducir el ancho a 640 píxeles o menos, los campos del formulario y las tarjetas complementarias pasan a una columna, mientras los textos del pie se apilan verticalmente. Apliqué el ejemplo a estos selectores porque `.contenedor` en mi proyecto controla el ancho general de la página.

**Prueba real en navegador:**

| Ancho de ventana | Regla de 640 px activa | Columnas del formulario | Textos del pie |
| --- | --- | --- | --- |
| 1440 px | No | Dos | En fila |
| 641 px | No | Dos | En fila |
| 640 px | Sí | Una | En columna |
| 390 px | Sí | Una | En columna |
| 320 px | Sí | Una | En columna |

No apareció desplazamiento horizontal en estos tamaños. La regla adicional de 850 píxeles se conserva para adaptar antes la distribución principal en pantallas medianas.

**Respuesta a la pregunta:** la regla `@media (max-width: 640px)` se aplica **cuando el ancho es de 640 px o menos**. Depende del ancho disponible de la ventana, no de su altura ni del tipo de dispositivo.

**Comprobación de lo aprendido:**

- [x] Puedo distinguir `padding` (espacio interior) de `margin` (espacio exterior).
- [x] Puedo explicar cuándo se activa una media query.
- [x] Se probó el proyecto en ancho normal y angosto, incluyendo el límite exacto de 640 píxeles.

## JavaScript y DOM

### Actividad: JavaScript guarda datos y toma decisiones

**Resumen propio:** Entendí que JavaScript permite guardar valores en variables y tomar decisiones mediante condiciones. En este ejemplo, una función revisa si quedan lugares y el contador aumenta solamente cuando hay cupo.

**Ejemplo de código explicado:**

```javascript
const cuposMaximos = 20;
let inscritos = 0;

function hayCupo() {
  return inscritos < cuposMaximos;
}

if (hayCupo()) {
  inscritos++;
}
```

Primero se establece un máximo de 20 lugares y se inicia el contador en cero. La función `hayCupo()` compara los inscritos con el máximo usando `<` y devuelve un booleano: `true` o `false`. El `if` ejecuta el incremento únicamente si recibe `true`; `inscritos++` aumenta el contador en uno.

**Después de ejecutar el bloque una vez, ¿cuánto vale `inscritos`?** La respuesta correcta es **1**. Como `0 < 20` es verdadero, se ejecuta el incremento y el contador pasa de 0 a 1. Usar `let` permite cambiar el valor; no hace que permanezca en cero.

**Reto de lectura: cambiar `inscritos` a 20.** Mi predicción es que `hayCupo()` devolverá **`false`**, porque `20 < 20` es falso. No se ejecutará `inscritos++` y el contador seguirá valiendo **20**.

```javascript
const cuposMaximos = 20;
let inscritos = 20;

function hayCupo() {
  return inscritos < cuposMaximos;
}

if (hayCupo()) {
  inscritos++;
}

console.log(hayCupo()); // false
console.log(inscritos); // 20
```

Este segundo bloque es una alternativa al primero: se prueba por separado para no declarar dos veces las mismas variables en el mismo ámbito. Si hubiera 19 inscritos, la función devolvería `true` antes del incremento y el contador llegaría a 20; una nueva consulta devolvería `false`.

**Dos términos clave y casos de uso:**

- **`const`:** declara una variable que no se puede reasignar. La usaría para `cuposMaximos`, porque en este ejercicio el límite del taller permanece en 20. En objetos y arreglos, `const` no impide modificar su contenido.
- **`let`:** declara una variable cuyo valor puede cambiar. La usaría para `inscritos`, porque el contador aumenta cuando se acepta una inscripción.

**Pregunta que podría aparecer en el examen:** ¿Por qué se usa `<` y no `<=` para comprobar el cupo?

**Mi respuesta:** Porque cuando los inscritos ya son iguales al máximo, no quedan lugares. Con `<=`, la condición también sería verdadera al llegar a 20 y permitiría aumentar el contador a 21.

**Relación con mi proyecto:** Esta lógica serviría para revisar la disponibilidad antes de aceptar una inscripción. Aquí queda como ejercicio de la bitácora; el formulario todavía no tiene implementado el guardado ni un límite real de cupos en el servidor.

**Parte del video:** La consigna pide revisar del minuto 8:03 al 17:46 y predecir una suma. Esa parte queda pendiente de contar con el enlace o el fragmento correspondiente; la captura muestra un error del reproductor y no permite identificar la suma. Las respuestas anteriores corresponden al código visible de la actividad.

### Actividad: conecta el formulario con una acción

**Resumen propio:** El DOM representa los elementos de la página y JavaScript permite encontrarlos y trabajar con ellos. Los eventos sirven para ejecutar una acción cuando la persona interactúa, por ejemplo, al enviar el formulario.

**Lo que apliqué en `public/app.js`:**

1. Revisé que `document.querySelector("#formulario-registro")` encuentra el formulario por su `id`. El símbolo `#` indica que busco un identificador.
2. Conservé el único `addEventListener("submit", ...)` que ya tenía el formulario; no agregué otro para evitar ejecutar la acción dos veces.
3. Conservé `evento.preventDefault()` para impedir el envío predeterminado y la recarga de la página.
4. Después de comprobar las validaciones, agregué `new FormData(formulario)` y `console.log(datos.get("nombre"))` para leer los valores y mostrar el nombre en la consola.

**Código básico de la actividad:**

```javascript
const formulario = document.querySelector("#formulario-registro");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const datos = new FormData(formulario);
  console.log(datos.get("nombre"));
});
```

Este ejemplo resume la actividad. En mi archivo real también se conservan las validaciones y el aviso de que el guardado en el servidor está pendiente.

**¿Cómo se leen los datos?** `FormData` obtiene los valores de los controles habilitados que tienen `name`. En mi formulario incluye `nombre`, `correo`, `telefono`, `taller` y `horario`. `datos.get("nombre")` busca la clave definida por `name="nombre"`, aunque en este proyecto también coincide con su `id`.

**¿Para qué usamos `preventDefault()`?** Para cancelar la acción predeterminada del envío. Así puedo leer los campos con JavaScript sin que el navegador navegue a otra página o recargue la actual. Esta instrucción no guarda los datos ni desactiva los campos obligatorios.

**Respuesta a la pregunta:** La instrucción correcta es **`addEventListener("submit", ...)`**, porque escucha el envío del formulario. `querySelector` encuentra el elemento; `addEventListener` registra la función que se ejecutará al ocurrir el evento.

**Diferencia entre `click` y `submit`:** El botón de demostración de la actividad aumenta un contador mediante `click`. En el proyecto escucho `submit` sobre el formulario, para atender tanto el envío con el botón como con Enter en un campo, cuando los datos son válidos.

**Comprobación en navegador:** Con datos de prueba válidos y el nombre “Ana Estudiante”, al enviar aparece ese nombre en la consola, una sola vez por envío. La página no se recarga y los valores permanecen en pantalla. También se comprobó el envío con Enter y que un formulario vacío no llega a imprimir el nombre.

**Cómo repetir la prueba:** Abrir el inspector con F12, entrar en la pestaña Console, completar los cinco campos y presionar “Reservar mi lugar”. El nombre se muestra en la consola del navegador; todavía no se guarda una inscripción en el servidor.

### Práctica JavaScript: resuelve, ejecuta y explica tu código

**Reto: cuenta las inscripciones.** Revisé las instrucciones del documento `Repaso_Interactivo_Desarrollo_Web (1).html`. El objetivo es practicar un arreglo, una función y mostrar el resultado en un párrafo.

**Práctica ejecutada en OneCompiler:**

```javascript
const inscripciones = ["Ana", "Luis", "Maria"];

function contarInscripciones(lista) {
  return lista.length;
}

console.log("Nombres:", inscripciones.join(", "));
console.log("Total de inscripciones:", contarInscripciones(inscripciones));
console.log("Prueba con arreglo vacio:", contarInscripciones([]));
```

Antes de ejecutarlo predije que el total sería **3**, porque el arreglo tiene tres nombres. En [OneCompiler](https://onecompiler.com/javascript) la salida fue:

```text
Nombres: Ana, Luis, Maria
Total de inscripciones: 3
Prueba con arreglo vacio: 0
```

**Conexión con HTML:** Preparé `public/practica-inscripciones.html`, una página independiente del registro, con el código y su resultado real. El ejemplo utiliza nombres ficticios y no agrega participantes a la lista del formulario.

Para reproducirlo en los paneles de CodePen, el HTML mínimo es:

```html
<p id="resultado"></p>
```

Y el JavaScript es:

```javascript
const inscripciones = ["Ana", "Luis", "Maria"];

function contarInscripciones(lista) {
  return lista.length;
}

document.querySelector("#resultado").textContent =
  "Total de inscripciones: " + contarInscripciones(inscripciones);
```

**Explicación con mis palabras:** El arreglo `inscripciones` contiene tres cadenas de texto. La función recibe el arreglo mediante el parámetro `lista` y devuelve su cantidad de elementos con `length`. Después, `querySelector` encuentra el párrafo y `textContent` coloca el mensaje “Total de inscripciones: 3”. Entendí que `length` es una propiedad y se escribe sin paréntesis.

**Pruebas realizadas:** En OneCompiler se comprobó el resultado de tres nombres y del arreglo vacío. En el navegador local también se verificó que el párrafo muestra 3, que aparecen los tres nombres y que la función devuelve 1 al recibir un arreglo de un solo nombre.

**Estado de los recursos externos:** Se ejecutó la práctica en OneCompiler. Al abrir [CodePen](https://codepen.io/pen/), apareció una verificación de seguridad que bloqueó el acceso automatizado. Por eso la parte visual se ejecutó localmente; queda pendiente pegar el código anterior en CodePen desde el navegador personal si se exige evidencia de esa plataforma. No se afirma haber creado ni guardado un Pen. El video enlazado en la actividad no se revisó; estas respuestas se basan en la consigna y las ejecuciones del código.

**Conclusión personal:** Aprendí a contar los elementos de un arreglo con una función y a llevar el resultado al HTML. La misma función funciona con tres nombres, uno solo o un arreglo vacío.

## Node.js, Express y API

### Actividad: prepara Node.js y ejecuta el proyecto

**¿Qué diferencia hay entre Node.js, npm y VS Code?** Entendí que Node.js ejecuta JavaScript fuera del navegador y permite iniciar nuestro servidor. npm administra los paquetes que necesita el proyecto, como Express. VS Code es el editor donde escribo el código y abro una terminal para ejecutar comandos; no sustituye a Node.js ni a npm.

**Carpeta de trabajo:** `C:\xampp\htdocs\registro-taller-estudiante`. Ya estaba abierta en VS Code y contiene `package.json` y `server.js`, por lo que no fue necesario volver a extraer el ZIP de la actividad.

**Comandos de la práctica:**

```powershell
node -v
npm.cmd -v
npm.cmd install
npm.cmd start
```

Uso `npm.cmd` en PowerShell para evitar el bloqueo del archivo `npm.ps1` por la política de ejecución de scripts.

**¿Qué instala `npm install`?** Lee las dependencias de `package.json` y las instala junto con los paquetes que necesitan. En este proyecto instala Express y sus dependencias; no instala VS Code ni el propio Node.js.

**¿Qué inicia `npm start`?** Ejecuta el script `start` definido en `package.json`. Aquí es `node server.js`, que inicia el servidor Express en `http://localhost:3000`. Mientras se usa el servidor, su proceso debe seguir ejecutándose.

**¿Por qué aparece `node_modules` y por qué no debe subirse a GitHub?** Allí npm guarda los paquetes instalados. Puede contener muchos archivos y se puede reconstruir a partir de `package.json` y `package-lock.json`, por lo que no es necesario incluirla en el repositorio. Revisé que `.gitignore` ya contiene `node_modules/`. Sí conviene conservar `package-lock.json`, porque registra las versiones resueltas de las dependencias.

**¿Cómo se detiene el servidor?** Se presiona **Ctrl + C** en la terminal donde está ejecutándose. Si Windows pregunta si se desea terminar el trabajo por lotes, se confirma. Para volver a iniciarlo se usa `npm.cmd start`.

**Resultado de la instalación y las pruebas:** Se instaló Node.js LTS con el instalador oficial mediante winget, después de aceptar el permiso de Windows. `node -v` mostró **v26.13.0** y `npm.cmd -v` mostró **11.20.0**. La versión de Node supera el mínimo de 18 que pide la actividad.

Ejecuté `npm.cmd install` desde la carpeta del proyecto: se agregaron **65 paquetes**, se auditaron **66** y npm reportó **0 vulnerabilidades** en ese momento. Se crearon `node_modules` y `package-lock.json`. La dependencia principal instalada es **Express 5.3.0**, comprobada con `npm.cmd ls --depth=0`.

Después ejecuté `npm.cmd start` y la terminal mostró `Servidor disponible en http://localhost:3000`. La página respondió con estado HTTP **200** y `GET /api/inscripciones` devolvió **`[]`**, porque todavía no hay registros. También se probó detener el servidor con **Ctrl + C**, confirmar con **S** y comprobar que el puerto 3000 dejó de escuchar. Finalmente se volvió a iniciar para poder revisar el proyecto.

**Comprobaciones:**

- [x] La terminal muestra las versiones de Node.js y npm.
- [x] La página abre en `http://localhost:3000`.
- [x] Puedo explicar qué instala `npm install` y qué inicia `npm start`.
- [x] Se comprobó cómo detener y volver a iniciar el servidor.

**Nota práctica:** Si una terminal que ya estaba abierta no reconoce `node`, debo cerrar y volver a abrir VS Code para que reciba el PATH actualizado por el instalador. Para esta prueba se actualizó el PATH de la terminal utilizada. Debo mantener abierta la terminal del servidor mientras uso la página.

El puerto **8080** correspondía a la vista estática anterior. Para esta actividad uso **3000**, donde sí se ejecuta Express con Node.js. Iniciar el servidor no completa automáticamente la ruta POST: el guardado de inscripciones sigue pendiente.

### Actividad: una ruta recibe una solicitud y devuelve una respuesta

**¿Qué es una ruta?** Entendí que una ruta relaciona un método HTTP y una dirección del servidor con una función que atiende la solicitud. Por ejemplo, `GET /api/inscripciones` consulta la lista y `POST /api/inscripciones` recibe datos para crear una inscripción, aunque ambos usan la misma dirección.

**Lo que realicé:** Completé los TODO de la ruta POST en `server.js`. Leo `nombre`, `correo`, `telefono`, `taller` y `horario` desde `req.body`, compruebo que sean textos no vacíos y elimino espacios de los extremos. También reviso el formato del correo, el nombre, el teléfono y que el taller y el horario pertenezcan a las opciones disponibles.

Si los datos son correctos, genero un identificador con `randomUUID()`, guardo el objeto en el arreglo `inscripciones` y lo devuelvo con estado **201**. Si hay un error, respondo con **400** y un mensaje JSON. También se responde con 400 si el cuerpo contiene JSON mal formado.

**Ejemplo de GET:** Al abrir `http://localhost:3000/api/inscripciones` antes de crear registros, obtuve estado **200** y este JSON:

```json
[]
```

**Ejemplo de POST:** Envié una solicitud a la misma dirección, con método POST, encabezado `Content-Type: application/json` y este cuerpo de prueba:

```json
{
  "nombre": "Ana Evidencia",
  "correo": "ana@example.com",
  "telefono": "5551234567",
  "taller": "HTML y CSS",
  "horario": "Sábado 09:00 a 11:00"
}
```

El servidor devolvió **201** y el objeto con los cinco campos y un `id` generado. Al consultar nuevamente con GET, recibí un arreglo con esa inscripción y estado 200. El identificador exacto quedó registrado en el archivo de pruebas y las capturas.

**¿Cuándo usaría cada estado HTTP?**

| Estado | Uso en este proyecto |
| --- | --- |
| `200 OK` | La consulta de inscripciones se resolvió correctamente, aunque la lista esté vacía. |
| `201 Created` | Se creó una inscripción y se devuelve el registro nuevo. |
| `400 Bad Request` | La solicitud tiene datos incompletos, tipos incorrectos, formato inválido u opciones no permitidas. |

**Respuesta a la pregunta:** `express.json()` sirve **para interpretar el JSON enviado al servidor** y permitir su lectura en `req.body`. No dibuja botones ni guarda datos permanentemente en SQL.

**Otras instrucciones que identifiqué:** `express.static(...)` entrega los archivos de la carpeta `public`; `app.get()` y `app.post()` registran las rutas; `res.json()` envía una respuesta JSON; `res.status()` establece el estado HTTP.

**Pruebas realizadas:** Se ejecutaron diez solicitudes reales. Se comprobó la lista inicial, la creación, la consulta posterior y el rechazo de correo inválido, nombre vacío, teléfono numérico en vez de texto, teléfono con letras, horario inexistente y JSON mal formado. La última consulta confirmó que los errores no agregaron inscripciones.

**Alcance actual:** El servidor ya crea registros en memoria, pero se pierden al reiniciarlo. El formulario todavía no envía los datos mediante `fetch`; esa conexión corresponde a la siguiente actividad. La inscripción “Ana Evidencia” es ficticia y se creó para estas pruebas. Las notas anteriores sobre el POST pendiente describen el estado previo a esta actividad.

### Actividad: fetch envía datos y recibe una respuesta

**Lo que hice:** Conecté el formulario del proyecto con `POST /api/inscripciones` usando `fetch`. Leo los cinco campos con `FormData`, los convierto en un objeto y envío nombre, correo, teléfono, taller y horario. El navegador indica el formato con el encabezado `Content-Type: application/json`.

```javascript
const datosFormulario = new FormData(formulario);
const datos = Object.fromEntries(datosFormulario.entries());

const respuesta = await fetch("/api/inscripciones", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(datos)
});

const resultado = await respuesta.json();
if (!respuesta.ok) {
  mensaje.textContent = resultado.mensaje;
  return;
}
```

Este fragmento resume el envío. En el archivo completo también se validan los campos, se manejan errores de conexión y se actualiza la lista.

**Recorrido de la información:**

1. **Capturar:** JavaScript obtiene los valores del formulario por sus atributos `name`.
2. **Enviar:** `fetch` realiza un POST con el cuerpo convertido a JSON.
3. **Procesar:** Express interpreta el cuerpo con `express.json()`, lee `req.body`, valida y guarda la inscripción en memoria.
4. **Responder:** El servidor devuelve el estado HTTP y un cuerpo JSON. El navegador interpreta la respuesta y muestra la confirmación o el error.

**¿Por qué se usa `JSON.stringify(datos)`?** La respuesta correcta es **para convertir el objeto en texto JSON y enviarlo**. No borra los campos ni convierte el servidor en HTML.

**Diferencia entre `JSON.stringify()` y `response.json()`:** `JSON.stringify()` recibe un valor de JavaScript y lo convierte en una cadena de texto JSON. En cambio, `response.json()` lee e interpreta el cuerpo JSON de una respuesta HTTP y devuelve una promesa con el valor de JavaScript resultante; por eso lo uso con `await`. En mi código la variable se llama `respuesta`, así que escribo `await respuesta.json()`.

**¿Qué representa el estado 201?** Significa **Created**, es decir, que el servidor creó un recurso. En este proyecto confirma que se creó la inscripción. No significa que se haya guardado permanentemente en una base de datos.

**¿Por qué reviso `respuesta.ok`?** Porque `fetch` puede recibir una respuesta 400 o 500 sin lanzar una excepción por ese estado HTTP. `ok` es verdadero para estados del 200 al 299. Si es falso, muestro el mensaje del servidor; uso `catch` para errores de conexión o de interpretación de la respuesta.

**Resultado en el formulario:** Al aceptar la inscripción, aparece la confirmación, se limpian los campos y se consulta la lista con GET. Los participantes se dibujan con `textContent`. Si el servidor rechaza la solicitud, se conservan los valores para corregirlos. Mientras el envío está pendiente, el botón queda deshabilitado para evitar envíos repetidos.

**Pruebas:** Registré a “Lucia Prueba” con datos ficticios y recibí 201. Su nombre apareció en la lista, el formulario se limpió y la página no se recargó. Después modifiqué el correo de una petición de prueba para enviar un valor inválido directamente al servidor: respondió 400 y la interfaz mostró su mensaje. También simulé una falla de conexión y comprobé que los campos se conservan y el botón vuelve a habilitarse.

**Estado del proyecto después de esta práctica:** La conexión mediante `fetch` ya funciona en `http://localhost:3000`. Las anotaciones previas sobre esa conexión pendiente corresponden a actividades anteriores. Las inscripciones siguen guardándose en memoria y se pierden al reiniciar Node.js.

## SQL

### Actividad: SQL crea, consulta, modifica y elimina datos

**Resumen propio:** SQL permite trabajar con datos organizados en tablas. Cada fila representa un registro y cada columna un atributo; en esta práctica, un taller tiene identificador, nombre y horario.

Realicé el ejercicio en SQLite Fiddle por etapas y guardé el código en `practicas/talleres.sql`. La práctica se ejecutó aparte: el servidor Express continúa usando su arreglo en memoria.

**1. Crear la tabla e insertar un registro:**

```sql
CREATE TABLE talleres (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  horario TEXT
);

INSERT INTO talleres (nombre, horario)
VALUES ('Desarrollo Web', 'Tarde');

SELECT id, nombre, horario FROM talleres;
```

La consulta devolvió las columnas `id`, `nombre` y `horario`, con una fila: **1 | Desarrollo Web | Tarde**. En esta tabla de SQLite, `INTEGER PRIMARY KEY` permite generar el identificador cuando no se proporciona en el INSERT. `NOT NULL` impide guardar un valor nulo en el nombre.

**2. Actualizar y volver a consultar:**

```sql
UPDATE talleres
SET horario = 'Mañana'
WHERE id = 1;

SELECT id, nombre, horario FROM talleres;
```

El resultado fue **1 | Desarrollo Web | Mañana**. Cambió el horario; el identificador y el nombre permanecieron iguales.

**3. Eliminar y comprobar:**

```sql
DELETE FROM talleres
WHERE id = 1;

SELECT id, nombre, horario FROM talleres;
SELECT COUNT(*) AS registros_restantes FROM talleres;
```

Desapareció la fila del taller **Desarrollo Web**, cuyo `id` era **1**. El SELECT ya no devolvió filas y `COUNT(*)` devolvió **0**. La tabla sigue existiendo; DELETE eliminó el registro, no la estructura.

**¿Qué hace cada sentencia?**

| Sentencia | Función |
| --- | --- |
| `SELECT` | Consulta datos y devuelve las columnas solicitadas. |
| `INSERT` | Agrega filas a una tabla. |
| `UPDATE` | Modifica los valores de las filas que cumplen una condición. |
| `DELETE` | Elimina las filas que cumplen una condición. |

**¿Qué son DDL y DML?** DDL significa lenguaje de definición de datos y se usa para definir o modificar la estructura, como `CREATE TABLE talleres (...)`. DML significa lenguaje de manipulación de datos y se usa para trabajar con los registros, como `INSERT INTO talleres (nombre, horario) VALUES ('Desarrollo Web', 'Tarde')`, `UPDATE` y `DELETE`. Las consultas con `SELECT` también suelen agruparse por separado como DQL, lenguaje de consulta de datos.

**Relación entre tablas:** La clave primaria o **PK** identifica de forma única cada fila; en `talleres` es `id`. Una clave foránea o **FK** referencia una clave de otra tabla. Por ejemplo, `inscripciones.taller_id` puede referenciar `talleres.id`: un taller puede tener muchas inscripciones y cada inscripción apunta a un taller. La tabla de inscripciones tendría además su propio identificador y campos como nombre, correo y teléfono. Esta relación es conceptual en la actividad; el ejercicio ejecutado creó solamente `talleres`.

**Respuesta a la pregunta:** La sentencia que consulta registros es **`SELECT`**.

**Pregunta de repaso:** ¿Por qué agregué `WHERE id = 1` al UPDATE y al DELETE?

**Mi respuesta:** Para modificar o eliminar únicamente esa fila. Sin WHERE, esas instrucciones afectarían todas las filas de la tabla.

## Git y GitHub

### Actividad: Git conserva el historial de los cambios

**Resumen propio:** Git guarda versiones del proyecto y permite consultar qué cambió entre ellas. Entendí que conviene separar los cambios por propósito y escribir mensajes que permitan reconocer cada versión.

**Lo realizado:** Comprobé la instalación con `git --version`, que mostró `git version 2.55.0.windows.3`. La carpeta todavía no era un repositorio, así que ejecuté `git init` desde la raíz del proyecto. Revisé `.gitignore` y comprobé con `git check-ignore node_modules/ .env` que ambas rutas están excluidas.

**Organización de las versiones:** Como el proyecto ya estaba desarrollado antes de inicializar Git, organicé su primera incorporación en tres commits por grupos de archivos: estructura y configuración, formulario y estilos, y JavaScript con la API y las prácticas. Estos commits no representan versiones históricas recuperadas de las clases anteriores.

**Estado:** Configuré la identidad de Git únicamente en este repositorio con el usuario `fredaorep-1979` y su correo asociado. Guardé estos tres commits locales:

1. `Agrega estructura inicial y configuracion del proyecto`: archivos de configuración, dependencias y README.
2. `Completa formulario adaptable y estilos`: formulario HTML y diseño CSS.
3. `Conecta JavaScript con API y registra practicas`: lógica del navegador, servidor Express, ejercicios, bitácora y archivos de las prácticas.

Revisé el historial con `git log --oneline` y el estado con `git status`. `node_modules/` y `.env` permanecen excluidos. No se ha realizado `push`: aún no hay un repositorio remoto configurado.

**Diferencia entre working tree, stage, commit y push:**

| Concepto o comando | Explicación con mis palabras |
| --- | --- |
| Working tree | Archivos que veo y edito en la carpeta del proyecto. |
| Stage | Área donde preparo los cambios que incluiré en el siguiente commit. |
| `git add` | Agrega al stage el estado actual de los archivos seleccionados; no publica los cambios. |
| `git commit` | Crea una versión en el historial local con los cambios preparados y un mensaje. |
| `git push` | Envía los commits locales a un repositorio remoto configurado, por ejemplo en GitHub. |

**Orden correcto para guardar y publicar un cambio:** **`add → commit → push`**.

**¿Qué comunica un buen mensaje de commit?** Indica de forma breve qué cambió y, cuando hace falta, para qué. Por ejemplo, `Conecta formulario con API y valida inscripciones` explica más que `cambios` o `listo`. Los cambios relacionados deben quedar juntos para que el historial sea fácil de revisar.

**Comandos que usaría al continuar:**

```bash
git status
git add nombre-del-archivo
git diff --cached
git commit -m "Describe el cambio realizado"
git log --oneline
```

`git status` informa qué archivos tienen cambios y cuáles están preparados. `git diff --cached` permite revisar el contenido preparado antes de confirmar. Si modifico nuevamente un archivo después de `git add`, necesito agregar esos cambios nuevos para incluirlos en el commit.

**Diferencia entre Git y GitHub:** Git es la herramienta de control de versiones que funciona localmente. GitHub es un servicio donde puedo alojar repositorios y colaborar. Puedo crear commits sin usar GitHub; para hacer push necesito un remoto y acceso a él. En esta práctica todavía no se ha configurado un remoto ni publicado el proyecto.

**Pregunta de repaso:** ¿`git add` guarda por sí solo una versión en el historial?

**Mi respuesta:** No. Prepara los cambios; la versión se crea con `git commit`.

## Glosario en construcción para el final de la clase

Iré completando este glosario con los términos de las actividades; esta es la primera recopilación.

| Palabra | Significado con mis palabras |
| --- | --- |
| HTML | Lenguaje que define la estructura y el significado del contenido de una página. |
| CSS | Lenguaje que controla la presentación de los elementos HTML. |
| JavaScript | Lenguaje que permite trabajar con datos y programar el comportamiento de la página o del servidor. |
| DOM | Representación del documento como elementos que JavaScript puede consultar y modificar. |
| Evento | Suceso, como un clic o un envío, al que podemos responder con una función. |
| `required` | Atributo que hace obligatorio un control del formulario. |
| `FormData` | Objeto que reúne los valores de los controles de un formulario usando sus nombres. |
| Arreglo | Colección ordenada de elementos; su propiedad `length` indica la cantidad. |
| Función | Bloque de instrucciones que puede recibir datos y devolver un resultado. |
| `const` y `let` | Declaraciones de variables: `const` impide reasignar y `let` permite cambiar el valor. |
| `padding` | Espacio interior entre el contenido y su borde. |
| `margin` | Espacio exterior alrededor del borde de un elemento. |
| Flexbox | Sistema CSS para organizar elementos sobre un eje principal y uno transversal. |
| Grid | Sistema CSS para distribuir elementos en filas y columnas. |
| Media query | Condición que aplica estilos según características como el ancho de la ventana. |
| Frontend | Parte de la aplicación con la que interactúo en el navegador. |
| Backend | Parte que atiende las solicitudes y procesa los datos en el servidor. |
| Node.js | Entorno que ejecuta JavaScript fuera del navegador. |
| npm | Administrador de paquetes y ejecutor de los scripts definidos en el proyecto. |
| Express | Biblioteca de Node.js que facilita crear servidores y organizar rutas. |
| API | Interfaz mediante la que programas intercambian información siguiendo reglas definidas. |
| HTTP | Protocolo usado para intercambiar solicitudes y respuestas en la web. |
| Ruta | Combinación de método y dirección que el servidor atiende mediante una función. |
| GET | Método usado para consultar información. |
| POST | Método usado aquí para enviar datos y crear una inscripción. |
| JSON | Formato de texto para representar e intercambiar datos. |
| `fetch` | Función del navegador que realiza solicitudes HTTP y devuelve una promesa con la respuesta. |
| `JSON.stringify()` | Convierte un valor de JavaScript en texto JSON para enviarlo. |
| `response.json()` | Lee el cuerpo JSON de una respuesta HTTP y devuelve una promesa con los datos interpretados. |
| Promesa | Objeto que representa el resultado futuro de una operación que puede completarse o fallar. |
| `async` y `await` | Permiten escribir funciones asíncronas y esperar sus promesas sin bloquear toda la página. |
| `Content-Type` | Encabezado que indica el formato del cuerpo enviado; aquí se usa `application/json`. |
| `req.body` | Propiedad de la solicitud donde se consulta el cuerpo que interpretó el middleware. |
| Middleware | Función que participa en el procesamiento de una solicitud antes de responder o pasar al siguiente paso. |
| Validación | Comprobación de que los datos cumplen las reglas antes de aceptarlos. |
| Estado HTTP | Número que indica el resultado de una solicitud, como 200, 201 o 400. |
| UUID | Identificador generado con una probabilidad muy baja de repetirse. |
| Memoria | Almacenamiento temporal del proceso; en este proyecto se pierde al reiniciar el servidor. |
| SQL | Lenguaje para definir estructuras y consultar o modificar datos en una base de datos relacional. |
| SQLite | Motor de base de datos usado para esta práctica de SQL. |
| Tabla, fila y columna | Una tabla organiza registros; cada fila es un registro y cada columna representa un atributo. |
| DDL | Instrucciones para definir estructuras, como `CREATE TABLE`. |
| DML | Instrucciones para manipular datos, como `INSERT`, `UPDATE` y `DELETE`. |
| DQL | Nombre usado para clasificar las consultas de datos con `SELECT`. |
| Clave primaria (PK) | Identifica de forma única una fila de una tabla. |
| Clave foránea (FK) | Referencia una clave de otra tabla para relacionar registros. |
| `WHERE` | Condición que filtra las filas que consulta o afecta una sentencia. |
| `COUNT(*)` | Cuenta las filas del resultado de una consulta. |
| Git | Herramienta de control de versiones que conserva el historial del proyecto. |
| GitHub | Servicio para alojar repositorios Git y colaborar con otras personas. |
| Repositorio | Proyecto cuyo historial y configuración administra Git. |
| Working tree | Archivos del proyecto que puedo editar en mi carpeta. |
| Stage | Área de preparación de los cambios del siguiente commit. |
| Commit | Versión local formada por los cambios preparados, un autor y un mensaje. |
| Push | Envío de commits locales a un repositorio remoto. |
| `.gitignore` | Archivo de patrones para excluir archivos no rastreados, como dependencias y configuración privada. |
