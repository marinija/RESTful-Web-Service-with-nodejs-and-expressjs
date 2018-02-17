const moongose = require('mongoose'),
    Schema = moongose.Schema;

let bookModel = new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    genre: {type: String},
    read: {type: Boolean, default: false}
});
module.exports = moongose.model('Book', bookModel);