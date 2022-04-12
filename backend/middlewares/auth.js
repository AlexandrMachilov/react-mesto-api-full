const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrorUnauthorized('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return next(new ErrorUnauthorized('Необходима авторизация'));
  }
  req.user = payload;

  next();
};
