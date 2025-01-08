const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: String,
    whatsapp: String,
    linkedin: String,
    gmail: String,
    startupName: String,
    startupLocation: String,
    startupIdea: String,
    salary: Number,
    equity: Number,
});

module.exports = mongoose.model('Client', ClientSchema);

