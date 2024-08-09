import jwt from "jsonwebtoken";
import { UserModel } from "../models/user_model.js";
import { roles } from "../config/roles.js";


// Authentication
export const isAuthenticated = async (req, res, next) => {
    if (req.headers.authorization) {
        try {
            // Extract token from headers
            const token = req.headers.authorization.split(' ')[1];
            // Verify the token to get user and append to request
            req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            // Check if user exists in database
            const user = await UserModel.findById(req.user.id);
            if (!user) {
                return res.status(401).json('User Does Not Exist!');
            }
            // Call next function
            next();
        } catch (error) {
            return res.status(401).json(error);
        }
    } else {
        return res.status(401).json('Not Authenticated!');
    }
};



// export const isAuthenticated = async (req, res, next) => {
//     if (req.headers.authorization) {
//         try {
//             // Extract token from headers
//             const token = req.headers.authorization.split(' ')[1];
//             // Verify token and decode payload
//             const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

//             // Find user in the database
//             const user = await UserModel.findById(decoded.id); // Ensure `id` matches token payload
//             if (!user) {
//                 return res.status(401).json('User Does Not Exist!');
//             }

//             req.user = user; // Attach full user object
//             next();
//         } catch (error) {
//             return res.status(401).json(error.message);
//         }
//     } else {
//         return res.status(401).json('Not Authenticated!');
//     }
// };

// Authorization
export const hasPermission = (permission) => {
    return async (req, res, next) => {
        try {
            // Get user id from request
            const id = req.user.id;

            // Fetch user from database
            const user = await UserModel.findById(id);

            // Find user role with permissions
            const userRole = roles.find(element => element.role === user.role);

            // Use role to check if user has permission
            if (userRole && userRole.permissions.includes(permission)) {
                next();
            } else {
                res.status(403).json('Not Authorized!');
            }
        } catch (error) {
            next(error);
        }
    };
};
