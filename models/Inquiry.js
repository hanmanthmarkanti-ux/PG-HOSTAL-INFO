const { queryAll, run } = require('../config/query');

class Inquiry {
    static create({ pg_id, user_id, name, email, phone, message }) {
        const result = run(
            'INSERT INTO inquiries (pg_id, user_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?, ?)',
            [pg_id, user_id || null, name, email, phone, message]
        );
        return { id: result.lastInsertRowid };
    }

    static getAll(filters = {}) {
        let query = 'SELECT i.*, p.name as pg_name, p.city as pg_city FROM inquiries i LEFT JOIN pgs p ON i.pg_id = p.id WHERE 1=1';
        const params = [];
        if (filters.status) { query += ' AND i.status = ?'; params.push(filters.status); }
        if (filters.pg_id) { query += ' AND i.pg_id = ?'; params.push(filters.pg_id); }
        query += ' ORDER BY i.created_at DESC';
        return queryAll(query, params);
    }

    static getByPgId(pgId) {
        return queryAll('SELECT * FROM inquiries WHERE pg_id = ? ORDER BY created_at DESC', [pgId]);
    }

    static updateStatus(id, status) {
        run('UPDATE inquiries SET status = ? WHERE id = ?', [status, id]);
    }

    static delete(id) {
        run('DELETE FROM inquiries WHERE id = ?', [id]);
    }
}

module.exports = Inquiry;
