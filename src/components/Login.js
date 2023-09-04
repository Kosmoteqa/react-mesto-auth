import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      className="user-form"
      onSubmit={(e) => {
        e.preventDefault();
        onLogin({ email, password });
      }}
    >
      <p className="user-form__title">Вход</p>
      <input
        className="popup__input user-form__input"
        id="input-userEmail"
        name="userEmail"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="off"
        minLength="5"
        maxLength="25"
      />
      <span className="error"></span>
      <input
        className="popup__input user-form__input"
        id="input-password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Пароль"
      />
      <span className="error"></span>
      <button className="user-form__button">Войти</button>
    </form>
  );
}
