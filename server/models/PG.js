const db = require('../config/db');

class PG {
    static create(data) {
        const result = db.prepare(
            `INSERT INTO pgs (slug, name, city, area, full_address, lat, lng, gender, type,
            price_min, price_max, deposit, lock_in, notice_period, food_type, wifi_speed,
            phone, whatsapp, email, description, is_available)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).run(data.slug, data.name, data.city, data.area, data.full_address, data.lat, data.lng,
            data.gender, data.type, data.price_min, data.price_max, data.deposit, data.lock_in,
            data.notice_period, data.food_type, data.wifi_speed, data.phone, data.whatsapp,
            data.email, data.description, data.is_available || 1);
        return { id: result.lastInsertRowid, ...data };
    }

    static findById(id) {
        return db.prepare('SELECT * FROM pgs WHERE id = ?').get(id);
    }

    static findBySlug(slug) {
        return db.prepare('SELECT * FROM pgs WHERE slug = ?').get(slug);
    }

    static getAll(filters = {}) {
        let query = 'SELECT * FROM pgs WHERE 1=1';
        const params = [];

        if (filters.city) { query += ' AND city = ?'; params.push(filters.city); }
        if (filters.gender) { query += ' AND gender = ?'; params.push(filters.gender); }
        if (filters.is_available !== undefined) { query += ' AND is_available = ?'; params.push(filters.is_available); }
        if (filters.price_min) { query += ' AND price_max >= ?'; params.push(filters.price_min); }
        if (filters.price_max) { query += ' AND price_min <= ?'; params.push(filters.price_max); }
        if (filters.search) {
            query += ' AND (name LIKE ? OR area LIKE ? OR city LIKE ?)';
            const s = `%${filters.search}%`;
            params.push(s, s, s);
        }

        switch (filters.sort) {
            case 'price_low': query += ' ORDER BY price_min ASC'; break;
            case 'price_high': query += ' ORDER BY price_max DESC'; break;
            case 'rating': query += ' ORDER BY rating DESC'; break;
            case 'newest': query += ' ORDER BY created_at DESC'; break;
            default: query += ' ORDER BY rating DESC';
        }

        return db.prepare(query).all(...params);
    }

    static getAmenities(pgId) {
        return db.prepare('SELECT amenity FROM pg_amenities WHERE pg_id = ?').all(pgId).map(r => r.amenity);
    }

    static addAmenities(pgId, amenities) {
        const stmt = db.prepare('INSERT INTO pg_amenities (pg_id, amenity) VALUES (?, ?)');
        for (const amenity of amenities) stmt.run(pgId, amenity);
    }

    static getPhotos(pgId) {
        return db.prepare('SELECT * FROM pg_photos WHERE pg_id = ? ORDER BY is_primary DESC').all(pgId);
    }

    static addPhotos(pgId, photos) {
        const stmt = db.prepare('INSERT INTO pg_photos (pg_id, photo_url, is_primary) VALUES (?, ?, ?)');
        photos.forEach((url, i) => stmt.run(pgId, url, i === 0 ? 1 : 0));
    }

    static getRoomPrices(pgId) {
        return db.prepare('SELECT * FROM room_prices WHERE pg_id = ?').all(pgId);
    }

    static addRoomPrices(pgId, prices) {
        const stmt = db.prepare('INSERT INTO room_prices (pg_id, room_type, price) VALUES (?, ?, ?)');
        for (const [roomType, price] of Object.entries(prices)) {
            if (price) stmt.run(pgId, roomType, parseInt(String(price).replace(/[^\d]/g, '')) || 0);
        }
    }

    static getFoodMenu(pgId) {
        return db.prepare('SELECT * FROM food_menu WHERE pg_id = ?').all(pgId);
    }

    static addFoodMenu(pgId, meals) {
        const stmt = db.prepare('INSERT INTO food_menu (pg_id, meal_type, items, timing) VALUES (?, ?, ?, ?)');
        for (const meal of meals) stmt.run(pgId, meal.meal_type, meal.items, meal.timing);
    }

    static getHouseRules(pgId) {
        return db.prepare('SELECT rule FROM house_rules WHERE pg_id = ?').all(pgId).map(r => r.rule);
    }

    static addHouseRules(pgId, rules) {
        const stmt = db.prepare('INSERT INTO house_rules (pg_id, rule) VALUES (?, ?)');
        for (const rule of rules) stmt.run(pgId, rule);
    }

    static getReviews(pgId) {
        return db.prepare(
            `SELECT r.*, u.name as user_name FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            WHERE r.pg_id = ? ORDER BY r.created_at DESC`
        ).all(pgId);
    }

    static addReview(pgId, userId, reviewerName, rating, comment) {
        const result = db.prepare(
            'INSERT INTO reviews (pg_id, user_id, reviewer_name, rating, comment) VALUES (?, ?, ?, ?, ?)'
        ).run(pgId, userId, reviewerName, rating, comment);

        db.prepare(`
            UPDATE pgs SET
            rating = (SELECT AVG(rating) FROM reviews WHERE pg_id = ?),
            total_reviews = (SELECT COUNT(*) FROM reviews WHERE pg_id = ?)
            WHERE id = ?`
        ).run(pgId, pgId, pgId);

        return { id: result.lastInsertRowid };
    }

    static update(id, data) {
        const fields = [];
        const values = [];
        for (const [key, value] of Object.entries(data)) {
            if (value !== undefined && key !== 'id') {
                fields.push(`${key} = ?`);
                values.push(value);
            }
        }
        if (fields.length === 0) return null;
        values.push(id);
        db.prepare(`UPDATE pgs SET ${fields.join(', ')} WHERE id = ?`).run(...values);
        return this.findById(id);
    }

    static delete(id) {
        db.prepare('DELETE FROM pgs WHERE id = ?').run(id);
    }

    static getStats() {
        const total = db.prepare('SELECT COUNT(*) as count FROM pgs').get();
        const cities = db.prepare('SELECT COUNT(DISTINCT city) as count FROM pgs').get();
        const reviews = db.prepare('SELECT COUNT(*) as count FROM reviews').get();
        return { totalPGs: total.count, totalCities: cities.count, totalReviews: reviews.count };
    }
}

module.exports = PG;
