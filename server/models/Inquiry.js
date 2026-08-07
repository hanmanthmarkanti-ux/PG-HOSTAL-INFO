const db = require('../config/db');

class Inquiry {
    static create({ pg_id, user_id, name, email, phone, message }) {
        const result = db.prepare(
            'INSERT INTO inquiries (pg_id, user_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?, ?)'
        ).run(pg_id, user_id, name, email, phone, message);
        return { id: result.lastInsertRowid };
    }

    static getAll(filters = {}) {
        let query = 'SELECT i.*, p.name as pg_name, p.city as pg_city FROM inquiries i LEFT JOIN pgs p ON i.pg_id = p.id WHERE 1=1';
        const params = [];

        if (filters.status) { query += ' AND i.status = ?'; params.push(filters.status); }
        if (filters.pg_id) { query += ' AND i.pg_id = ?'; params.push(filters.pg_id); }

        query += ' ORDER BY i.created_at DESC';
        return db.prepare(query).all(...params);
    }

    static updateStatus(id, status) {
        db.prepare('UPDATE inquiries SET status = ? WHERE id = ?').run(status, id);
    }

    static delete(id) {
        db.prepare('DELETE FROM inquiries WHERE id = ?').run(id);
    }
}

module.exports = Inquiry;
