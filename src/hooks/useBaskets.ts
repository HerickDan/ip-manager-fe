import { useState, useCallback } from 'react';
import { basketsService } from '../services';

interface StockData {
  quantity: number;
}

export function useBaskets() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stock, setStock] = useState<StockData | null>(null);

  const getStock = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await basketsService.getStock();
      setStock(data);
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao consultar estoque';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addStock = useCallback(async (quantity: number) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await basketsService.addStock(quantity);
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao adicionar estoque';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { stock, loading, error, getStock, addStock };
}
