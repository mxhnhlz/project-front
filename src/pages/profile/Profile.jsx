import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { useParams } from "react-router-dom";
import Avatar from "./avatar";
import RightArrow from "./rightArrow";
import Menu from "../components/menu/Menu";
import db from "../../api/db";

function Profile() {
  const { tg_id } = useParams();
  const userId = tg_id || 0;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentRentals, setCurrentRentals] = useState([]);
  const [rentalHistory, setRentalHistory] = useState([]);
  const [showCurrentRentalsPopup, setShowCurrentRentalsPopup] = useState(false);
  const [showRentalHistoryPopup, setShowRentalHistoryPopup] = useState(false);
  const [showAboutPopup, setShowAboutPopup] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const userData = await db.getUser(userId);
        setUser(userData);

        const allRents = await db.getAllRents(userId);
        setCurrentRentals(allRents.currentRents);
        setRentalHistory(allRents.pastRents);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [userId]);

  const handleRentalHistoryClick = () => {
    setShowRentalHistoryPopup(true);
  };

  const handleCurrentRentalsClick = () => {
    setShowCurrentRentalsPopup(true);
  };

  const handleAboutAppClick = () => {
    setShowAboutPopup(true);
  };

  const handleUpdateAccountClick = () => {
    console.log("Подтверждение удаления аккаунта");
  };

  const closeCurrentRentalsPopup = () => {
    setShowCurrentRentalsPopup(false);
  };

  const closeRentalHistoryPopup = () => {
    setShowRentalHistoryPopup(false);
  };

  const closeAboutPopup = () => {
    setShowAboutPopup(false);
  };

  return (
    <div className={styles.main}>
      {loading ? (
        <div>Загрузка данных пользователя...</div>
      ) : user ? (
        <div className={styles.content}>
          <p
            style={{
              fontWeight: 700,
              fontSize: "14px",
              marginBottom: "28px",
              marginTop: "15px",
            }}
          >
            Ваш профиль
          </p>
          <div style={{ marginBottom: "20px" }}>
            <img
              src={`${process.env.REACT_APP_API_IMAGE_URL}${user.image}`}
              alt={Avatar}
            />
          </div>
          <p style={{ fontWeight: 700, fontSize: "16px", marginBottom: "5px" }}>
            {user.name}
          </p>
          <span className={styles.userName}>@{user.tg_name}</span>
          <div className={styles.buttonList}>
            <div
              className={styles.buttonItem}
              onClick={handleUpdateAccountClick}
            >
              Изменить профиль
              <RightArrow />
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
        </div>
      ) : (
        <div>Пользователь не найден.</div>
      )}

      {showCurrentRentalsPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Текущие аренды</h2>
            {currentRentals.length > 0 ? (
              <ul>
                {currentRentals.map((rent) => (
                  <li key={rent.id}>
                    {rent.user_id == userId
                      ? "Взято в аренду"
                      : "Отдано в аренду"}
                    <br />
                    {rent.title} - {rent.start_date} - {rent.end_date}
                  </li>
                ))}
              </ul>
            ) : (
              <div>Нет текущих аренд.</div>
            )}
            <button onClick={closeCurrentRentalsPopup}>Закрыть</button>
          </div>
        </div>
      )}

      {showRentalHistoryPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>История аренд</h2>
            {rentalHistory.length > 0 ? (
              <ul>
                {rentalHistory.map((rent) => (
                  <li key={rent.id}>
                    {rent.title} - {rent.start_date} - {rent.end_date}
                  </li>
                ))}
              </ul>
            ) : (
              <div>Нет истории аренд.</div>
            )}
            <button onClick={closeRentalHistoryPopup}>Закрыть</button>
          </div>
        </div>
      )}
      {showAboutPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>О приложении</h2>
            <p>
              Наше приложение - это платформа, где вы можете легко и безопасно
              арендовать и сдавать вещи в аренду. Мы предлагаем широкий выбор
              предложений, удобный поиск и надежные инструменты для организации
              процесса аренды. Присоединяйтесь к нашему сообществу и откройте
              для себя новые возможности!
            </p>
            <button onClick={closeAboutPopup}>Закрыть</button>
          </div>
        </div>
      )}

      <Menu tg_id={userId} />
    </div>
  );
}

export default Profile;
