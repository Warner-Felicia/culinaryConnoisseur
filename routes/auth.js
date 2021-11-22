const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

<<<<<<< Updated upstream
router.get('/signInUp', authController.getLogin);
=======
router.get('/signInUp', authController.getSignInUp);

router.post('/signIn', authController.postLogIn);

router.post('/signUp', authController.postSignUp);
>>>>>>> Stashed changes

router.get('/preferences', authController.getPreferences);

router.get('/reset', authController.getReset);

module.exports = router;