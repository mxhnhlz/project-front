import React from 'react'
import { useParams } from 'react-router-dom'

function RentalHistory() {
  const { tg_id } = useParams()
  return <div>Текущая история пользователя с ID: {tg_id}</div>
}

export default RentalHistory
