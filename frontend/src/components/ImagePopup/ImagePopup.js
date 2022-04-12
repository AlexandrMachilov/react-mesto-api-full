function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_show-image ${
        !!card.name && !!card.link ? "popup_isopen" : ""
      }`}
    >
      <figure className="popup__figure">
        <button
          type="button"
          className="popup__button popup__button_action_close popup__button_action_close-image"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
