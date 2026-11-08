const formulario = document.querySelector("#formulario-registro");
const lista = document.querySelector("#lista-inscripciones");
const mensaje = document.querySelector("#mensaje");

const controles = [...formulario.querySelectorAll("input, select")];

// Conservamos la validación del navegador y personalizamos sus mensajes.
function validarCampo(control, mostrarError = false) {
  const valor = control.value.trim();
  let error = "";
  control.setCustomValidity("");

  if (!valor) {
    const mensajes = {
      nombre: "Escribe tu nombre completo.",
      correo: "Escribe tu correo electrónico.",
      telefono: "Escribe tu número de teléfono.",
      taller: "Selecciona un taller.",
      horario: "Selecciona un horario."
    };
    error = mensajes[control.id];
  } else if (control.id === "nombre") {
    const letras = valor.match(/\p{L}/gu) || [];
    if (letras.length < 2 || valor.length > 100 || !/^[\p{L}\p{M} .'’\-]+$/u.test(valor)) {
      error = "Escribe un nombre de 2 a 100 caracteres, con letras; se permiten acentos, espacios, puntos, guiones y apóstrofos.";
    }
  } else if (control.id === "correo") {
    if (valor.length > 254 || control.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
      error = "Escribe un correo válido, por ejemplo: ana@ejemplo.com.";
    }
  } else if (control.id === "telefono") {
    const digitos = valor.replace(/\D/g, "");
    if (valor.length > 30 || !/^\+?[0-9 ()-]+$/.test(valor) || digitos.length < 8 || digitos.length > 15) {
      error = "Escribe de 8 a 15 dígitos; puedes usar + al inicio, espacios, guiones y paréntesis.";
    }
  } else if (control.tagName === "SELECT") {
    if (![...control.options].some(opcion => !opcion.disabled && opcion.value === valor)) {
      error = "Selecciona una de las opciones disponibles.";
    }
  }

  control.setCustomValidity(error);
  if (mostrarError) {
    document.getElementById(`error-${control.id}`).textContent = error;
    control.setAttribute("aria-invalid", String(Boolean(error)));
  }
  return !error;
}

controles.forEach(control => {
  const aviso = document.createElement("small");
  aviso.id = `error-${control.id}`;
  aviso.className = "error-campo";
  aviso.setAttribute("aria-live", "polite");
  control.parentElement.append(aviso);
  control.setAttribute("aria-describedby", [control.getAttribute("aria-describedby"), aviso.id].filter(Boolean).join(" "));
  validarCampo(control);
  control.addEventListener("blur", () => validarCampo(control, true));
  control.addEventListener("invalid", () => validarCampo(control, true));
  ["input", "change"].forEach(evento => control.addEventListener(evento, () => {
    mensaje.textContent = "";
    validarCampo(control, control.hasAttribute("aria-invalid"));
  }));
});

async function cargarInscripciones() {
  try {
    const respuesta = await fetch("/api/inscripciones");
    if (!respuesta.ok) throw new Error("No se pudo consultar la lista.");
    const registros = await respuesta.json();
    if (!Array.isArray(registros)) throw new Error("Respuesta inesperada.");
    lista.replaceChildren();
    if (registros.length === 0) {
      const vacio = document.createElement("li");
      vacio.className = "vacio";
      vacio.textContent = "Aún no hay inscripciones.";
      lista.append(vacio);
    }
    registros.forEach(registro => {
      const elemento = document.createElement("li");
      elemento.textContent = `${registro.nombre} · ${registro.taller} · ${registro.horario}`;
      lista.append(elemento);
    });
    return true;
  } catch {
    lista.replaceChildren();
    const aviso = document.createElement("li");
    aviso.className = "vacio";
    aviso.textContent = "No se pudo cargar la lista. Comprueba la conexión y vuelve a cargar la página.";
    lista.append(aviso);
    return false;
  }
}

let enviando = false;
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  if (enviando) return;
  const resultados = controles.map(control => validarCampo(control, true));
  if (resultados.includes(false)) {
    formulario.reportValidity();
    return;
  }
  const datosFormulario = new FormData(formulario);
  const datos = Object.fromEntries(datosFormulario.entries());
  console.log(datos.nombre);
  const boton = formulario.querySelector('button[type="submit"]');
  const textoBoton = boton.innerHTML;
  enviando = true;
  boton.disabled = true;
  boton.textContent = "Enviando…";
  formulario.setAttribute("aria-busy", "true");
  mensaje.classList.remove("mensaje-error");
  mensaje.textContent = "Enviando tu inscripción…";

  try {
    const respuesta = await fetch("/api/inscripciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
    const resultado = await respuesta.json();
    if (!respuesta.ok) {
      mensaje.classList.add("mensaje-error");
      mensaje.textContent = resultado.mensaje || "No se pudo registrar la inscripción.";
      return;
    }
    formulario.reset();
    controles.forEach(control => {
      control.removeAttribute("aria-invalid");
      document.getElementById(`error-${control.id}`).textContent = "";
      validarCampo(control);
    });
    mensaje.textContent = `Inscripción registrada correctamente para ${resultado.nombre}.`;
    const listaActualizada = await cargarInscripciones();
    if (!listaActualizada) mensaje.textContent += " El registro se guardó, pero no se pudo actualizar la lista. Recarga la página para consultarlo.";
  } catch {
    mensaje.classList.add("mensaje-error");
    mensaje.textContent = "No se pudo confirmar la inscripción. Comprueba la conexión y consulta la lista antes de volver a enviarla.";
  } finally {
    enviando = false;
    boton.disabled = false;
    boton.innerHTML = textoBoton;
    formulario.removeAttribute("aria-busy");
  }
});

cargarInscripciones();
