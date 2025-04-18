import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@mui/material'
import MyCalendar from './calendar/calendar'
import styles from './main.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import SearchIcon from '../components/icons/SearchIcon'
import CartButton from '../components/icons/cartButton'
import Menu from '../components/menu/Menu'
import db from '../../api/db' // Импортируем функцию для загрузки данных

function Main() {
  const navigate = useNavigate()
  const { tg_id } = useParams()
  const userId = tg_id || 0
  const [openCalendar, setOpenCalendar] = useState(null)
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([]) //TODO: продумать фильтрацию
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true) // Есть ли еще элементы для загрузки
  const [lastItemId, setLastItemId] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const sizeOfIncome = 50
  // Функция для загрузки данных
  const loadItems = useCallback(async () => {
    setLoading(true)
    try {
      const data = await db.getItems(userId, lastItemId, sizeOfIncome)
      if (data.length === 0) {
        setHasMore(false)
        setLoading(false)
        return
      }
      if (data.length < sizeOfIncome) setHasMore(false)
      // Получаем ID последнего элемента для пагинации
      setLastItemId(data[data.length - 1].id)
      setItems((prev) => [
        ...new Map([...prev, ...data].map((item) => [item.id, item])).values(),
      ])
    } catch (error) {
      console.error('Ошибка при загрузке элементов:', error)
      setHasMore(false) // Отключаем загрузку при ошибке
    } finally {
      setLoading(false)
    }
  }, [lastItemId])

  const reloadItems = useCallback(async () => {
    setLastItemId(0) // Сбрасываем lastItemId
    setItems([]) // Опустошаем
    setHasMore(true)
    loadItems()
  }, [])

  useEffect(() => {
    reloadItems() // Загружаем первую партию товаров
  }, [reloadItems])

  const handleRentButtonClick = (index) => {
    setOpenCalendar(openCalendar === index ? null : index)
  }

  const handleCloseCalendar = () => {
    setOpenCalendar(null)
  }

  const handleProductClick = (product) => {
    navigate(`/product/${userId}/${product.id}`, { state: { product } })
  }

  const loadMore = () => {
    setLoading(false)
    loadItems()
  }

  return (
    <div className={styles.main}>
      <div className={styles.searchCartWrapper}>
        {/* search */}
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <button className={styles.searchIcon}>
              <SearchIcon />
            </button>
            <input
              type='text'
              placeholder='Поиск по каталогу'
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

      {/* Товары */}
      <div className={styles.products}>
        {items
          .filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product, index) => (
            <div className={styles.productContainer} key={index}>
              <div
                className={styles.productImg}
                onClick={() => handleProductClick(product)}
              >
                <img
                  src={process.env.REACT_APP_API_IMAGE_URL + product.images[0]}
                  alt='пустой товар'
                />
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productName}>
                  <h1>{product.title}</h1>
                  <p className={styles.productDescription}>{product.info}</p>
                </div>
                <div className={styles.productStats}>
                  <span className={styles.productPrice}>{product.price} ₽</span>
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
                </div>
              </div>
            </div>
          ))}

        {/* Кнопка "Загрузить еще" для пагинации */}
        {hasMore ? (
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
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? 'Загрузка...' : 'Загрузить еще'}
          </Button>
        ) : (
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
            onClick={reloadItems}
            disabled={loading}
          >
            Обновить
          </Button>
        )}
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
              userId={userId}
              offer={items[openCalendar]}
            />
          </div>
        </div>
      )}

      {/* footer */}
      <Menu tg_id={userId} />
    </div>
  )
}

export default Main
