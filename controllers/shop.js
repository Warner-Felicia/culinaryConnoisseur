
const User = require('../models/user');

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


exports.postAddFavorite = (req, res, next) => {
    const recipeId = req.body.recipeId;
    //**TO-DO replace dummy user with session user */
    User.findById('618dceb783540affde17a5a9')
    .then(user => {
        user.addFavorite(recipeId);
    })
    .catch(err => console.log(err));
    
};

exports.postDeleteFavorite = (req, res, next) => {
    const recipeId = req.body.recipeId;
    //**TO-DO replace dummy user with session user */
    User.findById('618dceb783540affde17a5a9')
    .then(user => {
        user.deleteFavorite(recipeId);
    });
};

exports.getRecipes = (req, res, next) => {
    Recipe.find()
        .then(recipes => {
            res.render('shop/recipeList', {
                pageTitle: 'Recipes',
                path: '/recipe',
                recipes: recipes
            });
        })
        .catch(err => console.log(err));
};

exports.getRecipe = (req,res, next) => {
    const recipeId = req.params.recipeId;
    Recipe.findById(recipeId)
    .then(recipe => {
        if(!recipe) {
            //**TO-DO route to error handling */
        }
        res.render('shop/recipeDetails', {
            pageTitle: recipe.title,
            path: '/recipeDetails',
            recipe: recipe
        });

    })
    .catch(err => console.log(err));
};

