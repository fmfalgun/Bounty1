const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const bcrypt = require('bcrypt');

// Create a new client
router.post('/', async (req, res) => {
    try {
        const client = new Client(req.body);
        const savedClient = await client.save();
        res.status(201).json(savedClient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a client
router.put('/:id', async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedClient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a client
router.delete('/:id', async (req, res) => {
    try {
        await Client.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Signup route for clients
router.post('/', async (req, res) => {
    try {
        // Validate required fields
        const requiredFields = ['name', 'whatsapp', 'linkedin', 'gmail', 'startupName', 
                              'startupLocation', 'startupIdea', 'salary', 'equity', 'pass'];
        
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `${field} is required` });
            }
        }

        // Check if user already exists
        const existingClient = await Client.findOne({ gmail: req.body.gmail });
        if (existingClient) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.pass, 10);

        // Create new client with hashed password
        const client = new Client({
            ...req.body,
            pass: hashedPassword
        });

        const savedClient = await client.save();
        
        // Remove password from response
        const clientResponse = savedClient.toObject();
        delete clientResponse.pass;
        
        res.status(201).json(clientResponse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login route for clients
router.post('/login', async (req, res) => {
    try {
        const client = await Client.findOne({ gmail: req.body.email });
        if (!client) {
            return res.status(400).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(req.body.password, client.pass);
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

