const db = require('./config/db');
const createTables = require('./config/schema');

const allPGHostels = require('../pgdata').allPGHostels || require('../pgdata');

const seed = () => {
    try {
        createTables();
        console.log('Tables created. Seeding data...');

        const pgEntries = typeof allPGHostels === 'object' && !Array.isArray(allPGHostels)
            ? Object.entries(allPGHostels)
            : allPGHostels.map(pg => [pg.slug || pg.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), pg]);

        let count = 0;

        for (const [slug, pg] of pgEntries) {
            try {
                const pgSlug = slug || pg.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const cleanPrice = (val) => {
                    if (!val) return 0;
                    if (typeof val === 'number') return val;
                    return parseInt(String(val).replace(/[₹,\s]/g, '')) || 0;
                };
                const cleanGender = (g) => {
                    if (!g) return 'unisex';
                    const lower = g.toLowerCase();
                    if (lower.includes('male') && !lower.includes('female')) return 'male';
                    if (lower.includes('female')) return 'female';
                    return 'unisex';
                };

                const result = db.prepare(
                    `INSERT INTO pgs (slug, name, city, area, full_address, lat, lng, gender, type,
                    price_min, price_max, deposit, lock_in, notice_period, food_type, wifi_speed,
                    phone, whatsapp, email, description, rating, total_reviews, is_available)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                ).run(
                    pgSlug, pg.name, pg.city || 'Hyderabad', pg.area || '',
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
                    pg.rating || 0, pg.totalReviews || 0, 1
                );

                const pgId = result.lastInsertRowid;

                if (pg.amenities && pg.amenities.length) {
                    const stmtA = db.prepare('INSERT INTO pg_amenities (pg_id, amenity) VALUES (?, ?)');
                    for (const a of pg.amenities) stmtA.run(pgId, a);
                }

                if (pg.photos && pg.photos.length) {
                    const stmtP = db.prepare('INSERT INTO pg_photos (pg_id, photo_url, is_primary) VALUES (?, ?, ?)');
                    pg.photos.forEach((url, i) => stmtP.run(pgId, url, i === 0 ? 1 : 0));
                }

                if (pg.roomPrices && typeof pg.roomPrices === 'object') {
                    const stmtR = db.prepare('INSERT INTO room_prices (pg_id, room_type, price) VALUES (?, ?, ?)');
                    for (const [roomType, price] of Object.entries(pg.roomPrices)) {
                        const p = cleanPrice(price);
                        if (p) stmtR.run(pgId, roomType, p);
                    }
                }

                if (pg.foodMenu && typeof pg.foodMenu === 'object') {
                    const stmtF = db.prepare('INSERT INTO food_menu (pg_id, meal_type, items, timing) VALUES (?, ?, ?, ?)');
                    for (const [mealType, items] of Object.entries(pg.foodMenu)) {
                        if (items && items.length) stmtF.run(pgId, mealType, Array.isArray(items) ? items.join(', ') : items, '');
                    }
                }

                if (pg.reviews && pg.reviews.length) {
                    const stmtRev = db.prepare('INSERT INTO reviews (pg_id, reviewer_name, rating, comment) VALUES (?, ?, ?, ?)');
                    for (const r of pg.reviews) stmtRev.run(pgId, r.name, r.rating, r.comment);
                }

                if (pg.rules && pg.rules.length) {
                    const stmtH = db.prepare('INSERT INTO house_rules (pg_id, rule) VALUES (?, ?)');
                    for (const rule of pg.rules) stmtH.run(pgId, rule);
                }

                count++;
            } catch (err) {
                // skip duplicates
            }
        }

        console.log(`Seeded ${count} PGs successfully`);
    } catch (error) {
        console.error('Seeding error:', error);
    }
};

seed();
