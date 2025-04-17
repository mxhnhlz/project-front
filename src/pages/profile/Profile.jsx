// Profile.js
import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { useParams } from "react-router-dom";
import Avatar from "./avatar";
import RightArrow from "./rightArrow";
import Menu from "../components/menu/Menu";
import db from "../../api/db";
import { useNavigate } from "react-router-dom";
import Comments from "./comments/Сomments"; // Import Comments component
import RatingModal from "./rating/RatingModal";
import EditRatingModal from "./rating/EditRatingModal";
function Profile() {
  const navigate = useNavigate();
  const { tg_id, profile_id } = useParams();
  const userId = tg_id || 0;
  const profileId = profile_id || userId;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false); // <-- Добавляем состояние
  const [isOwner, setIsOwner] = useState(userId === profileId); // Проверка, владелец ли
  const [rating, setRating] = useState(null); // <-- Текущий рейтинг, который поставил юзер
  const [showRatingModal, setShowRatingModal] = useState(false); // <-- Отображение окошка с рейтингом
  const [showEditRatingModal, setShowEditRatingModal] = useState(false); // <-- Отображение окошка для редактирования рейтинга

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const userData = await db.getUser(profileId);
        setUser(userData);
        const ratingData = await db.getRate()
        // Получаем рейтинг, который уже поставил текущий юзер этому профилю
        const userRating = await db.getUserRate(userId, profileId);
        setRating(userRating); // Если рейтинга нет, то будет null
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [profileId, userId]);

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

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleOpenRatingModal = () => {
    setShowRatingModal(true);
  };

  const handleCloseRatingModal = () => {
    setShowRatingModal(false);
  };

  const handleRatingSubmit = async (selectedRating) => {
    try {
      // Отправляем рейтинг на сервер (новый)
      await db.createRate(userId, profileId, selectedRating);

      // Обновляем состояние рейтинга
      setRating({
        giver_id: userId,
        receiver_id: profileId,
        score: selectedRating,
      });

      // Закрываем окошко
      handleCloseRatingModal();
    } catch (error) {
      console.error("Ошибка при отправке рейтинга:", error);
      // TODO: Обработка ошибки
    }
  };

  const handleOpenEditRatingModal = () => {
    setShowEditRatingModal(true);
  };

  const handleCloseEditRatingModal = () => {
    setShowEditRatingModal(false);
  };

  const handleRatingUpdate = async (newRating) => {
    try {
      // Обновляем рейтинг на сервере
      await db.updateRate(rating.id, newRating);

      // Обновляем состояние рейтинга
      setRating({
        giver_id: userId,
        receiver_id: profileId,
        score: newRating,
      });

      // Закрываем окошко
      handleCloseEditRatingModal();
    } catch (error) {
      console.error("Ошибка при обновлении рейтинга:", error);
      // TODO: Обработка ошибки
    }
  };

  const handleRatingDelete = async () => {
    try {
      // Удаляем рейтинг с сервера
      await db.deleteRate(rating.id);

      // Обнуляем состояние рейтинга
      setRating(null);

      // Закрываем окошко
      handleCloseEditRatingModal();
    } catch (error) {
      console.error("Ошибка при удалении рейтинга:", error);
      // TODO: Обработка ошибки
    }
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
          <div>Загрузка данных пользователя...</div>
        ) : user ? (
          <>
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
              {user.name}
            </p>
            <span className={styles.userName}>@{user.tg_name}</span>
            {/* Вывод рейтинга */}
            <div>
              Рейтинг: {user.total_rating} ({user.rating_count} оценок)
            </div>

            {/* Кнопка для выставления/редактирования рейтинга */}
            {!isOwner && (
              <>
                {rating ? (
                  <button onClick={handleOpenEditRatingModal}>
                    Ваша оценка: {rating.score}
                  </button>
                ) : (
                  <button onClick={handleOpenRatingModal}>
                    Оставить оценку
                  </button>
                )}
              </>
            )}

            {/* Кнопка "Комментарии" */}
            <button onClick={toggleComments}>
              {showComments ? "Скрыть комментарии" : "Показать комментарии"}
            </button>

            {/* Список кнопок, только для владельца */}
            {isOwner && (
              <div className={styles.buttonList}>
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
                <div
                  className={styles.buttonItem}
                  onClick={handleAboutAppClick}
                >
                  О приложении <RightArrow />
                </div>
                <div
                  className={styles.buttonItem}
                  onClick={handleDeleteAccountClick}
                >
                  Удалить аккаунт <RightArrow />
                </div>
              </div>
            )}
          </>
        ) : (
          <div>Пользователь не найден.</div>
        )}
      </div>

      {/* Компонент комментариев */}
      {showComments && <Comments userId={profileId} currentUserId={userId} />}

      {/* Окошко для выставления рейтинга */}
      {showRatingModal && (
        <RatingModal
          onClose={handleCloseRatingModal}
          onSubmit={handleRatingSubmit}
        />
      )}

      {/* Окошко для редактирования рейтинга */}
      {showEditRatingModal && (
        <EditRatingModal
          onClose={handleCloseEditRatingModal}
          onUpdate={handleRatingUpdate}
          onDelete={handleRatingDelete}
          rating={rating.score} // Передаем текущий рейтинг
        />
      )}

      <Menu tg_id={userId} />
    </div>
  );
}

export default Profile;
