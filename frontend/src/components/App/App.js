import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ImagePopup from '../ImagePopup/ImagePopup';
import Main from '../Main/Main';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import api from '../../utils/Api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as Auth from '../../utils/Auth.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isDataCorrect, setIsDataCorrect] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCards(cards);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log('Ошибка', err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log('Ошибка', err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card)
      .then(() => {
        setCards((newCards) => newCards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log('Ошибка', err);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardCLick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(currentUser) {
    api
      .editProfileData(currentUser)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка', err);
      });
  }

  function handleUpdateAvatar(currentUser) {
    api
      .editAvatar(currentUser)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка', err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .createCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка', err);
      });
  }

  function handleLogin(formData) {
    Auth.authorize(formData.password, formData.email)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setIsDataCorrect(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleRegister(formData) {
    Auth.register(formData.password, formData.email)
      .then(() => {
        setIsDataCorrect(true);
        navigate('./sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsDataCorrect(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      Auth.checkToken(token)
        .then((res) => {
          if (res) {
            setUserEmail(res.data.email);
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log('Ошибка', err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  function handleExit() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserEmail('');
    navigate('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__container'>
          <Header isLoggedIn={isLoggedIn} userEmail={userEmail} handleExit={handleExit} />

          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardCLick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path='/sign-up'
              element={<Register handleRegister={handleRegister} />}
            />
            <Route path='/sign-in' element={<Login handleLogin={handleLogin} />} />
          </Routes>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm
            name='confirm'
            title='Вы уверены?'
            buttonTitle='Да'
          ></PopupWithForm>

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isDataCorrect={isDataCorrect}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
