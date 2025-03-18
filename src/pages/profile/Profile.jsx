import React from 'react'
import styles from './Profile.module.css'

import Avatar from './avatar'
import RightArrow from './rightArrow'
import Menu from '../components/menu/Menu'

function Profile() {
  return (
    <div className={styles.main}>
      {/* header */}

      {/* содержимое */}
      <div className={styles.content}>
        <p
          style={{
            fontWeight: 700,
            fontSize: '14px',
            marginBottom: '28px',
            marginTop: '15px',
          }}
        >
          Ваш профиль
        </p>

        <div style={{ marginBottom: '20px' }}>
          <Avatar />
        </div>
        <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '5px' }}>
          Пользователь
        </p>
        <span className={styles.userName}>@ктототам (пока что)</span>

        {/* Список кнопок */}
        <div className={styles.buttonList}>
          <div className={styles.buttonItem}>
            Текущие аренды <RightArrow />
          </div>

          <div className={styles.buttonItem}>
            Сменить аккаунт <RightArrow />
          </div>
          <div className={styles.buttonItem}>
            История аренд <RightArrow />
          </div>
          <div className={styles.buttonItem}>
            О приложении <RightArrow />
          </div>
          <div className={styles.buttonItem}>
            Удалить аккаунт <RightArrow />
          </div>
        </div>
      </div>
      {/* footer */}
      <Menu />
    </div>
  )
}

export default Profile
