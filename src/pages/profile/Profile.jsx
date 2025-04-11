import React, { useState, useEffect } from "react"; // Import useState and useEffect
import styles from "./Profile.module.css";
import { useParams } from "react-router-dom"; // Import useParams
import Avatar from "./avatar";
import RightArrow from "./rightArrow";
import Menu from "../components/menu/Menu";
import db from "../../api/db";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const { tg_id, profile_id } = useParams();
  const userId = tg_id || 0;
  const profileId = profile_id || userId;
  const [user, setUser] = useState(null); // Состояние для хранения данных пользователя
  const [loading, setLoading] = useState(true); // Состояние для отображения индикатора загрузки

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const userData = await db.getUser(userId);
        setUser(userData);
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
        // Можно добавить обработку ошибок (например, отображение сообщения об ошибке)
      } finally {
        setLoading(false); // Загрузка завершена, скрываем индикатор
      }
    };
    fetchInitialData();
  }, [userId]); // Зависимость: useEffect будет вызываться только при изменении tg_id

  const handleCurrentRentalsClick = () => {
    navigate(`/current-rentals/${userId}`);
  };

  const handleSwitchAccountClick = () => {
    navigate(`/switch-account/${userId}`);
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
    <div className={styles.main}>
      {/* header */}

      {/* содержимое */}
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

        {loading ? (
          <div>Загрузка данных пользователя...</div> // Индикатор загрузки
        ) : user ? (
          <>
            {/*<Avatar />*/}
            <div style={{ marginBottom: "20px" }}>
              <img
                src={`${process.env.REACT_APP_API_IMAGE_URL}${user.image}`}
                alt={Avatar}
                style={{
                  width: "82px",
                  height: "82px",
                  objectFit: "cover",
                  borderRadius: "32px",
                }}
              ></img>
            </div>
            <p
              style={{ fontWeight: 700, fontSize: "16px", marginBottom: "5px" }}
            >
              {user.name} {/* Отображаем имя пользователя */}
            </p>
            <span className={styles.userName}>@{user.tg_name}</span>{" "}
            {/* Отображаем ник пользователя */}
            {/* Список кнопок */}
            <div className={styles.buttonList}>
              <div
                className={styles.buttonItem}
                onClick={handleCurrentRentalsClick}
              >
                Текущие аренды <RightArrow />
              </div>

              <div
                className={styles.buttonItem}
                onClick={handleSwitchAccountClick}
              >
                Сменить аккаунт <RightArrow />
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
              <div
                className={styles.buttonItem}
                onClick={handleDeleteAccountClick}
              >
                Удалить аккаунт <RightArrow />
              </div>
            </div>
          </>
        ) : (
          <div>Пользователь не найден.</div> // Сообщение, если пользователь не найден
        )}
      </div>
      <Menu tg_id={userId} />
    </div>
  );
}

export default Profile;
