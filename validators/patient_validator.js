import Joi from "joi";




export const patientResponseValidator = Joi.object({
    therapyType: Joi.string().valid("Bipolar", "Depression", "Psychosis", "Personality disorders", "Anxiety","Schizophrenia", "Body Dysmorphic Disorder", "Obsessive Compulsive Disorder", "Postpartum Depression").required(),
    age: Joi.number(),   
    nationality: Joi.string().valid("Ghana", "Nigeria", "Zimbabwe",  "Uganda").required(),
    phone: Joi.string(),
    address: Joi.string(),
    gender: Joi.string().valid('male', 'female'),
    previousTherapy: Joi.boolean().required(),
    feelings: Joi.string().required(),
})



export const patientUpdateResponseValidator = Joi.object({
    therapyType: Joi.string().valid("Bipolar", "Depression", "Psychosis", "Personality disorders", "Schizophrenia", "Body Dysmorphic Disorder", "Obsessive Compulsive Disorder", "Postpartum Depression").required(),
    age: Joi.number()  ,
    nationality: Joi.string().valid("Ghana", "Nigeria", "Zimbabwe",  "Uganda").optional(),
    phone: Joi.string(),
    address: Joi.string(),
    gender: Joi.string().valid('male', 'female'),
    previousTherapy: Joi.boolean().optional(),
    feelings: Joi.string().optional(),
})
