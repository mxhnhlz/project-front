import { useState, useEffect, useCallback } from "react";
import styles from "../main.module.css"; // Предполагаю, что стили в этом файле
import Button from "@mui/material/Button"; // Если используете Material UI, иначе замените
import getItems from "../../../api/itemService";

const ItemList = ({ tg_id, initialLimit = 2 }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Есть ли еще элементы для загрузки
  const [lastItemId, setLastItemId] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);

  //Первая загрузка

  useEffect(() => {
    setFilteredProducts(items);
  }, [items]);

  // Функция для загрузки данных
  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getItems(tg_id, lastItemId, initialLimit);
      if (data.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }
      if (data.length < initialLimit) setHasMore(false);
      // Получаем ID последнего элемента для пагинации
      setLastItemId(data[data.length - 1].id);
      setItems((prev) => [
        ...new Map([...prev, ...data].map((item) => [item.id, item])).values(),
      ]); //Мудрённый обход strictMode в режиме разработки......
    } catch (error) {
      console.error("Ошибка при загрузке элементов:", error);
      setHasMore(false); // Отключаем загрузку при ошибке
    } finally {
      setLoading(false);
    }
  }, [tg_id, lastItemId, initialLimit]);

  const reloadItems = useCallback(async () => {
    setLastItemId(0); // Сбрасываем lastItemId
    setItems([]); // Опустошаем
    setHasMore(true);
    loadItems();
  }, []);

  useEffect(() => {
    reloadItems(); // Загружаем первую партию товаров
  }, [reloadItems]);

  const handleRentButtonClick = (index) => {
    console.log("Вы нажали арендовать:", index);
  };

  const loadMore = () => {
    setLoading(false);
    loadItems();
  };
  return (
    <div className={styles.products}>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <div className={styles.productContainer} key={index}>
            <div className={styles.productImg}>
              <img
                src={process.env.REACT_APP_API_IMAGE_URL + product.images[0]}
                alt="пустой товар"
              />
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productName}>
                <h1>{product.title}</h1>
                <p>{product.info}</p>
              </div>
              <div className={styles.productStats}>
                <span className={styles.productPrice}>{product.price} ₽</span>
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
                  onClick={() => handleRentButtonClick(index)}
                >
                  Арендовать
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Товары не найдены</p>
      )}
      {/* Кнопка "Загрузить еще" */}
      {hasMore ? (
        <Button
          variant="contained"
          color="primary"
          onClick={loadMore}
          disabled={loading}
        >
          {loading ? "Загрузка..." : "Загрузить еще"}
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={reloadItems}
          disabled={loading}
        >
          Обновить
        </Button>
      )}
    </div>
  );
};

export default ItemList;
