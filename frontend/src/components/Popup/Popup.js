import { useEffect } from 'react';

const Popup = ({ isOpen, name, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_isopen' : ''} `}
      onClick={handleOverlay}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        {children}

        <button
          type='button'
          className={`popup__button popup__button_action_close popup__button_action_close-${name} `}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Popup;
