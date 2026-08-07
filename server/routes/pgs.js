const express = require('express');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const PG = require('../models/PG');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Multer config for photo uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|webp/;
        const extname = allowed.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowed.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only images allowed'));
        }
    }
});

// GET /api/pgs - Get all PGs with filters
router.get('/', async (req, res) => {
    try {
        const { city, gender, sort, search, is_available, price_min, price_max } = req.query;
        const filters = {};
        if (city) filters.city = city;
        if (gender) filters.gender = gender;
        if (sort) filters.sort = sort;
        if (search) filters.search = search;
        if (is_available !== undefined) filters.is_available = is_available;
        if (price_min) filters.price_min = parseInt(price_min);
        if (price_max) filters.price_max = parseInt(price_max);

        const pgs = await PG.getAll(filters);

        // Attach amenities and photos to each PG
        for (let pg of pgs) {
            pg.amenities = await PG.getAmenities(pg.id);
            pg.photos = await PG.getPhotos(pg.id);
        }

        res.json({ pgs, total: pgs.length });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/pgs/stats
router.get('/stats', async (req, res) => {
    try {
        const stats = await PG.getStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/pgs/:slug - Get single PG by slug
router.get('/:slug', async (req, res) => {
    try {
        const pg = await PG.findBySlug(req.params.slug);
        if (!pg) {
            return res.status(404).json({ error: 'PG not found' });
        }

        pg.amenities = await PG.getAmenities(pg.id);
        pg.photos = await PG.getPhotos(pg.id);
        pg.roomPrices = await PG.getRoomPrices(pg.id);
        pg.foodMenu = await PG.getFoodMenu(pg.id);
        pg.reviews = await PG.getReviews(pg.id);
        pg.houseRules = await PG.getHouseRules(pg.id);

        res.json(pg);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/pgs - Create PG (Admin only)
router.post('/', requireAdmin, upload.array('photos', 10), async (req, res) => {
    try {
        const data = req.body;

        // Generate slug
        data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        // Add room prices from JSON string
        if (typeof data.roomPrices === 'string') {
            data.roomPrices = JSON.parse(data.roomPrices);
        }
        if (typeof data.amenities === 'string') {
            data.amenities = JSON.parse(data.amenities);
        }
        if (typeof data.foodMenu === 'string') {
            data.foodMenu = JSON.parse(data.foodMenu);
        }
        if (typeof data.houseRules === 'string') {
            data.houseRules = JSON.parse(data.houseRules);
        }

        const pg = await PG.create(data);

        // Add amenities
        if (data.amenities && data.amenities.length) {
            await PG.addAmenities(pg.id, data.amenities);
        }

        // Add room prices
        if (data.roomPrices) {
            await PG.addRoomPrices(pg.id, data.roomPrices);
        }

        // Add food menu
        if (data.foodMenu && data.foodMenu.length) {
            await PG.addFoodMenu(pg.id, data.foodMenu);
        }

        // Add house rules
        if (data.houseRules && data.houseRules.length) {
            await PG.addHouseRules(pg.id, data.houseRules);
        }

        // Add photos
        if (req.files && req.files.length) {
            const photoUrls = req.files.map(f => `/uploads/${f.filename}`);
            await PG.addPhotos(pg.id, photoUrls);
        }

        res.status(201).json(pg);
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
});

// PUT /api/pgs/:id - Update PG (Admin only)
router.put('/:id', requireAdmin, upload.array('photos', 10), async (req, res) => {
    try {
        const data = req.body;
        const pg = await PG.update(req.params.id, data);

        if (req.files && req.files.length) {
            const photoUrls = req.files.map(f => `/uploads/${f.filename}`);
            await PG.addPhotos(req.params.id, photoUrls);
        }

        res.json(pg);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/pgs/:id - Delete PG (Admin only)
router.delete('/:id', requireAdmin, async (req, res) => {
    try {
        await PG.delete(req.params.id);
        res.json({ message: 'PG deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/pgs/:id/reviews - Add review
router.post('/:id/reviews', requireAuth, [
    body('rating').isInt({ min: 1, max: 5 }),
    body('comment').optional().trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { rating, comment } = req.body;
        const review = await PG.addReview(
            req.params.id,
            req.user.id,
            req.user.name,
            rating,
            comment
        );

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
