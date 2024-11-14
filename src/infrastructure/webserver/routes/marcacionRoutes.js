const express = require('express');
const registerController = require('../controllers/marcacionController');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();


router.post('/registrar', authMiddleware, registerController.registerMarcacion);
router.get('/listar/:id', authMiddleware, registerController.listMarcacion);
router.get('/listarByEmpleado/:id', authMiddleware, registerController.listMarcacionByEmpleado);
router.get('/listarByEmpresa/:id', authMiddleware, registerController.listMarcacionByEmpresa);
router.get('/listarByPersona/:id', authMiddleware, registerController.listMarcacionByPersona);


module.exports = router;
