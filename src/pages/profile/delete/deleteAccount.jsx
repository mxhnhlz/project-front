import React from 'react'
import Menu from '../../components/menu/Menu'
import styles from './deleteAccout.module.css'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
function DeleteAccount() {
  const navigate = useNavigate()
  const handleDeleteAccount = () => {
    //логика для удаления аккаунта
    // console.log("Удаление аккаунта...");
  }
  const { tg_id } = useParams()
  const userId = tg_id || 0

  const handleGoBack = () => {
    navigate(`/Auth/${tg_id}`)
  }
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <p>О приложении</p>
      </div>
      <div className={styles.content}>
        <p>Вы уверены?</p>

        <Button
          className={styles.rentButton}
          variant='outlined'
          sx={{
            borderRadius: '12px',
            borderColor: '#006FFD',
            color: '#006FFD',
            padding: '8px 16px',
            textTransform: 'none',
            width: '186px',
            '&:hover': {
              backgroundColor: '#006FFD',
              color: 'white',
            },
          }}
          onClick={handleDeleteAccount}
        >
          Удалить аккаунт
        </Button>
        <Button
          className={styles.rentButton}
          variant='outlined'
          sx={{
            borderRadius: '12px',
            borderColor: '#006FFD',
            color: '#006FFD',
            padding: '8px 16px',
            textTransform: 'none',
            width: '186px',
            '&:hover': {
              backgroundColor: '#006FFD',
              color: 'white',
            },
          }}
          onClick={handleGoBack}
        >
          Назад
        </Button>
      </div>
      <Menu tg_id={userId} />
    </div>
  )
}

export default DeleteAccount
