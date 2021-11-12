const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/signInUp', authController.getSignInUp);

router.post('/signUp', authController.postSignUp);

router.get('/reset', authController.getReset);

router.post('/updatePreferences', authController.postUpdatePreferences);

router.post('/deleteUser', authController.postDeleteUser);

module.exports = router;