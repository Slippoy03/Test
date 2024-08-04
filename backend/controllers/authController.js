import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import importModels from '../models/index.js';
dotenv.config();

const dbPromise = importModels();

const register = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const User = db.User;

		const { user_fname, user_lname, email, password } = req.body;
		const hashedPassword = await bcryptjs.hash(password, 10);

		const user = await User.create({
			user_fname,
			user_lname,
			email,
			password: hashedPassword,
		});
		res.status(201).json({ message: 'User registered successfully', user });
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	try {
		const db = await dbPromise;
		const User = db.User;

		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(401).json({ error: 'Invalid email' });
		}

		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Invalid password' });
		}

		const token = jwt.sign(
			{ user_id: user.user_id, email: user.email, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);

		res.json({ message: 'Login successfull', token });
	} catch (error) {
		next(error);
	}
};

export { login, register };
