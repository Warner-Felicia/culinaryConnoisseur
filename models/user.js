const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    favorites: {
        type: [{recipeId: String}]
    } 


});

userSchema.methods.addFavorite = function(recipeId) {
    this.favorites.push({ 'recipeId': recipeId });
    return this.save();
};

userSchema.methods.deleteFavorite = function(recipeId) {
    updatedFavs = this.favorites.filter(recipe => {
        return recipe.recipeId !== recipeId;
    });
    this.favorites = updatedFavs;
    return this.save();
};

module.exports = mongoose.model('User', userSchema);