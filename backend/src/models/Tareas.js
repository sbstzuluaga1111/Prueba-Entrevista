const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  estado: { type: String, enum: ['pendiente', 'en_progreso', 'completa'], default: 'pendiente' },
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  tiempo_inicio: { type: Date, required: true },
  tiempo_final: { type: Date, required: true },
});

const Tareas = mongoose.model('Tareas', tareaSchema, 'Tareas');

module.exports = Tareas;
