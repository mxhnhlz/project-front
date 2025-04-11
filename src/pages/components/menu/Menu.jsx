import React from "react";
import { useNavigate } from "react-router-dom";

import FavButton from "../icons/favButton";
import MainMenu from "../icons/mainMenu";
import ProfileButton from "../icons/profileButton";
import CreateButton from "../icons/CreateButton";
import MessagesButton from "../icons/messagesButton";

import styles from "./menu.module.css";

function Menu({ tg_id }) {
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate(`/Profile/${tg_id}`);
  };
  const goToMessages = () => {
    navigate(`/Messages/${tg_id}`);
  };
  const goToMain = () => {
    navigate(`/${tg_id}`);
  };
  const goToCreate = () => {
    navigate(`/Create/${tg_id}`);
  };
  const goToFav = () => {
    navigate(`/Favorites/${tg_id}`);
  };
  return (
    <div className={styles.footer}>
      <div className={styles.items2}>
        <button onClick={goToMain} className={styles.buttonFooter}>
          <MainMenu />
          <span className={styles.footerSpan}>Главная</span>
        </button>
        <button onClick={goToFav} className={styles.buttonFooter}>
          <FavButton />
          <span className={styles.footerSpan}>Избранное</span>
        </button>
        <button onClick={goToCreate} className={styles.buttonFooter}>
          <CreateButton />
          <span className={styles.footerSpan}>Создать</span>
        </button>

        <button onClick={goToProfile} className={styles.buttonFooter}>
          <ProfileButton />
          <span className={styles.footerSpan}>Профиль</span>
        </button>
      </div>
    </div>
  );
}

export default Menu;
