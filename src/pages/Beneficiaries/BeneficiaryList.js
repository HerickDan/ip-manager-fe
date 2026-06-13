import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { beneficiariesService } from '../../services';
import './Beneficiaries.css';

export function BeneficiaryList() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadBeneficiaries();
  }, []);

  const loadBeneficiaries = async () => {
    setLoading(true);
    try {
      // Note: The current API doesn't have a list endpoint.
      // This will be populated when the API is extended.
      setBeneficiaries([]);
    } catch (err) {
      setError('Erro ao carregar beneficiários');
    } finally {
      setLoading(false);
    }
  };

  const handleDisable = async (id) => {
    if (!window.confirm('Tem certeza que deseja desativar este beneficiário?')) return;
    try {
      await beneficiariesService.disable(id);
      loadBeneficiaries();
    } catch {
      setError('Erro ao desativar beneficiário');
    }
  };

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

      {error && <div className="alert alert-error">{error}</div>}

      {beneficiaries.length === 0 ? (
        <div className="card">
          <div className="table-empty">
            <p>Nenhum beneficiário cadastrado ainda.</p>
            <Link to="/beneficiarios/novo" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-block' }}>
              Cadastrar primeiro beneficiário
            </Link>
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
                      <button className="btn btn-danger btn-sm" onClick={() => handleDisable(b.id)}>
                        Desativar
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
