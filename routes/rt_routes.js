const express = require('express');
const router = express.Router();
const { prueba } = require('../controllers/controllers_rt/ctrl_prueba')

router.post('/envio-plan', prueba.rt_plan)
router.post('/envio-plan-prueba', prueba.rt_plan_prueba)
router.post('/rt-cargar-sucursales', prueba.rt_consulta_sucursales)
router.post('/geolocalizacion', prueba.rt_geolocalizacion)
router.post('/geolocalizacion_inversa', prueba.rt_geolocalizacion_inversa)
router.get('/rt_consulta_vehiculo_conductor', prueba.rt_consulta_vehiculo_conductor)

module.exports = router;
