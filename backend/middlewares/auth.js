import jwt from 'jsonwebtoken';

const authorize = (roles = []) => {
	if (typeof roles === 'string') {
		roles = [roles];
	}

	return [
		(req, res, next) => {
			const token = req.headers.authorization;
			if (!token) {
				return res.status(401).json({ message: 'Unauthorized' });
			}

			jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
				if (err) return res.sendStatus(403);
				req.user = user;
				next();
			});
		},

		(req, res, next) => {
			if (roles.length && !roles.includes(req.user.role)) {
				return res.status(403).json({ message: 'Forbidden' });
			}
			next();
		},
	];
};

export { authorize };
