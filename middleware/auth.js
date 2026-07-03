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
        res.json({errors: 'Invalid Token' });
    }
}

export default authMiddleware;
    