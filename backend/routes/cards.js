const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { idValidation, cardValidation } = require('../middlewares/validation');

const cardsRoutes = express.Router();

cardsRoutes.get('/', getCards);

cardsRoutes.post('/', cardValidation, express.json(), createCard);

cardsRoutes.delete('/:id', idValidation, deleteCard);

cardsRoutes.put('/:id/likes', idValidation, likeCard);

cardsRoutes.delete('/:id/likes', idValidation, dislikeCard);

module.exports = cardsRoutes;
