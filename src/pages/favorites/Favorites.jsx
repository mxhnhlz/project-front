import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Menu from "../components/menu/Menu";
import db from "../../api/db";

function Favorites() {
  const { tg_id } = useParams();
  const userId = tg_id || 0;
  const [offers, setOffers] = useState([]);

  const loadOffers = async () => {
    try {
      const data = await db.getFavorite(userId);
      setOffers(data);
    } catch (error) {
      console.error("Error loading offers:", error);
    }
  };

  useEffect(() => {
    loadOffers();
  }, [userId]);

  const removeFromFavorites = async (offerId) => {
    try {
      await db.deleteFavorite(userId, offerId);
      loadOffers();
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

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
                alt={offer.title}
              />
              <div>Title: {offer.title}</div>
              <div>Price: {offer.price}</div>
              <div>Info: {offer.info}</div>
              <button onClick={() => removeFromFavorites(offer.favorite_id)}>
                Remove from Favorites
              </button>
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
