import Joi from "joi";


export const therapistProfileValidator = Joi.object({
    profilePicture: Joi.string(),
    expertise: Joi.array().items(
        Joi.string().valid(
            "Bipolar",
            "Depression",
            "Psychosis",
            "Anxiety",
            "Personality disorders",
            "Schizophrenia",
            "Body Dysmorphic Disorder",
            "Obsessive Compulsive Disorder",
            "Postpartum Depression"
        )
    ).min(1).required(),
    overview: Joi.string().min(20).max(300).required(),
    nationality: Joi.string().valid("Ghana", "Nigeria", "Zimbabwe",  "Uganda").required(),
    phone: Joi.string(),
    address: Joi.string(),
    gender: Joi.string().valid('male', 'female'),
    experienceYears: Joi.number().required(),
});




export const therapistUpdateProfileValidator = Joi.object({
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
    ).min(1).optional(),
    overview: Joi.string().min(20).max(300).optional(),
    nationality: Joi.string().valid("Ghana", "Nigeria", "Zimbabwe",  "Uganda").optional(),
    phone: Joi.string(),
    address: Joi.string(),
    gender: Joi.string().valid('male', 'female'),
    experienceYears: Joi.number().optional(),
});
