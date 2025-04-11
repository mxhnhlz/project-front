import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/menu/Menu";
import db from "../../api/db"; // Импортируем функцию для загрузки данных

function Messages() {
  const { tg_id } = useParams();
  const userId = tg_id || 0;
  const [relatedUsers, setRelatedUsers] = useState([]);

  useEffect(() => {
    async function loadRelatedUsers() {
      try {
        const data = await db.getRelatedUsers(userId);
        setRelatedUsers(data);
      } catch (error) {
        console.error("Error loading related users:", error);
      }
    }

    loadRelatedUsers();
  }, [userId]);

  return (
    <div>
      messages
      {relatedUsers.length > 0 ? (
        <ul>
          {relatedUsers.map((user) => (
            <li key={user.id}>
              <img
                src={`${process.env.REACT_APP_API_IMAGE_URL}${user.image}`}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                alt={user.name}
              />
              {user.name}:
              <a
                href={`https://telegram.me/${user.tg_name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>Перейти к диалогу</button>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div>No related users found.</div>
      )}
      <Menu tg_id={tg_id}></Menu>
    </div>
  ); //эта штука деприкейтед, либо отображать ссылки на диалоги с знакомыми юзерами
}

export default Messages;
