import axios from 'axios';
// import axiosInstance from './axiosInstance';

const apiURL = 'http://localhost:5000/api/user';

const fetchProductData = async () => {
	try {
		const response = await axios.get(`${apiURL}/products`);
		return response.data;
	} catch (error) {
		console.error('Error fetching product data', error);
		throw error;
	}
};

const fetchProductDetail = async (product_id) => {
	try {
		const response = await axios.get(`${apiURL}/products/${product_id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching product detail', error);
		throw error;
	}
};

export { fetchProductData, fetchProductDetail };
