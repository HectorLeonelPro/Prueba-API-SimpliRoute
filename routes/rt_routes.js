const express = require('express');
const router = express.Router();
const { prueba } = require('../controllers/controllers_rt/ctrl_prueba')

router.post('/envio-datos-api', prueba.rt_envio_datos)





module.exports = router;
