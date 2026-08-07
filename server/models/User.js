const { queryAll, queryOne, run } = require('../config/query');
const bcrypt = require('bcryptjs');

class User {
    static create({ name, email, phone, password }) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const result = run(
            'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
            [name, email, phone, hashedPassword]
        );
        return { id: result.lastInsertRowid, name, email, phone };
    }

    static findByEmail(email) {
        return queryOne('SELECT * FROM users WHERE email = ?', [email]);
    }

    static findById(id) {
        return queryOne('SELECT id, name, email, phone, role FROM users WHERE id = ?', [id]);
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
}

module.exports = User;
