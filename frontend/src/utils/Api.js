class Api {
  constructor({ adress, cohortID, token }) {
    this.adress = adress;
    this.cohortID = cohortID;
    this.token = token;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfileInfo() {
    return fetch(`${this.adress}/v1/${this.cohortID}/users/me`, {
      headers: {
        authorization: this.token,
      },
    }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this.adress}/v1/${this.cohortID}/cards`, {
      headers: {
        authorization: this.token,
      },
    }).then(this._getResponseData);
  }

  editProfileData(data) {
    return fetch(`${this.adress}/v1/${this.cohortID}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponseData);
  }

  createCard(data) {
    return fetch(`${this.adress}/v1/${this.cohortID}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(data) {
    return fetch(`${this.adress}/v1/${this.cohortID}/cards/${data._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
      },
    }).then(this._getResponseData);
  }

  /*   likeCard(id) {
    return fetch(`${this.adress}/v1/${this.cohortID}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: this.token,
      },
    }).then(this._getResponseData);
  }

  deleteLike(id) {
    return fetch(`${this.adress}/v1/${this.cohortID}/cards/${id}/likes`, {
      data._id
      method: "DELETE",
      headers: {
        authorization: this.token,
      },
    }).then(this._getResponseData);
  } */

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this.adress}/v1/${this.cohortID}/cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this.token,
        },
      }).then(this._getResponseData);
    } else {
      return fetch(`${this.adress}/v1/${this.cohortID}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: this.token,
        },
      }).then(this._getResponseData);
    }
  }

  editAvatar(data) {
    return fetch(`${this.adress}/v1/${this.cohortID}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getResponseData);
  }
}

const api = new Api({
  adress: 'https://mesto.nomoreparties.co',
  cohortID: 'cohort-32',
  token: '6d2de758-1877-4081-94a9-68820dbef110',
});

export default api;
