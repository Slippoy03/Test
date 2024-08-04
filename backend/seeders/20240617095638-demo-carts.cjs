'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Carts', [
			{
				cart_id: uuidv4(),
				user_id: 'a734d15b-d6df-4d13-b732-40b66cb937c5',
				product_id: '9401322c-3335-4c64-b9e6-795eb1e57043',
				quantity: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				cart_id: uuidv4(),
				user_id: '6ceb7f9a-0612-4b16-83e5-9cdff52d801d',
				product_id: 'd88f22d2-e485-4eda-933e-543166408800',
				quantity: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Carts', null, {});
	},
};
