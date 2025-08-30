const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    BookTitle: { type: String, required: true },
    issueDate: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Record', RecordSchema);