import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import styles from "../../main/main.module.css";
import SearchIcon from "../../components/icons/SearchIcon";
import CartButton from "../../components/icons/cartButton";
import Menu from "../../components/menu/Menu";
import db from "../../../api/db";

function Offers() {
  const { tg_id, owner_id } = useParams();
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await db.getAllOffers(owner_id);
        setOffers(data);
      } catch (error) {
        console.error("Ошибка при получении объявлений:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [owner_id]);

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
              placeholder="Поиск по каталогу"
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
            <p>Нет доступных объявлений</p>
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
                        borderColor: "#006FFD",
                        color: "#006FFD",
                        padding: "8px 16px",
                        "&:hover": {
                          backgroundColor: "#006FFD",
                          color: "white",
                        },
                      }}
                    >
                      Подробнее
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

export default Offers;
