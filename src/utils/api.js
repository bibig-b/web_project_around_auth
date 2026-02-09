export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
      this._handleResponse = this._handleResponse.bind(this);
    }
  
    _handleResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        method: "GET",
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    setUserInfo(userData) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.about,
        }),
      }).then(this._handleResponse);
    }
  
    addNewCard(cardData) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: cardData.name,
          link: cardData.link,
        }),
      }).then(this._handleResponse);
    }
  
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    likeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    unlikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    setUserAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar,
        }),
      }).then(this._handleResponse);
    }
  }
  
  const api = new Api({
    baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
    headers: {
      authorization: "312a1cc2-b167-4125-82ae-d85df359252d",
        "Content-Type": "application/json", 
    },
  });
  
  export { api };