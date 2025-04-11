import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import db from '../../api/db'
import Menu from '../components/menu/Menu'

function ProductPage() {
  const { tg_id, id } = useParams()
  const [offer, setOffer] = useState({})
  const [isFavorite, setIsFavorite] = useState(false) // Состояние для избранного

  const loadOffer = useCallback(async () => {
    try {
      const data = await db.getOffer(id)
      setOffer(data)
    } catch (error) {
      console.log('Error in roductPage, loadOffer ', error)
    }
  }, [id])

  const toggleFavorite = async () => {
    try {
      await db.newFavorite(tg_id, id) // Вызов API для добавления в избранное
      setIsFavorite(!isFavorite) // Инвертируем состояние избранного
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  useEffect(() => {
    loadOffer()
  }, [loadOffer])

  return (
    <div>
      {offer && offer.images && offer.images.length > 0 ? (
        <img
          src={`${process.env.REACT_APP_API_IMAGE_URL}${offer.images[0]}`}
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          alt={offer.title}
        />
      ) : (
        <div />
      )}
      P{offer ? `${JSON.stringify(offer)}` : ''}
      <button onClick={toggleFavorite}>
        {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      </button>
      <Menu tg_id={tg_id}></Menu>
    </div>
  )
}

export default ProductPage
