
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
    })
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

