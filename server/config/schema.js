const { getDb, saveDb } = require('./db');

async function createTables() {
    const db = await getDb();
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'user',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS pgs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            city TEXT NOT NULL,
            area TEXT NOT NULL,
            full_address TEXT,
            lat REAL,
            lng REAL,
            gender TEXT DEFAULT 'unisex',
            type TEXT DEFAULT 'standard',
            price_min INTEGER,
            price_max INTEGER,
            deposit INTEGER DEFAULT 0,
            lock_in INTEGER DEFAULT 1,
            notice_period INTEGER DEFAULT 30,
            food_type TEXT DEFAULT 'veg',
            wifi_speed TEXT,
            rating REAL DEFAULT 0,
            total_reviews INTEGER DEFAULT 0,
            phone TEXT,
            whatsapp TEXT,
            email TEXT,
            description TEXT,
            is_available INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    db.run(`CREATE TABLE IF NOT EXISTS pg_amenities (id INTEGER PRIMARY KEY AUTOINCREMENT, pg_id INTEGER NOT NULL, amenity TEXT NOT NULL, FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE)`);
    db.run(`CREATE TABLE IF NOT EXISTS pg_photos (id INTEGER PRIMARY KEY AUTOINCREMENT, pg_id INTEGER NOT NULL, photo_url TEXT NOT NULL, is_primary INTEGER DEFAULT 0, FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE)`);
    db.run(`CREATE TABLE IF NOT EXISTS room_prices (id INTEGER PRIMARY KEY AUTOINCREMENT, pg_id INTEGER NOT NULL, room_type TEXT NOT NULL, price INTEGER NOT NULL, FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE)`);
    db.run(`CREATE TABLE IF NOT EXISTS food_menu (id INTEGER PRIMARY KEY AUTOINCREMENT, pg_id INTEGER NOT NULL, meal_type TEXT NOT NULL, items TEXT NOT NULL, timing TEXT, FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE)`);
    db.run(`CREATE TABLE IF NOT EXISTS reviews (id INTEGER PRIMARY KEY AUTOINCREMENT, pg_id INTEGER NOT NULL, user_id INTEGER, reviewer_name TEXT NOT NULL, rating INTEGER NOT NULL, comment TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL)`);
    db.run(`CREATE TABLE IF NOT EXISTS inquiries (id INTEGER PRIMARY KEY AUTOINCREMENT, pg_id INTEGER NOT NULL, user_id INTEGER, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL, message TEXT, status TEXT DEFAULT 'pending', created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL)`);
    db.run(`CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, pg_id INTEGER NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE, UNIQUE(user_id, pg_id))`);
    db.run(`CREATE TABLE IF NOT EXISTS house_rules (id INTEGER PRIMARY KEY AUTOINCREMENT, pg_id INTEGER NOT NULL, rule TEXT NOT NULL, FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE)`);
    saveDb();
    console.log('Tables created');
}

module.exports = createTables;
