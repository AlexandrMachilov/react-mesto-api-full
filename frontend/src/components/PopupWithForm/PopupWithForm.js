import Popup from '../Popup/Popup';

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
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h3 className='popup__title'>{title}</h3>
      <form
        className={`popup__form popup__form_${name}`}
        name={`form-${name}`}
        onSubmit={onSubmit}
      >
        {children}
        <button
          type='submit'
          className={`popup__button popup__button_action_submit popup__button_action_${name}`}
        >
          {buttonTitle}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
