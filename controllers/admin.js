const { validationResult } = require('express-validator');

const Recipe = require('../models/recipe');

exports.getEditRecipe = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }

  if (!req.session.isLoggedIn) {
    res.redirect('/signInUp');
  }
  const recipeId = req.params.recipeId;
  Recipe.findById(recipeId)
    .then(recipe => {
      if (!recipe) {
        return res.redirect('/');
      }

      res.render('admin/edit-recipe', {
        title: 'Edit Recipe',
        path: 'edit-recipe',
        editing: editMode,
        recipe: recipe,
        userId: req.session.userId,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(err => console.log(err));
};

exports.postEditRecipe = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.redirect('/signInUp');
  }
  const recipeId = req.body.recipeId;
  const updatedTitle = req.body.title;
  const updatedDirections = req.body.directions;
  const updatedTime = req.body.time;
  const updatedServings = req.body.servings;
  //**TO-DO replace imageUrl with file path */
  const updatedImageUrl = req.body.imageUrl;
  const updatedNotes = req.body.notes;
  const updatedTags = req.body.tags;
  //**TO-DO replace userId with session user id */
  const updatedIngredients = req.body.ingredients;
  const updatedTagsArray = updatedTags.split(', ');

  Recipe.findById(recipeId)
    .then(recipe => {
      recipe.title = updatedTitle;
      recipe.ingredients = updatedIngredients;
      recipe.directions = updatedDirections;
      recipe.time = updatedTime;
      recipe.servings = updatedServings;
      recipe.imageUrl = updatedImageUrl;
      recipe.notes = updatedNotes;
      recipe.tags = updatedTagsArray;

      return recipe.save();
    })
    .then(() => {
      res.redirect('/UserRecipes');
    })
    .catch(err => console.log(err));
};

exports.postAddRecipe = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/signInUp');
  }
  const errors = validationResult(req);
  const title = req.body.title;
  const ingredients = req.body.ingredients;
  const directions = req.body.directions;
  const time = req.body.time;
  const servings = req.body.servings;
  //**TO-DO replace imageUrl with file path */
  const imageUrl = req.body.imageUrl;
  const notes = req.body.notes;
  const tags = req.body.tags;
  const userId = req.body.userId;
  const tagsArray = tags ? tags.split(', ') : undefined;
  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-recipe', {
      title: 'Add a Recipe',
      path: '/admin/add-recipe',
      editing: false,
      hasError: true,
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
      userId: userId,
      recipe: {
        title: title,
        ingredients: ingredients,
        directions: directions,
        time: time,
        servings: servings,
        imageUrl: imageUrl,
        notes: notes,
        tags: tags
      }
    });
  }

  const recipe = new Recipe({
    title: title,
    ingredients: ingredients,
    directions: directions,
    time: time,
    servings: servings,
    imageUrl: imageUrl,
    notes: notes,
    tags: tagsArray,
    userId: userId
  });
  recipe.save()
    .then(result => {
      console.log("Successfully saved recipe!");
      res.render('shop/recipe-detail', {
        recipe: recipe,
        title: recipe.title,
        path: '/recipes',
      });
    })
    .catch(err => console.log(err));
};

module.exports.postDeleteRecipe = (req, res, nex) => {
  console.log('here');
  if (!req.session.isLoggedIn) {
    res.redirect('/signInUp');
  }
  const recipeId = req.body.recipeId;
  Recipe.deleteOne({ _id: recipeId })
    .then(() => {
      res.redirect('/UserRecipes');
    })
    .catch(err => console.log(err));

};

exports.getAddRecipe = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/signInUp');
  }
  const userId = req.session.userId;
  res.render('admin/edit-recipe', {
    title: 'Add a Recipe',
    path: '/admin/add-recipe',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: [],
    userId: userId
  });
};