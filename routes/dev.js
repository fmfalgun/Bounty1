const express = require('express');
const router = express.Router();
const Dev = require('../models/Dev');

// Create a new dev
router.post('/', async (req, res) => {
    try {
        const dev = new Dev(req.body);
        const savedDev = await dev.save();
        res.status(201).json(savedDev);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all devs
router.get('/', async (req, res) => {
    try {
        const devs = await Dev.find();
        res.json(devs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a dev
router.put('/:id', async (req, res) => {
    try {
        const updatedDev = await Dev.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDev);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a dev
router.delete('/:id', async (req, res) => {
    try {
        await Dev.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

