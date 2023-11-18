const usuariosPOST = async (req, res) => {
    try {
      // Obtener datos del cuerpo de la solicitud
      const { username, nombre, correo } = req.body || {};
  
      // Verifica si todos los campos requeridos están presentes
      if (!username || !nombre || !correo) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
      }
  
      const nuevoUsuario = new Usuario({
        username,
        nombre,
        correo,
      });
  
      // Guardar el usuario en la base de datos
      const usuarioGuardado = await nuevoUsuario.save();
  
      res.json(usuarioGuardado);
    } catch (error) {
      // Manejar el error específico de correo duplicado
      if (error.code === 11000 && error.keyPattern && error.keyPattern.correo) {
        return res.status(400).json({ error: 'El correo proporcionado ya está en uso.' });
      }
  
      console.error('Error al crear un nuevo usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  module.exports = usuariosPOST;
  