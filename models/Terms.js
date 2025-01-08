const mongoose = require('mongoose');

const TermsSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    responsibility: String,
});

module.exports = mongoose.model('Term', TermsSchema);

