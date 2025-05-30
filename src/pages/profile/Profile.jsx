// Profile.js
import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { useParams } from "react-router-dom";
import Avatar from "./avatar";
import Menu from "../components/menu/Menu";
import db from "../../api/db";
import { useNavigate } from "react-router-dom";
import Comments from "./components/comments/Сomments";
import ProfileOptions from "./components/profileOptions/ProfileOptions"; // Импортируем компонент ProfileOptions
import Rating from "./components/rating/Rating";
import Stars from "./components/Stars/Stars";

function Profile() {
  const navigate = useNavigate();
  const { tg_id, profile_id } = useParams();
  const userId = tg_id || 0;
  const profileId = profile_id || userId;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avg, setAvg] = useState(0.0);
  const [isOwner, setIsOwner] = useState(true); // Проверка, владелец ли
  const [isRelated, setIsRelated] = useState(false);
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const userData = await db.getUser(profileId);
        setUser(userData);
        setIsOwner(userId === profileId);
        if (userId !== profileId) {
          const relateData = await db.isUsersRelated(profileId, userId);
          setIsRelated(relateData);
        }
        // Получаем рейтинг, который уже поставил текущий юзер этому профилю
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [profileId, userId]);

  useEffect(() => {
    if (user && user.rating_count > 0) {
      setAvg(parseFloat((user.total_rating / user.rating_count).toFixed(2)));
    } else {
      setAvg(0.0);
    }
  }, [user]);

  const handleRatingChange = (newRating, oldRating, action) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;

      let newTotalRating = parseInt(prevUser.total_rating);
      let newRatingCount = parseInt(prevUser.rating_count);

      switch (action) {
        case "create":
          // Если это новая оценка, просто добавляем её
          newTotalRating += newRating;
          newRatingCount += 1;
          break;
        case "update":
          // Если это изменение оценки, вычитаем старую оценку и прибавляем новую
          newTotalRating = newTotalRating - oldRating + newRating;
          break;
        case "delete":
          // Если это удаление оценки, вычитаем её
          newTotalRating -= oldRating;
          newRatingCount -= 1;
          break;
        default:
          console.warn("Unknown action:", action);
          return prevUser; // Ничего не меняем, если действие неизвестно
      }

      return {
        ...prevUser,
        total_rating: newTotalRating,
        rating_count: newRatingCount,
        last_rating: newRating, // Обновляем last_rating только при создании и изменении
      };
    });
  };
  function declOfNum(number, words) {
    return words[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? number % 10 : 5]
    ];
  }

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
          {isOwner ? "Ваш профиль" : "Профиль пользователя"}
        </p>

        {loading ? (
          <div>Загрузка данных пользователя...</div>
        ) : user ? (
          <>
            <div style={{ marginBottom: "20px" }}>
              <a
                href={`https://t.me/${user.tg_name}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block" }}
              >
                <img
                  src={`${process.env.REACT_APP_API_IMAGE_URL}${user.image}`}
                  alt={Avatar}
                  href={`https://t.me/${user.tg_name}`}
                  style={{
                    width: "82px",
                    height: "82px",
                    objectFit: "cover",
                    borderRadius: "32px",
                  }}
                ></img>
              </a>
            </div>
            <a
              href={`https://t.me/${user.tg_name}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "inherit", // Сохраняем текущий цвет текста
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "16px",
                  marginBottom: "5px",
                  cursor: "pointer",
                }}
              >
                {user.name}
              </p>
            </a>
            <a
              href={`https://t.me/${user.tg_name}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.userName}
              style={{ display: "inline-block" }}
            >
              @{user.tg_name}
            </a>
            {/* Вывод рейтинга */}
            <Stars avg={avg} />
            <>
              ✪{avg} ({user.rating_count}{" "}
              {declOfNum(user.rating_count, ["оценка", "оценки", "оценок"])})
            </>
            {/* Rating component */}
            {!isOwner && isRelated && (
              <Rating
                userId={userId}
                profileId={profileId}
                db={db}
                onRatingChange={handleRatingChange}
              ></Rating>
            )}

            <ProfileOptions userId={profileId} currentUserId={userId} />
            <Comments userId={profileId} currentUserId={userId} />
          </>
        ) : (
          <div>Пользователь не найден.</div>
        )}
      </div>
      <Menu tg_id={userId} />
    </div>
  );
}

export default Profile;
