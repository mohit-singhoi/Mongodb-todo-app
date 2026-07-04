import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: 'Authorization header missing you Login First and get Valid Token then create Todo' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();

    } catch (error) {
        // Handle JWT errors explicitly and return proper HTTP status codes
        // Token expired
        if (error && error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }

        // Invalid token or other verification error
        console.error('Authentication error:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
}

export default authMiddleware;
    