import api from './api';

export const basketsService = {
  getStock: () => api.get('/baskets/stock'),
  addStock: (quantity) => api.post(`/baskets/stock/${quantity}`),
};
