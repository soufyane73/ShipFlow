import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Produits } from './components/Produits';
import { Colis } from './components/Colis';
import { BonsLivraison } from './components/BonsLivraison';
import { Factures } from './components/Factures';
import { Livreurs } from './components/Livreurs';
import { Villes } from './components/Villes';
import { Reclamations } from './components/Reclamations';
import { MesInformations } from './components/MesInformations';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Login } from './components/Login';
import { Toaster } from 'sonner';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (token: string) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
  };

  const renderView = () => {
    console.log('Current View:', currentView);
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'produits':
        return <Produits />;
      case 'colis':
        return <Colis />;
      case 'bons-livraison':
        return <BonsLivraison />;
      case 'factures':
        return <Factures />;
      case 'livreurs':
        return <Livreurs />;
      case 'villes':
        return <Villes />;
      case 'reclamations':
        return <Reclamations />;
      case 'mes-informations':
        return <MesInformations />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!isAuthenticated) {
    return (
      <LanguageProvider>
        <Toaster position="top-right" richColors />
        <Login onLoginSuccess={handleLoginSuccess} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="flex h-screen bg-gray-50">
        <Toaster position="top-right" richColors />
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {renderView()}
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
}