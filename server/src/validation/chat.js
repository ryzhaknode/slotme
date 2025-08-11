import Joi from 'joi';

export const createChatSchema = Joi.object({
  otherUserId: Joi.string().uuid().required(),
}).messages({
  'string.base': 'Other User ID must be a string.',
  'string.empty': 'Other User ID cannot be empty.',
  'string.guid': 'Other User ID must be a valid UUID.',
  'any.required': 'Missing required Other User ID',
});
