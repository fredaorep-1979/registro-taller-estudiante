# Glosario de Desarrollo Web

Definiciones de los términos utilizados en las actividades y en el proyecto final, con ejemplos relacionados con el registro de talleres.

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
| DELETE (HTTP) | Método que utiliza la API para eliminar una inscripción por su identificador. |
| 404 Not Found | Estado HTTP que indica que el recurso solicitado no se encontró. |

## HTML, formularios y accesibilidad

| Palabra | Significado con mis palabras |
| --- | --- |
| Etiqueta semántica | Etiqueta que comunica la función del contenido, como `main` para el contenido principal. |
| `section` | Agrupa contenido relacionado, normalmente con un encabezado que describe el tema. |
| `form` | Agrupa los controles que permiten capturar y enviar información. |
| `label` y `for` | La etiqueta describe un control; su atributo `for` debe coincidir con el `id` de ese control. |
| `id` | Identificador único de un elemento dentro del documento, como `formulario-registro`. |
| `name` | Nombre de la clave del dato de un control. FormData lo utiliza para recoger su valor. |
| `type` | Define el tipo de control: `email` pide formato de correo y `tel` permite introducir un teléfono. `tel` por sí solo no valida su formato. |
| `placeholder` | Texto de ejemplo que aparece cuando el campo está vacío; no sustituye a la etiqueta. |
| `select` y `option` | Crean una lista de opciones, como los talleres y horarios disponibles. |
| `disabled` | Deshabilita un control. Lo uso en el botón mientras se envía la inscripción. |
| `aria-describedby` | Relaciona un elemento con uno o varios textos que lo describen, usando sus identificadores. |
| `aria-live` | Indica a las tecnologías de asistencia que anuncien los cambios de una región, como un mensaje de resultado. |
| Viewport | Área del navegador disponible para mostrar la página; su ancho se usa en las media queries. |

## CSS y diseño adaptable

| Palabra | Significado con mis palabras |
| --- | --- |
| Selector | Expresión que indica a qué elementos se aplica una regla CSS. `.tarjeta` selecciona una clase y `#nombre` un identificador. |
| Clase | Nombre reutilizable que permite aplicar estilos a varios elementos mediante el atributo `class`. |
| Modelo de caja | Forma de representar un elemento con contenido, padding, borde y margen. |
| `border` | Contorno de la caja de un elemento; puede tener grosor, estilo y color. |
| `gap` | Separación entre elementos o pistas de una distribución Flexbox o Grid. |
| `justify-content` | En Flexbox, distribuye los elementos sobre el eje principal. |
| `align-items` | En Flexbox, alinea los elementos sobre el eje transversal. |
| `flex-direction` | Define la dirección del eje principal: `row` organiza en fila y `column` en columna. |
| `grid-template-columns` | Define las columnas de Grid; `1fr 1fr` crea dos columnas con la misma proporción. |
| Diseño adaptable | Diseño que ajusta tamaños, espacios y distribución al ancho disponible de la pantalla. |

## JavaScript, eventos y comunicación

| Palabra | Significado con mis palabras |
| --- | --- |
| Objeto | Conjunto de propiedades y valores, como los cinco datos de una inscripción. |
| Booleano | Valor que puede ser `true` o `false`; lo devuelve la función que comprueba si hay cupo. |
| `length` | Propiedad que indica la longitud de un arreglo; en el ejercicio de tres nombres vale 3. |
| `return` | Termina la ejecución de una función y puede devolver un resultado. |
| `querySelector()` | Encuentra el primer elemento que coincide con un selector CSS. |
| `addEventListener()` | Registra una función para que se ejecute cuando ocurra un evento. |
| `submit` | Evento del envío de un formulario; puede iniciarse con el botón o con Enter en un campo. |
| `preventDefault()` | Cancela la acción predeterminada de un evento; en submit evita el envío normal que puede recargar la página. |
| `textContent` | Lee o escribe texto dentro de un elemento sin interpretarlo como etiquetas HTML. |
| `Object.fromEntries()` | Construye un objeto a partir de pares de claves y valores, como los obtenidos de FormData. |
| `try`, `catch` y `finally` | Organizan una operación, el manejo de errores y las tareas finales, como volver a habilitar el botón. |
| `response.ok` | Indica si la respuesta HTTP tiene un estado entre 200 y 299. Un error 400 no hace que fetch falle automáticamente. |
| DevTools | Herramientas del navegador para inspeccionar elementos, revisar la consola y observar solicitudes en Network. |

## Servidor, datos y estados HTTP

| Palabra | Significado con mis palabras |
| --- | --- |
| `localhost` | Nombre que apunta a la propia computadora. En el proyecto uso `http://localhost:3000`. |
| Puerto | Número que identifica el punto de conexión de un servicio, como 3000 para nuestro servidor. |
| `package.json` | Archivo que describe el proyecto, sus dependencias y scripts, incluido `start`. |
| `package-lock.json` | Registra las versiones resueltas de los paquetes para facilitar instalaciones reproducibles. |
| `node_modules` | Carpeta donde npm instala los paquetes; no se incluye en el repositorio. |
| `npm install` | Instala las dependencias declaradas en el proyecto y las dependencias que estas necesitan. |
| `npm start` | Ejecuta el script start; en este proyecto inicia `node server.js`. |
| `express.json()` | Middleware que interpreta el cuerpo JSON de las solicitudes para leerlo en `req.body`. |
| `express.static()` | Entrega archivos estáticos, como HTML, CSS y JavaScript, desde una carpeta. |
| `req.params` | Contiene los parámetros definidos en la ruta; `req.params.id` identifica la inscripción que se quiere eliminar. |
| `res.json()` | Envía datos como una respuesta JSON desde Express. |
| `res.status()` | Establece el estado HTTP que tendrá la respuesta. |
| 200 OK | La solicitud se resolvió correctamente; lo uso al consultar o eliminar una inscripción. |
| 201 Created | El servidor creó un recurso, como una inscripción nueva. |
| 400 Bad Request | La solicitud contiene datos inválidos o incompletos. |
| Persistencia | Conservación de datos más allá del proceso que los creó; nuestro arreglo en memoria no ofrece esa permanencia. |
| `CREATE TABLE` | Sentencia SQL que crea la estructura de una tabla. |
| `SELECT` | Sentencia SQL que consulta datos. |
| `INSERT` | Sentencia SQL que agrega filas. |
| `UPDATE` | Sentencia SQL que modifica filas; WHERE permite indicar cuáles. |
| `DELETE` (SQL) | Sentencia que elimina filas de una tabla. Es distinta del método HTTP DELETE de nuestra API. |

## Git y entrega del proyecto

| Palabra | Significado con mis palabras |
| --- | --- |
| `git init` | Inicializa un repositorio Git dentro de la carpeta. |
| `git status` | Muestra el estado del proyecto y los cambios preparados o pendientes. |
| `git add` | Prepara la versión actual de los archivos seleccionados para el siguiente commit. |
| `git log --oneline` | Muestra un resumen del historial, con identificador y mensaje por commit. |
| Rama | Línea de desarrollo del repositorio; en nuestro proyecto se utiliza `master`. |
| Remoto y `origin` | Un remoto identifica otro repositorio mediante una dirección. `origin` es el nombre que dimos al repositorio de GitHub. |
| README | Documento que presenta el proyecto y explica cómo instalarlo, iniciarlo y probarlo. |
| Repositorio privado | Repositorio al que solo pueden acceder las cuentas autorizadas. |
