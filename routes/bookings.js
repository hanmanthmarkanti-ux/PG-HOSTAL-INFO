const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const PG = require('../models/PG');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', requireAuth, [
    body('pg_id').isInt(),
    body('room_type').trim().notEmpty(),
    body('check_in').optional()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const pg = PG.findById(req.body.pg_id);
        if (!pg) return res.status(404).json({ error: 'PG not found' });
        if (pg.available_rooms !== undefined && pg.available_rooms <= 0) {
            return res.status(400).json({ error: 'No rooms available' });
        }
        const booking = Booking.create({
            pg_id: req.body.pg_id,
            user_id: req.user.id,
            room_type: req.body.room_type,
            check_in: req.body.check_in,
            check_out: req.body.check_out,
            total_amount: req.body.total_amount,
            notes: req.body.notes
        });
        res.status(201).json({ message: 'Booking submitted successfully', booking });
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
});

router.get('/', requireAuth, async (req, res) => {
    try {
        const bookings = Booking.getByUser(req.user.id);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/all', requireAdmin, async (req, res) => {
    try {
        const bookings = Booking.getAll(req.query);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id/status', requireAuth, async (req, res) => {
    try {
        Booking.updateStatus(req.params.id, req.body.status);
        res.json({ message: 'Status updated' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:id/payment', requireAuth, async (req, res) => {
    try {
        Booking.updatePaymentStatus(req.params.id, req.body.payment_status);
        res.json({ message: 'Payment status updated' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/:id/cancel', requireAuth, async (req, res) => {
    try {
        Booking.cancel(req.params.id);
        res.json({ message: 'Booking cancelled' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', requireAdmin, async (req, res) => {
    try {
        Booking.delete(req.params.id);
        res.json({ message: 'Booking deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
