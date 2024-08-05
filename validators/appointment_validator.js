import Joi from "joi";


export const appointmentValidator = Joi.object({
    date:Joi.date().required(),
    time: Joi.string().required(),
    status: Joi.string().valid("pending", "confirmed", "cancelled")
})