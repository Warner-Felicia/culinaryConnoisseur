const Recipe = require('../models/recipe');

exports.getEditRecipe = (req, res, next) => {
    const recipeId = req.params.recipeId;
    Recipe.findById(recipeId)
    .then(recipe => {
        //**TO-DO use the returned recipe */
    })
    .catch(err => console.log(err));

};

exports.postEditRecipe = (req, res, next) => {
    const recipeId = req.body.recipeId;
    const updatedTitle = req.body.title;
    const updatedIngredientQuantities = req.body.ingredientQuantity;
    const updatedIngredientNames = req.body.ingredientName;
    const updatedDirections = req.body.directions;
    const updatedTime = req.body.time;
    const updatedServings = req.body.servings;
    //**TO-DO replace imageUrl with file path */
    const updatedImageUrl = req.body.imageUrl;
    const updatedNote = req.body.note;
    const updatedTags = req.body.tags;
    //**TO-DO replace userId with session user id */
    const updatedIngredients = [];
    const updatedTagsArray = updatedTags.split(' ');

     //colating ingredientQuantities and ingredientNames
     for (let i = 0; i < updatedIngredientQuantities.length; i++) {
        const ingredient = {
            quantity: updatedIngredientQuantities[i],
            name: updatedIngredientNames[i]
        };
        updatedIngredients.push(ingredient);
    }

    Recipe.findById(recipeId)
    .then(recipe => {
        recipe.title = updatedTitle;
        recipe.ingredients = updatedIngredients;
        recipe.directions = updatedDirections;
        recipe.time = updatedTime;
        recipe.servings = updatedServings;
        recipe.imageUrl = updatedImageUrl;
        recipe.note = updatedNote;
        recipe.tags = updatedTagsArray;

        return recipe.save();
    })
    .then(result => {
        //**TO-DO decide where to go after updating a product */
        res.redirect('/');
    })
    .catch(err => console.log(err));
};

exports.postAddRecipe = (req, res, next) => {
    const title = req.body.title;
    const ingredientQuantities = req.body.ingredientQuantity;
    const ingredientNames = req.body.ingredientName;
    const directions = req.body.directions;
    const time = req.body.time;
    const servings = req.body.servings;
    //**TO-DO replace imageUrl with file path */
    const imageUrl = req.body.imageUrl;
    const note = req.body.note;
    const tags = req.body.tags;
    //**TO-DO replace userId with session user id */
    const userId = req.body.userId;
    const ingredients = [];
    const tagsArray = tags.split(' ');

    //colating ingredientQuantities and ingredientNames
    for (let i = 0; i < ingredientQuantities.length; i++) {
        const ingredient = {
            quantity: ingredientQuantities[i],
            name: ingredientNames[i]
        };
        ingredients.push(ingredient);
    }

    const recipe = new Recipe({
        title: title,
        ingredients: ingredients,
        directions: directions,
        time: time,
        servings: servings,
        imageUrl: imageUrl,
        note: note,
        tags: tagsArray,
        userId: userId
    });
    recipe.save()
        .then(result => {
            //**TO-DO decide where we really want this to go */
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

module.exports.postDeleteProduct = (req, res, nex) => {
    const recipeId = req.body.recipeId;
    Recipe.findByIdAndRemove(recipeId)
    .then(() => {
        //**TO-DO decide where we want this to go */
        res.redirect('/');
    })
    .catch(err => console.log(err));

};

