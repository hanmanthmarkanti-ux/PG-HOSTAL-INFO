const pool = require('../config/db');

class Inquiry {
    static async create({ pg_id, user_id, name, email, phone, message }) {
        const [result] = await pool.query(
            'INSERT INTO inquiries (pg_id, user_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?, ?)',
            [pg_id, user_id, name, email, phone, message]
        );
        return { id: result.insertId };
    }

    static async getAll(filters = {}) {
        let query = 'SELECT i.*, p.name as pg_name, p.city as pg_city FROM inquiries i LEFT JOIN pgs p ON i.pg_id = p.id WHERE 1=1';
        const params = [];

        if (filters.status) {
            query += ' AND i.status = ?';
            params.push(filters.status);
        }
        if (filters.pg_id) {
            query += ' AND i.pg_id = ?';
            params.push(filters.pg_id);
        }

        query += ' ORDER BY i.created_at DESC';
        const [rows] = await pool.query(query, params);
        return rows;
    }

    static async updateStatus(id, status) {
        await pool.query('UPDATE inquiries SET status = ? WHERE id = ?', [status, id]);
    }

    static async delete(id) {
        await pool.query('DELETE FROM inquiries WHERE id = ?', [id]);
    }
}

module.exports = Inquiry;
