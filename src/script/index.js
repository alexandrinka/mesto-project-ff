import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getCards,
  getDataUser,
  editDataUser,
  addCard,
  deleteCardRequest,
  likeCardRequest,
  dislikeCardRequest,
  checkImageUrl,
  editImageUser,
} from "./api.js";

//ПЕРЕМЕННЫЕ

const placesList = document.querySelector(".places__list");
//кнопки открытия
const buttonAddPlace = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonEditImageProfile = document.querySelector(
  ".profile__image-container"
);
// Модальные окна
const popups = document.querySelectorAll(".popup");
const popupAddPlace = document.querySelector(".popup_type_new-card");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupEditProfileImage = document.querySelector(
  ".popup_type_edit-image-profile"
);
const popupImage = document.querySelector(".popup_type_image");
const popupDeleteCard = document.querySelector(".popup_type_delete_card");
//Элементы модального окна с картинками
const imageElement = popupImage.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__caption");
// Кнопки закрытия
const buttonsClosePopup = document.querySelectorAll(".popup__close");
// Переменные формы
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(
  ".popup__input_type_description"
);
const inputNamePlace = document.querySelector(".popup__input_type_card-name");
const inputUrlImage = document.querySelector(".popup__input_type_url");
const inputUrlImageProfile = document.querySelector(
  ".popup__input_type_url_image"
);
// Формы модальных окон
const editProfileForm = popupEditProfile.querySelector(".popup__form");
const addPlaceForm = popupAddPlace.querySelector(".popup__form");
const editImageProfileForm =
  popupEditProfileImage.querySelector(".popup__form");
const deleteCardForm = popupDeleteCard.querySelector(".popup__form");
//ID пользователя
let userId;

//Получение данных карточки и пользователя
Promise.all([getCards(), getDataUser()]).then(([cardData, userData]) => {
  userId = userData._id;
  renderCards(cardData, userId);
  setUserData(userData);
});

//Отрисовка созданных карточек
function renderCards(dataCards, userId) {
  dataCards.forEach((dataCard) => {
    const cardElement = createCard({
      dataCard,
      userId,
      handleDeleteCard,
      handleLikeCard,
      handleDislikeCard,
      openImagePopup,
    });
    placesList.append(cardElement);
  });
}

//Заполнение данных пользователя
function setUserData(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.src = userData.avatar;
  profileImage.alt = userData.name;
}

//Фунцкия удаления карточки
function handleDeleteCard(cardId, cardElement) {
  openPopup(popupDeleteCard);
  deleteCardForm.addEventListener("submit", (evt) => handleFormSubmitDeleteCard(evt, cardId, cardElement));
}

//Постановка лайка
function handleLikeCard(cardId, cardLikeCount, likeButton) {
  likeCardRequest(cardId)
    .then((dataCard) => {
      likeCard(likeButton, cardLikeCount, dataCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

//Снятие лайка
function handleDislikeCard(cardId, cardLikeCount, likeButton) {
  dislikeCardRequest(cardId)
    .then((dataCard) => {
      likeCard(likeButton, cardLikeCount, dataCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

//МОДАЛЬНЫЕ ОКНА

// Обработчики для открытия попапов
buttonAddPlace.addEventListener("click", () => openPopup(popupAddPlace));
buttonEditProfile.addEventListener("click", () => {
  openPopup(popupEditProfile);
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;

  clearValidation(popupEditProfile, validationConfig);
});
buttonEditImageProfile.addEventListener("click", () =>
  openPopup(popupEditProfileImage)
);
function openImagePopup(imageSrc, caption) {
  imageElement.src = imageSrc;
  imageElement.alt = caption;
  imageCaption.textContent = caption;
  openPopup(popupImage);
}

// Обработчики для закрытия попапов
buttonsClosePopup.forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  });
});

// Закрытие попапов при клике вне области
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

// Работа с формами
// Функция обновления данных пользователя
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  const userData = {
    name: inputName.value,
    about: inputDescription.value,
  };
  const buttonSave = popupEditProfile.querySelector(".popup__button");
  buttonSave.textContent = "Сохранение...";
  editDataUser(userData)
    .then((dataUser) => {
      setUserData(dataUser);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSave.textContent = "Сохранить";
    });
  closePopup(popupEditProfile);
}

// Функция добавления карточки
function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const newCardData = {
    name: inputNamePlace.value,
    link: inputUrlImage.value,
  };
  const buttonSave = popupAddPlace.querySelector(".popup__button");
  buttonSave.textContent = "Сохранение...";
  addCard(newCardData)
    .then((dataCard) => {
      const cardElement = createCard({
        dataCard,
        userId,
        handleDeleteCard,
        handleLikeCard,
        handleDislikeCard,
        openImagePopup,
      });
      placesList.prepend(cardElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSave.textContent = "Сохранить";
    });
  addPlaceForm.reset();
  clearValidation(popupAddPlace, validationConfig);
  closePopup(popupAddPlace);
}

function handleFormSubmitEditImage(evt) {
  evt.preventDefault();
  const urlImage = inputUrlImageProfile.value;
  const buttonSave = popupEditProfileImage.querySelector(".popup__button");
  buttonSave.textContent = "Сохранение...";
  checkImageUrl(urlImage)
    .then(() => {
      editImageUser(urlImage)
        .then(() => {
          profileImage.src = urlImage;
          editImageProfileForm.reset();
          clearValidation(popupEditProfileImage, validationConfig);
          closePopup(popupEditProfileImage);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          buttonSave.textContent = "Сохранить";
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleFormSubmitDeleteCard(evt, cardId, cardElement) {
  evt.preventDefault();
  deleteCardRequest(cardId)
    .then(() => {
      deleteCard(cardElement);
      closePopup(popupDeleteCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

editProfileForm.addEventListener("submit", handleFormSubmitEdit);
addPlaceForm.addEventListener("submit", handleFormSubmitAdd);
editImageProfileForm.addEventListener("submit", handleFormSubmitEditImage);

// Валидация форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);
