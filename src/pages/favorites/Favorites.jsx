import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Menu from "../components/menu/Menu";
import db from "../../api/db"; // Импортируем функцию для загрузки данных
function Favorites() {
  const { tg_id } = useParams();
  const userId = tg_id || 0;
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadOffers() {
      try {
        const data = await db.getFavorite(userId);
        setOffers(data);
      } catch (error) {
        console.error("Error loading offers:", error);
      }
    }

    loadOffers();
  }, [userId]);

  return (
    <div>
      Favorites
      {offers.length > 0 ? (
        <ul>
          {offers.map((offer) => (
            <li key={offer.id}>
              <img
                src={`${process.env.REACT_APP_API_IMAGE_URL}${offer.images[0]}`}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div>Title: {offer.title}</div>
              <div>Price: {offer.price}</div>
              <div>Info: {offer.info}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No favorite offers found.</div>
      )}
      <Menu tg_id={tg_id}></Menu>
    </div>
  );
}

export default Favorites;
