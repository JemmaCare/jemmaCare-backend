import { PatientResponseModel } from "../models/patient_model.js";
import { UserModel } from "../models/user_model.js";
import { patientResponseValidator, patientUpdateResponseValidator } from "../validators/patient_validator.js";
import { TherapistProfileModel } from "../models/therapist_model.js";


// Matching algorithm
const matchTherapists = async (patientResponse) => {
    try {
        // Find therapists with matching expertise
        const matchingTherapists = await TherapistProfileModel.find({
            expertise: { $in: [patientResponse.therapyType] }
        })
            .populate({
                path: 'userId',
                select: 'firstName lastName email'
            })
            .limit(6);

        return matchingTherapists;
    } catch (error) {
        throw new Error('Error matching therapists: ' + error.message);
    }
};


// Create a patient response
export const createResponse = async (req, res) => {
    try {
        const { error, value } = patientResponseValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Find user in database
        const userId = req.user.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Create patient response
        const patientResponse = await PatientResponseModel.create({
            ...value,
            userId: req.user.id,
        });

        // Match therapists
        const matchedTherapists = await matchTherapists(patientResponse);

        res.status(201).json({
            message: 'Patient response created successfully',
            response: patientResponse,
            matchedTherapists
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all patient responses
export const getResponses = async (req, res) => {
    try {
        const responses = await PatientResponseModel.find().populate('userId', 'firstName lastName email');
        res.status(200).json(responses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single patient response by ID
export const getResponseById = async (req, res) => {
    try {
        const response = await PatientResponseModel.findById(req.params.id).populate('userId', 'firstName lastName');
        if (!response) {
            return res.status(404).json({ message: 'Response not found' });
        }
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a patient response
export const updateResponse = async (req, res) => {
    try {
        const { error, value } = patientUpdateResponseValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const response = await PatientResponseModel.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true });
        if (!response) {
            return res.status(404).json({ message: 'Patient response not found' });
        }
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a patient response
export const deleteResponse = async (req, res) => {
    try {
        const response = await PatientResponseModel.findByIdAndDelete(req.params.id);
        if (!response) {
            return res.status(404).json({ message: 'Patient response not found' });
        }
        res.status(200).json({ message: 'Patient response deleted successfully', response });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};