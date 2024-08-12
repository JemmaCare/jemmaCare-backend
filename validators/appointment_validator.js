import Joi from "joi";




export const appointmentValidator = Joi.object({
    appointmentDate: Joi.date().required(),
    appointmentTime: Joi.string().required(),
    status: Joi.string().valid("pending", "confirmed", "cancelled"),
    communicationMethod: Joi.string().valid('Video Call', 'Phone Call').required(),

});


export const appointmentUpdateValidator = Joi.object({
    appointmentDate: Joi.date().optional(),
    appointmentTime: Joi.string().optional(),
    status: Joi.string().valid("pending", "confirmed", "cancelled"),
    communicationMethod: Joi.string().valid('Video Call', 'Phone Call', 'In-person').optional(),

});