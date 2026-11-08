const express = require("express");
const path = require("path");
const { randomUUID } = require("crypto");
const app = express();
const PORT = 3000;

// Este arreglo guarda los registros solo mientras el servidor está activo.
const inscripciones = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Esta ruta ya permite consultar la lista.
app.get("/api/inscripciones", (req, res) => {
  res.json(inscripciones);
});

app.post("/api/inscripciones", (req, res) => {
  const { nombre, correo, telefono, taller, horario } = req.body || {};
  const campos = { nombre, correo, telefono, taller, horario };

  // También validamos en el servidor: el navegador puede enviar datos modificados.
  for (const [campo, valor] of Object.entries(campos)) {
    if (typeof valor !== "string" || !valor.trim()) {
      return res.status(400).json({ mensaje: `El campo ${campo} es obligatorio y debe ser texto.` });
    }
    campos[campo] = valor.trim();
  }

  if (campos.nombre.length > 100 || (campos.nombre.match(/\p{L}/gu) || []).length < 2 ||
      !/^[\p{L}\p{M} .'’\-]+$/u.test(campos.nombre)) {
    return res.status(400).json({ mensaje: "El nombre debe contener entre 2 y 100 caracteres y usar letras, espacios o signos propios de un nombre." });
  }
  if (campos.correo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.correo)) {
    return res.status(400).json({ mensaje: "El correo debe tener un formato válido, por ejemplo: ana@ejemplo.com." });
  }
  const digitos = campos.telefono.replace(/\D/g, "");
  if (campos.telefono.length > 30 || !/^\+?[0-9 ()-]+$/.test(campos.telefono) || digitos.length < 8 || digitos.length > 15) {
    return res.status(400).json({ mensaje: "El teléfono debe contener de 8 a 15 dígitos; se permiten + al inicio, espacios, guiones y paréntesis." });
  }
  const talleres = ["HTML y CSS", "JavaScript", "Node.js y Express"];
  const horarios = ["Sábado 09:00 a 11:00", "Sábado 11:00 a 13:00", "Domingo 10:00 a 12:00"];
  if (!talleres.includes(campos.taller) || !horarios.includes(campos.horario)) {
    return res.status(400).json({ mensaje: "Selecciona un taller y un horario disponibles." });
  }

  const registro = { id: randomUUID(), ...campos };
  inscripciones.push(registro);
  return res.status(201).json(registro);
});

app.delete("/api/inscripciones/:id", (req, res) => {
  const indice = inscripciones.findIndex(registro => registro.id === req.params.id);
  if (indice === -1) {
    return res.status(404).json({ mensaje: "No se encontró la inscripción." });
  }
  inscripciones.splice(indice, 1);
  return res.json({ mensaje: "Inscripción eliminada correctamente." });
});

// Devuelve un mensaje JSON claro si el cuerpo enviado no es JSON válido.
app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ mensaje: "El cuerpo de la solicitud debe contener JSON válido." });
  }
  next(error);
});

app.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});
