export function createCard({
  dataCard,
  userId,
  handleDeleteCard,
  handleLikeCard,
  handleDislikeCard,
  openImagePopup,
}) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like_count");

  //Заполнение данных карточки
  cardTitle.textContent = dataCard.name;
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardLikeCount.textContent = dataCard.likes.length;

  //Отображение поставленного лайка
  dataCard.likes.map((item) => {
    if (item._id === userId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });

  //Отображение иконки удаления на своих карточках
  if (userId === dataCard.owner._id) {
    deleteButton.style.display = "block";
  }

  //Удаление карточки
  deleteButton.addEventListener("click", () =>
    handleDeleteCard(dataCard._id, cardElement)
  );

  //Лайк и диздайк карточки
  likeButton.addEventListener("click", function (evt) {
    if (dataCard.likes.length == 0) {
      handleLikeCard(dataCard._id, cardLikeCount, evt.target);
    } else {
      const isLiked = dataCard.likes.some((item) => item._id === userId);
      if (isLiked) {
        handleDislikeCard(dataCard._id, cardLikeCount, evt.target);
      } else {
        handleLikeCard(dataCard._id, cardLikeCount, evt.target);
      }
    }
  });

  //Открытие попапа при клике на картинку карточки
  cardImage.addEventListener("click", () =>
    openImagePopup(dataCard.link, dataCard.name)
  );

  return cardElement;
}

export function likeCard(buttonLike, cardLikeCount, dataCard) {
  buttonLike.classList.toggle("card__like-button_is-active");
  cardLikeCount.textContent = dataCard.likes.length;
}

export function deleteCard(elementCard) {
  elementCard.remove();
}
