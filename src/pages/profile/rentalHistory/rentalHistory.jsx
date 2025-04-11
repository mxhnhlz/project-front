import React from 'react'
import { useParams } from 'react-router-dom'
import Menu from '../../components/menu/Menu'

function RentalHistory() {
  const { tg_id } = useParams()
  const userId = tg_id || 0
  return (
    <div>
      Текущая история пользователя с ID: {tg_id}
      <Menu tg_id={userId} />
    </div>
  )
}

export default RentalHistory
