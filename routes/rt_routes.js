const express = require('express');
const router = express.Router();
const { prueba } = require('../controllers/controllers_rt/ctrl_prueba')

router.post('/envio-plan', prueba.rt_plan)





module.exports = router;
