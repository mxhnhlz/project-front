// ProfileOptions.js
import React from "react";
import styles from "./ProfileOptions.module.css"; // Создадим файл стилей
import RightArrow from "../../rightArrow"; // Импортируем компонент RightArrow
import { useNavigate } from "react-router-dom"; // Импортируем хук useNavigate

function ProfileOptions({ userId, currentUserId }) {
  const navigate = useNavigate();

  const handleCurrentRentalsClick = () => {
    navigate(`/current-rentals/${currentUserId}`);
  };

  const handleRentalHistoryClick = () => {
    navigate(`/rental-history/${currentUserId}`);
  };

  const handleAboutAppClick = () => {
    navigate(`/about-app/${currentUserId}`);
  };

  const handleMyOffersClick = () => {
    navigate(`/offers/${currentUserId}/${userId}`);
  };

  const handleNewRentsClick = () => {
    navigate(`/new-rents/${currentUserId}`);
  };

  // const handleDeleteAccountClick = () => {
  //   navigate(`/delete-account/${userId}`);
  // };

  return (
    <div className={styles.profileOptions}>
      <div className={styles.buttonList}>
        <div className={styles.buttonItem} onClick={handleMyOffersClick}>
          Объявления <RightArrow />
        </div>
        {currentUserId === userId ? (
          <div>
            <div className={styles.buttonItem} onClick={handleNewRentsClick}>
              Входящие аренды <RightArrow />
            </div>
            <div
              className={styles.buttonItem}
              onClick={handleCurrentRentalsClick}
            >
              Текущие аренды <RightArrow />
            </div>
            <div
              className={styles.buttonItem}
              onClick={handleRentalHistoryClick}
            >
              История аренд <RightArrow />
            </div>
            <div className={styles.buttonItem} onClick={handleAboutAppClick}>
              О приложении <RightArrow />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default ProfileOptions;
