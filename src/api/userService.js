/**
 * Получает список товаров для пользователя, исключая его собственные.
 * @param {number} tg_id - ID пользователя.
 */
const getItems = async (tg_id) => {
  try {
    const url = new URL(
      `${process.env.REACT_APP_API_BASE_URL}getUser/${tg_id}`
    );
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Ошибка при запросе: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    //console.log("itemService:");
    //console.log(data);
    return data;
  } catch (error) {
    console.error("Ошибка при получении пользователя:", error);
    throw error; // Пробрасываем ошибку, чтобы компонент мог ее обработать
  }
};
export default getItems;
