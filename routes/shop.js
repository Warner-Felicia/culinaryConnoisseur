const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.post('/', shopController.postIndex);


router.post('/addFavorite', shopController.postAddFavorite);

router.post('/deleteFavorite', shopController.postDeleteFavorite);

router.get('/recipes', shopController.getRecipes);

router.get('/recipe/:recipeId', shopController.getRecipe);

router.get('/favorites', shopController.getFavorites);

router.get('/UserRecipes', shopController.getUserRecipes);

module.exports = router