import React, { useState, useEffect } from 'react'
import styles from './main.module.css'
import { Button } from '@mui/material'

function Main() {
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
        <button className={styles.searchIcon}>
          <i className='fa fa-search'></i> {/* иконка лупы */}
        </button>

        <input
          type='text'
          placeholder='Поиск по каталогу'
          className={styles.search}
        />
        <button className={styles.cartButton}>
          <img
            src='./images/cart.svg'
            alt='cart'
            className={styles.cartButton}
          />
        </button>
      </div>

      {/* Товары */}
      <div className={styles.products}>
        {[...Array(10)].map((_, index) => (
          <div className={styles.productContainer} key={index}>
            <div className={styles.productImg}>
              <img src='./images/voidImg.png' alt='пустой товар' />
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productName}>
                <h1>Товар {index + 1}</h1>
                <p>Краткое описание</p>
              </div>
              <div className={styles.productStats}>
                <span className={styles.productPrice}>999 ₽</span>
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
        ))}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.items2}>
          <button className={styles.buttonFooter}>
            <img src='./images/mainMenu.svg' alt='' />
            <span>Главная</span>
          </button>
          <button className={styles.buttonFooter}>
            <img src='./images/fav.svg' alt='' />
            <span>Избранное</span>
          </button>
          <button className={styles.buttonFooter}>
            <img src='./images/create.svg' alt='' />
            <span>Создать</span>
          </button>
          <button className={styles.buttonFooter}>
            <img src='./images/messages.svg' alt='' />
            <span>Сообщения</span>
          </button>
          <button className={styles.buttonFooter}>
            <img src='./images/profile.svg' alt='' />
            <span>Профиль</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Main
