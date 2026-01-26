import { useState } from 'react';
import { Plus, Search, Download, Eye, Printer, X } from 'lucide-react';
import { toast } from 'sonner';

export function BonsLivraison() {
  const [showNewBon, setShowNewBon] = useState(false);
  const [selectedBon, setSelectedBon] = useState<any>(null);

  const bons = [
    { id: 'BL-2024-001', client: 'Acme Corp', dateCreation: '2024-12-03', dateLivraison: '2024-12-04', nbColis: 5, total: '450.00', statut: 'En cours', livreur: 'Mohamed Ali' },
    { id: 'BL-2024-002', client: 'TechStart Inc', dateCreation: '2024-12-03', dateLivraison: '2024-12-03', nbColis: 3, total: '285.00', statut: 'Livré', livreur: 'Ahmed Ben' },
    { id: 'BL-2024-003', client: 'Global Supplies', dateCreation: '2024-12-02', dateLivraison: '2024-12-05', nbColis: 8, total: '720.00', statut: 'Planifié', livreur: 'Non assigné' },
    { id: 'BL-2024-004', client: 'MegaMart', dateCreation: '2024-12-02', dateLivraison: '2024-12-03', nbColis: 12, total: '1150.00', statut: 'En cours', livreur: 'Karim Sadiq' },
    { id: 'BL-2024-005', client: 'Prime Retail', dateCreation: '2024-12-01', dateLivraison: '2024-12-02', nbColis: 6, total: '580.00', statut: 'Livré', livreur: 'Youssef Alami' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900">Bons de Livraison</h1>
        <button 
          onClick={() => setShowNewBon(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Nouveau Bon
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">Total Bons</p>
          <p className="text-gray-900">1,248</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">En cours</p>
          <p className="text-gray-900">342</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">Livrés ce mois</p>
          <p className="text-gray-900">856</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">Total (€)</p>
          <p className="text-gray-900">125,430 €</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un bon de livraison..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Tous les statuts</option>
            <option>Planifié</option>
            <option>En cours</option>
            <option>Livré</option>
            <option>Annulé</option>
          </select>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tableau des bons */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-gray-600">N° Bon</th>
                <th className="px-6 py-3 text-left text-gray-600">Client</th>
                <th className="px-6 py-3 text-left text-gray-600">Date création</th>
                <th className="px-6 py-3 text-left text-gray-600">Date livraison</th>
                <th className="px-6 py-3 text-left text-gray-600">Nb colis</th>
                <th className="px-6 py-3 text-left text-gray-600">Livreur</th>
                <th className="px-6 py-3 text-left text-gray-600">Total</th>
                <th className="px-6 py-3 text-left text-gray-600">Statut</th>
                <th className="px-6 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bons.map((bon) => (
                <tr key={bon.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{bon.id}</td>
                  <td className="px-6 py-4 text-gray-900">{bon.client}</td>
                  <td className="px-6 py-4 text-gray-600">{bon.dateCreation}</td>
                  <td className="px-6 py-4 text-gray-600">{bon.dateLivraison}</td>
                  <td className="px-6 py-4 text-gray-900">{bon.nbColis}</td>
                  <td className="px-6 py-4 text-gray-600">{bon.livreur}</td>
                  <td className="px-6 py-4 text-gray-900">{bon.total} €</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-white ${
                      bon.statut === 'Livré' ? 'bg-green-500' :
                      bon.statut === 'En cours' ? 'bg-blue-500' :
                      bon.statut === 'Planifié' ? 'bg-orange-500' :
                      'bg-gray-500'
                    }`}>
                      {bon.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedBon(bon)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => toast.success('Impression du bon de livraison...')}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => toast.success('Téléchargement du PDF...')}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nouveau Bon */}
      {showNewBon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Créer un Bon de Livraison</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Client</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Sélectionner un client</option>
                    <option>Acme Corp</option>
                    <option>TechStart Inc</option>
                    <option>Global Supplies</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Date de livraison</label>
                  <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Sélectionner les colis</label>
                <div className="border border-gray-300 rounded-lg p-4 max-h-48 overflow-y-auto">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>COL-2847 - Jean Dupont - Paris (2.5 kg)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>COL-2848 - Marie Martin - Lyon (1.8 kg)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>COL-2849 - Pierre Dubois - Marseille (3.2 kg)</span>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Livreur</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Sélectionner un livreur</option>
                  <option>Mohamed Ali</option>
                  <option>Ahmed Ben</option>
                  <option>Karim Sadiq</option>
                  <option>Youssef Alami</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Notes</label>
                <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowNewBon(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Créer le bon
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails Bon */}
      {selectedBon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">Détails du Bon {selectedBon.id}</h2>
              <button 
                onClick={() => setSelectedBon(null)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">N° Bon de Livraison</p>
                  <p className="text-gray-900">{selectedBon.id}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Client</p>
                  <p className="text-gray-900">{selectedBon.client}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Date création</p>
                  <p className="text-gray-900">{selectedBon.dateCreation}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Date livraison prévue</p>
                  <p className="text-gray-900">{selectedBon.dateLivraison}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Nombre de colis</p>
                  <p className="text-gray-900">{selectedBon.nbColis}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Livreur assigné</p>
                  <p className="text-gray-900">{selectedBon.livreur}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Total</p>
                <p className="text-gray-900">{selectedBon.total} €</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Statut</p>
                <span className={`inline-block px-3 py-1 rounded-full text-white ${
                  selectedBon.statut === 'Livré' ? 'bg-green-500' :
                  selectedBon.statut === 'En cours' ? 'bg-blue-500' :
                  selectedBon.statut === 'Planifié' ? 'bg-orange-500' :
                  'bg-gray-500'
                }`}>
                  {selectedBon.statut}
                </span>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => toast.success('Impression du bon...')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Imprimer
              </button>
              <button 
                onClick={() => setSelectedBon(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}