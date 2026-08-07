const { queryAll, queryOne, run } = require('../config/query');

class Booking {
    static create({ pg_id, user_id, room_type, check_in, check_out, total_amount, notes }) {
        const result = run(
            `INSERT INTO bookings (pg_id, user_id, room_type, check_in, check_out, total_amount, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [pg_id, user_id, room_type, check_in, check_out, total_amount || 0, notes || null]
        );
        run('UPDATE pgs SET available_rooms = MAX(available_rooms - 1, 0) WHERE id = ?', [pg_id]);
        return { id: result.lastInsertRowid };
    }

    static findById(id) {
        return queryOne(
            `SELECT b.*, p.name as pg_name, p.area as pg_area, p.city as pg_city, u.name as user_name, u.email as user_email, u.phone as user_phone
            FROM bookings b
            JOIN pgs p ON b.pg_id = p.id
            JOIN users u ON b.user_id = u.id
            WHERE b.id = ?`, [id]
        );
    }

    static getByUser(userId) {
        return queryAll(
            `SELECT b.*, p.name as pg_name, p.area as pg_area, p.city as pg_city
            FROM bookings b JOIN pgs p ON b.pg_id = p.id
            WHERE b.user_id = ? ORDER BY b.created_at DESC`, [userId]
        );
    }

    static getByOwner(ownerId) {
        return queryAll(
            `SELECT b.*, p.name as pg_name, p.area as pg_area, p.city as pg_city, u.name as user_name, u.email as user_email, u.phone as user_phone
            FROM bookings b
            JOIN pgs p ON b.pg_id = p.id
            JOIN users u ON b.user_id = u.id
            WHERE p.owner_id = ? ORDER BY b.created_at DESC`, [ownerId]
        );
    }

    static getAll(filters = {}) {
        let query = `SELECT b.*, p.name as pg_name, p.area as pg_area, u.name as user_name, u.email as user_email
            FROM bookings b
            JOIN pgs p ON b.pg_id = p.id
            JOIN users u ON b.user_id = u.id WHERE 1=1`;
        const params = [];
        if (filters.status) { query += ' AND b.status = ?'; params.push(filters.status); }
        if (filters.pg_id) { query += ' AND b.pg_id = ?'; params.push(filters.pg_id); }
        query += ' ORDER BY b.created_at DESC';
        return queryAll(query, params);
    }

    static updateStatus(id, status) {
        run('UPDATE bookings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, id]);
    }

    static updatePaymentStatus(id, payment_status) {
        run('UPDATE bookings SET payment_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [payment_status, id]);
    }

    static cancel(id) {
        const booking = queryOne('SELECT pg_id FROM bookings WHERE id = ?', [id]);
        if (booking) {
            run('UPDATE pgs SET available_rooms = available_rooms + 1 WHERE id = ?', [booking.pg_id]);
        }
        run("UPDATE bookings SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP WHERE id = ?", [id]);
    }

    static delete(id) {
        const booking = queryOne('SELECT pg_id FROM bookings WHERE id = ?', [id]);
        if (booking) {
            run('UPDATE pgs SET available_rooms = available_rooms + 1 WHERE id = ?', [booking.pg_id]);
        }
        run('DELETE FROM bookings WHERE id = ?', [id]);
    }
}

module.exports = Booking;
