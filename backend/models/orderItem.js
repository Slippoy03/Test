import { DataTypes, UUIDV4 } from 'sequelize';

export default (sequelize) => {
	const OrderItem = sequelize.define(
		'OrderItem',
		{
			order_item_id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
			},
			order_id: {
                allowNull: false,
				type: DataTypes.UUID,
				references: {
					model: 'Orders',
					key: 'order_id',
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
			price: {
				allowNull: false,
				type: DataTypes.DECIMAL(10, 2),
			},
		},
		{
			timestamps: true,
		}
	);

	OrderItem.associate = (models) => {
		OrderItem.belongsTo(models.Order, { foreignKey: 'order_id' });
		OrderItem.belongsTo(models.Product, { foreignKey: 'product_id' });
	};

	return OrderItem;
};
