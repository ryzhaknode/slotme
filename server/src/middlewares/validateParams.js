import createHttpError from 'http-errors';

export const validateParams = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.params, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    const responseError = createHttpError(400, 'Bad Request', {
      errors: error.details,
    });
    next(responseError);
  }
};
