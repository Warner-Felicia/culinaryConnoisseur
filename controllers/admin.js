const { validationResult } = require('express-validator/check');
const Recipe = require('../models/recipe');

exports.getAddRecipe = (req, res, next) => {
  res.render('admin/edit-recipe', {
    title: 'Add a Recipe',
    path: '/admin/add-recipe',
    editing: false,
    hadError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddRecipe = (req, res, next) => {
  // const title = req.body.title;
  // const description = req.body.description;
  // const rating = req.body.rating;
  // const price = req.body.price;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());

    return res.status(422).render('admin/edit-recipe', {
      title: 'Add Recipe',
      path: '/admin/add-recipe',
      editing: false,
      hasError: true,
      recipe: {
        title: title,
        // description: description,
        // rating: rating,
        // price: price
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const recipe = new Recipe(
    undefined,
    title,
    description,
    rating,
    price,
    req.user
  );

  recipe
    .save()
    .then(result => {
      console.log('Created Recipe');
      res.redirect('/admin/recipies');
    })
    .catch(e => {
      const error = new Error(e);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditRecipe = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/');
  }

  const recipeId = req.params.recipeId;

  Recipe.findById(recipeId)
    .then(recipe => {
      if (!recipe) {
        return res.redirect('/');
      }
      res.render('admin/edit-recipe', {
        title: 'Edit Recipe',
        path: '/admin/edit-recipe',
        editing: editMode,
        recipe: recipe,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(e => {
      const error = new Error(e);
      error.httpStatusCode = 500;
      return next(error);
    });
}

exports.postEditRecipe = (req, res, next) => {
  const recipeId = req.body.recipeId;
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const updatedRating = req.body.rating;
  const updatedPrice = req.body.price;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-recipe', {
      title: 'Edit Recipe',
      path: '/admin/edit-recipe',
      editing: true,
      hasError: true,
      recipe: {
        title: updatedTitle,
        description: updatedDescription,
        rating: updatedRating,
        price: updatedPrice,
        _id: recipeId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Recipe.findById(recipeId)
    .then(recipe => {
      if (recipe.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }

      recipe.title = updatedTitle;
      recipe.description = updatedDescription;
      recipe.rating = updatedRating;
      recipe.price = updatedPrice;

      return recipe.save().then(result => {
        console.log('Updated Recipe');
        res.redirect('/admin/recipies');
      });
    })
    .catch(e => {
      const error = new Error(e);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteRecipe = (req, res, next) => {
  Recipe.deleteOne({ _id: req.body.recipeId, userId: req.user._id })
    .then(() => {
      console.log('Deleted Recipe');
      res.redirect('/admin/recipies');
    })
    .catch(e => {
      const error = new Error(e);
      error.httpStatusCode = 500;
      return next(error);
    });
};