// src/mocks/mockData.js

export const mockOffer = {
  id: '1',
  title: 'Скутер Xiaomi',
  price: 1200,
  city: 'Москва',
  tg_id: '12345',
  images: ['/images/scooter1.jpg', '/images/scooter2.jpg'],
  description:
    'Лёгкий и надёжный скутер Xiaomi для прогулок по городу. До 30 км на одном заряде. В комплекте зарядное устройство и сумка для переноски.',
}

export const mockUser = {
  id: '12345',
  name: 'Иван Иванов',
  city: 'Москва',
}

export const mockDb = {
  getOffer: async (id) => {
    console.log('Mock: getOffer', id)
    return mockOffer
  },
  getUser: async (userId) => {
    console.log('Mock: getUser', userId)
    return mockUser
  },
  newFavorite: async (tg_id, id) => {
    console.log('Mock: newFavorite', tg_id, id)
    return { success: true }
  },
}
