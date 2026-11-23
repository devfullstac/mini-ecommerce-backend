const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const { verifyToken, verifyAdmin } = require('../middelware/authMiddleware');

router.post('/toggle', verifyToken, favoriteController.toggleFavorite);
router.get('/my-favorites', verifyToken, favoriteController.getUserFavorites);
router.get('/all', verifyAdmin, favoriteController.getAllFavorites);

module.exports = router;

