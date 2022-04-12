import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleStatusChange(e) {
    setStatus(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setStatus(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: status,
    });
  }

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      buttonTitle='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        className='popup__input popup__input_type_name'
        name='name'
        id='profile-name'
        placeholder='Имя'
        autoComplete='off'
        minLength='2'
        maxLength='40'
        required
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className='popup__input-error profile-name-input-error'></span>
      <input
        type='text'
        className='popup__input popup__input_type_status'
        name='status'
        id='profile-status'
        placeholder='Профессиональная деятельность'
        autoComplete='off'
        minLength='2'
        maxLength='200'
        required
        value={status || ''}
        onChange={handleStatusChange}
      />
      <span className='popup__input-error profile-status-input-error'></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
