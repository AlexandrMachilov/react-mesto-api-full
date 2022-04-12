const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorConflict = require('../errors/ErrorConflict');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const ErrorForbidden = require('../errors/ErrorForbidden');

const { SALT_ROUNDS, JWT_SECRET } = require('../config/config');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new ErrorNotFound(`Пользователь с id ${req.params.id} не найден`);
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ErrorConflict(`Пользователь ${email} уже существует`);
      }
      return bcrypt.hash(password, SALT_ROUNDS);
    })

    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.editUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findById(req.user._id)
    .then((user) => {
      if (req.user._id !== user._id.toString()) {
        throw new ErrorForbidden('Можно редактировать только свои данные');
      }
      User.findByIdAndUpdate(
        req.user._id,
        { name, about },
        {
          new: true,
          runValidators: true,
        },
      )
        .orFail(() => {
          throw new ErrorNotFound(
            `Пользователь с id ${req.user._id} не найден`,
          );
        })
        .then(() => {
          res.send({ data: user });
        });
    })
    .catch(next);
};

module.exports.editUsersAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findById(req.user._id)
    .then((user) => {
      if (req.user._id !== user._id.toString()) {
        throw new ErrorForbidden('Можно редактировать только свои данные');
      }
      User.findByIdAndUpdate(
        req.user._id,
        { avatar },
        {
          new: true,
          runValidators: true,
        },
      )
        .orFail(() => {
          throw new ErrorNotFound(`Пользователь с id ${req.user._id} не найден`);
        })
        .then(() => res.send({ data: user }));
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorUnauthorized('Неправильные email или пароль');
      }
      return bcrypt.compare(password, user.password).then((isValid) => {
        if (!isValid) {
          throw new ErrorUnauthorized('Неправильные email или пароль');
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: '7d',
        });
        res.send({ jwt: token });
      });
    })

    .catch(next);
};

// добавить куки после теста
/* res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      }); */
