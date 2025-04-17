// EditRatingModal.js
import React, { useState } from "react";
import styles from "./Rating.css"; // Создай этот файл стилей

function EditRatingModal({ onClose, onUpdate, onDelete, rating }) {
  const [newRating, setNewRating] = useState(rating);

  const handleStarClick = (rating) => {
    setNewRating(rating);
  };

  const handleUpdate = () => {
    onUpdate(newRating);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Редактировать оценку:</h2>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={styles.star}
              onClick={() => handleStarClick(star)}
              style={{ color: star <= newRating ? "gold" : "gray" }} // Звезды, которые выбраны - жёлтые
            >
              ★
            </span>
          ))}
        </div>
        <div className={styles.buttons}>
          <button onClick={handleUpdate} disabled={newRating === rating}>
            Обновить
          </button>
          <button onClick={onDelete}>Удалить</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
}

export default EditRatingModal;
