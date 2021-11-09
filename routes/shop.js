const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/home', shopController.getIndex);

router.post('/home', shopController.postIndex);

router.get('/signInUp', shopController.getLogin);

router.post('/signInUp', shopController.postLogin);

module.exports = router;