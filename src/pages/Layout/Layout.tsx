import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import './Layout.css';

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>ipManager</h1>
          <span className="sidebar-subtitle">Igreja</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/beneficiarios">Beneficiários</NavLink>
          <NavLink to="/estoque">Estoque</NavLink>
          <NavLink to="/distribuicoes">Distribuições</NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <span className="user-email">{user?.email}</span>
            <span className="user-role">{user?.role}</span>
          </div>
          <button className="btn-logout" onClick={handleLogout}>Sair</button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
