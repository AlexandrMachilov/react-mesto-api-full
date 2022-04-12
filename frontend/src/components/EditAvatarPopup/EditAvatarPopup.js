import { useEffect, useRef } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      buttonTitle='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='url'
        className='popup__input popup__input_type_edit-avatar'
        name='avatar'
        id='edit-avatar'
        placeholder='Ссылка на аватар'
        autoComplete='on'
        minLength='2'
        maxLength='200'
        required
        ref={inputRef}
      />
      <span className='popup__input-error edit-avatar-input-error'></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
