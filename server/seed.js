const { getDb, saveDb } = require('./config/db');
const createTables = require('./config/schema');

const allPGHostels = require('../pgdata').allPGHostels || require('../pgdata');

async function seed() {
    await getDb();
    await createTables();
    const db = getDb();
    console.log('Seeding data...');

    const pgEntries = typeof allPGHostels === 'object' && !Array.isArray(allPGHostels)
        ? Object.entries(allPGHostels) : [];

    let count = 0;

    for (const [slug, pg] of pgEntries) {
        try {
            const pgSlug = slug || pg.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const cleanPrice = (val) => { if (!val) return 0; if (typeof val === 'number') return val; return parseInt(String(val).replace(/[₹,\s]/g, '')) || 0; };
            const cleanGender = (g) => { if (!g) return 'unisex'; const l = g.toLowerCase(); if (l.includes('male') && !l.includes('female')) return 'male'; if (l.includes('female')) return 'female'; return 'unisex'; };

            db.run(
                `INSERT OR IGNORE INTO pgs (slug, name, city, area, full_address, lat, lng, gender, type,
                price_min, price_max, deposit, lock_in, notice_period, food_type, wifi_speed,
                phone, whatsapp, email, description, rating, total_reviews, is_available)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [pgSlug, pg.name, pg.city || 'Hyderabad', pg.area || '',
                pg.full_address || pg.area + ', ' + (pg.city || 'Hyderabad'),
                pg.lat || 0, pg.lng || 0, cleanGender(pg.gender), pg.type || 'standard',
                pg.priceMin || cleanPrice(pg.priceMin), pg.priceMax || cleanPrice(pg.priceMax) || pg.priceMin || cleanPrice(pg.priceMin),
                cleanPrice(pg.deposit), parseInt(String(pg.lockIn || '1').replace(/[^\d]/g, '')) || 1,
                parseInt(String(pg.noticePeriod || '30').replace(/[^\d]/g, '')) || 30,
                pg.foodType || 'veg', pg.wifiSpeed || '',
                pg.phone || (pg.contact && pg.contact.phone) || '',
                pg.whatsapp || (pg.contact && pg.contact.whatsapp) || '',
                pg.email || (pg.contact && pg.contact.email) || '',
                pg.description || pg.name + ' in ' + (pg.area || ''),
                pg.rating || 0, pg.totalReviews || 0, 1]
            );

            const lastId = db.exec("SELECT last_insert_rowid() as id");
            const pgId = lastId.length ? lastId[0].values[0][0] : 0;
            if (!pgId) continue;

            if (pg.amenities && pg.amenities.length) pg.amenities.forEach(a => db.run('INSERT OR IGNORE INTO pg_amenities (pg_id, amenity) VALUES (?, ?)', [pgId, a]));
            if (pg.photos && pg.photos.length) pg.photos.forEach((url, i) => db.run('INSERT OR IGNORE INTO pg_photos (pg_id, photo_url, is_primary) VALUES (?, ?, ?)', [pgId, url, i === 0 ? 1 : 0]));
            if (pg.roomPrices && typeof pg.roomPrices === 'object') Object.entries(pg.roomPrices).forEach(([rt, pr]) => { const p = cleanPrice(pr); if (p) db.run('INSERT OR IGNORE INTO room_prices (pg_id, room_type, price) VALUES (?, ?, ?)', [pgId, rt, p]); });
            if (pg.foodMenu && typeof pg.foodMenu === 'object') Object.entries(pg.foodMenu).forEach(([mt, items]) => { if (items && items.length) db.run('INSERT OR IGNORE INTO food_menu (pg_id, meal_type, items, timing) VALUES (?, ?, ?, ?)', [pgId, mt, Array.isArray(items) ? items.join(', ') : items, '']); });
            if (pg.reviews && pg.reviews.length) pg.reviews.forEach(r => db.run('INSERT OR IGNORE INTO reviews (pg_id, reviewer_name, rating, comment) VALUES (?, ?, ?, ?)', [pgId, r.name, r.rating, r.comment]));
            if (pg.rules && pg.rules.length) pg.rules.forEach(rule => db.run('INSERT OR IGNORE INTO house_rules (pg_id, rule) VALUES (?, ?)', [pgId, rule]));

            count++;
        } catch (e) {}
    }

    saveDb();
    console.log(`Seeded ${count} PGs`);
}

seed();
