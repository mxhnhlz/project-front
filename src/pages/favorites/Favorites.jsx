import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import styles from "../../pages/main/main.module.css";
import SearchIcon from "../../pages/components/icons/SearchIcon";
import CartButton from "../../pages/components/icons/cartButton";
import Menu from "../components/menu/Menu";
import db from "../../api/db";

function Favorites() {
  const { tg_id } = useParams();
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadOffers = async () => {
    try {
      const data = await db.getFavorite(tg_id || 0);
      setOffers(data);
    } catch (error) {
      console.error("Error loading offers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, [tg_id]);

  const removeFromFavorites = async (offerId) => {
    try {
      await db.deleteFavorite(tg_id, offerId);
      loadOffers(); // Обновляем список после удаления
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const handleProductClick = (offer) => {
    navigate(`/product/${tg_id}/${offer.id}`, { state: { product: offer } });
  };

  return (
    <div className={styles.main}>
      <div className={styles.searchCartWrapper}>
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <button className={styles.searchIcon}>
              <SearchIcon />
            </button>
            <input
              type="text"
              placeholder="Поиск по избранному"
              className={styles.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className={styles.cartButton}>
            <CartButton />
          </button>
        </div>
      </div>

      <div className={styles.products}>
        {offers.length === 0 ? (
          <div className={styles.emptyMessage}>
            <p>Нет избранных объявлений</p>
          </div>
        ) : loading ? (
          <div className={styles.main}>Загрузка...</div>
        ) : (
          offers
            .filter((offer) =>
              offer.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((offer) => (
              <div
                className={styles.productContainer}
                key={offer.id}
                onClick={() => handleProductClick(offer)}
              >
                <div className={styles.productImg}>
                  <img
                    src={
                      `${process.env.REACT_APP_API_IMAGE_URL}${offer.images[0]}` ||
                      "./images/voidimg.png"
                    }
                    alt="товар"
                  />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productName}>
                    <h1>{offer.title}</h1>
                    <p className={styles.productDescription}>
                      {offer.description || offer.info}
                    </p>
                  </div>
                  <div className={styles.productStats}>
                    <span className={styles.productPrice}>{offer.price} ₽</span>
                    <Button
                      className={styles.rentButton}
                      variant="outlined"
                      sx={{
                        borderRadius: "12px",
                        borderColor: "#FF3B30",
                        color: "#FF3B30",
                        padding: "8px 16px",
                        "&:hover": {
                          backgroundColor: "#FF3B30",
                          color: "white",
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromFavorites(offer.id);
                      }}
                    >
                      Убрать
                    </Button>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
      <Menu tg_id={tg_id} />
    </div>
  );
}

export default Favorites;
