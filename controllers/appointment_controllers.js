import { AppointmentModel } from "../models/appointment_model.js";
import { appointmentValidator } from "../validators/appointment_validator.js";
import { UserModel } from "../models/user_model.js";
import { appointmentUpdateValidator } from "../validators/appointment_validator.js";
import { mailTransport } from "../config/mail.js";


// Create Appointment
export const createAppointment = async (req, res) => {
    try {
        // Validate the request body
        const { error, value } = appointmentValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Fetching patient and therapist details
        const patient = await UserModel.findById(req.user.id);
        const therapist = await UserModel.findById(value.therapistId);

        if (!patient || !therapist) {
            return res.status(404).json({ message: 'Patient or Therapist not found' });
        }

        // Create a new appointment using the validated data
        const appointment = await AppointmentModel.create({
            userId: req.user.id,
            ...value
        });




        // Send confirmation email to the patient
        await mailTransport.sendMail({
            to: patient.email,
            subject: "Appointment Confirmation",
            text: `Dear ${patient.firstName} ${patient.lastName},\n\nYour appointment with ${therapist.firstName} ${therapist.lastName} has been confirmed for ${appointment.appointmentDate} at ${appointment.appointmentTime}.\n\nType of Therapy: ${appointment.therapyType}\nCommunication Method: ${appointment.communicationMethod}\n\nThank you!`
        });

        // Send notification email to the therapist
        await mailTransport.sendMail({
            to: therapist.email,
            subject: "New Appointment Scheduled",
            text: `Dear ${therapist.firstName} ${therapist.lastName},\n\nYou have a new appointment with ${patient.firstName} ${patient.lastName} scheduled for ${appointment.appointmentDate} at ${appointment.appointmentTime}.\n\nType of Therapy: ${appointment.therapyType}\nCommunication Method: ${appointment.communicationMethod}\n\nPlease be prepared.\n\nThank you!`
        });

        // Send the created appointment as the response
        res.status(201).json(appointment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get All Appointments
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await AppointmentModel.find().populate('userId therapistId');
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Single Appointment
export const getAppointmentById = async (req, res) => {
    try {
        const appointment = await AppointmentModel.findById(req.params.id).populate('userId therapistId');
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        res.json(appointment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Appointment
export const updateAppointment = async (req, res) => {
    try {
        // Validate the request body
        const { error, value } = appointmentUpdateValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Find and update the appointment
        const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
            req.params.id,
            value,
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json(updatedAppointment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Delete Appointment
export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await AppointmentModel.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        res.json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


