const Usuario = require('../../models/Usuarios.js');

const usuarioPut = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, nombre, correo } = req.body;

    // Verificar si el usuario existe
    const usuarioExistente = await Usuario.findById(id);
    if (!usuarioExistente) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Actualizar los campos necesarios
    usuarioExistente.username = username || usuarioExistente.username;
    usuarioExistente.nombre = nombre || usuarioExistente.nombre;
    usuarioExistente.correo = correo || usuarioExistente.correo;

    // Guardar el usuario actualizado
    const usuarioActualizado = await usuarioExistente.save();

    res.json(usuarioActualizado);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = usuarioPut;
