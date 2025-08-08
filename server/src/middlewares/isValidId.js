import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const [paramKey] = Object.keys(req.params);
  const id = req.params[paramKey];

  // Перевірка UUID для PostgreSQL
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  // Перевірка: або число, або UUID
  if (!/^\d+$/.test(id) && !uuidRegex.test(id)) {
    return next(createHttpError(404, `${id} not valid id`));
  }

  next();
};
