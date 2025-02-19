import React, { useState } from 'react'
import styles from './main.module.css'
import { Button } from '@mui/material'

function Main() {
  const products = [
    { name: 'Товар 1', description: 'Краткое описание', price: '999 ₽' },
    { name: 'Товар 2', description: 'Краткое описание', price: '1200 ₽' },
    { name: 'Товар 3', description: 'Краткое описание', price: '800 ₽' },
    { name: 'Товар 4', description: 'Краткое описание', price: '1500 ₽' },
    { name: 'Товар 5', description: 'Краткое описание', price: '2500 ₽' },
    { name: 'Товар 6', description: 'Краткое описание', price: '450 ₽' },
    { name: 'Товар 7', description: 'Краткое описание', price: '3000 ₽' },
    { name: 'Товар 8', description: 'Краткое описание', price: '999 ₽' },
    { name: 'Товар 9', description: 'Краткое описание', price: '2000 ₽' },
    { name: 'Товар 10', description: 'Краткое описание', price: '1300 ₽' },
  ]

  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={styles.main}>
      {/* header */}
      <div>
        <header className={styles.header}>
          <h1>Название бота</h1>
        </header>
      </div>

      {/* search */}
      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <button className={styles.searchIcon}>
            <img src='./images/search.svg' alt='Search' />
          </button>
          <input
            type='text'
            placeholder='Поиск по каталогу'
            className={styles.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className={styles.cartButton}>
          <img src='./images/cart.svg' alt='cart' />
        </button>
      </div>

      {/* Товары */}
      <div className={styles.products}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div className={styles.productContainer} key={index}>
              <div className={styles.productImg}>
                <img src='./images/voidImg.png' alt='пустой товар' />
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
      </div>

      {/* footer */}
      <div className={styles.footer}>
        <div className={styles.items2}>
          <button className={styles.buttonFooter}>
            <img
              src='./images/mainMenu.svg'
              alt=''
              className={styles.footerImg}
            />
            <span className={styles.footerSpan}>Главная</span>
          </button>
          <button className={styles.buttonFooter}>
            <img src='./images/fav.svg' alt='' className={styles.footerImg} />
            <span className={styles.footerSpan}>Избранное</span>
          </button>
          <button className={styles.buttonFooter}>
            <img
              src='./images/create.svg'
              alt=''
              className={styles.footerImg}
            />
            <span className={styles.footerSpan}>Создать</span>
          </button>
          <button className={styles.buttonFooter}>
            <img
              src='./images/messages.svg'
              alt=''
              className={styles.footerImg}
            />
            <span className={styles.footerSpan}>Сообщения</span>
          </button>
          <button className={styles.buttonFooter}>
            <img
              src='./images/profile.svg'
              alt=''
              className={styles.footerImg}
            />
            <span className={styles.footerSpan}>Профиль</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Main
