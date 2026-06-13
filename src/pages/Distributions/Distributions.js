import { useState } from 'react';
import { useDistributions, useBeneficiaries } from '../../hooks';
import './Distributions.css';

export function Distributions() {
  const { register, loading, error } = useDistributions();
  const { findById } = useBeneficiaries();
  const [form, setForm] = useState({
    beneficiaryId: '',
    quantity: 1,
    moreThanOne: false,
    justify: '',
  });
  const [success, setSuccess] = useState(false);
  const [beneficiaryName, setBeneficiaryName] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSearchBeneficiary = async () => {
    if (!form.beneficiaryId) return;
    try {
      const data = await findById(form.beneficiaryId);
      if (data) {
        setBeneficiaryName(`${data.firstName} ${data.lastName}`);
      }
    } catch {
      setBeneficiaryName('Beneficiário não encontrado');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    try {
      await register(form);
      setSuccess(true);
      setForm({ beneficiaryId: '', quantity: 1, moreThanOne: false, justify: '' });
      setBeneficiaryName('');
    } catch {
      // error handled by hook
    }
  };

  return (
    <div className="page" style={{ maxWidth: 600 }}>
      <div className="page-header">
        <h1>Distribuições</h1>
        <p>Registre a distribuição de cestas para beneficiários</p>
      </div>

      {success && (
        <div className="alert" style={{ background: '#e8f5e9', color: '#2e7d32', border: '1px solid #c8e6c9' }}>
          Distribuição registrada com sucesso!
        </div>
      )}

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="beneficiaryId">ID do Beneficiário</label>
            <div className="input-row">
              <input
                id="beneficiaryId"
                name="beneficiaryId"
                placeholder="Digite o ID"
                value={form.beneficiaryId}
                onChange={handleChange}
                required
              />
              <button type="button" className="btn btn-secondary" onClick={handleSearchBeneficiary}>
                Buscar
              </button>
            </div>
            {beneficiaryName && (
              <small style={{ color: beneficiaryName.includes('não encontrado') ? '#d32f2f' : '#2e7d32' }}>
                {beneficiaryName}
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantidade de cestas</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="moreThanOne"
                checked={form.moreThanOne}
                onChange={handleChange}
              />
              <span>Mais de uma cesta?</span>
            </label>
          </div>

          {form.moreThanOne && (
            <div className="form-group">
              <label htmlFor="justify">Justificativa</label>
              <textarea
                id="justify"
                name="justify"
                placeholder="Informe o motivo"
                value={form.justify}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrar Distribuição'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
