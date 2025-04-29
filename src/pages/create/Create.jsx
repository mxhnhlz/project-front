import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "../components/menu/Menu";
import styles from "./create.module.css";
import db from "../../api/db";

const Create = () => {
  const { tg_id } = useParams();
  const userId = tg_id || 0;

  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 5 - images.length);
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка заполненности обязательных полей
    if (!price || !title || !city || !description) {
      alert("Пожалуйста, заполните все обязательные поля!");
      return;
    }

    try {
      await db.createOfferWithImages(tg_id, title, description, price, images);
      alert("Объявление успешно создано!");

      // Очистка полей после успешного создания
      setImages([]);
      setPrice("");
      setTitle("");
      setCity("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Не удалось создать объявление:(");
    }
  };

  const isFormValid = price && title && city && description;

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.imageUpload}>
          <label className={styles.bigImageLabel}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: "none" }}
              disabled={images.length >= 5}
            />
            {images.length < 5 && <span className={styles.bigPlus}>＋</span>}
            {images.length > 0 && (
              <div className={styles.imageOverlay}>
                {" "}
                {/* Контейнер для затемнения и контента */}
                <button
                  className={styles.removeImageButton}
                  onClick={() => removeImage(0)}
                >
                  ×
                </button>
                <img
                  src={URL.createObjectURL(images[0])}
                  alt="Uploaded"
                  className={styles.bigPreview}
                />
              </div>
            )}
            {images.length >= 5 && (
              <div className={styles.imageLimit}>Максимум 5 фотографий!</div>
            )}
          </label>
        </div>
        {images.length > 0 ? (
          <>
            <div className={styles.secondaryImages}>
              {images.slice(1).map((img, idx) => (
                <div key={idx + 1} className={styles.secondaryImageContainer}>
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`preview ${idx + 1}`}
                    className={styles.secondaryPreview}
                  />
                  <button
                    className={styles.removeImageButton}
                    onClick={() => removeImage(idx + 1)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : null}
        <form onSubmit={handleSubmit} className={styles.form1}>
          <div className={styles.priceInputContainer}>
            <input
              type="text"
              placeholder="Введите стоимость"
              value={`${price}`}
              onChange={(e) => setPrice(e.target.value)}
              className={styles.input1}
            />
            <span className={styles.currencySymbol}>₽</span>
          </div>
          <input
            type="text"
            placeholder="Введите название товара"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input2}
            required
          />
          <input
            type="text"
            placeholder="Введите город"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={styles.input3}
            required
          />
          <textarea
            placeholder="Добавьте описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
            required
          />

          <button
            type="submit"
            className={styles.button}
            disabled={!isFormValid}
          >
            Опубликовать
          </button>
        </form>
      </div>

      <Menu tg_id={userId} />
    </div>
  );
};

export default Create;
