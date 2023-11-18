const Usuario = require('../../models/Usuarios.js');
const Tareas = require('../../models/Tareas.js');

const usuarioDELET = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica si el usuario existe
    const usuarioExistente = await Usuario.findById(id);
    if (!usuarioExistente) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Encuentra todas las tareas asociadas al usuario
    const tareasAsociadas = await Tareas.find({ usuario_id: id });

    // Actualiza el campo 'usuario_id' de esas tareas para desvincularlas
    await Tareas.updateMany({ usuario_id: id }, { usuario_id: null });

    // Elimina el usuario
    await Usuario.findByIdAndDelete(id);

    res.json({ mensaje: 'Usuario eliminado exitosamente y tareas desvinculadas.' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = usuarioDELET;
