const Usuario = require('../../models/Usuarios.js');

const usuarioID = async (req, res) => {
  try {
    const userId = req.params.id;

    // Verificar si el ID es válido
    if (!userId) {
      return res.status(400).json({ error: 'ID de usuario no proporcionado' });
    }

    // Obtener el usuario por ID
    const usuario = await Usuario.findById(userId);

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = usuarioID;
