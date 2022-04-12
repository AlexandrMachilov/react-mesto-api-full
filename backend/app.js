const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const { login, createUser } = require('./controllers/users');
const ErrorNotFound = require('./errors/ErrorNotFound');
const { auth } = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const {
  registerValidation,
  loginValidation,
} = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });
  app.listen(PORT);
}

main();

app.post('/signin', loginValidation, login);
app.post('/signup', registerValidation, createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
// eslint-disable-next-line no-unused-vars
app.use((req, res) => {
  throw new ErrorNotFound("Sorry can't find that!");
});
app.use(errors());
app.use(errorHandler);
