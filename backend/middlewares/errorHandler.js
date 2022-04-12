// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err.stack || err);
  const status = err.statusCode || 500;
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).send({ message: 'Переданы невалидные данные', err });
  }
  if (err.statusCode === 404) {
    return res.status(404).send({ message: err.errorMessage });
  }
  if (err.statusCode === 409) {
    return res.status(409).send({ message: err.errorMessage });
  }
  return res.status(status).send({ message: err.message, err });
};
module.exports = errorHandler;
