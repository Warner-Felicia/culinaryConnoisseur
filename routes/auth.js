const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/auth');
const User = require('../models/user');

router.get('/signInUp', authController.getSignInUp);

router.post('/signIn', 
    [
        body('email')
        .isEmail()
        .withMessage('Email is required')
        .custom((value, { req }) => {
            return User.findOne({ email: value })
                    .then(userDoc => {
                        if (!userDoc) {
                            return Promise.reject('There is no account with that email'
                            );
                        }
                    });
            })
        .normalizeEmail(),
    body('password')
        .isString()
        .withMessage('Password is required')
        .trim(),
    ],
    authController.postLogIn);

router.post('/signUp', 
[
    body('firstName')
        .isString()
        .notEmpty()
        .withMessage('First name is required')
        .trim(),
    body('lastName')
        .isString()
        .notEmpty()
        .withMessage('Last name is required')
        .trim(),
    body('email')
        .isEmail()
        .withMessage('Email is required')
        .custom((value, { req }) => {
            return User.findOne({ email: value })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject('An account has already been created with that email'
                            );
                        }
                    });
            })
        .normalizeEmail(),
    body('password')
        .isString()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be 8 characters long')
        .trim(),
    body('securityPhrase')
        .isString()
        .withMessage('Security phrase is required')
        .trim(),
    body('passwordHint')
        .isString()
        .withMessage('Security phrase hint is required')
        .trim(),
], 
    authController.postSignUp);

router.get('/preferences', authController.getPreferences);

router.get('/reset', authController.getReset);

router.post('/hint',
    [
        body('email')
        .isEmail()
        .withMessage('Email is required')
        .custom((value, { req }) => {
            return User.findOne({ email: value })
                    .then(userDoc => {
                        if (!userDoc) {
                            return Promise.reject('There is no account with that email'
                            );
                        }
                    });
            })
        .normalizeEmail()
    ],
     authController.postShowHint);

router.post('/reset', 
    [
        body('email')
        .isEmail()
        .withMessage('Email is required')
        .custom((value, { req }) => {
            return User.findOne({ email: value })
                    .then(userDoc => {
                        if (!userDoc) {
                            return Promise.reject('There is no account with that email'
                            );
                        }
                    });
            })
        .normalizeEmail(),
        body('securityPhrase')
            .isString()
            .notEmpty()
            .withMessage('Security phrase is required')
            .trim(),
    ],
    authController.postReset);

router.post('/updateNames',
    [
        body('firstname')
        .isString()
        .notEmpty()
        .withMessage('First name is required')
        .trim(),
    body('lastname')
        .isString()
        .notEmpty()
        .withMessage('Last name is required')
        .trim(),
    body('email')
        .isEmail()
        .withMessage('Email is required')
        .normalizeEmail(),
    ],
     authController.postUpdateNames);

router.post('/updatePassword', 
    [
        body('password')
        .trim()
            .isString()
            .withMessage('Password is required')
            .isLength({ min: 8 })
            .withMessage('Password must be 8 characters long'),
        body('confirm-password')
            .trim()
            .custom((value, { req }) => {
            if (value !== req.body.password) {
                console.log(value);
                console.log(req.body.password);
                throw new Error('Passwords have to match!');
            }
            return true;
        })
    ], 
    authController.postUpdatePassword);

router.post('/updateSecurityPhrase', 
    [
        body('securityPhrase')
            .isString()
            .trim(),
        body('phraseHint')
            .isString()
            .notEmpty()
            .withMessage('Security phrase hint is required')
            .trim(),
    ],
    authController.postUpdateSecurityPhrase);

// router.post('/deleteUser', authController.postDeleteUser);

router.post('/logout', authController.postLogout);

module.exports = router;