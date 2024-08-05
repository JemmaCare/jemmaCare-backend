import Joi from "joi";
import { countryNames } from "../models/therapist_model.js";

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