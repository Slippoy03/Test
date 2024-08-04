import { Sequelize } from 'sequelize';
import { readdir } from 'fs/promises';
import { basename as _basename, join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import config from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '../');

const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];
dbConfig.logging = false
const db = {};

const sequelize = new Sequelize(
	dbConfig.database,
	dbConfig.username,
	dbConfig.password,
	dbConfig
);

const importModels = async () => {
	const files = await readdir(__dirname);
	await Promise.all(
		files
			.filter(
				(file) =>
					file.indexOf('.') !== 0 &&
					file !== basename &&
					file.slice(-3) === '.js'
			)
			.map(async (file) => {
				const modelPath = pathToFileURL(join(__dirname, file)).href;
				const modelModule = await import(modelPath);
				const model = modelModule.default(
					sequelize,
					Sequelize.DataTypes
				);
				db[model.name] = model;
			})
	);

	Object.keys(db).forEach((modelName) => {
		if (db[modelName].associate) {
			db[modelName].associate(db);
		}
	});

	db.sequelize = sequelize;
	db.Sequelize = Sequelize;

	return db;
};

export default importModels;
