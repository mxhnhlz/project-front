import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './auth.module.css'
// import Header from '../../components/header/header'
import Menu from '../../components/menu/Menu'
import Avatar from '../../profile/avatar'
import { Button } from '@mui/material'
function Auth() {
  const navigate = useNavigate()
  const goToRegist = () => {
    navigate('/Regist')
  }
  return (
    <div className={styles.main}>
      {/* header */}
      <div className={styles.header}>
        {/* <Header /> */}
        <p
          style={{
            fontWeight: 700,
            fontSize: '14px',
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          Ваш профиль
        </p>
      </div>

      {/* content */}
      <div className={styles.content}>
        <Avatar />
        <p
          style={{
            fontWeight: 700,
            fontSize: '14px',
            marginTop: '10px',
            textAlign: 'center',
            marginBottom: '10px',
          }}
        >
          Вы не вошли в аккаунт
        </p>
        <Button
          className={styles.rentButton}
          variant='outlined'
          sx={{
            borderRadius: '12px',
            borderColor: '#006FFD',
            color: '#006FFD',
            padding: '8px 16px',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#006FFD',
              color: 'white',
            },
          }}
          onClick={goToRegist}
        >
          Вход / Регистрация
        </Button>
      </div>
      {/* menu*/}
      <Menu />
    </div>
  )
}

export default Auth
