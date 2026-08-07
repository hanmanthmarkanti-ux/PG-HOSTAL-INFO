const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const createTables = require('./config/schema');
const { auth } = require('./middleware/auth');

const authRoutes = require('./routes/auth');
const pgRoutes = require('./routes/pgs');
const inquiryRoutes = require('./routes/inquiries');
const favoriteRoutes = require('./routes/favorites');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '..')));

app.use(auth);

app.use('/api/auth', authRoutes);
app.use('/api/pgs', pgRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/favorites', favoriteRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.includes('.')) {
        res.sendFile(path.join(__dirname, '..', 'index.html'));
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || 'Something went wrong!' });
});

createTables();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API: http://localhost:${PORT}/api`);
    console.log(`Frontend: http://localhost:${PORT}`);
});

module.exports = app;
