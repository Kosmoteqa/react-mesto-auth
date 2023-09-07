import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/Api";
import { auth } from "../utils/AuthApi.js";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isFailInfoTooltipStatus, setIsFailInfoTooltipStatus] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      Promise.all([api.getUserInfo(), api.getAllCards()])
        .then(([data, initialCards]) => {
          setCurrentUser(data);
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isAuth]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setIsAuth(true);
          setEmail(res.data.email);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id != card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(user) {
    api
      .setUserInfo(user)
      .then(() => {
        setCurrentUser({ ...currentUser, name: user.name, about: user.about });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .setAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(userData) {
    if (!userData.email || !userData.password) {
      return;
    }

    auth
      .login(userData)
      .then((data) => {
        if (data.token) {
          setIsAuth(true);
          localStorage.setItem("token", data.token);
          setEmail(userData.email);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsFailInfoTooltipStatus(true);
        setInfoTooltipOpen((state) => !state);
      });
  }

  function handleRegister(userData) {
    if (!userData.email || !userData.password) {
      return;
    }

    auth
      .register(userData)
      .then((data) => {
        setIsFailInfoTooltipStatus(false);
        setInfoTooltipOpen((state) => !state);
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsFailInfoTooltipStatus(true);
        setInfoTooltipOpen((state) => !state);
      });
  }

  function handleExit() {
    setEmail("");
    setIsAuth(false);
    localStorage.removeItem("token");
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onExit={handleExit} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Main
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <PopupWithForm
          name="check"
          title="Вы уверены ?"
          onClose={closeAllPopups}
        ></PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <InfoTooltip
          name={"infotooltip"}
          isOpen={infoTooltipOpen}
          onClose={closeAllPopups}
          err={isFailInfoTooltipStatus}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
