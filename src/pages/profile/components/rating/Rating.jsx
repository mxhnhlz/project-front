// components/Rating/Rating.js
import React, { useState, useEffect } from "react";
import styles from "./Rating.module.css";
function Rating({ userId, profileId, onRatingChange, db }) {
  const [rating, setRating] = useState(null);
  const [isRatingActive, setIsRatingActive] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const ratingData = await db.getUserRate(userId, profileId);
        setRating(ratingData);
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };
    fetchRating();
  }, [userId, profileId, db]);

  const handleRatingClick = async (ratingValue) => {
    try {
      setIsRatingActive(false);
      if (rating) {
        onRatingChange(ratingValue, rating.score, "update");
        setRating({ ...rating, score: ratingValue });
        await db.updateRate(userId, profileId, ratingValue);
      } else {
        onRatingChange(ratingValue, 0, "create");
        setRating({
          giver_id: userId,
          receiver_id: profileId,
          score: ratingValue,
        });
        await db.createRate(userId, profileId, ratingValue);
      }
    } catch (error) {
      console.error("Error creating/updating rating:", error);
    }
  };

  const handleDeleteRating = async () => {
    try {
      onRatingChange(rating.score, rating.score, "delete");
      setRating(null);
      setShowConfirmation(false);
      await db.deleteRate(userId, profileId);
    } catch (error) {
      console.error("Error deleting rating:", error);
    }
  };

  const handleStartRating = () => {
    setIsRatingActive(true);
  };

  const handleEditRating = () => {
    setShowConfirmation(false);
    setIsRatingActive(true);
  };

  const renderRatingOptions = () => {
    return (
      <div className={styles.ratingOptions}>
        <>✪</>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={styles.ratingOption}
            onClick={() => handleRatingClick(value)}
          >
            {value}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.ratingContainer}>
      {!!rating ? (
        <>
          {showConfirmation ? (
            <div className={styles.confirmationModal}>
              <button
                className={styles.confirmationButton}
                onClick={handleEditRating}
              >
                Изменить
              </button>
              <button
                className={styles.confirmationButtonDelete}
                onClick={handleDeleteRating}
              >
                Удалить
              </button>
            </div>
          ) : isRatingActive ? (
            renderRatingOptions()
          ) : (
            <button
              className={styles.ratingButton}
              onClick={() => setShowConfirmation(true)}
            >
              Ваша оценка: {rating.score}
            </button>
          )}
        </>
      ) : (
        <>
          {isRatingActive ? (
            renderRatingOptions()
          ) : (
            <button className={styles.rateButton} onClick={handleStartRating}>
              Оценить
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Rating;
