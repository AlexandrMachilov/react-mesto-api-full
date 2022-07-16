/* const BASE_URL = process.env.MESTO_BASE_URL || 'http://localhost:3001'; */
const BASE_URL = 'https://api.mesto.ypraktikum.nomoredomains.work';
class Api {
  constructor({ adress }) {
    this.adress = adress;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfileInfo() {
    return fetch(`${this.adress}/users/me`, {
      headers: {
        authorization: getToken(),
      },
    }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this.adress}/cards`, {
      headers: {
        authorization: getToken(),
      },
    }).then(this._getResponseData);
  }

  editProfileData(data) {
    return fetch(`${this.adress}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: getToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponseData);
  }

  createCard(data) {
    return fetch(`${this.adress}/cards`, {
      method: 'POST',
      headers: {
        authorization: getToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(data) {
    return fetch(`${this.adress}/cards/${data._id}`, {
      method: 'DELETE',
      headers: {
        authorization: getToken(),
      },
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this.adress}/cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          authorization: getToken(),
        },
      }).then(this._getResponseData);
    } else {
      return fetch(`${this.adress}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: getToken(),
        },
      }).then(this._getResponseData);
    }
  }

  editAvatar(data) {
    return fetch(`${this.adress}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: getToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getResponseData);
  }
}
const getToken = () => {
  return `Bearer ${localStorage.getItem('token')}`;
};

const api = new Api({
  /* adress: 'https://api.mesto.ypraktikum.nomoredomains.work', */
  /* adress: 'http://localhost:3001', */
  adress: BASE_URL,
});

export default api;
