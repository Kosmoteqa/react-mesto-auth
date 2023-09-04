import React from "react";

import fail from "../images/success.svg";
import success from "../images/fail.svg";
import crosshair from "../images/crosshair.svg";

export default function InfoTooltip({ name, isOpen, onClose, err }) {
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
        <div className="infotooltip">
          <img
            className="infotooltip__image"
            src={err ? fail : success}
            alt=""
          />
          <p className="infotooltip__text">
            {err
              ? "Что-то пошло не так! Попробуйте еще раз"
              : "Вы успешно зарегистрировались!"}
          </p>
        </div>
      </div>
    </div>
  );
}
