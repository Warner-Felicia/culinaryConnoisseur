const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/addRecipe', adminController.postAddRecipe);

router.get('/editRecipe/:recipeId', adminController.getEditRecipe);

router.post('/editRecipe', adminController.postEditRecipe);

router.post('/deleteProduct', adminController.postDeleteProduct);

module.exports = router;