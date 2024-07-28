import Joi from "joi";


export const userValidator= Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username:Joi.string().required(),
    email: Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    role: Joi.string().required(),
    termsAndConditions: Joi.boolean(),
});


export const therapistProfileValidator = Joi.object({
    expertise: Joi.string().required(),
    overview:Joi.string().min(50).max(300).required(),
    gender: Joi.string().valid('male', 'female'),
    religion: Joi.string(),
    experienceYears:Joi.number().required(),
});


export const patientResponseValidator= Joi.object({
    therapyType: Joi.string().required(),
    age: Joi.number().required(),
    gender: Joi.string().valid('male', 'female'),
    previousTherapy: Joi.boolean().required(),
    reason: Joi.string().required(),
    feelings: Joi.string().required(),
})


export const articleValidator = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
})


export const appointmentValidator = Joi.object({
    date:Joi.date().required(),
    time: Joi.string().required(),
    status: Joi.string().valid("pending", "confirmed", "cancelled")
})