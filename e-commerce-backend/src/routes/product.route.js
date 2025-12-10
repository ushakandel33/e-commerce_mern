import express from 'express';
import multer from 'multer';
import { protectRoute, isAdmin } from '../middleware/authMiddleware.js';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';
// import cloudinary  from "../config/cloudinary.js";


const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin-only routes
router.post('/add', protectRoute, isAdmin, upload.single('image'), createProduct);
router.put('/update/:id', protectRoute, isAdmin, upload.single('image'), updateProduct);
router.delete('/delete/:id', protectRoute, isAdmin, deleteProduct);

export default router;
