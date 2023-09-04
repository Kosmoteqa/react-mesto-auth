import React from "react";
import crosshair from "../images/crosshair.svg";
export default function ImagePopup({ onClose, card }) {
  return (
    <div className={`popup popup-image ${card ? "popup_opened" : ""}`}>
      <div className="popup-image__container">
        <button
          className="popup-image__close"
          type="button"
          aria-label="крестик"
          onClick={onClose}
        >
          <img
            src={crosshair}
            alt="крестик"
            className="popup__close-button popup-image__close-image"
          />
        </button>
        <img src={card?.link} alt={card?.name} className="popup-image__photo" />
        <p className="popup-image__info">{card?.name}</p>
      </div>
    </div>
  );
}
