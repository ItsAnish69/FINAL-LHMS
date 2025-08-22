const mongoose = require('mongoose');

const book = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true, required: true },
  quantity: { type: Number, required: true },
  available: { type: Number, required: true },
  paragraph: { type: String, default: '' },
  cover: {
    type: String,
    default: 'https://picsum.photos/200/300',
  }
});

module.exports = mongoose.model('Book', book);