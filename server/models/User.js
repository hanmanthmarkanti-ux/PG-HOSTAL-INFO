const pool = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static async create({ name, email, phone, password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
            [name, email, phone, hashedPassword]
        );
        return { id: result.insertId, name, email, phone };
    }

    static async findByEmail(email) {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT id, name, email, phone, role FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async comparePassword(enteredPassword, hashedPassword) {
        return bcrypt.compare(enteredPassword, hashedPassword);
    }

    static async getFavorites(userId) {
        const [rows] = await pool.query(
            `SELECT p.* FROM pgs p
            INNER JOIN favorites f ON p.id = f.pg_id
            WHERE f.user_id = ?
            ORDER BY f.created_at DESC`,
            [userId]
        );
        return rows;
    }

    static async addFavorite(userId, pgId) {
        await pool.query(
            'INSERT IGNORE INTO favorites (user_id, pg_id) VALUES (?, ?)',
            [userId, pgId]
        );
    }

    static async removeFavorite(userId, pgId) {
        await pool.query(
            'DELETE FROM favorites WHERE user_id = ? AND pg_id = ?',
            [userId, pgId]
        );
    }
}

module.exports = User;
