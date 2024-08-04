import { where } from 'sequelize';
import importModels from '../models/index.js';

const dbPromise = importModels();

const getUserInformations = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const User = db.User;

		const users = await User.findOne({
			where: { user_id: req.user.user_id },
		});
		res.json(users);
	} catch (error) {
		next(error);
	}
};

// Mendapatkan data seluruh product setelah melakukan login
const getAllProducts = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const Product = db.Product;
		const Category = db.Category;

		const products = await Product.findAll({
			include: [
				{
					model: Category,
				},
			],
		});
		res.json(products);
	} catch (error) {
		next(error);
	}
};

// Mendapatkan data wishlist sesuai user yang melakukan login
const getUserWishlist = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const Wishlist = db.Wishlist;
		const Product = db.Product;
		const User = db.User;

		const wishlists = await Wishlist.findAll({
			where: { user_id: req.user.user_id },
			include: [
				{
					model: Product,
				},
				{
					model: User,
				},
			],
		});
		res.json(wishlists);
	} catch (error) {
		next(error);
	}
};

// Mendapatkan data order sesuai user yang melakukan login
const getAllUserOrder = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const User = db.User;
		const Order = db.Order;
		const Product = db.Product;
		const OrderItem = db.OrderItem;

		const orders = await Order.findAll({
			where: { user_id: req.user.user_id },
		});

		res.json(orders);
	} catch (error) {
		next(error);
	}
};

// Mendapatkan data cart sesuai user yang login
const getUserCart = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const Cart = db.Cart;
		const User = db.User;
		const Product = db.Product;

		const carts = await Cart.findAll({
			where: { user_id: req.user.user_id },
			include: [
				{
					model: Product,
				},
				{
					model: User,
				},
			],
		});
		res.json(carts);
	} catch (error) {
		next(error);
	}
};

// Edit profil user
const editAccountInformation = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const User = db.User;

		const { user_fname, user_lname } = req.body;

		const user = await User.findOne({
			where: { user_id: req.user.user_id },
		});

		user.user_fname = user_fname || user.user_fname;
		user.user_lname = user_lname || user.user_lname;

		await user.save();
		res.json({ message: 'Your account updated successfully', user });
	} catch (error) {
		next(error);
	}
};

// Menambahkan produk ke wishlist user
const addToWishlist = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const Wishlist = db.Wishlist;
		const { product_id } = req.body;
		const userId = req.user.user_id;

		// Cek apakah product sudah ada dalam wishlist user
		const checkWishlist = await Wishlist.findOne({
			where: { user_id: req.user.user_id, product_id: product_id },
		});

		if (checkWishlist) {
			return res.status(404).json({
				message: 'Sorry this product already on your wishlist',
			});
		}

		const addToWishlists = await Wishlist.create({
			user_id: userId,
			product_id,
		});
		res.json({
			message: 'The product was successfully added to your wishlist',
			addToWishlists,
		});
	} catch (error) {
		next(error);
	}
};

// Menghapus produk dari wishlist user
const removeFromWishlist = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const Wishlist = db.Wishlist;
		const { wishlist_id } = req.params;

		const userWishlist = await Wishlist.findOne({
			where: { wishlist_id: wishlist_id },
		});
		if (!userWishlist) {
			return res
				.status(404)
				.json({ error: 'The product is not on your wishlist' });
		}

		await userWishlist.destroy();

		res.json({
			message: 'The product was successfully removed from your wishlist',
		});
	} catch (error) {
		next(error);
	}
};

// Menambahkan produk ke cart user
const addToCart = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const { Cart, Product } = db;
		const { product_id, quantity } = req.body;
		const userId = req.user.user_id;

		// Membatasi user agar tidak bisa menambahkan quantity product melebihi qty_stock product ke cart
		const product = await Product.findOne({
			where: { product_id: product_id },
		});

		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}

		if (product.qty_stock < quantity) {
			return res.status(404).json({
				error: `You can only add ${product.qty_stock} pcs to your cart`,
			});
		}

		const userCart = await Cart.findOne({
			where: {
				user_id: userId,
				product_id: product_id,
			},
		});

		if (userCart) {
			userCart.quantity += quantity;
			if (product.qty_stock < userCart.quantity) {
				return res.status(404).json({
					error: `You can only add ${product.qty_stock} pcs to your cart`,
				});
			}

			await userCart.save();
			return res.json({
				message: 'Product quantity updated in cart',
				cartItem: userCart,
			});
		} else {
			const newCartItem = await Cart.create({
				user_id: userId,
				product_id,
				quantity,
			});
			res.json({
				message: 'The product was successfully added to your cart',
				newCartItem,
			});
		}
	} catch (error) {
		next(error);
	}
};

// Merubah quantity tiap produk yang ada di User Cart & menghapus produk yang memiliki quantity 0
const updateCart = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const Cart = db.Cart;
		const { product_id, quantity } = req.body;

		const userCart = await Cart.findOne({
			where: {
				user_id: req.user.user_id,
				product_id: product_id,
			},
		});

		if (!userCart) {
			return res.status(404).json({ message: 'Item not found in cart' });
		}

		if (userCart.quantity === 0) {
			await userCart.destroy();
			return res.json({ message: 'Item removed from cart successfully' });
		}
		userCart.quantity = quantity;
		await userCart.save();

		res.json({ message: 'Your cart was successfully updated' });
	} catch (error) {
		next(error);
	}
};

