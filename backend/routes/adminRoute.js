import {
	addProduct,
	getAllProducts,
	addCategory,
	deleteProduct,
	updateProduct,
	getProductsByName,
	getProductsByCategoryName,
	getProductsByMinPrice,
	getProductsByMaxPrice,
	deleteCategory,
} from '../controllers/adminController.js';
import express from 'express';
import { authorize } from '../middlewares/auth.js';

const router = express.Router();

router.get('/products', authorize('admin'), getAllProducts);
router.post('/add-product', authorize('admin'), addProduct);
router.post('/add-category', authorize('admin'), addCategory);
router.delete('/products/:productId', authorize('admin'), deleteProduct);
router.put('/products/:productId', authorize('admin'), updateProduct);
router.delete('/categories/:categoryId', authorize('admin'), deleteCategory);
router.get('/products/name/:productName', getProductsByName);
router.get('/products/category/:categoryName', getProductsByCategoryName);
router.get('/products/minPrice/:minPrice', getProductsByMinPrice);
router.get('/products/maxPrice/:maxPrice', getProductsByMaxPrice);

export default router;
