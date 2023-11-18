const Tarea = require('../../models/Tareas.js');
const Usuario = require('../../models/Usuarios.js');

const tareasPOST = async (req, res) => {
  try {
    // Obtener datos del cuerpo de la solicitud
    const { titulo, descripcion, estado, usuario_id, tiempo_inicio, tiempo_final } = req.body || {};

    // Verifica si todos los campos requeridos están presentes
    if (!titulo) {
      return res.status(400).json({ error: 'El campo "titulo" es obligatorio.' });
    }

    const usuarioExistente = await Usuario.findById(usuario_id);
    if (!usuarioExistente) {
      return res.status(400).json({ error: 'El usuario con el usuario_id especificado no existe.' });
    }

    if (!descripcion) {
      return res.status(400).json({ error: 'El campo "descripcion" es obligatorio.' });
    }

    if (!estado) {
      return res.status(400).json({ error: 'El campo "estado" es obligatorio.' });
    }

    if (!tiempo_inicio) {
      return res.status(400).json({ error: 'El campo "tiempo_inicio" es obligatorio.' });
    }

    if (!tiempo_final) {
      return res.status(400).json({ error: 'El campo "tiempo_final" es obligatorio.' });
    }

    // Crea una nueva tarea y asigna el usuario_id
    const nuevaTarea = new Tarea({
      titulo,
      descripcion,
      estado,
      usuario_id: usuarioExistente._id,
      tiempo_inicio,
      tiempo_final
    });

    // Guarda la tarea en la base de datos
    const tareaGuardada = await nuevaTarea.save();

    res.json(tareaGuardada);
  } catch (error) {
    console.error('Error al crear una nueva tarea:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = tareasPOST;
