import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import db from '../../api/db'

import styles from './productPage.module.css'
import CustomCarousel from './customSlider'
import MyCalendar from '../main/calendar/calendar'
import { Button } from '@mui/material'

import Rating from '@mui/material/Rating'

function ProductPage() {
  const { tg_id, id } = useParams()
  const [offer, setOffer] = useState({})
  const [isFavorite, setIsFavorite] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(null)

  const loadOffer = useCallback(async () => {
    try {
      const data = await db.getOffer(id)
      setOffer(data)
    } catch (error) {
      console.log('Error in ProductPage, loadOffer ', error)
    }
  }, [id])

  const toggleFavorite = async () => {
    try {
      await db.newFavorite(tg_id, id)
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const handleOpenCalendar = () => {
    setOpenCalendar(0)
  }

  const handleCloseCalendar = () => {
    setOpenCalendar(null)
  }

  useEffect(() => {
    loadOffer()
  }, [loadOffer])
  return (
    <div className={styles.main}>
      {/* Хедер */}
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => (window.location.href = `/${tg_id}`)}
        >
          <h1>✕</h1>
        </button>
      </div>

      {/* Карусель */}
      {offer && offer.images && offer.images.length > 0 ? (
        <CustomCarousel>
          {offer.images.map((img, index) => (
            <img
              key={index}
              src={`${process.env.REACT_APP_API_IMAGE_URL}${img}`}
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              alt={`offer-${index}`}
            />
          ))}
        </CustomCarousel>
      ) : (
        <div />
      )}

      {/* Контент */}
      <div className={styles.content}>
        {/* Информация о товаре */}
        <div className={styles.productInfo}>
          <h2 className={styles.title}>{offer.title}</h2>
          <p className={styles.city}>{offer.city}</p>
          <p className={styles.price}>{offer.price} ₽ / день</p>
        </div>

        {/* Избранное */}
        {/* <button onClick={toggleFavorite} className={styles.favoriteButton}>
          {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        </button> */}

        {/* Арендодатель */}
        <div className={styles.ownerSection}>
          <img
            src={offer.owner?.avatar || '/default-avatar.png'}
            alt='owner'
            className={styles.ownerAvatar}
          />
          <div className={styles.ownerInfo}>
            <p className={styles.ownerName}>{offer.owner?.name}</p>
            <Rating value={offer.owner?.rating || 0} precision={0.5} readOnly />
          </div>
          <button className={styles.contactButton}>Написать</button>
        </div>

        {/* Описание */}
        <div className={styles.descriptionBlock}>
          <h3>Описание</h3>
          <p>{offer.description}</p>
        </div>

        {/* Кнопка "Выбрать даты" */}
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
          onClick={handleOpenCalendar}
        >
          Выбрать даты
        </Button>
      </div>

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
              userId={offer.owner?.id}
              offer={offer}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductPage
