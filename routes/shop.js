const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.post('/', shopController.postIndex);

router.post('/addFavorite', shopController.postAddFavorite);

router.post('/deleteFavorite', shopController.postDeleteFavorite);

module.exports = router;