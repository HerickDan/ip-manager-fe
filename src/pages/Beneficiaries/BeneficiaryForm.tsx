import { useState, useEffect, useCallback, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBeneficiaries } from '../../hooks';

interface BeneficiaryFormData {
  firstName: string;
  lastName: string;
  familyMemberNumber: number;
  number: { countryCode: number; ddd: string; prefixLine: string };
  address: { name: string; number: string; complement: string };
}

const initialForm: BeneficiaryFormData = {
  firstName: '',
  lastName: '',
  familyMemberNumber: 1,
  number: { countryCode: 55, ddd: '', prefixLine: '' },
  address: { name: '', number: '', complement: '' },
};

export function BeneficiaryForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { create, update, findById, loading, error } = useBeneficiaries();
  const [form, setForm] = useState<BeneficiaryFormData>(initialForm);

  const loadBeneficiary = useCallback(async () => {
    try {
      const data = await findById(id!);
      if (data) {
        setForm({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          familyMemberNumber: data.familyMemberNumber || 1,
          number: {
            countryCode: data.number?.countryCode || 55,
            ddd: data.number?.ddd || '',
            prefixLine: data.number?.prefixLine || '',
          },
          address: {
            name: data.address?.name || '',
            number: data.address?.number || '',
            complement: data.address?.complement || '',
          },
        });
      }
    } catch {
      navigate('/beneficiarios');
    }
  }, [id, findById, navigate]);

  useEffect(() => {
    if (isEditing) {
      loadBeneficiary();
    }
  }, [isEditing, loadBeneficiary]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('number.')) {
      const field = name.split('.')[1] as keyof BeneficiaryFormData['number'];
      setForm((prev) => ({
        ...prev,
        number: { ...prev.number, [field]: value },
      }));
    } else if (name.startsWith('address.')) {
      const field = name.split('.')[1] as keyof BeneficiaryFormData['address'];
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await update(id!, form);
      } else {
        await create(form);
      }
      navigate('/beneficiarios');
    } catch {
      // error handled by hook
    }
  };

  return (
    <div className="page" style={{ maxWidth: 600 }}>
      <div className="page-header">
        <h1>{isEditing ? 'Editar Beneficiário' : 'Novo Beneficiário'}</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Nome</label>
              <input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Sobrenome</label>
              <input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="familyMemberNumber">Número de membros da família</label>
            <input
              id="familyMemberNumber"
              name="familyMemberNumber"
              type="number"
              min="1"
              value={form.familyMemberNumber}
              onChange={handleChange}
              required
            />
          </div>

          <h3 className="form-section-title">Telefone</h3>
          <div className="form-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="ddd">DDD</label>
              <input
                id="ddd"
                name="number.ddd"
                value={form.number.ddd}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group" style={{ flex: 3 }}>
              <label htmlFor="prefixLine">Número</label>
              <input
                id="prefixLine"
                name="number.prefixLine"
                value={form.number.prefixLine}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <h3 className="form-section-title">Endereço</h3>
          <div className="form-group">
            <label htmlFor="addressName">Logradouro</label>
            <input
              id="addressName"
              name="address.name"
              value={form.address.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="addressNumber">Número</label>
              <input
                id="addressNumber"
                name="address.number"
                value={form.address.number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="complement">Complemento</label>
              <input
                id="complement"
                name="address.complement"
                value={form.address.complement}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/beneficiarios')}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Cadastrar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
