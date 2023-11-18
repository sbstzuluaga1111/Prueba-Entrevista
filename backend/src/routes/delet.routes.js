const express = require('express');
const router = express.Router();

const usuarioDelet = require('../controllers/delete/usuarioDELET.controller.js');
router.delete('/usuario/:id', usuarioDelet);

const tareaDelet = require('../controllers/delete/tareaDELET.controller.js');
router.delete('/tarea/:id', tareaDelet);

module.exports = router;