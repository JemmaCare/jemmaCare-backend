import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { ResetTokenModel, UserModel } from "../models/user_model.js";
import { forgotPasswordValidator, loginValidator, updateUserValidator, userValidator } from "../validators/all_userValidators.js";
import { mailTransport } from '../config/mail.js';




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
            return res.status(201).json({
                message: 'User created successfully',
            });
        }
    } catch (error) {
        next(error)
    }
};

// User login
export const login = async (req, res, next) => {
    try {
        // Validate request
        const { value, error } = loginValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        const { username, email, password } = value; // Extract username, email, and password

        // Find a user using their unique identifier (username or email)
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
                { expiresIn: '72h' }
            );
            return res.status(200).json({
                message: 'User logged in successfully',
                accessToken: token
            });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};


// User profile
export const getProfile = async (req, res, next) => {
    try {
        // get user id from request(token)
        const id = req.user.id
        // find user by id
        const user = await UserModel.findById(id)
            .select({ password: false });
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}


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

export const forgotPassword = async (req, res, next) => {
    try {
        // Validate request
        const { value, error } = forgotPasswordValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Find a user with provided email
        const user = await UserModel.findOne({ email: value.email });
        if (!user) {
            return res.status(404).json('User Not Found');
        }
        // Generate reset token
        const resetToken = await ResetTokenModel.create({ userId: user.id });
        // Send reset email
        await mailTransport.sendMail({
            to: value.email,
            subject: 'Reset Your Password',
            html: `
            <h1>Hello ${user.firstName || 'User'}</h1>
            <h1>Please follow the link below to reset your password.</h1>
            <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken.id}">Click Here</a>
            `
        });
        // Return response
        res.status(200).json('Password Reset Mail Sent!');
    } catch (error) {
        next(error);
    }
}

export const verifyResetToken = async (req, res, next) => {
    try {
        // Find Reset Token by id
        const resetToken = await ResetTokenModel.findById(req.params.id);
        if (!resetToken) {
            return res.status(404).json('Reset Token Not Found');
        }
        // Check if token is valid
        if (resetToken.expired || (Date.now() >= new Date(resetToken.expiresAt).valueOf())) {
            return res.status(409).json('Invalid Reset Token');
        }
        // Return response
        res.status(200).json('Reset Token is Valid!');
    } catch (error) {
        next(error);
    }
}


export const resetPassword = async (req, res, next) => {
    try {
        // Validate request
        const { value, error } = resetPasswordValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Find Reset Token by id
        const resetToken = await ResetTokenModel.findById(value.resetToken);
        if (!resetToken) {
            return res.status(404).json('Reset Token Not Found');
        }
        // Check if token is valid
        if (resetToken.expired || (Date.now() >= new Date(resetToken.expiresAt).valueOf())) {
            return res.status(409).json('Invalid Reset Token');
        }
        // Encrypt user password
        const hashedPassword = bcryptjs.hashSync(value.password, 10);
        // Update user password
        await UserModel.findByIdAndUpdate(resetToken.userId, { password: hashedPassword });
        // Expire reset token
        await ResetTokenModel.findByIdAndUpdate(value.resetToken, { expired: true });
        // Return response
        res.status(200).json('Password Reset Successful!');
    } catch (error) {
        next(error);
    }
}


// Admin creating a user(therapist)
export const addUser = async (req, res, next) => {
    try {
        // Validate request
        const { value, error } = userValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Encrypt user password
        const hashedPassword = bcryptjs.hashSync(value.password, 10);
        // Create user
        await UserModel.create({
            ...value,
            password: hashedPassword
        });
        // Send email to user
        await mailTransport.sendMail({
            to: value.email,
            subject: "User Account Created!",
            text: `Dear user,\n\nA user account has been created for you with the following credentials.\n\nUsername: ${value.username}\nEmail: ${value.email}\nPassword: ${value.password}\nRole: ${value.role}\n\nThank you!`,
        });
        // Return response
        res.status(201).json('User Created successfully');
    } catch (error) {
        next(error);
    }
}



// get all therapists
export const getUsers = async (req, res, next) => {
    try {
        // Get all users
        const users = await UserModel
            .find()
            .select({ password: false });
        // Return response
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}


export const updateUser = async (req, res, next) => {
    try {
        // Validate request
        const { value, error } = updateUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Update user
        await UserModel.findByIdAndUpdate(
            req.params.id,
            value,
            { new: true }
        );
        // Return response
        res.status(200).json('User Updated');
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        // Get user id from session or request
        const id = req.session?.user?.id || req?.user?.id;
        // Ensure user is not deleting themselves
        if (id === req.params.id) {
            return res.status(409).json('Cannot Delete Self');
        }
        // Delete user
        await UserModel.findByIdAndDelete(req.params.id);
        // Return response
        res.status(200).json('User Deleted');
    } catch (error) {
        next(error);
    }
}
