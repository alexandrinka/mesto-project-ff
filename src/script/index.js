import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openPopup, closePopup } from "./modal.js";
const placesList = document.querySelector(".places__list");

function createCard(
  cardData,
  deleteCardCallback,
  likeCardCallback,
  imagePopupCallback
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDelete = cardElement.querySelector(".card__delete-button");
  const cardLike = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardDelete.addEventListener("click", function () {
    deleteCardCallback(cardElement);
  });

  cardLike.addEventListener("click", function (evt) {
    likeCardCallback(evt.target);
  });

  cardImage.addEventListener("click", () =>
    imagePopupCallback(cardData.link, cardData.name)
  );

  return cardElement;
}

function likeCard(buttonLike) {
  buttonLike.classList.toggle("card__like-button_is-active");
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function renderCards(cards) {
  cards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      deleteCard,
      likeCard,
      openImagePopup
    );
    placesList.append(cardElement);
  });
}

renderCards(initialCards);

//МОДАЛЬНЫЕ ОКНА

//кнопки открытия
const buttonAddPlace = document.querySelector(".profile__add-button");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const cardsImage = document.querySelectorAll(".card__image");

// Модальные окна
const popupAddPlace = document.querySelector(".popup_type_new-card");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupImage = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup");

// Кнопки закрытия
const buttonsClosePopup = document.querySelectorAll(".popup__close");

// Переменные формы
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(
  ".popup__input_type_description"
);
const inputNamePlace = document.querySelector(".popup__input_type_card-name");
const inputUrlImage = document.querySelector(".popup__input_type_url");

// Обработчики для открытия попапов
buttonAddPlace.addEventListener("click", () =>
  openPopup(".popup_type_new-card")
);
buttonEditProfile.addEventListener("click", () => {
  openPopup(".popup_type_edit");
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
});
function openImagePopup(imageSrc, caption) {
  const popupImage = document.querySelector(".popup_type_image");
  const imageElement = popupImage.querySelector(".popup__image");
  const imageCaption = document.querySelector(".popup__caption");
  imageElement.src = imageSrc;
  imageCaption.textContent = caption;
  popupImage.classList.add("popup_is-opened");
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

// Закрытие попапов по нажатию клавиши Escape
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      if (popup.classList.contains("popup_is-opened")) {
        closePopup(popup);
      }
    });
  }
});

// Работа с формами
// Функция обработки отправки формы
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopup(popupEditProfile); // Закрытие попапа после отправки формы
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const dataCard = {
    name: inputNamePlace.value,
    link: inputUrlImage.value,
  };
  const cardElement = createCard(dataCard, deleteCard);
  placesList.prepend(cardElement);

  closePopup(popupAddPlace); // Закрытие попапа после отправки формы
}

// Добавление обработчика события submit для формы редактирования профиля
const editProfileForm = popupEditProfile.querySelector(".popup__form");
const addPlaceForm = popupAddPlace.querySelector(".popup__form");

editProfileForm.addEventListener("submit", handleFormSubmitEdit);
addPlaceForm.addEventListener("submit", handleFormSubmitAdd);
