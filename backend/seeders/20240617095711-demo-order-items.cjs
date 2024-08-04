'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('OrderItems', [{}]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('OrderItems', null, {});
	},
};
