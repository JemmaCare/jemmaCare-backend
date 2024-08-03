import { PatientResponseModel } from "../models/patient_model.js";
import { UserModel } from "../models/user_model.js";
import { patientResponseValidator } from "../validators/all_validators.js";


// Create a patient response
export const createResponse = async (req, res) => {
    try {
        const { error, value } = userValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        // find user in database
        const userId = req.user.id
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const response = await PatientResponseModel.create({
            ...value,
            userId: req.user.id, 
        });
        await response.save();
        res.status(201).send('Patient responbbse created successfully');
    } catch (error) {
       next
    }
};

// Get all patient responses
export const getResponses = async (req, res, next) => {
    try {
        const responses = await PatientResponseModel.find().populate('userId', 'firstName lastName ');
        res.status(200).json(responses);
    } catch (error) {
        next(error);
    }
};

// Get a single patient response by ID
export const getResponseById = async (req, res, next) => {
    try {
        const response = await PatientResponseModel.findById(req.params.id).populate('userId', 'firstName lastName ');
        if (!response) {
            return res.status(404).json({ message: 'Response not found' });
        }
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


// Update a patient response
export const updateResponse = async (req, res, next) => {
    try {
        const { error, value } = patientResponseValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const response = await PatientResponseModel.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true });
        if (!response) {
            return res.status(404).json({ message: 'Patient response not found' });
        }
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

// Delete a patient response
export const deleteResponse = async (req, res, next) => {
    try {
        const response = await PatientResponseModel.findByIdAndDelete(req.params.id);
        if (!response) {
            return res.status(404).json({ message: 'Patient response not found' });
        }
        res.status(200).json({ message: 'Patient response deleted successfully', response });
    } catch (error) {
        next(error);
    }
};