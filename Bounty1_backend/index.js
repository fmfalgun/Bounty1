const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize app and middleware
const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/startupDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Database connection error:', err));

// Import Routes
const clientRoutes = require('./routes/client');
const devRoutes = require('./routes/dev');
const termsRoutes = require('./routes/terms');
const demandsRoutes = require('./routes/demands');
const applicationRoutes = require('./routes/applications');

// Use Routes
app.use('/api/clients', clientRoutes);
app.use('/api/devs', devRoutes);
app.use('/api/terms', termsRoutes);
app.use('/api/demands', demandsRoutes);
app.use('/api/applications',applicationRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

