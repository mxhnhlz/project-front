import React, { useState } from 'react'
import styles from './registration.module.css'
import { Button, CircularProgress } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Menu from '../../components/menu/Menu'
import { useNavigate } from 'react-router-dom'

function Registration() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      if (!termsAccepted) {
        alert('Пожалуйста, примите условия использования.')
        setLoading(false)
        return
      }
      if (password !== confirmPassword) {
        alert('Пароли не совпадают.')
        setLoading(false)
        return
      }

      alert('Регистрация успешна!')
      navigate('/Profile')
      setLoading(false)
    }, 1500)
  }

  const isFormValid =
    login &&
    email &&
    password &&
    confirmPassword &&
    termsAccepted &&
    password === confirmPassword

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>Регистрация</h1>
        <p className={styles.subtitle}>Создайте аккаунт, чтобы продолжить</p>

        <label className={styles.label}>
          Логин (будет использоваться в приложении) *
        </label>
        <input
          type='text'
          className={styles.input}
          placeholder='Введите логин'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />

        <label className={styles.label}>Email *</label>
        <input
          type='email'
          className={styles.input}
          placeholder='почта@gmail.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className={styles.label}>Пароль *</label>
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Пароль'
            className={styles.input}
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <span
            className={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </span>
        </div>

        <div className={styles.passwordContainer}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Подтвердите пароль'
            className={`${styles.input} ${
              password && confirmPassword && password !== confirmPassword
                ? styles.error
                : ''
            }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            className={styles.eyeIcon}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
          </span>
        </div>

        {password && confirmPassword && password !== confirmPassword && (
          <p className={styles.errorText}>Пароли не совпадают</p>
        )}

        {error && <p className={styles.errorText}>{error}</p>}

        <div className={styles.checkboxContainer}>
          <input
            type='checkbox'
            id='terms'
            className={styles.checkbox}
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          <label htmlFor='terms'>
            {' '}
            <span className={styles.checkboxText}>Прочитал(а), принимаю *</span>
          </label>
        </div>

        <Button
          variant='contained'
          className={`${styles.loginButton} ${
            !isFormValid ? styles.disabled : ''
          }`}
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
        >
          {loading ? (
            <CircularProgress size={24} color='inherit' />
          ) : (
            'Зарегистрироваться'
          )}
        </Button>
        <p className={styles.infoText}>
          *Пожалуйста, заполните все поля для регистрации
        </p>
      </div>
      <Menu />
    </div>
  )
}

export default Registration
