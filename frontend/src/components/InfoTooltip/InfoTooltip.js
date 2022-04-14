import Popup from '../Popup/Popup';

function InfoTooltip({ isOpen, onClose, isDataCorrect }) {
  return (
    <Popup isOpen={isOpen} name='tooltip' onClose={onClose}>
      <div className='popup__tooltip'>
        <div
          className={`popup__tooltip-image ${
            isDataCorrect
              ? 'popup__tooltip-image_type_success'
              : 'popup__tooltip-image_type_error'
          }`}
        />
        <h3 className='popup__title popup__title_type_tooltip'>
          {isDataCorrect
            ? `Вы успешно зарегистрировались!`
            : `Что-то пошло не так!
            Попробуйте ещё раз.`}
        </h3>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
