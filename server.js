const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const { initDb, getDb, saveDb } = require('./config/db');
const createTables = require('./config/schema');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

app.use('/uploads', express.static(uploadsDir));
app.use(express.static(__dirname));

const { auth } = require('./middleware/auth');
app.use(auth);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/pgs', require('./routes/pgs'));
app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/favorites', require('./routes/favorites'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.includes('.')) {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

async function autoSeed() {
    try {
        const db = getDb();
        const existing = db.exec("SELECT COUNT(*) as count FROM pgs");
        if (existing.length && existing[0].values[0][0] > 0) {
            console.log('Database already seeded');
            return;
        }
        console.log('First run - seeding database...');
        const seed = require('./seed');
        await seed();
    } catch(e) {
        console.error('Auto-seed skipped:', e.message);
    }
}

(async () => {
    try {
        await initDb();
        await createTables();
        console.log('Database ready');
        await autoSeed();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
})();
