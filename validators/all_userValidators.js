import Joi from "joi";

export const userValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('patient', 'therapist', 'admin').default('patient'),
    termsAndConditions: Joi.boolean().required()

})



export const loginValidator = Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6).required(),
}).xor('username', 'email');



export const forgotPasswordValidator = Joi.object({
    email: Joi.string().email().required(),
});


export const resetPasswordValidator = Joi.object({
    resetToken: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});


export const createUserValidator = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required().valid('admin', 'therapist'),
});


export const updateUserValidator = Joi.object({
    name: Joi.string(),
    role: Joi.string().valid('admin', 'therapist'),
});









