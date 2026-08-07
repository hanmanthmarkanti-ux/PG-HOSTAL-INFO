const express = require('express');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/favorites - Get user favorites
router.get('/', requireAuth, async (req, res) => {
    try {
        const favorites = await User.getFavorites(req.user.id);
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/favorites/:pgId - Add to favorites
router.post('/:pgId', requireAuth, async (req, res) => {
    try {
        await User.addFavorite(req.user.id, req.params.pgId);
        res.json({ message: 'Added to favorites' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /api/favorites/:pgId - Remove from favorites
router.delete('/:pgId', requireAuth, async (req, res) => {
    try {
        await User.removeFavorite(req.user.id, req.params.pgId);
        res.json({ message: 'Removed from favorites' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
