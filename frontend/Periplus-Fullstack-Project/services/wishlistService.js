import axiosInstance from './axiosInstance';

const apiURL = 'http://localhost:5000/api/user';

const addToWishlist = async (productId) => {
	try {
		const response = await axiosInstance.post(
			`${apiURL}/products-wishlists`,
			{
				product_id: productId,
			}
		);
		return response.data;
	} catch (error) {
		console.error('Error adding to wishlist', error);
		throw error;
	}
};

const getUserWishlist = async () => {
	try {
		const response = await axiosInstance.get(`${apiURL}/wishlists`);
		return response.data;
	} catch (error) {
		console.error('Error fetching user wishlist data', error);
		throw error;
	}
};

const removeUserWishlist = async (wishlistId) => {
	try {
		const response = await axiosInstance.delete(
			`${apiURL}/products-wishlists/${wishlistId}`
		);
		return response.data;
	} catch (error) {
		console.error('Error deleting product from wishlist.', error);
		throw error;
	}
};

export { addToWishlist, getUserWishlist, removeUserWishlist };
