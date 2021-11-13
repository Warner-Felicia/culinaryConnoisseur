const Recipe = require('../models/recipe');

exports.getIndex = (req, res, next) => {
    res.render('home', {
        pageTitle: 'Culinary Connoisseur Home',
        path: '/'
    });
};

exports.postIndex = (req, res, next) => {
    res.render('home', {
        pageTitle: 'Culinary Connoisseur Home',
        path: '/'
    });
};

exports.getRecipes = (req, res, next) => {
    Recipe.find()
        .then(recipes => {
            //**TO-DO what to one once all recipes have been returned from the database */
        })
        .catch(err => console.log(err));
};

exports.getRecipe = (req,res, next) => {
    const recipeId = req.params.recipeId;
    Recipe.findById(recipeId)
    .then(recipe => {
        //**TO-DO what to do when recipe is returned*/
    })
    .catch(err => console.log(err));
};

