import { DataTypes, UUIDV4 } from 'sequelize';

export default (sequelize) => {
	const Product = sequelize.define(
		'Product',
		{
			product_id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
			},
			product_name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			product_description: {
				type: DataTypes.TEXT,
			},
			price: {
				allowNull: false,
				type: DataTypes.DECIMAL(10, 2),
			},
			qty_stock: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			category_id: {
				allowNull: false,
				type: DataTypes.UUID,
				references: {
					model: 'Categories',
					key: 'category_id',
				},
			},
			qty_sold: {
				allowNull: false,
				defaultValue: 0,
				type: DataTypes.INTEGER,
			},
			image_path: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			dimension: {
				type: DataTypes.STRING,
			},
			shippingWeight: {
				type: DataTypes.DECIMAL(10, 2),
				defaultValue: 0,
			},
			pages: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			language: {
				type: DataTypes.STRING,
				defaultValue: 'English',
			},
			gradeLevel: {
				allowNull: false,
				type: DataTypes.STRING,
				defaultValue: 'NA - NA',
			},
			isbn: {
				type: DataTypes.BIGINT,
			},
			publisher: {
				type: DataTypes.STRING,
			},
			publicationDate: {
				type: DataTypes.DATE,
			},
			ageRange: {
				allowNull: false,
				type: DataTypes.STRING,
				defaultValue: 'NA - NA',
			},
			isActive: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
			tags: {
				allowNull: false,
				type: DataTypes.STRING,
				defaultValue: '',
			},
			coverType: {
				type: DataTypes.STRING,
			},
			author1: {
				type: DataTypes.STRING,
			},
			author2: {
				type: DataTypes.STRING,
			},
			author3: {
				type: DataTypes.STRING,
			},
			editor: {
				type: DataTypes.STRING,
			},
			translator: {
				type: DataTypes.STRING,
			},
			illustrator: {
				type: DataTypes.STRING,
			},
			fastDelivery: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			discount: {
				allowNull: false,
				type: DataTypes.DECIMAL(3, 2),
				defaultValue: 0,
			},
		},
		{
			timestamps: true,
		}
	);

	Product.associate = (models) => {
		Product.belongsTo(models.Category, { foreignKey: 'product_id' });
		Product.hasMany(models.OrderItem, { foreignKey: 'product_id' });
		Product.hasMany(models.Cart, { foreignKey: 'product_id' });
		Product.hasMany(models.Wishlist, { foreignKey: 'product_id' });
		Product.hasMany(models.ProductReview, { foreignKey: 'product_id' });
	};

	return Product;
};
