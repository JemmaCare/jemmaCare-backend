import Joi from "joi";




export const appointmentValidator = Joi.object({
    therapistId: Joi.string().required(),
    appointmentDateTime: Joi.string().required(),
    communicationMethod: Joi.string().valid('Video Call', 'Phone Call').required(),

});


export const appointmentUpdateValidator = Joi.object({
    therapistId: Joi.string().optional(),
    appointmentDateTime: Joi.string().optional(),
    communicationMethod: Joi.string().valid('Video Call', 'Phone Call').optional(),

});