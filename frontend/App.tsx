import { useState } from 'react';
import { StatusWebPage } from './pages/StatusWebPage';
import { StatusAdminPage } from './pages/admin/StatusAdminPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { UsersPage } from './pages/admin/UsersPage';
import { ProjectsPage } from './pages/admin/ProjectsPage';
import { TeamsPage } from './pages/admin/TeamsPage';
import { HistoryPage } from './pages/admin/HistoryPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import './index.css';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(
    window.location.hash.replace('#', '') || '/'
  );

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Routing logic
  const renderPage = () => {
    switch (currentPath) {
      case '/status/admin/login':
        return <StatusAdminPage navigate={navigate} />;
      case '/status/admin':
        return <DashboardPage navigate={navigate} />;
      case '/status/admin/users':
        return <UsersPage navigate={navigate} />;
      case '/status/admin/projects':
        return <ProjectsPage navigate={navigate} />;
      case '/status/admin/teams':
        return <TeamsPage navigate={navigate} />;
      case '/status/admin/history':
        return <HistoryPage navigate={navigate} />;
      case '/status/admin/settings':
        return <SettingsPage navigate={navigate} />;
      case '/status':
      case '/':
      default:
        return <StatusWebPage navigate={navigate} />;
    }
  };

  return renderPage();
}

