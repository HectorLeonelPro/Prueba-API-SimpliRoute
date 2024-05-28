const express = require('express');
const router = express.Router();
const { prueba } = require('../controllers/controllers_views/ctrl_prueba')



router.get('/envio', prueba.envio)
router.get('/resultados', prueba.resultados)
router.get('/consultas', prueba.consultas)




module.exports = router;
