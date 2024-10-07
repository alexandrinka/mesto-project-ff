export function createCard({cardData, deleteCard, likeCard, openImagePopup}) {
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
      deleteCard(cardElement);
    });
  
    cardLike.addEventListener("click", function (evt) {
      likeCard(evt.target);
    });
  
    cardImage.addEventListener("click", () =>
      openImagePopup(cardData.link, cardData.name)
    );
  
    return cardElement;
  }
  
  export function likeCard(buttonLike) {
    buttonLike.classList.toggle("card__like-button_is-active");
  }
  
  export function deleteCard(cardElement) {
    cardElement.remove();
  }