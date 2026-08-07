const pool = require('./config/db');
const createTables = require('./config/schema');

// Load PG data
const allPGHostels = require('../pgdata').allPGHostels || require('../pgdata');

const seed = async () => {
    try {
        await createTables();
        console.log('Tables created. Seeding data...');

        const pgEntries = typeof allPGHostels === 'object' && !Array.isArray(allPGHostels)
            ? Object.entries(allPGHostels)
            : allPGHostels.map(pg => [pg.slug || pg.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), pg]);

        let count = 0;

        for (const [slug, pg] of pgEntries) {
            try {
                const pgSlug = slug || pg.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

                // Clean price values - remove ₹ and commas
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

                const cleanDeposit = (d) => cleanPrice(d);
                const cleanLockIn = (l) => {
                    if (!l) return 1;
                    const num = parseInt(String(l).replace(/[^\d]/g, ''));
                    return num || 1;
                };
                const cleanNotice = (n) => {
                    if (!n) return 30;
                    const num = parseInt(String(n).replace(/[^\d]/g, ''));
                    return num || 30;
                };

                // Insert PG
                const [result] = await pool.query(
                    `INSERT INTO pgs (slug, name, city, area, full_address, lat, lng, gender, type,
                    price_min, price_max, deposit, lock_in, notice_period, food_type, wifi_speed,
                    phone, whatsapp, email, description, rating, total_reviews, is_available)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        pgSlug,
                        pg.name,
                        pg.city || 'Hyderabad',
                        pg.area || '',
                        pg.full_address || pg.area + ', ' + (pg.city || 'Hyderabad'),
                        pg.lat || 0,
                        pg.lng || 0,
                        cleanGender(pg.gender),
                        pg.type || 'standard',
                        pg.priceMin || cleanPrice(pg.priceMin),
                        pg.priceMax || cleanPrice(pg.priceMax) || pg.priceMin || cleanPrice(pg.priceMin),
                        cleanDeposit(pg.deposit),
                        cleanLockIn(pg.lockIn),
                        cleanNotice(pg.noticePeriod),
                        pg.foodType || 'veg',
                        pg.wifiSpeed || '',
                        pg.phone || (pg.contact && pg.contact.phone) || '',
                        pg.whatsapp || (pg.contact && pg.contact.whatsapp) || '',
                        pg.email || (pg.contact && pg.contact.email) || '',
                        pg.description || pg.name + ' in ' + (pg.area || ''),
                        pg.rating || 0,
                        pg.totalReviews || 0,
                        1
                    ]
                );

                const pgId = result.insertId;

                // Insert amenities
                if (pg.amenities && pg.amenities.length) {
                    for (const amenity of pg.amenities) {
                        await pool.query('INSERT INTO pg_amenities (pg_id, amenity) VALUES (?, ?)', [pgId, amenity]);
                    }
                }

                // Insert photos
                if (pg.photos && pg.photos.length) {
                    for (let i = 0; i < pg.photos.length; i++) {
                        await pool.query(
                            'INSERT INTO pg_photos (pg_id, photo_url, is_primary) VALUES (?, ?, ?)',
                            [pgId, pg.photos[i], i === 0 ? 1 : 0]
                        );
                    }
                }

                // Insert room prices
                if (pg.roomPrices && typeof pg.roomPrices === 'object') {
                    for (const [roomType, price] of Object.entries(pg.roomPrices)) {
                        const priceVal = cleanPrice(price);
                        if (priceVal) {
                            await pool.query(
                                'INSERT INTO room_prices (pg_id, room_type, price) VALUES (?, ?, ?)',
                                [pgId, roomType, priceVal]
                            );
                        }
                    }
                }

                // Insert food menu
                if (pg.foodMenu && typeof pg.foodMenu === 'object') {
                    for (const [mealType, items] of Object.entries(pg.foodMenu)) {
                        if (items && items.length) {
                            await pool.query(
                                'INSERT INTO food_menu (pg_id, meal_type, items, timing) VALUES (?, ?, ?, ?)',
                                [pgId, mealType, Array.isArray(items) ? items.join(', ') : items, '']
                            );
                        }
                    }
                }

                // Insert reviews
                if (pg.reviews && pg.reviews.length) {
                    for (const review of pg.reviews) {
                        await pool.query(
                            'INSERT INTO reviews (pg_id, reviewer_name, rating, comment) VALUES (?, ?, ?, ?)',
                            [pgId, review.name, review.rating, review.comment]
                        );
                    }
                }

                // Insert house rules
                if (pg.rules && pg.rules.length) {
                    for (const rule of pg.rules) {
                        await pool.query('INSERT INTO house_rules (pg_id, rule) VALUES (?, ?)', [pgId, rule]);
                    }
                }

                count++;
            } catch (err) {
                console.error(`Error seeding ${pg.name}:`, err.message);
            }
        }

        console.log(`Seeded ${count} PGs successfully`);
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seed();
