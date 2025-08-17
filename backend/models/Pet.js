
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pname: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number },
    type: { type: String, required: true },
    breed: { type: String },
    history: { type: String },
    owner: { type: String },
});

module.exports = mongoose.model('Pet', petSchema);
