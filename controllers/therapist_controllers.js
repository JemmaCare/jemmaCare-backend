import { TherapistProfileModel } from "../models/therapist_model.js";
import { therapistProfileValidator, therapistUpdateProfileValidator } from "../validators/therapist_validator.js";
import { UserModel } from "../models/user_model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


// therapist login function when admin signs up for him
export const loginTherapist = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find therapist user
        const therapist = await UserModel.findOne({ username, role: 'therapist' });

        if (therapist && await bcryptjs.compare(password, therapist.password)) {
            // Generate JWT token
            const token = jwt.sign({ id: therapist._id, role: therapist.role }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });

            // Send token to the client

            return res.status(200).json({
                message: 'Therapist logged in successfully',
                accessToken: token
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Create a therapist profile
export const createProfile = async (req, res) => {
    try {
        const { error, value } = therapistProfileValidator.validate({
            ...req.body,
            profilePicture: req.file.filename,
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Find user in database
        const userId = req.user.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Therapist not found" });
        }

        // Create and save therapist profile
        const profile = await TherapistProfileModel.create({
            ...value,
            userId,
        });

        res.status(201).json({ message: 'Therapist profile created successfully', profile });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all therapist profiles with search and filter
export const getProfiles = async (req, res) => {
    try {
        // Extract query parameters
        const { expertise, gender, nationality, availability } = req.query;

        // Build the query object
        let query = {};

        if (expertise) {
            query.expertise = { $in: [expertise] };
        }
        if (gender) {
            query.gender = gender;
        }
        if (nationality) {
            query.nationality = nationality;
        }
    
        // Find therapists matching the query
        const profiles = await TherapistProfileModel.find(query)
            .populate({
                path: 'userId',
                select: 'firstName lastName email'
            });

        res.status(200).json(profiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single therapist profile by ID
export const getProfileById = async (req, res) => {
    try {
        const profile = await TherapistProfileModel.findById(req.params.id).populate('userId', 'firstName lastName email');
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a therapist profile
export const updateProfile = async (req, res) => {
    try {
        const { error, value } = therapistUpdateProfileValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const profile = await TherapistProfileModel.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true });
        if (!profile) {
            return res.status(404).json({ message: 'Therapist profile not found' });
        }
        res.status(200).json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a therapist profile
export const deleteProfile = async (req, res) => {
    try {
        const profile = await TherapistProfileModel.findByIdAndDelete(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: 'Therapist profile not found' });
        }
        res.status(200).json({ message: 'Therapist profile deleted successfully', profile });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

