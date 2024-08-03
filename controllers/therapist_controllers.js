import { TherapistProfileModel } from "../models/therapist_model.js";
import { therapistProfileValidator } from "../validators/all_validators.js";
import { UserModel } from "../models/user_model.js";


// Create a therapist profile
export const createProfile = async (req, res, next) => {
    try {
        const { error, value } = therapistProfileValidator.validate(req.body);
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
    } catch (error) {
        next(error);
    }
};

// Get all therapist profiles
export const getProfiles = async (req, res, next) => {
    try {
        const profiles = await TherapistProfileModel.find().populate('userId', 'firstName lastName email');
        res.status(200).json(profiles);
    } catch (error) {
        next(error);
    }
};

// Get a single therapist profile by ID
export const getProfileById = async (req, res, next) => {
    try {
        const profile = await TherapistProfileModel.findById(req.params.id).populate('userId', 'firstName lastName email');
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
};

// Update a therapist profile
export const updateProfile = async (req, res, next) => {
    try {
        const { error, value } = therapistProfileValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const profile = await TherapistProfileModel.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true });
        if (!profile) {
            return res.status(404).json({ message: 'Therapist profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
};

// Delete a therapist profile
export const deleteProfile = async (req, res, next) => {
    try {
        const profile = await TherapistProfileModel.findByIdAndDelete(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: 'Therapist profile not found' });
        }
        res.status(200).json({ message: 'Therapist profile deleted successfully', profile });
    } catch (error) {
        next(error);
    }
};
