import React from 'react'
import { useParams } from 'react-router-dom'

function CurrentRentals() {
  const { tg_id } = useParams()

  return <div>Текущие аренды пользователя с ID: {tg_id}</div>
}

export default CurrentRentals
