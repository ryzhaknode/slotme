import Joi from 'joi';

import { regex } from '../constants/user.js';

const { emailRegexp } = regex;

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
}).messages({
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
  'string.email': 'Field {#label} must be a valid email address.',
  'any.required': 'missing required {#label} field',
});

export const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
}).messages({
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
  'string.email': 'Field {#label} must be a valid email address.',
  'any.required': 'missing required {#label} field',
});

export const sendCodeSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
}).messages({
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
  'string.email': 'Field {#label} must be a valid email address.',
  'any.required': 'missing required {#label} field',
});

export const verifyCodeSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  code: Joi.string().length(6).required(),
}).messages({
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
  'any.required': 'missing required {#label} field',
});
