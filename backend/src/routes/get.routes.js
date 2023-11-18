const express = require('express');
const router = express.Router();

const api = require('../controllers/get/apiGET.controller.js');
router.get('/', api);

const usuariosget = require('../controllers/get/usuariosGET.controller.js');
router.get('/usuarios', usuariosget);

const usuarioID = require('../controllers/get/usuarioID.controller.js');
router.get('/usuarios/:id', usuarioID);

const tareasget = require('../controllers/get/tareasGet.controller.js');
router.get('/tareas', tareasget);

const tareaID = require('../controllers/get/tareaID.controller.js');
router.get('/tareas/:id', tareaID);

module.exports = router;
