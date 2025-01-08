const mongoose = require('mongoose');

const DemandSchema = new mongoose.Schema({
    skill: String,
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }]
});

module.exports = mongoose.model('Demand', DemandSchema);

