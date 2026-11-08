# Registro de participantes para talleres

Aplicación de clase que registra nombre, correo, teléfono, taller y horario. Usa HTML y CSS para la interfaz, JavaScript para validar y comunicarse con la API, y Node.js con Express para procesar las solicitudes.

## Requisitos
- Node.js 18 o superior (se recomienda LTS) y Visual Studio Code.
- Conexión a internet la primera vez para instalar Express.

## Ejecutar en VS Code
1. Abre esta carpeta con **File → Open Folder**.
2. Abre **Terminal → New Terminal**.
3. Ejecuta `npm install`.
4. Ejecuta `npm start`.
5. Abre `http://localhost:3000`.

### Si PowerShell bloquea npm.ps1
Si aparece un mensaje que dice que la ejecución de scripts está deshabilitada, usa estos comandos en la misma terminal:

```powershell
npm.cmd install
npm.cmd start
```

También puedes cambiar el perfil de la terminal de VS Code a **Command Prompt** y usar los comandos `npm install` y `npm start`.

Mantén el servidor ejecutándose y usa **Ctrl + C** en su terminal para detenerlo. Si `node` no se reconoce después de instalarlo, cierra y vuelve a abrir VS Code. Si el puerto 3000 está ocupado, detén la instancia anterior de este proyecto antes de iniciar otra.

Los registros se guardan **solo en memoria** y se pierden al reiniciar el servidor. Esta es una práctica local sin autenticación; usa datos ficticios. La práctica SQL está separada y no conecta una base de datos al formulario.

## Funcionamiento

- Los cinco campos son obligatorios y cada etiqueta está asociada con su control.
- Se valida el nombre, el formato del correo, el teléfono de 8 a 15 dígitos y las opciones disponibles de taller y horario.
- La validación se realiza tanto en el navegador como en Express.
- `fetch` envía JSON sin recargar la página; se muestra el resultado y se actualiza la lista.
- La lista se dibuja con `textContent` y permite quitar una inscripción después de confirmar.
- El diseño usa Grid y Flexbox, con ajustes a 850 y 640 píxeles.

## API implementada
- `GET /api/inscripciones`: devuelve el arreglo de registros en JSON.
- `POST /api/inscripciones`: recibe nombre, correo, teléfono, taller y horario; valida y crea una inscripción. Usa estado `201` al crear y `400` si los datos no son válidos.
- `DELETE /api/inscripciones/:id`: elimina una inscripción y devuelve `200` con un mensaje; si el identificador no existe, responde `404`.

## Probar la API desde PowerShell

Con el servidor ejecutándose, abre una segunda terminal en el proyecto:

```powershell
# GET: consultar la lista.
Invoke-RestMethod http://localhost:3000/api/inscripciones

# POST: registrar datos ficticios.
$datosPrueba = @{
  nombre = 'Ana Prueba'
  correo = 'ana@example.com'
  telefono = '5551234567'
  taller = 'HTML y CSS'
  horario = 'Sábado 09:00 a 11:00'
} | ConvertTo-Json

$registroPrueba = Invoke-RestMethod `
  -Uri http://localhost:3000/api/inscripciones `
  -Method Post `
  -ContentType 'application/json; charset=utf-8' `
  -Body ([System.Text.Encoding]::UTF8.GetBytes($datosPrueba))

$registroPrueba

# DELETE: eliminar únicamente la inscripción recién creada.
Invoke-RestMethod `
  -Uri "http://localhost:3000/api/inscripciones/$($registroPrueba.id)" `
  -Method Delete
```

Para comprobar un error, repite el POST con `correo = 'correo-invalido'` o `nombre = ''`. Debe responder 400 sin guardar el registro. Repetir el DELETE del mismo identificador debe responder 404.

## Comprobaciones en el navegador

1. Enviar el formulario vacío: aparecen mensajes de campos obligatorios.
2. Escribir un correo inválido: se impide el envío.
3. Completar datos válidos: aparece la confirmación y el participante en la lista sin recargar.
4. Recargar la página: la lista se consulta de nuevo al servidor.
5. Reducir el ancho a 640 px o menos: los campos se apilan en una columna.
6. Pulsar Quitar: cancelar conserva el registro; aceptar lo elimina y actualiza la lista.

## Archivos principales

- `server.js`: API y validación del servidor.
- `public/index.html`: formulario y lista.
- `public/styles.css`: diseño adaptable.
- `public/app.js`: validación, eventos y solicitudes HTTP.
- `bitacora.md`: actividades, resultados y glosario.
- `practicas/talleres.sql`: práctica SQL independiente.
- `public/practica-inscripciones.html`: ejercicio independiente de arreglos y funciones.

## Entrega en GitHub
Repositorio: https://github.com/fredaorep-1979/registro-taller-estudiante

El repositorio es privado: para revisarlo se necesita acceso. `.gitignore` excluye `node_modules/` y `.env`; `package-lock.json` se conserva para registrar las versiones de dependencias. El historial contiene tres commits iniciales por grupos de archivos y los cambios posteriores de la entrega.
