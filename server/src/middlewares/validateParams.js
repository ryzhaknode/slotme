export const validateParams = (req, res, next) => {
  // Простая валидация параметров
  const params = req.params || {};
  const { id } = params;
  if (!id) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'ID parameter is required'
    });
  }
  next();
};
