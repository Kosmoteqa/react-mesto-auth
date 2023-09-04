import React, { useContext } from "react";
import edit from "../images/edit.svg";
import add from "../images/add.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__overlay" onClick={onEditAvatar}>
            <img
              src={currentUser.avatar}
              alt="аватар"
              className="profile__avatar"
            />
          </div>
          <div className="profile__info-text">
            <div className="profile__title-edit-button">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                type="button"
                aria-label="кнопка 'изменить'"
                className="profile__edit-button"
              >
                <img
                  src={edit}
                  alt="кнопка 'изменить'"
                  className="profile__edit-image"
                />
              </button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          aria-label="кнопка 'добавить'"
          className="profile__add-button"
        >
          <img
            src={add}
            alt="кнопка 'добавить'"
            className="profile__add-image"
          />
        </button>
      </section>

      <section className="elements">
        <ul className="elements__cards-list">
          {cards.map((elem) => (
            <Card
              card={elem}
              onCardClick={onCardClick}
              key={elem._id}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

      <div></div>
    </main>
  );
}
