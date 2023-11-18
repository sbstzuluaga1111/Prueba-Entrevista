const Tarea = require('../../models/Tareas.js');

const tareaPut = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, estado, usuario_id, tiempo_inicio, tiempo_final } = req.body;

    // Verificar si la tarea existe
    const tareaExistente = await Tarea.findById(id);
    if (!tareaExistente) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }

    // Actualizar los campos necesarios
    tareaExistente.titulo = titulo || tareaExistente.titulo;
    tareaExistente.descripcion = descripcion || tareaExistente.descripcion;
    tareaExistente.estado = estado || tareaExistente.estado;
    tareaExistente.usuario_id = usuario_id || tareaExistente.usuario_id;
    tareaExistente.tiempo_inicio = tiempo_inicio || tareaExistente.tiempo_inicio;
    tareaExistente.tiempo_final = tiempo_final || tareaExistente.tiempo_final;

    // Guardar la tarea actualizada
    const tareaActualizada = await tareaExistente.save();

    res.json(tareaActualizada);
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = tareaPut;
