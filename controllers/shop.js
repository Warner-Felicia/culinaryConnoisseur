const User = require('../models/user');

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
    .catch(err => console.log(err));
};


