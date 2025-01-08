// routes/applications.js
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// Create application
router.post('/', async (req, res) => {
    try {
        const application = new Application(req.body);
        const savedApplication = await application.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get dev's applications
router.get('/:devId', async (req, res) => {
    try {
        const applications = await Application.find({ devId: req.params.devId })
            .populate('clientId')
            .sort('-createdAt');
        res.json(applications);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update application status
router.put('/:id', async (req, res) => {
    try {
        const updatedApplication = await Application.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(updatedApplication);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
