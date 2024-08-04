import { DataTypes, UUIDV4 } from 'sequelize';

export default (sequelize) => {
	const Category = sequelize.define(
		'Category',
		{
			category_id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: UUIDV4,
			},
			category_name: {
				allowNull: false,
				type: DataTypes.STRING,
				unique: true,
			},
			description: {
				type: DataTypes.TEXT,
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

	Category.associate = (models) => {
		Category.hasMany(models.Product, { foreignKey: 'category_id' });
	};

	return Category;
};
