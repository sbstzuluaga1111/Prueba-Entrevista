const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  username: String,
  nombre: String,
  correo: { type: String, required: true, unique: true },
});

const Usuarios = mongoose.model('Usuarios', usuarioSchema, 'Usuarios');

module.exports = Usuarios;
