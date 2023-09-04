import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }
  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-span">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="input-title"
          name="name"
          type="text"
          className="popup__input-name popup__input-name_add popup__input"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required
        />
        <span id="input-title-error" className="error" />
      </div>
      <div className="popup__input-span">
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          id="input-link"
          name="link"
          type="url"
          className="popup__input-about popup__input-about_add popup__input"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="input-link-error" className="error" />
      </div>
    </PopupWithForm>
  );
}
