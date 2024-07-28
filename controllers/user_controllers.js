import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user_model.js";
import { userValidator } from "../validators/all_validators.js";



// User signup
export const signup = async (req, res, next) => {
    // Validate using Joi
    try {
        const { error, value } = userValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Check if user exists
        const email = value.email;
        console.log('email', email);

        const findIfUserExists = await UserModel.findOne({ email });
        if (findIfUserExists) {
            return res.status(400).json({ message: "Email already exists" });
        } else {
            const hashedPassword = await bcryptjs.hash(value.password, 12)
            value.password = hashedPassword
            //create user
            const addUser = await UserModel.create(value)

            // Generate a token
            const token = jwt.sign(
                { id: addUser.id },
                process.env.JWT_PRIVATE_KEY,
                { expiresIn: '72h' }
            );

            return res.status(201).json({
                message: 'User created successfully',
                accessToken: token
            });
        }
    } catch (error) {
        next(error)
    }
};

// User login
export const login = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;

        // Find a user using their unique identifier
        const user = await UserModel.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (!user) {
            return res.status(401).json('No user found');
        }

        // Verify password
        const correctPassword = bcryptjs.compareSync(password, user.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials');
        } else {
            // Generate a token
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_PRIVATE_KEY,
                { expiresIn: '72' }
            );
            return res.status(200).json({
                message: 'User logged in successfully',
                accessToken: token
            });
        }
    } catch (error) {
        console.error(error);
        next(error)
    }
};


//User logout 
export const logout = async (req, res, next) => {
    try {
        //Destroy user session
        await req.session.destroy();
        //Return response
        res.status(200).json('User logged out')
    } catch (error) {
        next(error)
    }
}