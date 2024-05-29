const express = require('express');
const router = express.Router();
const { prueba } = require('../controllers/controllers_rt/ctrl_prueba')

router.post('/envio-plan', prueba.rt_plan)
router.post('/rt-cargar-sucursales', prueba.rt_consulta_sucursales)
router.post('/geolocalizacion', prueba.rt_geolocalizacion)

module.exports = router;
