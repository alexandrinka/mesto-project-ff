const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-24",
  headers: {
    authorization: "f74a7f73-c173-42db-a0ed-ea5d99dda21e",
    "Content-Type": "application/json",
  },
};

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

export const getDataUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

export const editDataUser = (dataUser) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: dataUser.name,
      about: dataUser.about,
    })
  }).then(handleResponse);
};

export const addDataCards = (dataCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: dataCard.name,
      link: dataCard.link,
    })
  }).then(handleResponse);
};

export const deleteCard = (dataCard) => {
  return fetch(`${config.baseUrl}/cards/${dataCard._id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

export const likeCard = (dataCard) => {
  fetch(`${config.baseUrl}/cards/likes/${dataCard._id}`, {
    method: "PUT",
    headers: config.headers,
  });
};

export const dislikeCard = (dataCard) => {
  fetch(`${config.baseUrl}/cards/likes/${dataCard._id}`, {
    method: "DELETE",
    headers: config.headers,
  });
};
