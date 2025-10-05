import Joi from 'joi';

export const bookingValidation = Joi.object({
  slotId: Joi.string().required(),
  serviceId: Joi.string().required(),
  userId: Joi.string().required(),
  date: Joi.date().required(),
});
