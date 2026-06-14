import { useEffect, useState } from 'react';
import { useAuth, useBaskets, useBeneficiaries } from '../../hooks';
import { beneficiariesService, distributionsService } from '../../services';
import './Dashboard.css';

export function Dashboard() {
  const { user } = useAuth();
  //const {beneficiaries} = useBeneficiaries()
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
  const [distributions, setDistributions] = useState<any[]>([]);
  const { stock, getStock, addStock } = useBaskets();
  useEffect(() => {
    getStock();
  }, [getStock]);
  const [error, setError] = useState(String)
  console.log(beneficiaries)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadData();
    getStock()
  }, []);


  const loadData = async () => {
    setLoading(true);
    try {
      const { data: beneficiariesData } = await beneficiariesService.findAll();
      const { data: distributionsData } = await distributionsService.findAll();
      setBeneficiaries(beneficiariesData);
      setDistributions(distributionsData);
    } catch {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Bem-vindo, {user?.firstName || user?.email}!</p>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Beneficiários</h3>
          {beneficiaries.length < 0 ?
            <p>Cadastre e gerencie os beneficiários do programa</p> :
            beneficiaries.length
          }
        </div>
        <div className="card">
          <h3>Estoque</h3>
          <p>
            {stock?.quantity! > 0 ?
              `${stock?.quantity} Cestas` :
              'Controle a entrada de cestas básicas '
            }
          </p>


        </div>
        <div className="card">
          <h3>Distribuições</h3>
          {distributions.length > 0 ?
            <p>{distributions.length} Distribuições</p> :
            <p>Registre quem recebeu as cestas</p>
          }
        </div>
      </div>
    </div>
  );
}
