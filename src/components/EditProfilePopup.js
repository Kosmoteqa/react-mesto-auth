import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="popup__input-span">
        <input
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          id="input-name"
          name="name"
          type="text"
          className="popup__input-name popup__input"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          required
        />
        <span id="input-name-error" className="error" />
      </div>
      <div className="popup__input-span">
        <input
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
          id="input-about"
          name="about"
          type="text"
          className="popup__input-about popup__input"
          placeholder="О себе"
          minLength={2}
          maxLength={200}
          required
        />
        <span id="input-about-error" className="error" />
      </div>
    </PopupWithForm>
  );
}
