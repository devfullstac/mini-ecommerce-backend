const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken, verifyAdmin } = require('../middelware/authMiddleware');

router.post('/', verifyToken, orderController.createOrder);
router.get('/my-orders', verifyToken, orderController.getUserOrders);
router.delete('/:id', verifyToken, orderController.deleteOrder);
router.get('/all', verifyAdmin, orderController.getAllOrders);
router.put('/:id/status', verifyAdmin, orderController.updateOrderStatus);

module.exports = router;
