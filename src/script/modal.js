// Функция для открытия модального окна
export function openPopup(classPopup) {
    const popup = document.querySelector(classPopup);
    popup.classList.add("popup_is-opened");
  }
  
  // Функция для закрытия модального окна
  export function closePopup(popup) {
    const popupForm = popup.querySelector(".popup__form");
    popup.classList.remove("popup_is-opened");
    if (popupForm) popupForm.reset();
  }