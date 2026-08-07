const { queryAll, queryOne, run } = require('../config/query');

class PG {
    static create(data) {
        const result = run(
            `INSERT INTO pgs (slug, name, city, area, full_address, lat, lng, gender, type,
            price_min, price_max, deposit, lock_in, notice_period, food_type, wifi_speed,
            phone, whatsapp, email, description, is_available)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [data.slug, data.name, data.city, data.area, data.full_address, data.lat, data.lng,
            data.gender, data.type, data.price_min, data.price_max, data.deposit, data.lock_in,
            data.notice_period, data.food_type, data.wifi_speed, data.phone, data.whatsapp,
            data.email, data.description, data.is_available || 1]
        );
        return { id: result.lastInsertRowid, ...data };
    }

    static findById(id) { return queryOne('SELECT * FROM pgs WHERE id = ?', [id]); }
    static findBySlug(slug) { return queryOne('SELECT * FROM pgs WHERE slug = ?', [slug]); }

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
        return queryAll(query, params);
    }

    static getAmenities(pgId) { return queryAll('SELECT amenity FROM pg_amenities WHERE pg_id = ?', [pgId]).map(r => r.amenity); }
    static addAmenities(pgId, amenities) { amenities.forEach(a => run('INSERT INTO pg_amenities (pg_id, amenity) VALUES (?, ?)', [pgId, a])); }
    static getPhotos(pgId) { return queryAll('SELECT * FROM pg_photos WHERE pg_id = ? ORDER BY is_primary DESC', [pgId]); }
    static addPhotos(pgId, photos) { photos.forEach((url, i) => run('INSERT INTO pg_photos (pg_id, photo_url, is_primary) VALUES (?, ?, ?)', [pgId, url, i === 0 ? 1 : 0])); }
    static getRoomPrices(pgId) { return queryAll('SELECT * FROM room_prices WHERE pg_id = ?', [pgId]); }
    static addRoomPrices(pgId, prices) {
        Object.entries(prices).forEach(([roomType, price]) => {
            const p = parseInt(String(price).replace(/[^\d]/g, '')) || 0;
            if (p) run('INSERT INTO room_prices (pg_id, room_type, price) VALUES (?, ?, ?)', [pgId, roomType, p]);
        });
    }
    static getFoodMenu(pgId) { return queryAll('SELECT * FROM food_menu WHERE pg_id = ?', [pgId]); }
    static addFoodMenu(pgId, meals) { meals.forEach(m => run('INSERT INTO food_menu (pg_id, meal_type, items, timing) VALUES (?, ?, ?, ?)', [pgId, m.meal_type, m.items, m.timing])); }
    static getHouseRules(pgId) { return queryAll('SELECT rule FROM house_rules WHERE pg_id = ?', [pgId]).map(r => r.rule); }
    static addHouseRules(pgId, rules) { rules.forEach(r => run('INSERT INTO house_rules (pg_id, rule) VALUES (?, ?)', [pgId, r])); }
    static getReviews(pgId) { return queryAll('SELECT r.*, u.name as user_name FROM reviews r LEFT JOIN users u ON r.user_id = u.id WHERE r.pg_id = ? ORDER BY r.created_at DESC', [pgId]); }
    static addReview(pgId, userId, reviewerName, rating, comment) {
        const result = run('INSERT INTO reviews (pg_id, user_id, reviewer_name, rating, comment) VALUES (?, ?, ?, ?, ?)', [pgId, userId, reviewerName, rating, comment]);
        run('UPDATE pgs SET rating = (SELECT AVG(rating) FROM reviews WHERE pg_id = ?), total_reviews = (SELECT COUNT(*) FROM reviews WHERE pg_id = ?) WHERE id = ?', [pgId, pgId, pgId]);
        return { id: result.lastInsertRowid };
    }
    static update(id, data) {
        const fields = []; const values = [];
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && key !== 'id') { fields.push(`${key} = ?`); values.push(value); }
        });
        if (!fields.length) return null;
        values.push(id);
        run(`UPDATE pgs SET ${fields.join(', ')} WHERE id = ?`, values);
        return this.findById(id);
    }
    static delete(id) { run('DELETE FROM pgs WHERE id = ?', [id]); }
    static getStats() {
        const total = queryOne('SELECT COUNT(*) as count FROM pgs');
        const cities = queryOne('SELECT COUNT(DISTINCT city) as count FROM pgs');
        const reviews = queryOne('SELECT COUNT(*) as count FROM reviews');
        return { totalPGs: total?.count || 0, totalCities: cities?.count || 0, totalReviews: reviews?.count || 0 };
    }
}

module.exports = PG;
