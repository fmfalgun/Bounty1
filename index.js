const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize app and middleware
const app = express();
app.use(bodyParser.json());

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

// Use Routes
app.use('/api/client', clientRoutes);
app.use('/api/dev', devRoutes);
app.use('/api/terms', termsRoutes);
app.use('/api/demands', demandsRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

