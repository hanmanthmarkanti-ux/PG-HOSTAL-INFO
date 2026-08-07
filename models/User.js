const { queryAll, queryOne, run } = require('../config/query');
const bcrypt = require('bcryptjs');

class User {
    static create({ name, email, phone, password, user_type, business_name, business_address }) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const result = run(
            'INSERT INTO users (name, email, phone, password, user_type, business_name, business_address) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, email, phone, hashedPassword, user_type || 'student', business_name || null, business_address || null]
        );
        return { id: result.lastInsertRowid, name, email, phone, user_type: user_type || 'student' };
    }

    static findByEmail(email) {
        return queryOne('SELECT * FROM users WHERE email = ?', [email]);
    }

    static findById(id) {
        return queryOne('SELECT id, name, email, phone, role, user_type, business_name, business_address, created_at FROM users WHERE id = ?', [id]);
    }

    static comparePassword(enteredPassword, hashedPassword) {
        return bcrypt.compareSync(enteredPassword, hashedPassword);
    }

    static getFavorites(userId) {
        return queryAll(
            `SELECT p.* FROM pgs p INNER JOIN favorites f ON p.id = f.pg_id WHERE f.user_id = ? ORDER BY f.created_at DESC`,
            [userId]
        );
    }

    static addFavorite(userId, pgId) {
        run('INSERT OR IGNORE INTO favorites (user_id, pg_id) VALUES (?, ?)', [userId, pgId]);
    }

    static removeFavorite(userId, pgId) {
        run('DELETE FROM favorites WHERE user_id = ? AND pg_id = ?', [userId, pgId]);
    }

    static getAll(filters = {}) {
        let query = 'SELECT id, name, email, phone, role, user_type, business_name, created_at FROM users WHERE 1=1';
        const params = [];
        if (filters.user_type) { query += ' AND user_type = ?'; params.push(filters.user_type); }
        if (filters.search) {
            query += ' AND (name LIKE ? OR email LIKE ?)';
            const s = `%${filters.search}%`;
            params.push(s, s);
        }
        query += ' ORDER BY created_at DESC';
        return queryAll(query, params);
    }

    static count(filters = {}) {
        let query = 'SELECT COUNT(*) as count FROM users WHERE 1=1';
        const params = [];
        if (filters.user_type) { query += ' AND user_type = ?'; params.push(filters.user_type); }
        const result = queryOne(query, params);
        return result ? result.count : 0;
    }

    static updateRole(id, role) {
        run('UPDATE users SET role = ? WHERE id = ?', [role, id]);
    }

    static delete(id) {
        run('DELETE FROM users WHERE id = ?', [id]);
    }
}

module.exports = User;
