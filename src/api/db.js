class db {
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
}

module.exports = new db();
