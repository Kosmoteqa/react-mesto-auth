import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const url = useRef(null);
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: url.current.value,
    });
  }
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={url}
        id="url"
        name="avatar"
        type="url"
        className="popup__input-about popup__input"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="url-error" className="error" />
    </PopupWithForm>
  );
}
