'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('ProductReviews', {
			product_review_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			user_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: 'Users',
					key: 'user_id',
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
			rating: {
				allowNull: false,
				type: Sequelize.INTEGER,
				validate: { min: 1, max: 5 },
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
		await queryInterface.dropTable('ProductReviews', {});
	},
};
