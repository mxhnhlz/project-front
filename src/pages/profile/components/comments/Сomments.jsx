import React, { useState, useEffect } from "react";
import styles from "./Comments.module.css";
import db from "../../../../api/db";
import Stars from "../Stars/Stars";
import { useNavigate } from "react-router-dom";

function Comments({ userId, currentUserId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [isOwner, setIsOwner] = useState(userId === currentUserId);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedComments = await db.getCommentsByReceiver(userId);
        const sortedComments = fetchedComments.sort((a, b) => {
          if ((a.giver.id === currentUserId) ^ (b.giver.id === currentUserId)) {
            return a.giver.id === currentUserId ? -1 : 1;
          }
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setComments(sortedComments);
      } catch (e) {
        setError("Ошибка при загрузке комментариев");
        console.error("Ошибка при загрузке комментариев:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [userId, currentUserId]);

  const handleCommentChange = (e) => {
    setNewCommentText(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newCommentText.trim()) return;

    try {
      const newComment = await db.createComment(
        currentUserId,
        userId,
        newCommentText
      );
      console.log();
      setComments([newComment, ...comments]);
      setNewCommentText("");
      setShowCommentForm(false);
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error);
      setError("Ошибка при добавлении комментария");
    }
  };
  const handleGoToOtherProfile = (comment) => {
    navigate(`/profile/${currentUserId}/${comment.giver.id}`);
  };
  return (
    <div className={styles.commentsContainer}>
      <div className={styles.commentsHeader}>
        <h3 className={styles.commentsTitle}>Отзывы</h3>

        {!isOwner && !showCommentForm && (
          <button
            className={styles.addCommentButton}
            onClick={() => setShowCommentForm(true)}
          >
            Оставить отзыв
          </button>
        )}
      </div>
      {!isOwner && showCommentForm && (
        <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
          <textarea
            className={styles.commentInput}
            placeholder="Напишите ваш отзыв..."
            value={newCommentText}
            onChange={handleCommentChange}
            rows={4}
          />
          <div className={styles.formButtons}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setShowCommentForm(false)}
            >
              Отмена
            </button>
            <button type="submit" className={styles.submitButton}>
              Отправить
            </button>
          </div>
        </form>
      )}
      {loading ? (
        <div className={styles.loading}>Загрузка комментариев...</div>
      ) : error ? (
        <div className={styles.errorMessage}>{error}</div>
      ) : comments.length === 0 ? (
        <div className={styles.noComments}>Пока нет отзывов</div>
      ) : (
        <div className={styles.commentsList}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <img
                  src={`${process.env.REACT_APP_API_IMAGE_URL}${comment.giver.avatar}`}
                  alt="Аватар"
                  className={styles.commentAvatar}
                  onClick={() => handleGoToOtherProfile(comment)}
                />

                <div className={styles.commentAuthor}>
                  {comment.rate ? (
                    <div className={styles.commentRating}>
                      <Stars avg={comment.rate} height={25} width={125} />
                    </div>
                  ) : (
                    "-"
                  )}
                  <span
                    className={styles.authorName}
                    onClick={() => handleGoToOtherProfile(comment)}
                  >
                    {comment.giver.name}
                  </span>
                  <span className={styles.commentDate}>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className={styles.commentText}>{comment.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;
