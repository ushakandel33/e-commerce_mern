import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import {
  addToCart,
  getUserCart,
  removeFromCart,
  clearCart
} from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/add', protectRoute, addToCart);            // Add or update item
router.get('/', protectRoute, getUserCart);           // Get user's cart
router.delete('/remove/:productId', protectRoute, removeFromCart); // Remove item
router.delete('/clear', protectRoute, clearCart);          // Clear entire cart

export default router;
