const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/signInUp', authController.getLogin);

router.get('/preferences', authController.getPreferences);

router.get('/reset', authController.getReset);

module.exports = router;