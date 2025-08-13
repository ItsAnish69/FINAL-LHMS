const mongoose = require('mongoose');

const borrow = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book"},
    borrowDate: {type: Date, default: Date.now},
    returnDate: { type: Date},
},
    {timestamps: true });
    
module.exports = mongoose.model("Borrow", borrow);