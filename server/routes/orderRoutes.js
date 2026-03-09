import express from 'express';
import {
  createOrderFromCart,
  getAllOrders,
  getUserOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/checkout', protect, createOrderFromCart);
router.get('/my-orders', protect, getUserOrders);
router.get('/', protect, adminOnly, getAllOrders);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

export default router;
