const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { initDb } = require('./config/db');
const createTables = require('./config/schema');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '..')));

const { auth } = require('./middleware/auth');
app.use(auth);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/pgs', require('./routes/pgs'));
app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/favorites', require('./routes/favorites'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.includes('.')) {
        res.sendFile(path.join(__dirname, '..', 'index.html'));
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

(async () => {
    await initDb();
    await createTables();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
