'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Orders', [
			{
				order_id: uuidv4(),
				user_id: '30644cd2-502f-4600-a09d-bc8d7901b018',
				total_amount: 178000,
				status: 'Shipped',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Orders', null, {});
	},
};
