import { DataTypes, UUIDV4 } from 'sequelize';

export default (sequelize) => {
	const Order = sequelize.define(
		'Order',
		{
			order_id: {
				allowNull: false,
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
				primaryKey: true,
			},
			user_id: {
				allowNull: false,
				type: DataTypes.UUID,
				references: {
					model: 'Users',
					key: 'user_id',
				},
			},
			total_amount: {
				allowNull: false,
				type: DataTypes.DECIMAL(10, 2),
			},
			status: {
				allowNull: false,
				type: DataTypes.STRING,
				defaultValue: 'Unpaid',
			},
		},
		{
			timestamps: true,
		}
	);

	Order.associate = (models) => {
		Order.belongsTo(models.User, { foreignKey: 'user_id' });
		Order.hasMany(models.OrderItem);
	};

	return Order;
};
