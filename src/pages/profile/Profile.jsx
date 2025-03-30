import React, { useState, useEffect } from "react"; // Import useState and useEffect
import styles from "./Profile.module.css";
import { useParams } from "react-router-dom"; // Import useParams
import Avatar from "./avatar";
import RightArrow from "./rightArrow";
import Menu from "../components/menu/Menu";
import db from "../../api/db";

function Profile() {
  const { tg_id } = useParams();
  const userId = tg_id || 0;
  const [user, setUser] = useState(null); // Состояние для хранения данных пользователя
  const [loading, setLoading] = useState(true); // Состояние для отображения индикатора загрузки

  useEffect(() => {
    // useEffect вызывается после рендеринга компонента
    const fetchUser = async () => {
      setLoading(true); // Начинаем загрузку, показываем индикатор

      try {
        const userData = await db.getUser(userId); // Вызываем функцию getUser с tg_id
        setUser(userData); // Обновляем состояние с данными пользователя
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
        // Можно добавить обработку ошибок (например, отображение сообщения об ошибке)
      } finally {
        setLoading(false); // Загрузка завершена, скрываем индикатор
      }
    };

    fetchUser(); // Вызываем функцию fetchUser при монтировании компонента
  }, [userId]); // Зависимость: useEffect будет вызываться только при изменении tg_id

  // Обработчики для кнопок (заглушки)
  const handleCurrentRentalsClick = () => {
    // Действия при нажатии на "Текущие аренды"
    console.log("Переход к текущим арендам");
    // navigate('/current-rentals'); // Пример перенаправления
  };

  const handleSwitchAccountClick = () => {
    // Действия при нажатии на "Сменить аккаунт"
    console.log("Переход к смене аккаунта");
    // navigate('/switch-account'); // Пример перенаправления
  };

  const handleRentalHistoryClick = () => {
    // Действия при нажатии на "История аренд"
    console.log("Переход к истории аренд");
    // navigate('/rental-history'); // Пример перенаправления
  };

  const handleAboutAppClick = () => {
    // Действия при нажатии на "О приложении"
    console.log("Переход к информации о приложении");
    // navigate('/about'); // Пример перенаправления
  };

  const handleDeleteAccountClick = () => {
    // Действия при нажатии на "Удалить аккаунт"
    console.log("Подтверждение удаления аккаунта");
    // navigate('/delete-account'); // Пример перенаправления
  };

  // Отображение информации о пользователе или индикатора загрузки
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
