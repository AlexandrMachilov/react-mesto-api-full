import { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleAddName(e) {
    setName(e.target.value);
  }
  function handleAddLink(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name='add'
      title='Новое место'
      buttonTitle='Добавить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        className='popup__input popup__input_type_place-name'
        name='name'
        id='place-name'
        placeholder='Название'
        autoComplete='off'
        minLength='2'
        maxLength='30'
        required
        onChange={handleAddName}
        value={name || ''}
      />
      <span className='popup__input-error place-name-input-error'></span>
      <input
        type='url'
        className='popup__input popup__input_type_place-url'
        name='url'
        id='place-url'
        placeholder='Ссылка на картинку'
        required
        onChange={handleAddLink}
        value={link || ''}
      />
      <span className='popup__input-error place-url-input-error'></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
