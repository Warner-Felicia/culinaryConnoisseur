const Recipe = require('.../models/recipe');

exports.getRecipe = (req, res, next) => {
  Recipe.findById(req.params.recipeId)
    .then(recipe => {
      res.render('recipes/recipe-detail', {
        recipe: recipe,
        title: recipe.title,
        path: '/recipes'
      });
    })
    .catch(e => {
      const error = new Error(e);
      error.httpStatusCode = 500;
      return next(error);
    });
};