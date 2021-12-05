const User = require('../models/user');

const Recipe = require('../models/recipe');

const mongoose = require('mongoose');


exports.getIndex = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/signInUp');
    }
    const user = req.session.isLoggedIn;
    res.render('shop/home', {
        pageTitle: 'Culinary Connoisseur Home',
        path: '/',
        user: user
    });

};

exports.postAddFavorite = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/signInUp');
      }
    const recipeId = req.body.recipeId;
    const userId = req.session.userId;
    User.findById(userId)
        .then(user => {
            user.addFavorite(recipeId);
            res.redirect('/favorites');
        })
        .catch(err => console.log(err));

};

exports.postDeleteFavorite = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/signInUp');
      }
    const recipeId = req.body.recipeId;
    const userId = req.session.userId;
    User.findById(userId)
        .then(user => {
            user.deleteFavorite(recipeId);
        });
};

exports.getRecipes = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/signInUp');
    }
    const user = req.session.isLoggedIn;
    Recipe.find()
        .then(recipes => {
            res.render('shop/recipeList', {
                pageTitle: 'Recipes',
                path: '/recipe',
                recipes: recipes,
                user: user
            });
        })
        .catch(err => console.log(err));
};

exports.getRecipe = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/signInUp');
    }
    const recipeId = req.params.recipeId;
    const user = req.session.isLoggedIn;
    Recipe.findById(recipeId)
        .then(recipe => {
            if (!recipe) {
                //**TO-DO route to error handling */
            }
            res.render('shop/recipe-detail', {
                pageTitle: recipe.title,
                path: '/recipe-details',
                recipe: recipe,
                user: user
            });

        })

        .catch(err => console.log(err));
};

exports.getFavorites = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/signInUp');
      }
    const userId = req.session.userId;
    const recipes = [];
    User.findById(userId).populate('favorites')
        .then(user => {
            const favorites = user.favorites;
            return favorites;
        })
        .then(favorites => {
            res.render('shop/userfavorites', {
                pageTitle: "favorites",
                path: '/userfavorites',
                recipes: favorites
            });

        })
        .catch(err => console.log(err));
};
exports.getUserRecipes = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/signInUp');
      }
    const userId = req.session.userId;
    Recipe.find({
            userId: userId
        })
        .then(recipes => {
            res.render('shop/userrecipes', {
                pageTitle: "userrecipes",
                path: '/userrecipes',
                recipes: recipes
            });


        }).catch(err => console.log(err));
};