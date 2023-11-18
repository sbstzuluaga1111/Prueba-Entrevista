const Tareas = require('../../models/Tareas.js');

const tareaDELET = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica si la tarea existe
    const tareaExistente = await Tareas.findById(id);
    if (!tareaExistente) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }

    // Elimina la tarea
    await Tareas.findByIdAndDelete(id);

    res.json({ mensaje: 'Tarea eliminada exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = tareaDELET;
