const Joi = require('joi');

const loginSchema = Joi.object(
    {
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).max(20)
    }
)

const registerSchema = Joi.object({
    fullname:Joi.string().required(),
    email:Joi.string().required().email(),
    password:Joi.string().required().min(8).max(20),
    confirmPassword:Joi.ref('password'),
})

const forgetPassword = Joi.object({
    email: Joi.string().required().email()
})

const resetPassword = Joi.object({
    password: Joi.string().required().min(8).max(20),
    confirmPassword: Joi.ref('password')
})

module.exports = {
    loginSchema,
    registerSchema,
    forgetPassword,
    resetPassword,
}