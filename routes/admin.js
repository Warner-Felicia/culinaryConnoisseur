const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');
const { body } = require('express-validator');

router.get('/add-recipe', adminController.getAddRecipe);

router.post('/add-recipe', 
    [
        body('title')
            .isString()
            .notEmpty()
            .withMessage('Title is required')
            .trim(),
        body('imageUrl')
            .if(body('imageUrl').notEmpty())
            .isURL()
            .withMessage('Must be a valid URL')
            .trim(),
        body('time')
            .isNumeric()
            .withMessage('Time must be a number')
            .trim(),
        body('servings')
            .isNumeric()
            .withMessage('Servings must be a number')
            .trim(),
        body('ingredients')
            .isString()
            .notEmpty()
            .withMessage('Ingredients are required to add a recipe')
            .trim(),
        body('directions')
            .isString()
            .notEmpty()
            .withMessage('Directions are required to add a recipe')
            .trim(),
        body('notes')
            .optional()
            .isString()
            .withMessage('Invalid notes input')
            .trim(),            
        body('tags')
            .optional()
            .isString()
            .withMessage('Invalid tags input')
            .trim()
    ],
    adminController.postAddRecipe);

router.get('/edit-recipe/:recipeId', adminController.getEditRecipe);

router.post('/edit-recipe',
    [
        body('title')
            .isString()
            .notEmpty()
            .withMessage('Title is required')
            .trim(),
        body('imageUrl')
            .if(body('imageUrl').notEmpty())
            .isURL()
            .withMessage('Must be a valid URL')
            .trim(),
        body('time')
            .isNumeric()
            .withMessage('Time must be a number')
            .trim(),
        body('servings')
            .isNumeric()
            .withMessage('Servings must be a number')
            .trim(),
        body('ingredients')
            .isString()
            .notEmpty()
            .withMessage('Ingredients are required to add a recipe')
            .trim(),
        body('directions')
            .isString()
            .notEmpty()
            .withMessage('Directions are required to add a recipe')
            .trim(),
        body('notes')
            .optional()
            .isString()
            .withMessage('Invalid notes input')
            .trim(),            
        body('tags')
            .optional()
            .isString()
            .withMessage('Invalid tags input')
            .trim()
    ],
    adminController.postEditRecipe);

router.post('/delete-recipe', adminController.postDeleteRecipe);

module.exports = router;