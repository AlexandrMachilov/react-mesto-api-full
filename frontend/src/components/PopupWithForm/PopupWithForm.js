function PopupWithForm({
  name,
  title,
  buttonTitle,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_isopen' : ''} `}>
      <div className='popup__container'>
        <button
          type='button'
          className={`popup__button popup__button_action_close popup__button_action_close-${name} `}
          onClick={onClose}
        ></button>
        <h3 className='popup__title'>{title}</h3>
        <form
          className={`popup__form popup__form_${name}`}
          name={`form-${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type='submit'
            className={`popup__button popup__button_action_submit popup__button_action_${name}`}
          >
            {buttonTitle}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
