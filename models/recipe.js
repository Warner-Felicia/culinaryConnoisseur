const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [{
            quantity: String,
            name: String
        }],
        required: true
    },
    directions: {
        type: String,
        required: true
    },
    time: {
        type: String,
    },
    servings: {
        type: String,
    },
    imageUrl: {
        type: String
    },
    note: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    },
    userId: {
        type: String,
        required: true
        //**TO-DO replace type string with code below */
        // type: Schema.Types.ObjectId,
        // ref: 'User'
    }

});

module.exports = mongoose.model('Recipe', recipeSchema);