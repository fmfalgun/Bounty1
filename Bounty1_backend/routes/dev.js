const express = require('express');
const router = express.Router();
const Dev = require('../models/Dev');
const bcrypt = require('bcrypt');

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

// Signup route for devs
router.post('/', async (req, res) => {
    try {
        // Check if user already exists
        const existingDev = await Dev.findOne({ gmail: req.body.gmail });
        if (existingDev) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.pass, 10);

        // Create new dev with hashed password
        const dev = new Dev({
            ...req.body,
            pass: hashedPassword
        });

        const savedDev = await dev.save();
        
        // Remove password from response
        const devResponse = savedDev.toObject();
        delete devResponse.pass;
        
        res.status(201).json(devResponse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login route for devs
router.post('/login', async (req, res) => {
    try {
        const dev = await Dev.findOne({ gmail: req.body.email });
        if (!dev) {
            return res.status(400).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(req.body.password, dev.pass);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // TODO: Generate JWT token here
        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;

