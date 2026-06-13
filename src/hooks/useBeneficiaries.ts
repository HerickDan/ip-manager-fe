import { useState, useCallback } from 'react';
import { beneficiariesService } from '../services';

interface BeneficiaryData {
  id?: string;
  firstName?: string;
  lastName?: string;
  familyMemberNumber?: number;
  number?: { countryCode?: number; ddd?: string; prefixLine?: string };
  address?: { name?: string; number?: string; complement?: string };
}

export function useBeneficiaries() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [beneficiary, setBeneficiary] = useState<BeneficiaryData | null>(null);

  const create = useCallback(async (data: BeneficiaryData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await beneficiariesService.create(data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao cadastrar beneficiário';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const findById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await beneficiariesService.findById(id);
      setBeneficiary(data);
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao buscar beneficiário';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, data: BeneficiaryData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await beneficiariesService.update(id, data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao atualizar beneficiário';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const disable = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await beneficiariesService.disable(id);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao desativar beneficiário';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { beneficiary, loading, error, create, findById, update, disable };
}
