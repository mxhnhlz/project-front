import React, { useState } from 'react'
import styles from './regist.module.css'
import Menu from '../../components/menu/Menu'
import { Button, CircularProgress } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import image from './logo.png'
import { Visibility, VisibilityOff } from '@mui/icons-material'

function Regist() {
  const navigate = useNavigate()
  const goToProfile = () => {
    navigate('/Profile')
  }

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)

    if (!/^[a-zA-Z0-9]*$/.test(value)) {
      setError('Можно вводить только английские буквы и цифры')
    } else {
      setError('')
    }
  }

  const handleLogin = () => {
    setLoading(true)

    setTimeout(() => {
      if (password === 'correctPassword') {
        goToProfile()
      } else {
        setError('Неверный логин или пароль')
      }
      setLoading(false)
    }, 1500)
  }

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <img src={image} className={styles.logo} alt='Logo' />

        <div className={styles.formContainer}>
          <div className={styles.welcomeContainer}>
            <p className={styles.welcomeText}>С возвращением!</p>
          </div>
          <input
            type='text'
            placeholder='Логин'
            className={styles.input}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Пароль'
              className={styles.input}
              value={password}
              onChange={handlePasswordChange}
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>

          {error && <p className={styles.errorText}>{error}</p>}

          <button className={styles.forgotPassword}>Забыли пароль?</button>

          <Button
            variant='contained'
            className={styles.loginButton}
            onClick={handleLogin}
            disabled={!login || !password || !!error || loading}
          >
            {loading ? <CircularProgress size={24} color='inherit' /> : 'Войти'}
          </Button>

          <p className={styles.registerText}>
            Нет аккаунта?{' '}
            <Link to='/registration' className={styles.registerLink}>
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>

      <Menu />
    </div>
  )
}

export default Regist
