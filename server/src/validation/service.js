import Joi from 'joi';

const serviceValidation = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Service name must be at least 2 characters long',
    'string.max': 'Service name must not exceed 100 characters',
    'any.required': 'Service name is required'
  }),
  description: Joi.string().min(10).max(500).required().messages({
    'string.min': 'Service description must be at least 10 characters long',
    'string.max': 'Service description must not exceed 500 characters',
    'any.required': 'Service description is required'
  }),
  duration: Joi.string().optional().allow('').messages({
    'string.base': 'Duration must be a string'
  }),
  price: Joi.string().optional().allow('').messages({
    'string.base': 'Price must be a string'
  }),
  isActive: Joi.boolean().optional().messages({
    'boolean.base': 'isActive must be a boolean'
  })
});

export { serviceValidation };
