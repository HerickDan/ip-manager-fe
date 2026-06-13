import api from './api';

export const beneficiariesService = {
  create: (data) => api.post('/beneficiaries', data),
  findById: (id) => api.get(`/beneficiaries/${id}`),
  update: (id, data) => api.patch(`/beneficiaries/${id}`, data),
  disable: (id) => api.delete(`/beneficiaries/${id}`),
};
