const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'Pratik';

// Middleware function to authenticate JWT token
const authenticateToken = async (req, res, next) => {
    try {
        // Step 1: Extract token from Authorization header
        const authHeader = req.headers['authorization']; // lowercase
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Authorization header missing'
            });
        }

        const token = authHeader.split(' ')[1]; // Bearer TOKEN

        // Step 2: Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access token required'
            });
        }

        // Step 3: Verify token with secret
        const decoded = jwt.verify(token, JWT_SECRET);

        // Step 4: Find user from database
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token - user not found'
            });
        }

        // Step 5: Add user to request object
        req.user = user;
        next();

    } catch (error) {
        console.log('Auth middleware error:', error);
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

module.exports = { authenticateToken };
