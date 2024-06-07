const express = require('express');
const router = express.Router();
const { prueba } = require('../controllers/controllers_rt/ctrl_prueba')

router.post('/envio-plan', prueba.rt_plan)
router.post('/envio-plan-prueba', prueba.rt_plan_prueba)
router.post('/rt-cargar-sucursales', prueba.rt_consulta_sucursales)
router.post('/geolocalizacion', prueba.rt_geolocalizacion)
router.post('/geolocalizacion_inversa', prueba.rt_geolocalizacion_inversa)
router.get('/rt_consulta_vehiculo_conductor', prueba.rt_consulta_vehiculo_conductor)

//PRUEBAS 
router.post('/busca_vehiculo', prueba.rt_consulta_vehiculo)
router.post('/busca_conductor', prueba.rt_consulta_conductor)
router.post('/busca_vehiculo_ruta', prueba.rt_consulta_vehiculos_ruta)
router.post('/busca_visitas_ruta', prueba.rt_visitas_ruta)
router.post('/busca_visitas_info', prueba.rt_visitas_info)
router.post('/busca_optimizacion_distancia', prueba.rt_optimizacion_distancia)
router.post('/busca_ruta', prueba.rt_consulta_ruta)

module.exports = router;
