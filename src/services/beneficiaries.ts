import api from './api';

export const beneficiariesService = {
  create: (data: unknown) => api.post('/beneficiaries', data),
  findById: (id: string) => api.get(`/beneficiaries/${id}`),
  update: (id: string, data: unknown) => api.patch(`/beneficiaries/${id}`, data),
  disable: (id: string) => api.delete(`/beneficiaries/${id}`),
  active: (id: String) => api.patch(`beneficiaries/active/${id}`),
  findAll: (active: Boolean) => api.get(`/beneficiaries?active=${active}`)
};
