const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'pg_hostel.db');
let db = null;

async function initDb() {
    const SQL = await initSqlJs();
    if (fs.existsSync(dbPath)) {
        const buffer = fs.readFileSync(dbPath);
        db = new SQL.Database(buffer);
    } else {
        db = new SQL.Database();
    }
    db.run('PRAGMA journal_mode = WAL');
    db.run('PRAGMA foreign_keys = ON');
    return db;
}

function getDb() {
    if (!db) throw new Error('Database not initialized');
    return db;
}

function saveDb() {
    if (db) {
        const data = db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(dbPath, buffer);
    }
}

setInterval(saveDb, 10000);
process.on('exit', saveDb);
process.on('SIGINT', () => { saveDb(); process.exit(); });
process.on('SIGTERM', () => { saveDb(); process.exit(); });

module.exports = { initDb, getDb, saveDb };
