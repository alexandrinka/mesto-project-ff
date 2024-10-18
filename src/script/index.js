import "../pages/index.css";
import { createCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getCards,
  getDataUser,
  editDataUser,
  addDataCards,
  deleteCard,
  likeCard,
  dislikeCard,
} from "./api.js";
const placesList = document.querySelector(".places__list");

let userId;

Promise.all([getCards(), getDataUser()]).then(([cardData, userData]) => {
  userId = userData._id;
  renderCards(cardData, userId);
  updateUserInfo(userData);
});

function updateUserInfo(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.src = userData.avatar;
  profileImage.alt = userData.name;
}

function renderCards(cards, userId) {
  cards.forEach((cardData) => {
    const cardElement = createCard({
      cardData,
      userId,
      deleteCard,
      likeCard,
      dislikeCard,
      openImagePopup,
    });
    placesList.append(cardElement);
  });
}

//МОДАЛЬНЫЕ ОКНА

//кнопки открытия
const buttonAddPlace = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");

// Модальные окна
const popupAddPlace = document.querySelector(".popup_type_new-card");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup");

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

// Обработчики для открытия попапов
buttonAddPlace.addEventListener("click", () => openPopup(popupAddPlace));
buttonEditProfile.addEventListener("click", () => {
  openPopup(popupEditProfile);
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;

  clearValidation(popupEditProfile, validationConfig);
});
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
// Функция обработки отправки формы
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  const userData = {
    name: inputName.value,
    about: inputDescription.value,
  };
  editDataUser(userData)
    .then((dataUser) => {
      updateUserInfo(dataUser);
    })
    .catch((err) => {
      console.log(err);
    });

  closePopup(popupEditProfile); // Закрытие попапа после отправки формы
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const newCardData = {
    name: inputNamePlace.value,
    link: inputUrlImage.value,
  };
  addDataCards(newCardData)
    .then((cardData) => {
      const cardElement = createCard({
        cardData,
        userId,
        deleteCard,
        likeCard,
        dislikeCard,
        openImagePopup,
      });
      placesList.prepend(cardElement);
    })
    .catch((err) => {
      console.log(err);
    });
  addPlaceForm.reset();
  clearValidation(popupAddPlace, validationConfig);

  closePopup(popupAddPlace); // Закрытие попапа после отправки формы
}

// Добавление обработчика события submit для формы редактирования профиля
const editProfileForm = popupEditProfile.querySelector(".popup__form");
const addPlaceForm = popupAddPlace.querySelector(".popup__form");

editProfileForm.addEventListener("submit", handleFormSubmitEdit);
addPlaceForm.addEventListener("submit", handleFormSubmitAdd);

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
