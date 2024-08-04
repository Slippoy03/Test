import axios from 'axios';

const apiURL = 'http://localhost:5000/api/user';

export const fetchUserData = async (token) => {
	try {
		const response = await axios.get(`${apiURL}/users`, {
			headers: { Authorization: token },
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching user data', error);
		throw error; // Anda bisa melempar kembali error untuk ditangani di komponen yang menggunakan service ini
	}
};
