import { useAuth } from '../../hooks';
import './Dashboard.css';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Bem-vindo, {user?.firstName || user?.email}!</p>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Beneficiários</h3>
          <p>Cadastre e gerencie os beneficiários do programa</p>
        </div>
        <div className="card">
          <h3>Estoque</h3>
          <p>Controle a entrada de cestas básicas</p>
        </div>
        <div className="card">
          <h3>Distribuições</h3>
          <p>Registre quem recebeu as cestas</p>
        </div>
      </div>
    </div>
  );
}
