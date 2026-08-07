const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static create({ name, email, phone, password }) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const result = db.prepare(
            'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)'
        ).run(name, email, phone, hashedPassword);
        return { id: result.lastInsertRowid, name, email, phone };
    }

    static findByEmail(email) {
        return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    }

    static findById(id) {
        return db.prepare('SELECT id, name, email, phone, role FROM users WHERE id = ?').get(id);
    }

    static comparePassword(enteredPassword, hashedPassword) {
        return bcrypt.compareSync(enteredPassword, hashedPassword);
    }

    static getFavorites(userId) {
        return db.prepare(
            `SELECT p.* FROM pgs p
            INNER JOIN favorites f ON p.id = f.pg_id
            WHERE f.user_id = ?
            ORDER BY f.created_at DESC`
        ).all(userId);
    }

    static addFavorite(userId, pgId) {
        db.prepare('INSERT OR IGNORE INTO favorites (user_id, pg_id) VALUES (?, ?)').run(userId, pgId);
    }

    static removeFavorite(userId, pgId) {
        db.prepare('DELETE FROM favorites WHERE user_id = ? AND pg_id = ?').run(userId, pgId);
    }
}

module.exports = User;
