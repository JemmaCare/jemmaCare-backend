import Joi from "joi";
import { countryNames } from "../models/patient_model.js";



export const patientResponseValidator = Joi.object({
    therapyType: Joi.string().valid("Bipolar", "Depression", "Psychosis", "Personality disorders", "Anxiety","Schizophrenia", "Body Dysmorphic Disorder", "Obsessive Compulsive Disorder", "Postpartum Depression").required(),
    age: { 
        type: [Number], 
        required: true, 
        validate: {
            validator: function(v) {
                // Check that the array has two elements and the first number is less than the second
                return Array.isArray(v) && v.length === 2 && v[0] < v[1];
            },
            message: props => `Age range should consist of two numbers where the first number (${props.value[0]}) is less than the second (${props.value[1]}).`
        }
    },
    nationality: Joi.string().valid(...countryNames).required(),
    phone: Joi.string(),
    languages: Joi.array().items(Joi.string()).required(),
    address: Joi.string(),
    gender: Joi.string().valid('male', 'female'),
    previousTherapy: Joi.boolean().required(),
    reason: Joi.string().required(),
    feelings: Joi.string().required(),
})



export const patientUpdateResponseValidator = Joi.object({
    therapyType: Joi.string().valid("Bipolar", "Depression", "Psychosis", "Personality disorders", "Schizophrenia", "Body Dysmorphic Disorder", "Obsessive Compulsive Disorder", "Postpartum Depression").required(),
    age: Joi.number().optional(),
    nationality: Joi.string().valid(...countryNames).optional(),
    phone: Joi.string(),
    languages: Joi.array().items(Joi.string()),
    address: Joi.string(),
    gender: Joi.string().valid('male', 'female'),
    previousTherapy: Joi.boolean().optional(),
    reason: Joi.string().optional(),
    feelings: Joi.string().optional(),
})
