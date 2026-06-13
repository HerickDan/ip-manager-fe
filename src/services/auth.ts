import api from './api';

interface AuthData {
  email: string;
  password: string;
}

interface AdminData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  description?: string;
}

export const authService = {
  login: (data: AuthData) => api.post('/auth', data),
  register: (data: AdminData) => api.post('/admin', data),
};
