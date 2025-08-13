const mongoose = require('mongoose');

const librarianAcess = new mongoose.Schema({
    id:{type:String, required:true},
    token :{type:String, required:true, select: false}
},
    {timestamps: true });
    
module.exports = mongoose.model("Librarian", librarianAcess);