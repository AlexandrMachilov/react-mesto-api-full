// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = status === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(status).send({ message });
  return next();
};

module.exports = errorHandler;
