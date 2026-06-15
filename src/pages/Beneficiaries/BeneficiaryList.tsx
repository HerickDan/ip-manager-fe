import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { beneficiariesService } from '../../services';
import './Beneficiaries.css';
interface Beneficiary {
  id: string;
  firstName: string;
  lastName: string;
  number?: { ddd?: string; prefixLine?: string };
  address?: { name?: string; number?: string };
  familyMemberNumber?: number;
}

export function BeneficiaryList() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    loadBeneficiaries(true);
  }, []);

  const loadBeneficiaries = async (active: boolean) => {
    setLoading(true);
    try {
      const { data } = await beneficiariesService.findAll(active);
      setBeneficiaries(data);
      setActive(active)
    } catch {
      setError('Erro ao carregar beneficiários');
    } finally {
      setLoading(false);
    }
  };

  const handleDisable = async (id: string) => {
    try {
      await beneficiariesService.disable(id);
      loadBeneficiaries(true);
    } catch {
      setError('Erro ao desativar beneficiário');
    }
  };


  const handleActive = async (id: string) => {
    try {
      await beneficiariesService.active(id);
      loadBeneficiaries(true);
    } catch {
      setError('Erro ao desativar beneficiário');
    }
  };

  const disableOrAble = (id: string) =>{
    active == true ? handleDisable(id) : handleActive(id)
    
  }

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="page">
      <div className="page-header-row">
        <div className="page-header">
          <h1>Beneficiários</h1>
          <p>Gerencie os beneficiários cadastrados</p>
        </div>
        <Link to="/beneficiarios/novo" className="btn btn-primary">
          + Novo Beneficiário
        </Link>
      </div>

      <div className="filter-tabs">
        <button
          className={`filter-tab ${active ? 'active' : ''}`}
          onClick={() => loadBeneficiaries(true)}
        >
          Ativos
        </button>
        <button
          className={`filter-tab ${!active ? 'active' : ''}`}
          onClick={() => loadBeneficiaries(false)}
        >
          Inativos
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {beneficiaries.length === 0 ? (
        <div className="card">
          <div className="table-empty">
            <p>Nenhum beneficiário {active ? 'ativo' : 'inativo'} encontrado.</p>
          </div>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Membros</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {beneficiaries.map((b) => (
                <tr key={b.id}>
                  <td>{b.firstName} {b.lastName}</td>
                  <td>{b.number?.ddd} {b.number?.prefixLine}</td>
                  <td>{b.address?.name}, {b.address?.number}</td>
                  <td>{b.familyMemberNumber}</td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/beneficiarios/${b.id}`)}>
                        Ver
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/beneficiarios/${b.id}/editar`)}>
                        Editar
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => disableOrAble(b.id)}>
                        {active == true ? "Desativar" : "Ativar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
