import React from "react";
import logo from "../images/Vector.svg";
import { Link, Route, Routes } from "react-router-dom";
export default function Header({ email, onExit }) {
  return (
    <header className="header">
      <div>
        <img src={logo} alt="Логотип" className="header__logo" />
      </div>
      <div>
      <div>
          {email && <span className="header__email">{email}</span>}
          <Routes>
            <Route
              path="/sign-up"
              element={
                <Link className="user-form__sign" to={"/sign-in"}>
                  Войти
                </Link>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Link className="user-form__sign" to={"/sign-up"}>
                  Регистрация
                </Link>
              }
            />
            <Route
              path="/"
              element={
                <Link
                  className="header__exit"
                  onClick={onExit}
                  to={"/sign-in"}
                  replace
                >
                  Выйти
                </Link>
              }
            />
          </Routes>
        </div>
      </div>
    </header>
  );
}
