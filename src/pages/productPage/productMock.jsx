import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Menu from '../components/menu/Menu'
import MyCalendar from '../main/calendar/calendar'
import styles from './productPage.module.css'
import { Button } from '@mui/material'
import CustomCarousel from './customSlider'
import Heart from './Heart'
import Rating from '@mui/material/Rating'

import HeartFilled from './HeartFilled'

import { mockDb as db } from './mockData' // вместо настоящего db
import RightButton from './rightButton'

function ProductMock() {
  const { tg_id, id } = useParams()
  const userId = tg_id || 0
  const navigate = useNavigate()
  const [openCalendar, setOpenCalendar] = useState(null)
  const [offer, setOffer] = useState({})
  const [isFavorite, setIsFavorite] = useState(false)
  const [ownerId, setOwnerId] = useState(0)
  const [owner, setOwner] = useState({})

  const handleCloseCalendar = () => setOpenCalendar(null)

  const loadOffer = useCallback(async () => {
    try {
      const data = await db.getOffer(id)
      setOwnerId(data.tg_id)
      setOffer(data)
    } catch (error) {
      console.log('Error in productPage, loadOffer ', error)
    }
  }, [id])

  const handleRentButtonClick = () => {
    setOpenCalendar(openCalendar === true ? false : true)
  }

  const loadOwner = useCallback(async () => {
    try {
      const data = await db.getUser(ownerId)
      setOwner(data)
    } catch (error) {
      console.log('Error in productPage, loadOwner ', error)
    }
  }, [ownerId])

  const toggleFavorite = async () => {
    try {
      await db.newFavorite(tg_id, id)
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const handleGoToOtherProfile = () => {
    navigate(`/profile/${tg_id}/${ownerId}`)
  }

  useEffect(() => {
    loadOffer()
    loadOwner()
  }, [loadOffer, loadOwner])
  const landlord = {
    name: 'Анна Иванова',
    rating: 4.6,
    photo: '/images/landlord1.jpg',
    telegramLink: 'https://t.me/hnj1n',
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => (window.location.href = `/${tg_id}`)}
        >
          <h1>✕</h1>
        </button>
      </div>
      {offer && offer.images && offer.images.length > 0 ? (
        <CustomCarousel>
          {offer.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`slide-${index}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ))}
        </CustomCarousel>
      ) : (
        <div>Нет изображений</div>
      )}

      {/* Карусель в content */}
      <div className={styles.content}>
        {/* Информация о товаре с иконкой */}
        <div className={styles.infoBlockWithHeart}>
          <div className={styles.textInfo}>
            <p className={styles.infoText}>
              <strong>{offer.price} ₽ / сутки</strong>
            </p>
            <p className={styles.infoText}>{offer.title}</p>
            <p className={styles.infoText}>Г. {offer.city}</p>
          </div>
          <button className={styles.heartButton} onClick={toggleFavorite}>
            {isFavorite ? <HeartFilled /> : <Heart />}
          </button>
        </div>
        <div className={styles.landlordContainer}>
          <img
            src={landlord.photo}
            alt='Арендодатель'
            className={styles.landlordPhoto}
          />

          <div className={styles.landlordInfo}>
            <p className={styles.landlordName}>{landlord.name}</p>
            <Rating
              value={landlord.rating}
              precision={0.1}
              readOnly
              sx={{
                color: '#006FFD', // основной цвет звёзд
              }}
            />
          </div>

          <Button
            className={styles.contactButton}
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
            Написать
          </Button>

          <button
            className={styles.arrowButton}
            onClick={() => {
              const confirmRedirect = window.confirm(
                'Вы будете перенаправлены в Telegram чат с арендодателем. Продолжить?'
              )
              if (confirmRedirect) {
                window.location.href = landlord.telegramLink // ссылка на тг
              }
            }}
          >
            <RightButton />
          </button>
        </div>

        <div className={styles.descriptionBlock}>
          <p className={styles.descriptionText}>{offer.description}</p>
        </div>

        {/* <button>
          {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        </button> */}
        <Button
          className={styles.rentButton}
          variant='outlined'
          sx={{
            textTransform: 'none',
            backgroundColor: '#006FFD',
            borderRadius: '12px',
            borderColor: '#006FFD',
            color: '#FFFFFF',
            padding: '8px 16px',
            '&:hover': {
              backgroundColor: '#FFFFFF',
              color: '#006FFD',
            },
          }}
          onClick={() => handleRentButtonClick()}
        >
          Выбрать даты
        </Button>
      </div>
      {tg_id !== ownerId && (
        <button onClick={handleGoToOtherProfile}>
          Перейти в профиль пользователя
        </button>
      )}

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

      {/* <Menu tg_id={tg_id} /> */}
    </div>
  )
}

export default ProductMock
