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
}

module.exports = new db();
