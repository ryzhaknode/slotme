import Joi from 'joi';

export const createChatSchema = Joi.object({
  otherUserId: Joi.string().required(),
}).messages({
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
  'any.required': 'missing required {#label} field',
});
