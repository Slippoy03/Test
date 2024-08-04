'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Categories', [
			{
				category_id: 'dd5f3344-dcc2-4364-a403-c3d9b1a5b0b6',
				category_name: 'Books',
				description: null,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				category_id: '75b907ea-b905-4648-8e3a-07b7806db7b8',
				category_name: 'Books on Indonesia',
				description: null,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				category_id: 'e0110b66-aa98-4742-b9b7-094445ff2192',
				category_name: 'Academic Books',
				description: null,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				category_id: '70762830-bdeb-4163-bfa1-d5fbb6dfa2d1',
				category_name: 'Magazines',
				description: null,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				category_id: 'ea5e99d1-013a-45ae-a05d-483a3bd08c6a',
				category_name: 'Stationery',
				description: null,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				category_id: '43401d26-fab6-478b-b911-a573826d9916',
				category_name: 'Travel Accessories',
				description: null,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				category_id: '6d41b488-34db-4926-828a-7d662843611c',
				category_name: 'Toys',
				description: null,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				category_id: 'ef473f69-af2e-42f7-bacc-fa8cd067858e',
				category_name: 'Handphone Accessories',
				description: null,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				category_id: '68913d00-4cc5-4212-8675-5428c59cb978',
				category_name: 'Greeting Card',
				description: null,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				category_id: '08db49f0-a33d-46d8-bb73-5fa23ee8d767',
				category_name: 'Gift Voucher',
				description: null,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Categories', null, {});
	},
};
