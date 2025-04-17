// Comments.js
import React, { useState, useEffect } from "react";
import styles from "./Comments.module.css";
import db from "../../../api/db"; // Import db

function Comments({ userId, currentUserId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCommentText, setNewCommentText] = useState(""); // Состояние для нового комментария
  const [isOwner, setIsOwner] = useState(userId === currentUserId);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedComments = await db.getCommentsByReceiver(userId);
        // Сортируем комментарии по дате (предполагаем, что у комментов есть поле createdAt)
        const sortedComments = fetchedComments.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setComments(sortedComments);
      } catch (e) {
        setError("Ошибка при загрузке комментариев");
        console.error("Ошибка при загрузке комментариев:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [userId]);

  const handleCommentChange = (e) => {
    setNewCommentText(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newCommentText.trim()) {
      return; // Не отправляем пустой коммент
    }

    try {
      // Отправляем запрос на добавление комментария
      const newComment = await db.createComment(
        currentUserId, // ID текущего пользователя (отправителя)
        userId, // ID пользователя, которому пишем коммент (получателя)
        newCommentText
      );

      // Добавляем новый коммент в список (в начало)
      setComments([newComment, ...comments]);

      // Очищаем поле ввода
      setNewCommentText("");
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error);
      setError("Ошибка при добавлении комментария");
    }
  };

  return (
    <div className={styles.commentsContainer}>
      <h3>Комментарии:</h3>
      {loading && <div>Загрузка комментариев...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                {/* TODO: Заменить на имя пользователя */}
                <span>Автор: {comment.giver_id}</span>
                <span>
                  Дата: {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p>{comment.text}</p>
              {/* Условие для отображения кнопки "Удалить" только для владельца комментария (если нужно) */}
              {isOwner && (
                <button className={styles.deleteButton}>Удалить</button>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Форма добавления комментария (только для тех, кто смотрит чужой профиль) */}
      {!isOwner && (
        <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
          <textarea
            placeholder="Напишите комментарий..."
            value={newCommentText}
            onChange={handleCommentChange}
          ></textarea>
          <button type="submit">Отправить</button>
        </form>
      )}
    </div>
  );
}

export default Comments;
