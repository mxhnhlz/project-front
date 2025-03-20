<<<<<<< HEAD
import React, { useState } from "react";
import { Button } from "@mui/material";

import MyCalendar from "./calendar/calendar";

import styles from "./main.module.css";

import SearchIcon from "./icons/SearchIcon";
import CartButton from "./icons/cartButton";
import FavButton from "./icons/favButton";
import MainMenu from "./icons/mainMenu";
import ProfileButton from "./icons/profileButton";
import CreateButton from "./icons/CreateButton";
import MessagesButton from "./icons/messagesButton";
import ItemList from "./itemList/itemList";

function Main() {
  const products = [
    { name: "Товар 1", description: "Краткое описание", price: "999 ₽" },
    { name: "Товар 2", description: "Краткое описание", price: "1200 ₽" },
    { name: "Товар 3", description: "Краткое описание", price: "800 ₽" },
    { name: "Товар 4", description: "Краткое описание", price: "1500 ₽" },
    { name: "Товар 5", description: "Краткое описание", price: "2500 ₽" },
    { name: "Товар 6", description: "Краткое описание", price: "450 ₽" },
    { name: "Товар 7", description: "Краткое описание", price: "3000 ₽" },
    { name: "Товар 8", description: "Краткое описание", price: "999 ₽" },
    { name: "Товар 9", description: "Краткое описание", price: "2000 ₽" },
    { name: "Товар 10", description: "Краткое описание", price: "1300 ₽" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [openCalendar, setOpenCalendar] = useState(null);
=======
import React, { useState } from 'react'
import { Button } from '@mui/material'
import MyCalendar from './calendar/calendar'
import { useNavigate } from 'react-router-dom'
import styles from './main.module.css'

import SearchIcon from '../components/icons/SearchIcon'
import CartButton from '../components/icons/cartButton'

import Menu from '../components/menu/Menu'
// import Header from '../components/header/header'

function Main() {
  const products = [
    { name: 'Товар 1', description: 'Краткое описание', price: '999 ₽' },
    {
      name: 'Товар 2',
      description:
        'Очень длинное описание товара, которое содержит много деталей и информации, но должно отображаться ограниченно, чтобы не занимать слишком много места.',
      price: '1200 ₽',
    },
    {
      name: 'Товар 3',
      description:
        'Описание средней длины, которое немного больше стандартного, но не слишком длинное.',
      price: '800 ₽',
    },
    { name: 'Товар 4', description: 'Краткое описание', price: '1500 ₽' },
    {
      name: 'Товар 5',
      description:
        'Очень длинное описание товара, которое рассказывает обо всех его характеристиках, преимуществах и способах использования. Такой текст может быть полезен для покупателя, но без ограничения он может занимать слишком много пространства.',
      price: '2500 ₽',
    },
    { name: 'Товар 6', description: 'Краткое описание', price: '450 ₽' },
    { name: 'Товар 7', description: 'Краткое описание', price: '3000 ₽' },
    { name: 'Товар 8', description: 'Краткое описание', price: '999 ₽' },
    { name: 'Товар 9', description: 'Краткое описание', price: '2000 ₽' },
    { name: 'Товар 10', description: 'Краткое описание', price: '1300 ₽' },
    { name: 'Товар 11', description: 'Краткое описание', price: '1100 ₽' },
    { name: 'Товар 12', description: 'Краткое описание', price: '1300 ₽' },
    { name: 'Товар 13', description: 'Краткое описание', price: '1400 ₽' },
  ]

  const [searchTerm, setSearchTerm] = useState('')
  const [openCalendar, setOpenCalendar] = useState(null)
  const [visibleCount, setVisibleCount] = useState(10) // Количество отображаемых товаров
  const navigate = useNavigate()
>>>>>>> 76661a910adb747aaee4e3e823e80422887f2e83

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRentButtonClick = (index) => {
    setOpenCalendar(openCalendar === index ? null : index);
  };

  const handleCloseCalendar = () => {
    setOpenCalendar(null);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.name}`, { state: { product } })
  }

  const loadMoreProducts = () => {
    setVisibleCount(visibleCount + 5) // Увеличиваем количество отображаемых товаров
  }

  return (
    <div className={styles.main}>
      <div className={styles.searchCartWrapper}>
        {/* header */}
        {/* <Header /> */}
        {/* search */}
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <button className={styles.searchIcon}>
              <SearchIcon />
            </button>
            <input
              type="text"
              placeholder="Поиск по каталогу"
              className={styles.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className={styles.cartButton}>
            <CartButton />
          </button>
        </div>
      </div>

      {/* Товары */}
      <div className={styles.products}>
<<<<<<< HEAD
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div className={styles.productContainer} key={index}>
              <div className={styles.productImg}>
                <img src="./images/voidImg.png" alt="пустой товар" />
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productName}>
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                </div>
                <div className={styles.productStats}>
                  <span className={styles.productPrice}>{product.price}</span>
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
=======
        {filteredProducts.slice(0, visibleCount).map((product, index) => (
          <div className={styles.productContainer} key={index}>
            <div
              className={styles.productImg}
              onClick={() => handleProductClick(product)}
            >
              <img src='./images/voidImg.png' alt='пустой товар' />
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productName}>
                <h1>{product.name}</h1>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
              </div>
              <div className={styles.productStats}>
                <span className={styles.productPrice}>{product.price}</span>
                <Button
                  className={styles.rentButton}
                  variant='outlined'
                  sx={{
                    borderRadius: '12px',
                    borderColor: '#006FFD',
                    color: '#006FFD',
                    padding: '8px 16px',
                    '&:hover': {
                      backgroundColor: '#006FFD',
                      color: 'white',
                    },
                  }}
                  onClick={() => handleRentButtonClick(index)}
                >
                  Арендовать
                </Button>
>>>>>>> 76661a910adb747aaee4e3e823e80422887f2e83
              </div>
            </div>
          </div>
        ))}

        {/* Кнопка "Загрузить ещё" */}
        {filteredProducts.length > visibleCount && (
          <Button
            variant='outlined'
            sx={{
              borderRadius: '12px',
              borderColor: '#006FFD',
              color: '#006FFD',
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#006FFD',
                color: 'white',
              },
            }}
            onClick={loadMoreProducts}
          >
            Загрузить ещё
          </Button>
        )}
      </div>

      <ItemList tg_id={0} />

      {/* Модальное окно */}
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
            />
          </div>
          <div className={styles.modalActions}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "12px",
                borderColor: "#006FFD",
                color: "#006FFD",
                padding: "8px 50px",
                "&:hover": {
                  backgroundColor: "#006FFD",
                  color: "white",
                },
              }}
              className="sendRequestButton"
            >
              Отправить запрос арендодателю
            </Button>
          </div>
        </div>
      )}

      {/* footer */}
      <Menu />
    </div>
  );
}

export default Main;