//Menghapus product dari cart
const removeFromCart = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const Cart = db.Cart;
		const { cart_id } = req.params;

		const userCart = await Cart.findOne({
			where: {
				cart_id: cart_id,
			},
		});

		if (!userCart) {
			return res.status(404).json({ message: 'Item not found in cart' });
		}
		await userCart.destroy();

		res.json({ message: 'Item deleted successfully' });
	} catch (error) {
		next(error);
	}
};

// Checkout produk yang ada di cart
const createOrder = async (req, res, next) => {
	const db = await dbPromise;
	const transaction = await db.sequelize.transaction();
	try {
		const db = await dbPromise;
		const { Cart, OrderItem, Product, Order } = db;
		const userId = req.user.user_id;

		const userCartItems = await Cart.findAll({
			where: {
				user_id: userId,
			},
			include: [
				{
					model: Product,
				},
			],
		});

		if (userCartItems.length === 0) {
			return res.status(400).json({ message: 'No items in your cart' });
		}

		const totalAmount = userCartItems.reduce(
			(acc, item) => acc + item.Product.price * item.quantity,
			0
		);

		const orders = await Order.create(
			{
				user_id: userId,
				total_amount: totalAmount,
				status: 'Pending',
			},
			{ transaction }
		);

		// Create orderItem berdasarkan cart yang di checkout
		const orderItems = userCartItems.map((item) => ({
			order_id: orders.order_id,
			product_id: item.product_id,
			quantity: item.quantity,
			price: item.Product.price,
		}));

		await OrderItem.bulkCreate(orderItems, { transaction });

		// Update qty_stock dan qty_sold product ketika barang di checkout
		for (const item of userCartItems) {
			const product = await Product.findOne({
				where: { product_id: item.product_id },
			});

			//Error ketika stock kurang dari yang akan dicheckout
			if (product.qty_stock < item.quantity) {
				return res.status(404).json({
					message: `Insufficient stock for product ${product.product_name}`,
				});
			}
			product.qty_stock -= item.quantity;
			product.qty_sold += item.quantity;
			await product.save();
		}

		// Hapus cart ketika barang dari cart sudah di checkout
		await Cart.destroy({ where: { user_id: userId }, transaction });

		await transaction.commit();

		res.status(201).json({
			message: 'Your order submitted successfully',
			orders,
		});
	} catch (error) {
		await transaction.rollback();
		next(error);
	}
};

// Menambahkan User review ke product
const addReview = async (req, res, next) => {
	try {
		const db = await dbPromise;

		const ProductReview = db.ProductReview;
		const { user_id, product_id, rating } = req.body;

		const addReviews = await ProductReview.create({
			user_id,
			product_id,
			rating,
		});
		res.status(201).json({
			message: 'Review  added successfully',
			addReviews,
		});
		console.log(req.body);
	} catch (error) {
		next(error);
	}
};

// Filter/pencarian product berdasarkan nama
const getProductsByName = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const Product = db.Product;
		const Category = db.Category;
		const ProductReview = db.ProductReview;
		const { productName } = req.params;

		const products = await Product.findAll({
			where: {
				product_name: productName,
			},
			include: [
				{
					model: Category,
				},
				{
					model: ProductReview,
				},
			],
		});

		// Jika produk tidak ditemukan, kirimkan respons 404
		if (products.length === 0) {
			return res.status(404).json({
				message: 'Product not found',
			});
		}

		// Mengirimkan respons dengan produk yang ditemukan
		res.json(products);
	} catch (error) {
		next(error);
	}
};

// Filter product berdasarkan Category
const getProductsByCategoryName = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const Category = db.Category;
		const Product = db.Product;
		const { category_name } = req.params;

		const categories = await Category.findAll({
			where: {
				category_name: category_name,
			},
			include: [
				{
					model: Category,
				},
				{
					model: Product,
				},
			],
		});

		if (categories.length === 0) {
			return res.status(404).json({
				message: 'Category not found',
			});
		}

		res.json(categories);
	} catch (error) {
		next(error);
	}
};

// Filter product dengan harga terendah
const getProductsByMinPrice = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const Product = db.Product;
		const { minPrice } = req.params;

		const products = await Product.findAll({
			where: {
				price: {
					[db.Sequelize.Op.gte]: minPrice,
				},
			},
			include: [
				{
					model: Product,
				},
			],
		});

		if (products.length === 0) {
			return res.status(404).json({
				message: 'No products found above the specified price',
			});
		}

		res.json(products);
	} catch (error) {
		next(error);
	}
};

// Filter product dengan harga tertinggi
const getProductsByMaxPrice = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const Product = db.Product;
		const { maxPrice } = req.params;

		const products = await Product.findAll({
			where: {
				price: {
					[db.Sequelize.Op.lte]: maxPrice,
				},
			},
			include: [
				{
					model: Product,
				},
			],
		});

		if (products.length === 0) {
			return res.status(404).json({
				message: 'No products found above the specified price',
			});
		}

		res.json(products);
	} catch (error) {
		next(error);
	}
};

// Mendapatakan informasi detail product
const getDetailProduct = async (req, res, next) => {
	const { product_id } = req.params;
	try {
		const db = await dbPromise;
		const Product = db.Product;
		const products = await Product.findOne({
			where: { product_id: product_id },
		});
		if (!products) {
			return res.status(404).json({ message: 'Product not found!' });
		}

		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
};

export {
	getUserInformations,
	getAllProducts,
	getUserWishlist,
	getAllUserOrder,
	getUserCart,
	editAccountInformation,
	addToWishlist,
	addToCart,
	removeFromWishlist,
	updateCart,
	createOrder,
	addReview,
	getProductsByName,
	getProductsByCategoryName,
	getProductsByMinPrice,
	getProductsByMaxPrice,
	getDetailProduct,
	removeFromCart,
};
