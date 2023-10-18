export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _req(url, options) {
    return fetch(url, options).then(this._handleRes);
  }

  _handleRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("error");
  }

  getUserInfo() {
    return this._req(`${this._url}/users/me`, {
      headers: this._headers,
      method: "GET",
    });
  }

  getAllCards() {
    return this._req(`${this._url}/cards`, {
      headers: this._headers,
      method: "GET",
    });
  }

  setUserInfo(data) {
    return this._req(`${this._url}/users/me `, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  addNewCard(data) {
    return this._req(`${this._url}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  deleteCard(id) {
    return this._req(`${this._url}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  setAvatar(data) {
    return this._req(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this._req(`${this._url}/cards/${id}/likes `, {
        headers: this._headers,
        method: "PUT",
      });
    } else {
      return this._req(`${this._url}/cards/${id}/likes `, {
        headers: this._headers,
        method: "DELETE",
      });
    }
  }
}
export const api = new Api({
  url: "https://api.mesto-roma.nomoredomainsrocks.ru",
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    "Content-type": "application/json",
  },
});
