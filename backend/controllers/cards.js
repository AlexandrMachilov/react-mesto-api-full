const Card = require('../models/card');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorForbidden = require('../errors/ErrorForbidden');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => {
      throw new ErrorNotFound(`Карточка с id ${req.params.id} не найдена`);
    })
    .then((card) => {
      if (req.user._id !== card.owner.toString()) {
        throw new ErrorForbidden('Можно удалять только свои карточки');
      }
      Card.findByIdAndRemove(req.params.id)
        .orFail(() => {
          throw new ErrorNotFound(`Карточка с id ${req.params.id} не найдена`);
        })
        .then(() => {
          res.send({ data: card });
        });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, {
    $addToSet: { likes: req.user._id },
  })
    .orFail(() => {
      throw new ErrorNotFound(`Карточка с id ${req.params.id} не найдена`);
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrorNotFound(`Карточка с id ${req.params.id} не найдена`);
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};
