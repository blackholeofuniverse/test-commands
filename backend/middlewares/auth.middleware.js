import verify from 'jsonwebtoken';

const protectedRoute = (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.redirect('/api/auth/login')
        }

        // Verify token
        const decoded = verify(token, process.env.JWT_SECRET);

        // Add user from payload
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default protectedRoute;