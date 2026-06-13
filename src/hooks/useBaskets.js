import { useState, useCallback } from 'react';
import { basketsService } from '../services';

export function useBaskets() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stock, setStock] = useState(null);

  const getStock = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await basketsService.getStock();
      setStock(data);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao consultar estoque';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addStock = useCallback(async (quantity) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await basketsService.addStock(quantity);
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao adicionar estoque';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { stock, loading, error, getStock, addStock };
}
