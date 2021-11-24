const { validationResult } = require('express-validator/check');
const Recipe = require('../models/recipe');

exports.getEditRecipe = (req, res, next) => {
  const recipeId = req.params.recipeId;
  Recipe.findById(recipeId)
    .then(recipe => {
      if (!recipe) {
        return res.redirect('/');
      }

      res.render('edit-recipe', {
        title: 'Edit Product',
        path: '/admin/edit-recipe',
        editing: editMode,
        recipe: recipe,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
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
    .then(recipe => {
      res.render('recipes/recipe-detail', {
        recipe: recipe,
        title: recipe.title,
        path: '/recipes'
      });
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
      res.render('recipes/recipe-detail', {
        recipe: recipe,
        title: recipe.title,
        path: '/recipes'
      });
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