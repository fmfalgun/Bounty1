const express = require('express');
const router = express.Router();
const Term = require('../models/Terms');

// Create a new term
router.post('/', async (req, res) => {
    try {
        const term = new Term(req.body);
        const savedTerm = await term.save();
        res.status(201).json(savedTerm);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all terms
router.get('/', async (req, res) => {
    try {
        const terms = await Term.find().populate('client', 'name startupName');
        res.json(terms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a term
router.put('/:id', async (req, res) => {
    try {
        const updatedTerm = await Term.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTerm);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a term
router.delete('/:id', async (req, res) => {
    try {
        await Term.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

