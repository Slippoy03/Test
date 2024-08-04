import { DataTypes, UUIDV4 } from 'sequelize';

export default (sequelize) => {
	const User = sequelize.define(
		'User',
		{
			user_id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
			},
			user_fname: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			user_lname: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			email: {
				allowNull: false,
				type: DataTypes.STRING,
				unique: true,
			},
			password: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			role: {
				allowNull: false,
				defaultValue: 'user',
				type: DataTypes.STRING,
			},
			isActive: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
		},
		{
			timestamps: true,
		}
	);

	User.associate = (models) => {
		User.hasMany(models.Order, { foreignKey: 'user_id' });
		User.hasMany(models.ProductReview, { foreignKey: 'user_id' });
		User.hasOne(models.Cart, { foreignKey: 'user_id' });
		User.hasOne(models.Wishlist, { foreignKey: 'user_id' });
	};

	return User;
};
