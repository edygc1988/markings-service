const express = require('express');
const registerController = require('../controllers/markingController');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/registrar', authMiddleware, registerController.registerMarking);

module.exports = router;

