import { useState, useEffect, type FormEvent } from 'react';
import { useBaskets } from '../../hooks';
import './Stock.css';

export function Stock() {
  const { stock, getStock, addStock, loading } = useBaskets();
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStock();
  }, [getStock]);

  const handleAddStock = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await addStock(Number(quantity));
      setQuantity('');
      getStock();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="page" style={{ maxWidth: 600 }}>
      <div className="page-header">
        <h1>Estoque</h1>
        <p>Gerencie a entrada de cestas básicas</p>
      </div>

      <div className="card stock-card">
        <h3>Saldo atual</h3>
        <div className="stock-balance">
          {loading ? (
            <span>Carregando...</span>
          ) : (
            <span className="stock-quantity">{stock?.quantity ?? 0}</span>
          )}
          <span className="stock-label">cestas disponíveis</span>
        </div>
      </div>

      <div className="card">
        <h3>Adicionar ao estoque</h3>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleAddStock} className="stock-form">
          <div className="form-group">
            <label htmlFor="quantity">Quantidade de cestas</label>
            <input
              id="quantity"
              type="number"
              min="1"
              placeholder="Ex: 10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading || !quantity}>
            {loading ? 'Adicionando...' : 'Adicionar ao estoque'}
          </button>
        </form>
      </div>
    </div>
  );
}
