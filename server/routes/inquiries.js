const express = require('express');
const { body, validationResult } = require('express-validator');
const Inquiry = require('../models/Inquiry');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// POST /api/inquiries - Create inquiry
router.post('/', [
    body('pg_id').isInt(),
    body('name').trim().notEmpty(),
    body('email').isEmail(),
    body('phone').isMobilePhone(),
    body('message').optional().trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const inquiry = await Inquiry.create(req.body);
        res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/inquiries - Get all inquiries (Admin only)
router.get('/', requireAdmin, async (req, res) => {
    try {
        const { status, pg_id } = req.query;
        const inquiries = await Inquiry.getAll({ status, pg_id });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT /api/inquiries/:id/status - Update status (Admin only)
router.put('/:id/status', requireAdmin, async (req, res) => {
    try {
        await Inquiry.updateStatus(req.params.id, req.body.status);
        res.json({ message: 'Status updated' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/inquiries/:id (Admin only)
router.delete('/:id', requireAdmin, async (req, res) => {
    try {
        await Inquiry.delete(req.params.id);
        res.json({ message: 'Inquiry deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
