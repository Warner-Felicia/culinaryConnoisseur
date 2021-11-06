const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/login', authController.getLogin);

router.get('/reset', authController.getReset);

module.exports = router;