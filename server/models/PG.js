const pool = require('../config/db');

class PG {
    static async create(data) {
        const [result] = await pool.query(
            `INSERT INTO pgs (slug, name, city, area, full_address, lat, lng, gender, type,
            price_min, price_max, deposit, lock_in, notice_period, food_type, wifi_speed,
            phone, whatsapp, email, description, is_available)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [data.slug, data.name, data.city, data.area, data.full_address, data.lat, data.lng,
            data.gender, data.type, data.price_min, data.price_max, data.deposit, data.lock_in,
            data.notice_period, data.food_type, data.wifi_speed, data.phone, data.whatsapp,
            data.email, data.description, data.is_available || 1]
        );
        return { id: result.insertId, ...data };
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM pgs WHERE id = ?', [id]);
        return rows[0];
    }

    static async findBySlug(slug) {
        const [rows] = await pool.query('SELECT * FROM pgs WHERE slug = ?', [slug]);
        return rows[0];
    }

    static async getAll(filters = {}) {
        let query = 'SELECT * FROM pgs WHERE 1=1';
        const params = [];

        if (filters.city) {
            query += ' AND city = ?';
            params.push(filters.city);
        }
        if (filters.gender) {
            query += ' AND gender = ?';
            params.push(filters.gender);
        }
        if (filters.is_available !== undefined) {
            query += ' AND is_available = ?';
            params.push(filters.is_available);
        }
        if (filters.price_min) {
            query += ' AND price_max >= ?';
            params.push(filters.price_min);
        }
        if (filters.price_max) {
            query += ' AND price_min <= ?';
            params.push(filters.price_max);
        }
        if (filters.search) {
            query += ' AND (name LIKE ? OR area LIKE ? OR city LIKE ?)';
            const searchTerm = `%${filters.search}%`;
            params.push(searchTerm, searchTerm, searchTerm);
        }

        // Sort
        switch (filters.sort) {
            case 'price_low':
                query += ' ORDER BY price_min ASC';
                break;
            case 'price_high':
                query += ' ORDER BY price_max DESC';
                break;
            case 'rating':
                query += ' ORDER BY rating DESC';
                break;
            case 'newest':
                query += ' ORDER BY created_at DESC';
                break;
            default:
                query += ' ORDER BY rating DESC';
        }

        const [rows] = await pool.query(query, params);
        return rows;
    }

    static async getAmenities(pgId) {
        const [rows] = await pool.query('SELECT amenity FROM pg_amenities WHERE pg_id = ?', [pgId]);
        return rows.map(r => r.amenity);
    }

    static async addAmenities(pgId, amenities) {
        for (const amenity of amenities) {
            await pool.query('INSERT INTO pg_amenities (pg_id, amenity) VALUES (?, ?)', [pgId, amenity]);
        }
    }

    static async getPhotos(pgId) {
        const [rows] = await pool.query('SELECT * FROM pg_photos WHERE pg_id = ? ORDER BY is_primary DESC', [pgId]);
        return rows;
    }

    static async addPhotos(pgId, photos) {
        for (let i = 0; i < photos.length; i++) {
            await pool.query(
                'INSERT INTO pg_photos (pg_id, photo_url, is_primary) VALUES (?, ?, ?)',
                [pgId, photos[i], i === 0 ? 1 : 0]
            );
        }
    }

    static async getRoomPrices(pgId) {
        const [rows] = await pool.query('SELECT * FROM room_prices WHERE pg_id = ?', [pgId]);
        return rows;
    }

    static async addRoomPrices(pgId, prices) {
        for (const [roomType, price] of Object.entries(prices)) {
            if (price) {
                await pool.query(
                    'INSERT INTO room_prices (pg_id, room_type, price) VALUES (?, ?, ?)',
                    [pgId, roomType, price]
                );
            }
        }
    }

    static async getFoodMenu(pgId) {
        const [rows] = await pool.query('SELECT * FROM food_menu WHERE pg_id = ?', [pgId]);
        return rows;
    }

    static async addFoodMenu(pgId, meals) {
        for (const meal of meals) {
            await pool.query(
                'INSERT INTO food_menu (pg_id, meal_type, items, timing) VALUES (?, ?, ?, ?)',
                [pgId, meal.meal_type, meal.items, meal.timing]
            );
        }
    }

    static async getHouseRules(pgId) {
        const [rows] = await pool.query('SELECT rule FROM house_rules WHERE pg_id = ?', [pgId]);
        return rows.map(r => r.rule);
    }

    static async addHouseRules(pgId, rules) {
        for (const rule of rules) {
            await pool.query('INSERT INTO house_rules (pg_id, rule) VALUES (?, ?)', [pgId, rule]);
        }
    }

    static async getReviews(pgId) {
        const [rows] = await pool.query(
            `SELECT r.*, u.name as user_name FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            WHERE r.pg_id = ? ORDER BY r.created_at DESC`,
            [pgId]
        );
        return rows;
    }

    static async addReview(pgId, userId, reviewerName, rating, comment) {
        const [result] = await pool.query(
            'INSERT INTO reviews (pg_id, user_id, reviewer_name, rating, comment) VALUES (?, ?, ?, ?, ?)',
            [pgId, userId, reviewerName, rating, comment]
        );
        // Update PG rating
        await pool.query(`
            UPDATE pgs SET
            rating = (SELECT AVG(rating) FROM reviews WHERE pg_id = ?),
            total_reviews = (SELECT COUNT(*) FROM reviews WHERE pg_id = ?)
            WHERE id = ?`,
            [pgId, pgId, pgId]
        );
        return { id: result.insertId };
    }

    static async update(id, data) {
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
        await pool.query(`UPDATE pgs SET ${fields.join(', ')} WHERE id = ?`, values);
        return this.findById(id);
    }

    static async delete(id) {
        await pool.query('DELETE FROM pgs WHERE id = ?', [id]);
    }

    static async getStats() {
        const [total] = await pool.query('SELECT COUNT(*) as count FROM pgs');
        const [cities] = await pool.query('SELECT COUNT(DISTINCT city) as count FROM pgs');
        const [reviews] = await pool.query('SELECT COUNT(*) as count FROM reviews');
        return {
            totalPGs: total[0].count,
            totalCities: cities[0].count,
            totalReviews: reviews[0].count
        };
    }
}

module.exports = PG;
