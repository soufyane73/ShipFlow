import { Package, Truck, Receipt, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Dashboard() {
  const { t } = useLanguage();
  
  const stats = [
    { labelKey: 'dashboard.activePackages', value: '2,847', change: '+12.5%', icon: Package, color: 'blue' },
    { labelKey: 'dashboard.inTransit', value: '1,423', change: '+8.2%', icon: Truck, color: 'green' },
    { labelKey: 'dashboard.todayDeliveries', value: '892', change: '+15.3%', icon: CheckCircle, color: 'purple' },
    { labelKey: 'cities.covered', value: '28', change: '+2', icon: MapPin, color: 'orange' },
  ];

  const recentShipments = [
    { id: 'COL-2847', customer: 'Acme Corp', destination: 'Paris', status: 'En transit', time: 'Il y a 2h' },
    { id: 'COL-2846', customer: 'TechStart Inc', destination: 'Lyon', status: 'Livré', time: 'Il y a 4h' },
    { id: 'COL-2845', customer: 'Global Supplies', destination: 'Marseille', status: 'En préparation', time: 'Il y a 5h' },
    { id: 'COL-2844', customer: 'MegaMart', destination: 'Toulouse', status: 'En transit', time: 'Il y a 6h' },
    { id: 'COL-2843', customer: 'Prime Retail', destination: 'Nice', status: 'En livraison', time: 'Il y a 8h' },
  ];

  const alerts = [
    { type: 'warning', message: '23 produits en stock faible', time: 'Il y a 1h' },
    { type: 'info', message: '5 livreurs disponibles à Paris', time: 'Il y a 3h' },
    { type: 'urgent', message: '12 colis en retard de livraison', time: 'Il y a 5h' },
  ];

  return (
    <div>
      <h1 className="text-gray-900 mb-6">{t('dashboard.title')}</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.labelKey} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 mb-1">{t(stat.labelKey)}</p>
                  <p className="text-gray-900">{stat.value}</p>
                  <p className={`text-${stat.color}-600 mt-1`}>{stat.change}</p>
                </div>
                <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Shipments */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-900">{t('dashboard.recentActivity')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-gray-600">{t('packages.number')}</th>
                  <th className="px-6 py-3 text-left text-gray-600">{t('packages.client')}</th>
                  <th className="px-6 py-3 text-left text-gray-600">{t('packages.city')}</th>
                  <th className="px-6 py-3 text-left text-gray-600">{t('common.status')}</th>
                  <th className="px-6 py-3 text-left text-gray-600">{t('common.date')}</th>
                </tr>
              </thead>
              <tbody>
                {recentShipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{shipment.id}</td>
                    <td className="px-6 py-4 text-gray-900">{shipment.customer}</td>
                    <td className="px-6 py-4 text-gray-600">{shipment.destination}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-white ${
                        shipment.status === 'Livré' ? 'bg-green-500' :
                        shipment.status === 'En transit' ? 'bg-blue-500' :
                        shipment.status === 'En livraison' ? 'bg-purple-500' :
                        'bg-gray-500'
                      }`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{shipment.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-900">Alertes & Notifications</h2>
          </div>
          <div className="p-6 space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                alert.type === 'urgent' ? 'bg-red-50 border-red-200' :
                alert.type === 'warning' ? 'bg-orange-50 border-orange-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex gap-3">
                  <AlertCircle className={`w-5 h-5 flex-shrink-0 ${
                    alert.type === 'urgent' ? 'text-red-600' :
                    alert.type === 'warning' ? 'text-orange-600' :
                    'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <p className="text-gray-900">{alert.message}</p>
                    <p className="text-gray-600 mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}