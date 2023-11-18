const express = require('express');
const router = express.Router();

const usuariospost = require('../controllers/post/usuariosPOST.controller.js');
router.post('/usuario', usuariospost);

const tareaspost = require('../controllers/post/tareasPOST.controller.js');
router.post('/tarea', tareaspost);

module.exports = router;