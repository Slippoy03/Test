'use strict';
const { v4: uuidv4 } = require('uuid');
const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const hashedPassword = await bcryptjs.hash('Password123', 10);

		await queryInterface.bulkInsert('Users', [
			{
				user_id: uuidv4(),
				user_fname: 'John',
				user_lname: 'Doe',
				email: 'john@email.com',
				password: hashedPassword,
				role: 'admin',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				user_id: uuidv4(),
				user_fname: 'Jack',
				user_lname: 'Smith',
				email: 'jack@email.com',
				password: hashedPassword,
				role: 'user',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				user_id: uuidv4(),
				user_fname: 'Saint',
				user_lname: 'Gobain',
				email: 'gobain@email.com',
				password: hashedPassword,
				role: 'user',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				user_id: uuidv4(),
				user_fname: 'Tedi',
				user_lname: 'Ferd',
				email: 'tedi@email.com',
				password: hashedPassword,
				role: 'admin',
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {});
	},
};
