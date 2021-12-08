const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    directions: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    },
    notes: {
        type: String
    },
    tags: {
        type: [String]
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

module.exports = mongoose.model('Recipe', recipeSchema);