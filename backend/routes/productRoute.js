import express from 'express';
import { listProducts, addProduct, removeProduct, singleProduct, updateProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRoute = express.Router();

// Add a new product (admin only, with images)
productRoute.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);

// Update a product (admin only, with images)
productRoute.put('/update/:productId', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), updateProduct);

// Remove a product (admin only)
productRoute.post('/remove', adminAuth, removeProduct);

// Get details of one product by ID
productRoute.get('/single/:productId', singleProduct);

// Get list of all products
productRoute.get('/list', listProducts);

export default productRoute;
