const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.post('/', shopController.postIndex);

router.get('/recipes', shopController.getRecipes);

router.get('/recipe/:recipeId', shopController.getRecipe);

module.exports = router;