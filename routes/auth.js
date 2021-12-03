const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/signInUp', authController.getSignInUp);

router.post('/signIn', authController.postLogIn);

router.post('/signUp', authController.postSignUp);

router.get('/preferences', authController.getPreferences);

router.get('/reset', authController.getReset);

router.post('/hint', authController.postShowHint);

router.post('/reset', authController.postReset);

router.post('/updateNames', authController.postUpdateNames);

router.post('/updatePassword', authController.postUpdatePassword);

router.post('/updateSecurityPhrase', authController.postUpdateSecurityPhrase);

router.post('/deleteUser', authController.postDeleteUser);

module.exports = router;