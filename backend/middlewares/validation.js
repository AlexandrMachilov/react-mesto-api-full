const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const urlValidation = (value, helper) => {
  if (!validator.isURL(value)) {
    return helper.error('string.notURL');
  }
  return value;
};

const registerValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string()
      .default(
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      )
      .custom(urlValidation)
      .messages({ 'string.notURL': 'Некорректный URL' }),
  }),
});

const loginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userDataValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const avatarValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .custom(urlValidation)
      .messages({ 'string.notURL': 'Некорректный URL' }),
  }),
});

const cardValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .custom(urlValidation)
      .messages({ 'string.notURL': 'Некорректный URL' }),
  }),
});

const idValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  registerValidation,
  userDataValidation,
  loginValidation,
  idValidation,
  avatarValidation,
  cardValidation,
};
