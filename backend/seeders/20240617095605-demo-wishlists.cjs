'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Wishlists', [
			{
				wishlist_id: uuidv4(),
				user_id: '30644cd2-502f-4600-a09d-bc8d7901b018',
				product_id: '4c96e025-b75b-47cd-b791-0cb719505db7',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				wishlist_id: uuidv4(),
				user_id: '30644cd2-502f-4600-a09d-bc8d7901b018',
				product_id: '9401322c-3335-4c64-b9e6-795eb1e57043',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				wishlist_id: uuidv4(),
				user_id: '6ceb7f9a-0612-4b16-83e5-9cdff52d801d',
				product_id: 'd88f22d2-e485-4eda-933e-543166408800',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Wishlists', null, {});
	},
};
