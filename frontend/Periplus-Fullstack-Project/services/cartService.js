import axiosInstance from './axiosInstance';

const apiURL = 'http://localhost:5000/api/user';

const addToCart = async (productId, buyQuantity) => {
	try {
		const response = await axiosInstance.post(`${apiURL}/products-carts`, {
			product_id: productId,
			quantity: buyQuantity,
		});
		return response.data;
	} catch (error) {
		console.error('Error adding to cart.', error);
		throw error;
	}
};

const getUserCart = async () => {
	try {
		const response = await axiosInstance.get(`${apiURL}/carts`);
		return response.data;
	} catch (error) {
		console.error('Error fetching user cart data.', error);
		throw error;
	}
};

const updateUserCart = async (productId, buyQuantity) => {
	try {
		const response = await axiosInstance.put(`${apiURL}/products-carts`, {
			product_id: productId,
			quantity: buyQuantity,
		});
		return response.data;
	} catch (error) {
		console.error('Error updating item on cart.', error);
		throw error;
	}
};

const removeUserCart = async (cartId) => {
	try {
		// console.log(cartId);
		const response = await axiosInstance.delete(
			`${apiURL}/products-carts/${cartId}`
		);
		return response.data;
	} catch (error) {
		console.error('Error deleting product from cart.', error);
		throw error;
	}
};

export { addToCart, getUserCart, updateUserCart, removeUserCart };
