'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('OrderItems', {
			order_item_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			order_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: 'Orders',
					key: 'order_id',
				},
			},
			product_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: 'Products',
					key: 'product_id',
				},
			},
			quantity: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			price: {
				allowNull: false,
				type: Sequelize.DECIMAL(10, 2),
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('OrderItems');
	},
};
