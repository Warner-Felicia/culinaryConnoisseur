const User = require('../models/user');

const Recipe = require('../models/recipe');


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

exports.postIndex = (req, res, next) => {
    res.render('shop/home', {
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

exports.getRecipe = (req,res, next) => {
    if (!req.session.isLoggedIn) {
        res.redirect('/signInUp');
    }
    const recipeId = req.params.recipeId;
    const user = req.session.isLoggedIn;
    Recipe.findById(recipeId)
    .then(recipe => {
        if(!recipe) {
            //**TO-DO route to error handling */
        }
        res.render('shop/recipeDetails', {
            pageTitle: recipe.title,
            path: '/recipeDetails',
            recipe: recipe,
            user: user
        });
    
    })

    .catch(err => console.log(err));
}
exports.getFavorites = (req,res, next) => {
    console.log(req.session.userId)
    const userId = req.session.userId;
    User.findById(userId).populate("favorites")
    .then(user => {
       return favorites = user.favorites
        
    })
    .then(favorites => {
        console.log(favorites)
        res.render('shop/userfavorites', {
        pageTitle: "favorites",
        path: '/userfavorites',
        recipes: favorites
    });

})
    .catch(err => console.log(err));
}
;
exports.getUserRecipes = (req,res, next) => {
    console.log(req.session.userId)
    const userId = req.session.userId;
    Recipe.find({userId:userId})
    .then(recipes => {
        res.render('shop/userrecipes', {
            pageTitle: "userrecipes",
            path: '/userrecipes',
            recipes: recipes
        });
    
        
    }).catch(err => console.log(err));}