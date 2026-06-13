import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Layout } from './pages/Layout/Layout';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { BeneficiaryList } from './pages/Beneficiaries/BeneficiaryList';
import { BeneficiaryForm } from './pages/Beneficiaries/BeneficiaryForm';
import { Stock } from './pages/Stock/Stock';
import { Distributions } from './pages/Distributions/Distributions';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registrar" element={<Register />} />

      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="beneficiarios" element={<BeneficiaryList />} />
        <Route path="beneficiarios/novo" element={<BeneficiaryForm />} />
        <Route path="beneficiarios/:id/editar" element={<BeneficiaryForm />} />
        <Route path="estoque" element={<Stock />} />
        <Route path="distribuicoes" element={<Distributions />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
