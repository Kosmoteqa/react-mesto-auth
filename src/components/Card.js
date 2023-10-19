import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import trash from "../images/Trash.svg";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;
  return (
    <li className="card__item">
      {isOwn && (
        <button
          className="card__delete-button"
          type="button"
          aria-label="удалить"
          onClick={() => onCardDelete(card)}
        >
          <img src={trash} alt="удалить" className="card__delete-image" />
        </button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={() => onCardClick(card)}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-count">
          <button
            onClick={() => onCardLike(card)}
            type="submit"
            aria-label="кнопка лайк"
            className={cardLikeButtonClassName}
          />
          <p className="card__counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
