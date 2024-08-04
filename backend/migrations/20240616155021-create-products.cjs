'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Products', {
			product_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
			},
			product_name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			product_description: {
				type: Sequelize.TEXT,
			},
			price: {
				allowNull: false,
				type: Sequelize.DECIMAL(10, 2),
			},
			qty_stock: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			category_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: 'Categories',
					key: 'category_id',
				},
			},
			qty_sold: {
				allowNull: false,
				defaultValue: 0,
				type: Sequelize.INTEGER,
			},
			image_path: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			dimension: {
				type: Sequelize.STRING,
			},
			shippingWeight: {
				type: Sequelize.DECIMAL(10, 2),
				defaultValue: 0,
			},
			pages: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
			},
			language: {
				type: Sequelize.STRING,
				defaultValue: 'NA- NA',
			},
			gradeLevel: {
				type: Sequelize.STRING,
				defaultValue: 'NA- NA',
			},
			isbn: {
				type: Sequelize.BIGINT,
			},
			publisher: {
				type: Sequelize.STRING,
			},
			publicationDate: {
				type: Sequelize.DATE,
			},
			ageRange: {
				type: Sequelize.STRING,
				defaultValue: 'NA - NA',
			},
			isActive: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			tags: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			coverType: {
				type: Sequelize.STRING,
			},
			author1: {
				type: Sequelize.STRING,
			},
			author2: {
				type: Sequelize.STRING,
			},
			author3: {
				type: Sequelize.STRING,
			},
			editor: {
				type: Sequelize.STRING,
			},
			translator: {
				type: Sequelize.STRING,
			},
			illustrator: {
				type: Sequelize.STRING,
			},
			fastDelivery: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			discount: {
				allowNull: false,
				type: Sequelize.DECIMAL(3, 2),
				defaultValue: 0,
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
		await queryInterface.dropTable('Products');
	},
};
