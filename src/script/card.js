export function createCard({
  cardData,
  userId,
  deleteCard,
  likeCard,
  dislikeCard,
  openImagePopup,
}) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDelete = cardElement.querySelector(".card__delete-button");
  const cardLike = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like_count");

  cardData.likes.map((item) => {
    if (item._id === userId) {
      cardLike.classList.add("card__like-button_is-active");
    }
  });

  if (userId === cardData.owner._id) {
    cardDelete.style.display = "block";
  }

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikeCount.textContent = cardData.likes.length;

  cardDelete.addEventListener("click", () =>
    deleteCard(cardData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  );

  cardLike.addEventListener("click", function (evt) {
    cardData.likes.map((item) => {
      if (item._id === userId || item.length === 0) {
        dislikeCard(cardData).then;
        console.log("убрали лайк с карточки: " + cardData);
        cardData.likes.length--;
      } else {
        likeCard(cardData);
        console.log("поставили лайк на карточку: " + cardData);
        cardData.likes.length++;
      }
    });
    evt.target.classList.toggle("card__like-button_is-active");
  });

  cardImage.addEventListener("click", () =>
    openImagePopup(cardData.link, cardData.name)
  );

  return cardElement;
}
