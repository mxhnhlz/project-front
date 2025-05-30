class db {
  async getUser(tg_id) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}getUser/${tg_id}`
      );
      if (!response.ok) {
        throw new Error(
          `Ошибка при запросе: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ошибка при получении пользователя:", error);
      throw error;
    }
  }

  // =========================================
  // Items
  // =========================================
  async getItems(
    tg_id = 0,
    lastItemId = 0,
    limit = 10,
    search = "",
    filters = {}
  ) {
    try {
      const url = new URL(`${process.env.REACT_APP_API_BASE_URL}getOfferList`);

      // Add base params
      url.searchParams.append("tg_id", tg_id.toString());
      url.searchParams.append("lastItemId", lastItemId.toString());
      url.searchParams.append("limit", limit.toString());

      // Add search and filters
      //if (search) url.searchParams.append("search", search);
      if (filters.minPrice)
        url.searchParams.append(
          "minPrice",
          filters.minPrice < 1 ? 1 : filters.minPrice
        );
      if (filters.maxPrice)
        url.searchParams.append(
          "maxPrice",
          filters.maxPrice < 1 ? 1 : filters.maxPrice
        );
      if (filters.sortBy) url.searchParams.append("sortBy", filters.sortBy);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Ошибка при запросе: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении товаров:", error);
      throw error;
    }
  }

  async getOffer(id) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}getOffer/${id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getOffer:", error);
      throw error;
    }
  }

  async getOfferDays(id) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}getOfferDays/${id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getOfferDays:", error);
      throw error;
    }
  }

  async deleteOffer(id) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}deleteOffer/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in deleteOffer:", error);
      throw error;
    }
  }

  async createOffer(tg_id, title, info, price) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}offer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Создаем объект здесь
            tg_id: tg_id,
            title: title,
            info: info,
            price: price,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in createOffer:", error);
      throw error;
    }
  }

  async getAllOffers(ownerId) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}getOfferByUser/${ownerId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error in getAllOffers:", error);
      throw error;
    }
  }
  // =========================================
  // Rents
  // =========================================
  async createRent(
    offer_id,
    user_id,
    start,
    end,
    title = "", //возможно полезное
    info = "",
    price = 0
  ) {
    try {
      console.log({ start, end });
      const url = `${process.env.REACT_APP_API_BASE_URL}rent`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Говорим серверу, что отправляем JSON
        },
        body: JSON.stringify({
          // Преобразуем данные в JSON
          offer_id: offer_id,
          user_id: user_id,
          start: start,
          end: end,
          title: title,
          info: info,
          price: price,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in createRent:", error);
      throw error;
    }
  }

  async sendMessage(tg_id, text) {
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}tgMessage`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Говорим серверу, что отправляем JSON
        },
        body: JSON.stringify({
          // Преобразуем данные в JSON
          tg_id: tg_id,
          text: text,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in createRent:", error);
      throw error;
    }
  }
  async isUsersRelated(user1, user2) {
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}isUsersRelated?user1=${user1}&user2=${user2}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.isRelated; // Возвращает true/false
    } catch (error) {
      console.error("Error in isUsersRelated:", error);
      throw error;
    }
  }
  async getFavorite(tg_id) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}getFavorite/${tg_id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getFavorite:", error);
      throw error;
    }
  }

  async newFavorite(tg_id, id) {
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}newFavorite`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Указываем, что отправляем JSON
        },
        body: JSON.stringify({ tg_id: tg_id, id: id }), // Преобразуем данные в JSON-строку
      });

      if (!response.ok) {
        const errorText = await response.text(); // Получаем текст ошибки от сервера
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }
      const data = await response.json(); // Получаем JSON-ответ от сервера
      return data; // Возвращаем полученные данные
    } catch (error) {
      console.error("Error in newFavorite:", error);
      throw error; // Пробрасываем ошибку дальше, чтобы ее обработал вызывающий код
    }
  }

  async deleteFavorite(tg_id, id) {
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}deleteFavorite`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tg_id: tg_id, id: id }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in deleteFavorite:", error);
      throw error;
    }
  }

  async getRelatedUsers(tg_id) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}getRelatedUsers/${tg_id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getRelatedUsers:", error);
      throw error;
    }
  }

  async getAllRents(tg_id) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}getAllRents/${tg_id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getAllRents:", error);
      throw error;
    }
  }

  // =========================================
  // Rates
  // =========================================

  async createRate(giver_id, receiver_id, score) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}rates`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            giver_id: giver_id,
            receiver_id: receiver_id,
            score: score,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in createRate:", error);
      throw error;
    }
  }

  async getUserRate(userId, profileId) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}rates/getRateByIds`,
        {
          method: "POST", // Используем POST
          headers: {
            "Content-Type": "application/json", // Указываем тип контента
          },
          body: JSON.stringify({
            user_id: userId,
            profile_id: profileId,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getUserRate:", error);
      throw error;
    }
  }
  async getRatesByReceiver(receiver_id) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}rates/receiver/${receiver_id}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getRatesByReceiver:", error);
      throw error;
    }
  }
  async deleteRate(userId, profileId) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}rates/user/${userId}/profile/${profileId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      return; // No content
    } catch (error) {
      console.error("Error in deleteUserRate:", error);
      throw error;
    }
  }

  async updateRate(userId, profileId, score) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}rates/user/${userId}/profile/${profileId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score: score }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in updateRate:", error);
      throw error;
    }
  }

  // =========================================
  // Comments
  // =========================================

  async createComment(giver_id, receiver_id, text) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            giver_id: giver_id,
            receiver_id: receiver_id,
            text: text,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in createComment:", error);
      throw error;
    }
  }

  async updateComment(id, text) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}comments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in updateComment:", error);
      throw error;
    }
  }

  async getComment(id) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}comments/${id}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getComment:", error);
      throw error;
    }
  }

  async getCommentsByReceiver(receiver_id) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}comments/receiver/${receiver_id}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getCommentsByReceiver:", error);
      throw error;
    }
  }

  async createOfferWithImages(tg_id, title, info, price, imageFiles) {
    try {
      let createdOffer;
      const imageUrls = [];

      // 2. Загружаем картинки (если есть)
      if (imageFiles && imageFiles.length > 0) {
        for (const imageFile of imageFiles) {
          const dataUrl = await resizeAndCompressImage(
            imageFile,
            1920,
            1920,
            0.7
          ); // Задаем максимальные размеры и качество

          // 3. Формируем имя файла и загружаем сжатое изображение
          const fileName = imageFile.name;
          const fileExtension = fileName.split(".").pop();
          const timestamp = Date.now();
          const newFileName = `${timestamp}-${tg_id}.${fileExtension}`;
          const formData = new FormData();
          imageUrls.push(newFileName); // Добавляем URL в массив
          // Преобразуем Data URL в Blob (важно для отправки)
          const blob = dataURItoBlob(dataUrl);
          formData.append("image", blob, newFileName); // Отправляем сжатый Blob
          const uploadResponse = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}uploadImage`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!uploadResponse.ok) {
            if (uploadResponse.status === 413) {
              console.error("Ошибка загрузки: Размер файла слишком большой.");
              alert(
                "Размер файла слишком большой. Максимальный размер: 0.8MB."
              );
              return;
            }
            throw new Error(`Upload failed: ${uploadResponse.status}`);
          }

          const data = await uploadResponse.json();
          console.log("File uploaded successfully:", data);
          // ... Дальнейшая обработка успешной загрузки
        }
      }
      // 1. Создаём оффер
      const offerData = {
        tg_id: tg_id,
        title: title,
        info: info,
        price: price,
      };

      const createOfferResponse = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}offer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(offerData),
        }
      );
      if (!createOfferResponse.ok) {
        const errorText = await createOfferResponse.text();
        throw new Error(
          `Failed to create offer: ${createOfferResponse.status} - ${errorText}`
        );
      }

      createdOffer = await createOfferResponse.json();
      const offerId = createdOffer.id; // Получаем ID созданного оффера
      // 3. Обновляем оффер с ссылками на картинки
      if (imageUrls.length > 0) {
        const updateImagesResponse = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}updateOfferImages`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: offerId,
              images: imageUrls,
            }),
          }
        );

        if (!updateImagesResponse.ok) {
          const errorText = await updateImagesResponse.text();
          throw new Error(
            `Failed to update offer images: ${updateImagesResponse.status} - ${errorText}`
          );
        }
        const updatedOffer = await updateImagesResponse.json();
      }

      return createdOffer; // Возвращаем созданный оффер (с ID)
    } catch (error) {
      console.error("Error in createOfferWithImages:", error);
      throw error; // Пробрасываем ошибку выше
    }
  }
}

async function resizeAndCompressImage(
  file,
  maxWidth,
  maxHeight,
  quality = 0.7
) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Рассчитываем новые размеры с сохранением пропорций
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Проверяем, что контекст получен
          ctx.drawImage(img, 0, 0, width, height);
          try {
            const dataUrl = canvas.toDataURL("image/jpeg", quality); //  image/jpeg, image/webp, и т.д.
            resolve(dataUrl);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error("Could not get 2D context"));
        }
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = event.target.result; // event.target.result содержит data URL
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file); //  Важно: читаем как Data URL
  });
}
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}
module.exports = new db();
