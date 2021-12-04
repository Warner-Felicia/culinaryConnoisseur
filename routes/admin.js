const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-recipe', adminController.getAddRecipe);

router.post('/add-recipe', adminController.postAddRecipe);

router.get('/edit-recipe/:recipeId', adminController.getEditRecipe);

router.post('/edit-recipe', adminController.postEditRecipe);

router.post('/delete-recipe', adminController.postDeleteRecipe);

module.exports = router;