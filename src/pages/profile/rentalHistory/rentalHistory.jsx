import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import styles from "./rentalHistory.module.css";
import { Button } from "@mui/material";
import SearchIcon from "../../components/icons/SearchIcon";
import CartButton from "../../components/icons/cartButton";
import db from "../../../api/db";

function RentalHistory() {
  const { tg_id } = useParams();
  const userId = tg_id || 0;
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRents = async () => {
      try {
        const response = await db.getAllRents(userId);
        setRents(response.pastRents);
      } catch (error) {
        console.error("Ошибка при получении аренд:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRents();
  }, [userId]);

  const handleProductClick = (product) => {
    console.log("Выбран продукт:", product);
  };

  const handleRentButtonClick = (product) => {
    console.log("Связь с арендодателем:", product);
    // Здесь можно добавить логику для связи с арендодателем/арендатором
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
      {loading ? (
        <div className={styles.main}>Загрузка...</div>
      ) : (
        <div className={styles.products}>
          {rents
            .filter((rent) =>
              rent.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((rent, index) => (
              <div className={styles.productContainer} key={index}>
                <div
                  className={styles.productImg}
                  onClick={() => handleProductClick(rent)}
                >
                  <img
                    src={
                      `${process.env.REACT_APP_API_IMAGE_URL}${rent.images[0]}` ||
                      "./images/voidimg.png"
                    }
                    alt="арендуемый товар"
                  />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productName}>
                    <h1>{rent.title}</h1>
                    <p className={styles.productRent}>
                      {rent.user_id === userId
                        ? "Арендовано у"
                        : "Арендовано у вас"}
                    </p>
                    <p className={styles.productRent}>
                      Начало:{" "}
                      <span className={styles.green}>
                        {new Date(rent.start_date).toLocaleDateString("ru-RU")}
                      </span>
                    </p>
                    <p className={styles.productRent}>
                      Конец:{" "}
                      <span className={styles.red}>
                        {new Date(rent.end_date).toLocaleDateString("ru-RU")}
                      </span>
                    </p>
                  </div>
                  <div className={styles.productStats}>
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
                      onClick={() => handleRentButtonClick(rent)}
                    >
                      {rent.user_id === userId
                        ? "Связь с арендодателем"
                        : "Связь с арендатором"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      <Menu tg_id={userId} />
    </div>
  );
}

export default RentalHistory;
