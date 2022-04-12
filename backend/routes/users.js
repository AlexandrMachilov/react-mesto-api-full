const express = require('express');
const {
  getUsers,
  getUserById,
  editUser,
  editUsersAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  idValidation,
  userDataValidation,
  avatarValidation,
} = require('../middlewares/validation');

const usersRoutes = express.Router();

usersRoutes.get('/', getUsers);

usersRoutes.get('/me', getCurrentUser);

usersRoutes.get('/:id', idValidation, getUserById);

usersRoutes.patch('/me', userDataValidation, editUser);

usersRoutes.patch('/me/avatar', avatarValidation, editUsersAvatar);

module.exports = usersRoutes;
