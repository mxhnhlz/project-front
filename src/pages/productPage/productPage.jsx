import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import db from "../../api/db";
import Menu from "../components/menu/Menu";
import MyCalendar from "../main/calendar/calendar";
import styles from "./productPage.module.css";
import { Button } from "@mui/material";
import CustomCarousel from "./customSlider";
import Heart from "./Heart";
import HeartFilled from "./HeartFilled";
import Stars from "../profile/components/Stars/Stars";
function ProductPage() {
  const { tg_id, id } = useParams();
  const userId = tg_id || 0;
  const navigate = useNavigate();
  const [openCalendar, setOpenCalendar] = useState(null);
  const [offer, setOffer] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [ownerId, setOwnerId] = useState(0);
  const [owner, setOwner] = useState({});
  const handleCloseCalendar = () => setOpenCalendar(null);

  const loadOffer = useCallback(async () => {
    try {
      const data = await db.getOffer(id);
      setOwnerId(data.tg_id);
      setOffer(data);
    } catch (error) {
      console.log("Error in productPage, loadOffer ", error);
    }
  }, [id]);

  const handleRentButtonClick = () => {
    setOpenCalendar(openCalendar === true ? false : true);
  };

  const loadOwner = useCallback(async () => {
    try {
      if (ownerId) {
        const data = await db.getUser(ownerId);
        setOwner(data);
        const fav = await db.getFavorite(userId);
        setIsFavorite(fav.some((item) => item.id === offer.id));
      }
    } catch (error) {
      console.log("Error in productPage, loadOwner ", error);
    }
  }, [ownerId]);

  const toggleFavorite = async () => {
    try {
      console.log(isFavorite);
      isFavorite
        ? await db.deleteFavorite(tg_id, id)
        : await db.newFavorite(tg_id, id);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleGoToOtherProfile = () => {
    navigate(`/profile/${tg_id}/${ownerId}`);
  };

  useEffect(() => {
    loadOffer();
    if (offer) {
      loadOwner();
    }
  }, [loadOffer, loadOwner]);

  return (
    <div className={styles.main}>
      {/* Карусель в content */}

      <div className={styles.content}>
        {offer && offer.images && offer.images.length > 0 ? (
          <CustomCarousel>
            {offer.images.map((image, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`${process.env.REACT_APP_API_IMAGE_URL}${image}`}
                  alt={`slide-${index}`}
                  style={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </CustomCarousel>
        ) : (
          <div>Нет изображений</div>
        )}
        {ownerId && ownerId !== userId && (
          <Button
            className={styles.rentButton}
            variant="outlined"
            sx={{
              borderRadius: "12px",
              borderColor: "#006FFD",
              color: "#006FFD",
              padding: "8px 16px",
              "&:hover": {
                backgroundColor: "#006FFD",
                color: "white",
              },
            }}
            onClick={() => handleRentButtonClick()}
          >
            Арендовать
          </Button>
        )}
        {owner.image && (
          <div className={styles.landlordContainer}>
            <img
              src={`${process.env.REACT_APP_API_IMAGE_URL}${owner.image}`}
              alt="Аватар автора"
              className={styles.landlordPhoto}
              onClick={handleGoToOtherProfile}
            />
            <div className={styles.landlordInfo}>
              <p className={styles.landlordName}>
                {owner.name || "Неизвестный автор"}
              </p>
              <div className={styles.commentRating}>
                <Stars
                  avg={
                    owner.rating_count
                      ? owner.total_rating / owner.rating_count
                      : 0
                  }
                  height={25}
                  width={125}
                />
              </div>
            </div>
            <button
              className={styles.contactButton}
              onClick={handleGoToOtherProfile}
            >
              Профиль
            </button>
          </div>
        )}

        {/* Информация о товаре с иконкой */}
        <div className={styles.infoBlockWithHeart}>
          <div className={styles.textInfo}>
            <p className={styles.infoText}>
              <strong>Цена:</strong> {offer.price} ₽
            </p>
            <p className={styles.infoText}>
              <strong>Название:</strong> {offer.title}
            </p>
            {/* <p className={styles.infoText}>
              <strong>Город:</strong> {offer.city}
            </p> */}
          </div>
          {ownerId && ownerId !== userId && (
            <button className={styles.heartButton} onClick={toggleFavorite}>
              {isFavorite ? <HeartFilled /> : <Heart />}
            </button>
          )}
        </div>

        <div className={styles.descriptionBlock}>
          <div className={styles.descriptionText}>{offer.info}</div>
        </div>
      </div>

      {openCalendar !== null && (
        <div className={styles.modalContainer}>
          <div className={styles.cancelButtonContainer}>
            <button
              className={styles.cancelButton}
              onClick={handleCloseCalendar}
            >
              Отменить
            </button>
          </div>
          <div className={styles.calendarWrapper}>
            <MyCalendar
              openCalendar={openCalendar}
              handleCloseCalendar={handleCloseCalendar}
              userId={userId}
              offer={offer}
            />
          </div>
        </div>
      )}
      <Menu tg_id={tg_id} />
    </div>
  );
}

export default ProductPage;
