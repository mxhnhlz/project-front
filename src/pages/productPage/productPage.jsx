import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import db from "../../api/db";
import Menu from "../components/menu/Menu";

function PproductPage() {
  const { tg_id, id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState({});
  const [isFavorite, setIsFavorite] = useState(false); // Состояние для избранного
  const [ownerId, setOwnerId] = useState(0); // Состояние для избранного
  const [owner, setOwner] = useState({});
  const loadOffer = useCallback(async () => {
    try {
      const data = await db.getOffer(id);
      setOwnerId(data.tg_id);
      setOffer(data);
    } catch (error) {
      console.log("Error in productPage, loadOffer ", error);
    }
  }, [id]);
  const loadOwner = useCallback(async () => {
    try {
      const data = await db.getUser(ownerId);
      setOwner(data);
    } catch (error) {
      console.log("Error in productPage, loadOwner ", error);
    }
  }, [ownerId]);
  const toggleFavorite = async () => {
    try {
      await db.newFavorite(tg_id, id); // Вызов API для добавления в избранное
      setIsFavorite(!isFavorite); // Инвертируем состояние избранного
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };
  const handleGoToOtherProfile = () => {
    navigate(`/profile/${tg_id}/${ownerId}`);
  };

  useEffect(() => {
    loadOffer();
    loadOwner();
  }, [loadOffer, loadOwner]);

  return (
    <div>
      {offer && offer.images && offer.images.length > 0 ? (
        <img
          src={`${process.env.REACT_APP_API_IMAGE_URL}${offer.images[0]}`}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
          alt={offer.title}
        />
      ) : (
        <div />
      )}
      P{offer ? `${JSON.stringify(offer)}` : ""}
      <button onClick={toggleFavorite}>
        {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
      </button>
      {tg_id !== ownerId && (
        <button onClick={handleGoToOtherProfile}>
          Перейти в профиль пользователя
        </button>
      )}
      <Menu tg_id={tg_id}></Menu>
    </div>
  );
}

export default PproductPage;
