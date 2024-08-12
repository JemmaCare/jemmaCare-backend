
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user_model.js';

// Admin authentication middleware
export const requireAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        try {
            // Extract token from headers
            const token = authHeader.split(' ')[1];

            // Verify the token
            req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

            // Check if user exists in the database
            const user = await UserModel.findById(req.user.id);
            if (!user) {
                return res.status(401).json('User Does Not Exist!');
            }

            // Check if the user has an admin role
            if (user.role !== 'admin') {
                return res.status(403).json('Access Forbidden: Admins only!');
            }

            // Call next function if all checks pass
            next();
        } catch (error) {
            return res.status(401).json('Not Authenticated!');
        }
    } else {
        return res.status(401).json('Not Authenticated!');
    }
};

// Therapist authentication middleware
export const requireTherapist = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        try {
            const token = authHeader.split(' ')[1];
            req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

            const user = await UserModel.findById(req.user.id);
            if (!user) {
                return res.status(401).json('User Does Not Exist!');
            }

            if (user.role !== 'therapist') {
                return res.status(403).json('Access Forbidden: Therapists only!');
            }

            next();
        } catch (error) {
            return res.status(401).json('Not Authenticated!');
        }
    } else {
        return res.status(401).json('Not Authenticated!');
    }
};
