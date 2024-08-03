import Joi from "joi";
import { countryNames } from "../models/patient_model.js";




export const userValidator= Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username:Joi.string().required(),
    email: Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    role: Joi.string().valid('patient', 'therapist', 'admin').default('patient'),
    termsAndConditions: Joi.boolean().required()

})


export const therapistProfileValidator = Joi.object({
    profilePicture: Joi.string().required(),
    expertise: Joi.string().required(),
    overview:Joi.string().min(50).max(300).required(),
    nationality:Joi.string().valid(...countryNames).required(),
    phone: Joi.string(),
    address: Joi.string(),
    gender: Joi.string().valid('male', 'female'),
    experienceYears:Joi.number().required(),
});


export const patientResponseValidator= Joi.object({
    therapyType: Joi.string().required(),
    age: Joi.number().required(),
    nationality:Joi.string().valid(...countryNames).required(),
    phone: Joi.string(),
    address: Joi.string(),
    gender: Joi.string().valid('male', 'female'),
    previousTherapy: Joi.boolean().required(),
    reason: Joi.string().required(),
    feelings: Joi.string().required(),
})





export const appointmentValidator = Joi.object({
    date:Joi.date().required(),
    time: Joi.string().required(),
    status: Joi.string().valid("pending", "confirmed", "cancelled")
})