import { LayoutDashboard, Package, Box, FileText, Receipt, User, MapPin, MessageSquare, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const { t } = useLanguage();
  
  const menuItems = [
    { id: 'dashboard', labelKey: 'menu.dashboard', icon: LayoutDashboard },
    { id: 'produits', labelKey: 'menu.products', icon: Package },
    { id: 'colis', labelKey: 'menu.packages', icon: Box },
    { id: 'bons-livraison', labelKey: 'menu.deliveryNotes', icon: FileText },
    { id: 'factures', labelKey: 'menu.invoices', icon: Receipt },
    { id: 'livreurs', labelKey: 'menu.drivers', icon: User },
    { id: 'villes', labelKey: 'menu.cities', icon: MapPin },
    { id: 'reclamations', labelKey: 'menu.complaints', icon: MessageSquare },
    { id: 'mes-informations', labelKey: 'menu.myInfo', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Package className="w-8 h-8 text-blue-600" />
          <h1 className="text-gray-900">ShipFlow</h1>
        </div>
      </div>
      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                currentView === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{t(item.labelKey)}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}