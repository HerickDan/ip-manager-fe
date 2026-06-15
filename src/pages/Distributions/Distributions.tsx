import { useState, useEffect, type FormEvent } from 'react';
import { useDistributions } from '../../hooks';
import { beneficiariesService } from '../../services';
import './Distributions.css';

interface DistributionForm {
  beneficiaryId: string;
  quantity: number;
  moreThanOne: boolean;
  justify: string;
}

export function Distributions() {
  const { register, loading, error } = useDistributions();
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
  const [form, setForm] = useState<DistributionForm>({
    beneficiaryId: '',
    quantity: 1,
    moreThanOne: false,
    justify: '',
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadBeneficiaries();
  }, []);

  const loadBeneficiaries = async () => {
    try {
      const { data } = await beneficiariesService.findAll(true);
      setBeneficiaries(data);
    } catch {
      // silently fail
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    try {
      await register(form);
      setSuccess(true);
      setForm({ beneficiaryId: '', quantity: 1, moreThanOne: false, justify: '' });
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
            <label htmlFor="beneficiaryId">Beneficiário</label>
            <select
              id="beneficiaryId"
              name="beneficiaryId"
              value={form.beneficiaryId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um beneficiário</option>
              {beneficiaries.map((b) => (
                <option key={b.id} value={b.id ?? ''}>
                  {b.firstName} {b.lastName}
                </option>
              ))}
            </select>
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
