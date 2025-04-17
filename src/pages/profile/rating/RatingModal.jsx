// RatingModal.js
import React, { useState } from "react";
import styles from "./Rating.css"; // Создай этот файл стилей

function RatingModal({ onClose, onSubmit }) {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmit = () => {
    onSubmit(selectedRating);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Оцените пользователя:</h2>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={styles.star}
              onClick={() => handleStarClick(star)}
              style={{ color: star <= selectedRating ? "gold" : "gray" }} // Звезды, которые выбраны - жёлтые
            >
              ★
            </span>
          ))}
        </div>
        <div className={styles.buttons}>
          <button onClick={handleSubmit} disabled={selectedRating === 0}>
            Отправить
          </button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
}

export default RatingModal;
