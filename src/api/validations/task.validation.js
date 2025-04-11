const Joi = require('joi');

const createTaskSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'name is required', 
    }),
    
    
    description: Joi.string().required().messages({
        'string.empty': 'description is required', 
    }),
    
    status: Joi.string().required().messages({
        'string.empty': 'status is required', 
    }),

    author : Joi.string().required().messages({
        'string.empty': 'is required', 
    }),
    
});

module.exports = createTaskSchema;
