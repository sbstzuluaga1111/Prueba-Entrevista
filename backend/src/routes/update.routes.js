const express = require('express');
const router = express.Router();

const usuarioPut = require('../controllers/update/usuarioPut.controller.js');
router.put('/usuario/:id', usuarioPut);

const tareaPut = require('../controllers/update/tareaPut.controller.js');
router.put('/tarea/:id', tareaPut);

module.exports = router;