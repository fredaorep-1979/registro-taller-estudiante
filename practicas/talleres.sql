-- Ejecutar una vez en una base de práctica vacía, por bloques.
-- Esta práctica es independiente del servidor Express.

-- 1. Crear la estructura e insertar un taller.
CREATE TABLE talleres (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  horario TEXT
);

INSERT INTO talleres (nombre, horario)
VALUES ('Desarrollo Web', 'Tarde');

SELECT id, nombre, horario FROM talleres;

-- 2. Modificar el horario y comprobar el cambio.
UPDATE talleres
SET horario = 'Mañana'
WHERE id = 1;

SELECT id, nombre, horario FROM talleres;

-- 3. Eliminar únicamente el taller con id 1 y comprobar el resultado.
DELETE FROM talleres
WHERE id = 1;

SELECT id, nombre, horario FROM talleres;
SELECT COUNT(*) AS registros_restantes FROM talleres;
