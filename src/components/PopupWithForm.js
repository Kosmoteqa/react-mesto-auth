import React from "react";
import crosshair from "../images/crosshair.svg";
export default function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" aria-label="крестик" onClick={onClose}>
          <img
            src={crosshair}
            alt="крестик"
            className="popup__close-button popup__close-image"
          />
        </button>
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className={`popup__form-${name} popup__form`}
          name={name}
          autoComplete="true"
        >
          {children}
          <button
            aria-label="Сохранить"
            type="submit"
            className="popup__button"
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
