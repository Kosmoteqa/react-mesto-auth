import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      className="user-form"
      onSubmit={(e) => {
        e.preventDefault();
        onRegister({ email, password });
      }}
    >
      <p className="user-form__title">Регистрация</p>
      <input
        className="popup__input user-form__input"
        id="input-userEmail"
        name="userEmail"
        type="email"
        placeholder="Email"
        autoComplete="off"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        minLength="5"
        maxLength="25"
      />
      <span className="error"></span>
      <input
        className="popup__input user-form__input"
        id="input-password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <span className="error"></span>
      <button className="user-form__button">Зарегестрироваться</button>
      <p className="user-form__subtitle">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="user-form__link">
          Войти
        </Link>
      </p>
    </form>
  );
}
