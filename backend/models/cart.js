import { DataTypes, UUIDV4 } from 'sequelize';

export default (sequelize) => {
	const Cart = sequelize.define(
		'Cart',
		{
			cart_id: {
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
			quantity: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
		},
		{
			timestamps: true,
		}
	);

	Cart.associate = (models) => {
		Cart.belongsTo(models.User, { foreignKey: 'user_id' });
		Cart.belongsTo(models.Product, { foreignKey: 'product_id' });
	};

	return Cart;
};
