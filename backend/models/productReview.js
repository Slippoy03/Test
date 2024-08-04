import { DataTypes, UUIDV4 } from 'sequelize';

export default (sequelize) => {
	const ProductReview = sequelize.define(
		'ProductReview',
		{
			product_review_id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
			},
			user_id: {
				allowNull: false,
				type: DataTypes.UUID,
				references: {
					model: 'Users',
					key: 'user_id',
				},
			},
			product_id: {
				allowNull: false,
				type: DataTypes.UUID,
				references: {
					model: 'Products',
					key: 'product_id',
				},
			},
			rating: {
				allowNull: false,
				type: DataTypes.INTEGER,
				validate: { min: 1, max: 5 },
			},
		},
		{
			timestamps: true,
		}
	);

	ProductReview.associate = (models) => {
		ProductReview.belongsTo(models.Product, { foreignKey: 'product_id' });
		ProductReview.belongsTo(models.User, { foreignKey: 'user_id' });
	};

	return ProductReview;
};
