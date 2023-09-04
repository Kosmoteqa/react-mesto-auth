class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _handleResponse(response) {
  
    if (response.ok) {
      return response.json(); 
    }
    return Promise.reject(`Произошла ошибка: ${response.status}`); 
  }
 
  _request(url, options) {

    return fetch(url, options).then(this._handleResponse);
  }

  register(body) {
    return this._request(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  login(body) {
    return this._request(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  checkToken(token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
});
