import Joi from 'joi';

export const fetchMessagesSchema = Joi.object({
  chatId: Joi.string().uuid().required(),
}).messages({
  'string.base': 'Chat ID must be a string.',
  'string.empty': 'Chat ID cannot be empty.',
  'string.guid': 'Chat ID must be a valid UUID.',
  'any.required': 'Missing required chat ID',
});

export const updateMessageSchema = Joi.object({
  id: Joi.string().uuid().required(),
}).messages({
  'string.base': 'Message ID must be a string.',
  'string.empty': 'Message ID cannot be empty.',
  'string.guid': 'Message ID must be a valid UUID.',
  'any.required': 'Missing required message ID',
});
