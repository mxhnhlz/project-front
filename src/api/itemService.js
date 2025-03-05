const api = process.env.REACT_APP_API_BASE_URL;

/**
 * Получает список товаров для пользователя, исключая его собственные.
 * @param {number} tg_id - ID пользователя.
 * @param {number|null} lastItemId - ID последнего полученного товара (для пагинации).
 * @param {number} limit - Количество товаров для получения.
 * @returns {Promise<Array>} - Промис с массивом товаров.
 * @throws {Error} - Если произошла ошибка при запросе.
 */
const getItems = async (tg_id = 0, lastItemId = 0, limit = 10) => {
  try {
    const url = new URL(`${api}getOfferList`);
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
    console.log("itemService:");
    console.log(data);
    return data;
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    throw error; // Пробрасываем ошибку, чтобы компонент мог ее обработать
  }
};
export default getItems;
