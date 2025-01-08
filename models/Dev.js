const mongoose = require('mongoose');

const DevSchema = new mongoose.Schema({
    name: String,
    whatsapp: String,
    linkedin: String,
    gmail: String,
    demands: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Demand' }]
});

module.exports = mongoose.model('Dev', DevSchema);

