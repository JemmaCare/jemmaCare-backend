import Joi from "joi";
import { countryNames } from "../models/patient_model.js";


export const patientResponseValidator= Joi.object({
    therapyType: Joi.string().valid("Bipolar", "Depression", "Psychosis", "Personality disorders", "Schizophrenia", "Body Dysmorphic Disorder", "Obsessive Compulsive Disorder", "Postpartum Depression").required(),
    age: Joi.number().required(),
    nationality:Joi.string().valid(...countryNames).required(),
    phone: Joi.string(),
    address: Joi.string(),
    gender: Joi.string().valid('male', 'female'),
    previousTherapy: Joi.boolean().required(),
    reason: Joi.string().required(),
    feelings: Joi.string().required(),
})


export const patientUpdateResponseValidator= Joi.object({
    therapyType: Joi.string().valid("Bipolar", "Depression", "Psychosis", "Personality disorders", "Schizophrenia", "Body Dysmorphic Disorder", "Obsessive Compulsive Disorder", "Postpartum Depression").required(),
    age: Joi.number().required(),
    nationality:Joi.string().valid(...countryNames).required(),
    phone: Joi.string(),
    address: Joi.string(),
    gender: Joi.string().valid('male', 'female'),
    previousTherapy: Joi.boolean().required(),
    reason: Joi.string().required(),
    feelings: Joi.string().required(),
})
