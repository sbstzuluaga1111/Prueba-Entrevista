const Tarea = require('../../models/Tareas.js');

const tareaID = async (req, res) => {
  try {
    const tareaId = req.params.id;

    // Verificar si el ID es válido
    if (!tareaId) {
      return res.status(400).json({ error: 'ID de tarea no proporcionado' });
    }

    // Obtener la tarea por ID
    const tarea = await Tarea.findById(tareaId);

    // Verificar si la tarea existe
    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json(tarea);
  } catch (error) {
    console.error('Error al obtener tarea por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = tareaID;
