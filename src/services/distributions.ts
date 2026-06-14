import api from './api';

interface DistributionData {
  beneficiaryId: string;
  quantity: number;
  moreThanOne: boolean;
  justify?: string;
}

interface DistributionFilters {
  month?: number;
  year?: number;
}

export const distributionsService = {
  register: (data: DistributionData) => api.post('/distributions', data),
  findAll: (filters?: DistributionFilters) => api.get('/distributions', { params: filters }),
};
