import express from 'express';
import dotenv from 'dotenv';
import publicRoute from './routes/publicRoute.js';
import userRoute from './routes/userRoute.js';
import adminRoute from './routes/adminRoute.js';
import importModels from './models/index.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';

dotenv.config();

const startServer = async () => {
	try {
		const db = await importModels();

		const app = express();

		const corsOptions = {
			origin: 'http://localhost:5173',
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			credentials: true,
			optionSuccessStatus: 200,
		};

		app.use(cors(corsOptions));

		app.use(express.urlencoded({ extended: true }));

		app.use(express.json());

		app.use('/api', publicRoute);
		app.use('/api/user', userRoute);
		app.use('/api/admin', adminRoute);

		app.use(errorHandler);

		const PORT = process.env.PORT || 5000;

		db.sequelize.sync().then(() => {
			app.listen(PORT, () => {
				console.log(`Server is running on port ${PORT}`);
			});
		});
	} catch (error) {
		console.error('Unable to start the server:', error);
	}
};

startServer();
