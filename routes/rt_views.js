const express = require('express');
const router = express.Router();
const { prueba } = require('../controllers/controllers_views/ctrl_prueba')



router.get('/envio', prueba.envio)
router.get('/pruebas', prueba.pruebas)
router.get('/resultados', prueba.resultados)
router.get('/consultas', prueba.consultas)
router.get('/consultas_prueba', prueba.consultas_prueba)
router.get('/consultas_mapbox', prueba.consultas_mapbox)
router.get('/consultas_google', prueba.consultas_google)




module.exports = router;
