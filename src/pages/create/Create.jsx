import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Menu from '../components/menu/Menu'
import styles from './create.module.css'
import db from '../../api/db'

const Create = () => {
  const { tg_id } = useParams()
  const userId = tg_id || 0

  const [images, setImages] = useState([])
  const [price, setPrice] = useState('')
  const [title, setTitle] = useState('')
  const [city, setCity] = useState('')
  const [description, setDescription] = useState('')

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.slice(0, 5 - images.length)
    console.log(files, newImages)
    setImages((prev) => [...prev, ...newImages])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await db.createOfferWithImages(tg_id, title, description, price, images)
    } catch (error) {
      console.error(error)
      alert('Не удалось создать объявление:(') //TODO: СДЕЛАТЬ ВСЁ ПО УМУ
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => (window.location.href = `/${tg_id}`)}
        >
          <h1>✕</h1>
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.imageUpload}>
          <label className={styles.bigImageLabel}>
            <input
              type='file'
              accept='image/*'
              multiple
              onChange={handleImageChange}
              style={{ display: 'none' }}
              disabled={images.length >= 5}
            />
            <span className={styles.bigPlus}>＋</span>
            {images.length >= 5 && (
              <div className={styles.imageLimit}>Максимум 5 фотографий!</div>
            )}
          </label>

          {images.map((img, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(img)}
              alt={`preview ${idx}`}
              className={styles.preview}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.form1}>
          <input
            type='text'
            placeholder='Введите стоимость (₽)'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.input1}
          />
          <input
            type='text'
            placeholder='Введите название товара'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input2}
          />
          <input
            type='text'
            placeholder='Введите город'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={styles.input3}
          />
          <textarea
            placeholder='Добавьте описание'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />

          <button type='submit' className={styles.button}>
            Опубликовать
          </button>
        </form>
      </div>

      <Menu tg_id={userId} />
    </div>
  )
}

export default Create
