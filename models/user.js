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

    password: {
        type: String,
        required: true
    },
    securityPhrase: {
        type: String,
        required: true
    },
    passwordHint: {
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

userSchema.methods.createUser = function(user) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.password = user.password;
    this.securityPhrase = user.securityPhrase;
    this.passwordHint = user.passwordHint;
    this.favorites = [];
    return this.save();
};

userSchema.methods.editUser = function(user) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    return this.save();
};

userSchema.methods.editNames = function(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    return this.save();
};

module.exports = mongoose.model('User', userSchema);