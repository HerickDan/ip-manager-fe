import { useState, useCallback } from 'react';
import { authService } from '../services';

interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

interface AuthPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  description?: string;
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('@ipmanager:user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authService.login({ email, password });
      setUser(data);
      localStorage.setItem('@ipmanager:user', JSON.stringify(data));
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao fazer login';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: AuthPayload) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authService.register(payload);
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erro ao cadastrar';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('@ipmanager:user');
  }, []);

  const isAuthenticated = !!user;

  return { user, loading, error, isAuthenticated, login, register, logout };
}
