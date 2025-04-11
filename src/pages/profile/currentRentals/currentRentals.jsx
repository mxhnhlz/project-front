import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Menu from '../../components/menu/Menu'
import styles from './currentRentals.module.css'
import { Button } from '@mui/material'
import SearchIcon from '../../components/icons/SearchIcon'
import CartButton from '../../components/icons/cartButton'
function CurrentRentals() {
  const { tg_id } = useParams()
  const userId = tg_id || 0
  const mockRents = [
    {
      title: 'Электросамокат Xiaomi',
      info: 'Мощный самокат с дальностью до 30 км',
      images: ['scooter.jpg'],
      price: 1200,
      rentedOn: '2025-04-01', // дата аренды
      rentalEnds: '2025-04-10', // дата окончания аренды
    },
    {
      title: 'Велосипед Trek',
      info: 'Универсальный горный велосипед',
      images: ['./images/voidimg.png'],
      price: 900,
      rentedOn: '2025-04-03',
      rentalEnds: '2025-04-12',
    },
    {
      title: 'Гироскутер Smart Balance',
      info: 'Подходит для детей и подростков',
      images: ['hoverboard.jpg'],
      price: 700,
      rentedOn: '2025-04-05',
      rentalEnds: '2025-04-15',
    },
  ]

  const [searchQuery, setSearchQuery] = useState('')

  const handleProductClick = (product) => {
    console.log('Выбран продукт:', product)
  }

  const handleRentButtonClick = (index) => {
    console.log(`Аренда товара №${index + 1}`)
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
      {/* Текущие аренды пользователя с ID: {tg_id} */}
      <div className={styles.products}>
        {mockRents
          .filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product, index) => (
            <div className={styles.productContainer} key={index}>
              <div
                className={styles.productImg}
                onClick={() => handleProductClick(product)}
              >
                <img src={product.images[0]} alt='арендуемый товар' />
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productName}>
                  <h1>{product.title}</h1>
                  <p className={styles.productRent}>
                    Арендовано:{' '}
                    <span className={styles.green}>{product.rentedOn}</span>
                  </p>
                  <p className={styles.productRent}>
                    Аренда закончится:{' '}
                    <span className={styles.red}>{product.rentalEnds}</span>
                  </p>
                </div>
                <div className={styles.productStats}>
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
                    Связь с арендодателем
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Menu tg_id={userId} />
    </div>
  )
}

export default CurrentRentals
