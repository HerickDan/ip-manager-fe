import { useState, useCallback } from 'react';
import { distributionsService } from '../services';

interface DistributionData {
  beneficiaryId: string;
  quantity: number;
  moreThanOne: boolean;
  justify?: string;
}

export function useDistributions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(async (data: DistributionData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await distributionsService.register(data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao registrar distribuição';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, register };
}
