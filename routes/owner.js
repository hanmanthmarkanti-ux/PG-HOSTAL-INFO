const express = require('express');
const { requireAuth } = require('../middleware/auth');
const PG = require('../models/PG');
const Inquiry = require('../models/Inquiry');
const Booking = require('../models/Booking');

const router = express.Router();

const requireOwner = async (req, res, next) => {
    if (!req.user || (req.user.user_type !== 'owner' && req.user.role !== 'admin')) {
        return res.status(403).json({ error: 'Owner access required' });
    }
    next();
};

router.get('/stats', requireAuth, requireOwner, async (req, res) => {
    try {
        const stats = PG.getOwnerStats(req.user.id);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/pgs', requireAuth, requireOwner, async (req, res) => {
    try {
        const pgs = PG.getAll({ owner_id: req.user.id });
        for (let pg of pgs) {
            pg.amenities = PG.getAmenities(pg.id);
            pg.photos = PG.getPhotos(pg.id);
        }
        res.json({ pgs, total: pgs.length });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/inquiries', requireAuth, requireOwner, async (req, res) => {
    try {
        const pgs = PG.getAll({ owner_id: req.user.id });
        const pgIds = pgs.map(p => p.id);
        let allInquiries = [];
        for (const pgId of pgIds) {
            const inqs = Inquiry.getByPgId ? Inquiry.getByPgId(pgId) : [];
            allInquiries = allInquiries.concat(inqs);
        }
        res.json(allInquiries);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/bookings', requireAuth, requireOwner, async (req, res) => {
    try {
        const bookings = Booking.getByOwner(req.user.id);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
