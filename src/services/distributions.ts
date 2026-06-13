import api from './api';

interface DistributionData {
  beneficiaryId: string;
  quantity: number;
  moreThanOne: boolean;
  justify?: string;
}

export const distributionsService = {
  register: (data: DistributionData) => api.post('/distributions', data),
};
