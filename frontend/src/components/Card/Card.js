import react from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card({ onCardClick, card, onCardLike, onCardDelete }) {
  const { link, name, likes } = card;
  const currentUser = react.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const cardDeleteButtonClassName = `button element__button element__button_action_delete  ${
    isOwn ? '' : 'element__button_action_delete_hidden'
  }`;

  const isLiked = card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `button element__button element__button_action_like ${
    isLiked ? 'element__button_action_like_active' : ''
  } `;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className='element'>
      <img src={link} alt={name} onClick={handleClick} className='element__image' />
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className='element__description'>
        <h2 className='element__title'>{name}</h2>
        <div className='element__likes-wrapper'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className='element__likes-number'>
            {likes.length !== 0 ? likes.length : ''}
          </p>
        </div>
      </div>
    </article>
  );
}

export default Card;
