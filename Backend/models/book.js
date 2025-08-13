const mongoose = require('mongoose');

const book = new mongoose.Schema({
    title: {type: String, required:true},
    author: {type: String, required: true},
    isbn: {type: String, required: true, unique: true, selected: false},
    quantity: {type: Number, required: true},
    available: {type: Number, required: true}
},
    {timestamps: true})

module.exports = mongoose.model("Book", book);