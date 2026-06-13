import api from './api';

export const distributionsService = {
  register: (data) => api.post('/distributions', data),
};
