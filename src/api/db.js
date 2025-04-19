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
  async getItems(tg_id = 0, lastItemId = 0, limit = 10) {
    try {
      const url = new URL(`${process.env.REACT_APP_API_BASE_URL}getOfferList`);
      // Добавляем параметры запроса
      url.searchParams.append("tg_id", tg_id.toString());
      url.searchParams.append("lastItemId", lastItemId.toString());
      url.searchParams.append("limit", limit.toString());
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Ошибка при запросе: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
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
      const url = `${process.env.REACT_APP_API_BASE_URL}deleteFavorite/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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

      const createdOffer = await createOfferResponse.json();
      const offerId = createdOffer.id; // Получаем ID созданного оффера
      const imageUrls = [];

      // 2. Загружаем картинки (если есть)
      if (imageFiles && imageFiles.length > 0) {
        for (const imageFile of imageFiles) {
          const fileName = imageFile.name;
          const fileExtension = fileName.split(".").pop(); // Получаем расширение файла
          const timestamp = Date.now();
          const newFileName = `${timestamp}-${tg_id}.${fileExtension}`; // Формируем новое имя файла

          const formData = new FormData();
          formData.append("image", imageFile, newFileName);

          const uploadResponse = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}uploadImage`,
            {
              // Используем тот же API endpoint
              method: "POST",
              body: formData,
            }
          );

          if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            throw new Error(
              `Failed to upload image: ${uploadResponse.status} - ${errorText}`
            );
          }

          const uploadResult = await uploadResponse.json(); // Получаем результат загрузки (URL)
          imageUrls.push(uploadResult.imageUrl); // Добавляем URL в массив
        }
        // 3. Обновляем оффер с ссылками на картинки
        if (imageUrls.length > 0) {
          const updateImagesResponse = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}uploadOfferImages`,
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
      }

      return createdOffer; // Возвращаем созданный оффер (с ID)
    } catch (error) {
      console.error("Error in createOfferWithImages:", error);
      throw error; // Пробрасываем ошибку выше
    }
  }
}

module.exports = new db();
