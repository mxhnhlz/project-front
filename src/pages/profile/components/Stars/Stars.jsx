import React from "react";
import styles from "./Stars.module.css";

const Stars = ({ avg = 0, width = 250, height = 50 }) => {
  const fillPercentage = (avg / 5) * 100;
  const starSize = height; // Размер звезды = высота контейнера

  return (
    <div className={styles.container} style={{ width: width, height: height }}>
      {/* Серые звёзды (фон) */}
      <div className={styles.starsBackground}>
        {[...Array(5)].map((_, i) => (
          <svg
            key={`bg-${i}`}
            viewBox="0 0 100 100"
            className={styles.star}
            style={{ width: starSize, height: starSize }}
          >
            <path
              d="M50,15L61,40H88L68,60L79,85L50,70L21,85L32,60L12,40H39Z"
              fill="none"
              stroke="#cccccc"
              strokeWidth="6"
            />
          </svg>
        ))}
      </div>

      {/* Синие звёзды (передний план) */}
      <div
        className={styles.starsForeground}
        style={{ width: `${fillPercentage}%` }}
      >
        <div className={styles.starsWrapper}>
          {[...Array(5)].map((_, i) => (
            <svg
              key={`fg-${i}`}
              viewBox="0 0 100 100"
              className={styles.star}
              style={{ width: starSize, height: starSize }}
            >
              <path
                d="M50,15L61,40H88L68,60L79,85L50,70L21,85L32,60L12,40H39Z"
                fill="#007bff"
                stroke="#007bff"
                strokeWidth="2"
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stars;
