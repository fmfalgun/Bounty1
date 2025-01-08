const express = require('express');
const router = express.Router();
const Demand = require('../models/Demand');

// Create a new demand
router.post('/', async (req, res) => {
    try {
        const demand = new Demand(req.body);
        const savedDemand = await demand.save();
        res.status(201).json(savedDemand);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all demands
router.get('/', async (req, res) => {
    try {
        const demands = await Demand.find().populate('clients', 'name startupName');
        res.json(demands);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a demand
router.put('/:id', async (req, res) => {
    try {
        const updatedDemand = await Demand.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDemand);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a demand
router.delete('/:id', async (req, res) => {
    try {
        await Demand.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

