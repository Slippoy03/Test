import express from 'express';
import { authorize } from '../middlewares/auth.js';
import {
	addReview,
	addToCart,
	addToWishlist,
	createOrder,
	editAccountInformation,
	getAllProducts,
	getAllUserOrder,
	getProductsByCategoryName,
	getProductsByMaxPrice,
	getProductsByMinPrice,
	getProductsByName,
	getUserCart,
	getUserWishlist,
	getUserInformations,
	updateCart,
	removeFromWishlist,
	getDetailProduct,
	removeFromCart,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/wishlists', authorize('user'), getUserWishlist);
router.post('/products-wishlists', authorize('user'), addToWishlist);
router.delete(
	'/products-wishlists/:wishlist_id',
	authorize('user'),
	removeFromWishlist
);
router.get('/carts', authorize('user'), getUserCart);
router.post('/products-carts', authorize('user'), addToCart);
router.put('/products-carts', authorize('user'), updateCart);
router.delete('/products-carts/:cart_id', authorize('user'), removeFromCart);
router.put('/edit-your-account', authorize('user'), editAccountInformation);
router.get('/orders', authorize('user'), getAllUserOrder);

router.post('/create-orders', authorize('user'), createOrder);
router.post('/add-review', authorize('user'), addReview);
router.get('/users', authorize('user'), getUserInformations);

router.get('/products/:product_id', getDetailProduct);
router.get('/products/name/:productName', getProductsByName);
router.get('/products/category/:categoryName', getProductsByCategoryName);
router.get('/products/minPrice/:minPrice', getProductsByMinPrice);
router.get('/products/maxPrice/:maxPrice', getProductsByMaxPrice);

export default router;
