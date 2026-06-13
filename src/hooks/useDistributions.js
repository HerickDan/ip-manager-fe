import { useState, useCallback } from 'react';
import { distributionsService } from '../services';

export function useDistributions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await distributionsService.register(data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao registrar distribuição';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, register };
}
