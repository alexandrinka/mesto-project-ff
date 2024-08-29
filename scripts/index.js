const dataCards = [
  { name: "Карачевск", link: "./images/card_1.jpg" },
  { name: "Гора Эльбрус", link: "./images/card_2.jpg" },
  { name: "Домбай", link: "./images/card_3.jpg" },
  { name: "Архыз", link: "./images/card_4.jpg" },
  { name: "Карачаево-Черкесская республика", link: "./images/card_5.jpg" },
  { name: "Байкал", link: "./images/card_6.jpg" },
];

const placesList = document.querySelector(".places__list");

function createCard(cardData, deleteCardCallback) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDelete = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardDelete.addEventListener("click", function () {
    deleteCardCallback(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function renderCards(cards) {
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData, deleteCard);
    placesList.append(cardElement);
  });
}

renderCards(dataCards);
