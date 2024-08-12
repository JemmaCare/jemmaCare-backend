
import { UserModel } from '../models/user_model.js';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";



export const signup = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newAdmin = new UserModel({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role: 'admin',
      termsAndConditions: true
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up', error });
  }
};


export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin user
    const admin = await UserModel.findOne({ username, role: 'admin' });

    if (admin && await bcryptjs.compare(password, admin.password)) {
      // Generate JWT token
      const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });

      return res.status(200).json({
        message: 'Admin logged in successfully',
        accessToken: token
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
