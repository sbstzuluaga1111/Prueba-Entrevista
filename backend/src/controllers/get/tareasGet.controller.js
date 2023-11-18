const express = require('express');
const router = express.Router();
const Tareas = require('../../models/Tareas.js');

// Obtener todas las tareas
router.get('/tareas', async (req, res) => {
  try {
    const tareas = await Tareas.find();
    res.json(tareas);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
