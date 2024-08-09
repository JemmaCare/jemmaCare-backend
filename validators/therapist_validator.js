import Joi from "joi";
import { countryNames } from "../models/therapist_model.js";

export const therapistProfileValidator = Joi.object({
    profilePicture: Joi.string(),
    expertise: Joi.array().items(
        Joi.string().valid(
            "Bipolar", 
            "Depression", 
            "Psychosis", 
            "Personality disorders", 
            "Schizophrenia", 
            "Body Dysmorphic Disorder", 
            "Obsessive Compulsive Disorder", 
            "Postpartum Depression"
        )
    ).min(1).required(),
    overview: Joi.string().min(20).max(300).required(),
    nationality: Joi.string().valid(...countryNames).required(),
    phone: Joi.string(),
    address: Joi.string(),
    gender: Joi.string().valid('male', 'female'),
    experienceYears: Joi.number().required(),
});
