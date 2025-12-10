import express from 'express';
import { protectRoute, isAdmin } from '../middleware/authMiddleware.js';
import {
  placeOrder,
  getUserOrders,
} from '../controllers/order.controller.js';

const router = express.Router();

router.post('/add', protectRoute, placeOrder);             // Place Order
router.get('/my', protectRoute, getUserOrders);  // User's Orders

export default router;
