import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import db from '../../api/db'
import Menu from '../components/menu/Menu'

function ProductPage() {
  const { tg_id, id } = useParams()
  const userId = tg_id || 0
  const [offer, setOffer] = useState({})
  const loadOffer = useCallback(async () => {
    try {
      const data = await db.getOffer(id)
      setOffer(data)
    } catch (error) {
      console.log('Error in roductPage, loadOffer ', error)
    }
  }, [id])
  useEffect(() => {
    loadOffer()
  })
  return (
    <div>
      P{offer ? `${JSON.stringify(offer)}` : ''}
      <Menu tg_id={userId}></Menu>
    </div>
  )
}

export default ProductPage
