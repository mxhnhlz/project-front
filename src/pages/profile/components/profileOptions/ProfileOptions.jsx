// ProfileOptions.js
import React from "react";
import styles from "./ProfileOptions.module.css"; // Создадим файл стилей
import RightArrow from "../../rightArrow"; // Импортируем компонент RightArrow
import { useNavigate } from "react-router-dom"; // Импортируем хук useNavigate

function ProfileOptions({ userId }) {
  const navigate = useNavigate();

  const handleCurrentRentalsClick = () => {
    navigate(`/current-rentals/${userId}`);
  };

  const handleRentalHistoryClick = () => {
    navigate(`/rental-history/${userId}`);
  };

  const handleAboutAppClick = () => {
    navigate(`/about-app/${userId}`);
  };

  const handleDeleteAccountClick = () => {
    navigate(`/delete-account/${userId}`);
  };

  return (
    <div className={styles.profileOptions}>
      <div className={styles.buttonList}>
        <div className={styles.buttonItem} onClick={handleCurrentRentalsClick}>
          Текущие аренды <RightArrow />
        </div>
        <div className={styles.buttonItem} onClick={handleRentalHistoryClick}>
          История аренд <RightArrow />
        </div>
        <div className={styles.buttonItem} onClick={handleAboutAppClick}>
          О приложении <RightArrow />
        </div>
        <div className={styles.buttonItem} onClick={handleDeleteAccountClick}>
          Удалить аккаунт <RightArrow />
        </div>
      </div>
    </div>
  );
}

export default ProfileOptions;
