import { useState } from 'react';
import { Plus, Search, Filter, Eye, X } from 'lucide-react';

export function Colis() {
  const [showNewColis, setShowNewColis] = useState(false);
  const [selectedColis, setSelectedColis] = useState<any>(null);

  const colis = [
    { id: 'COL-2847', client: 'Acme Corp', destinataire: 'Jean Dupont', ville: 'Paris', adresse: '123 Rue de la Paix, 75001', statut: 'En transit', livreur: 'Mohamed Ali', date: '2024-12-03', poids: '2.5 kg' },
    { id: 'COL-2846', client: 'TechStart Inc', destinataire: 'Marie Martin', ville: 'Lyon', adresse: '45 Avenue des Fleurs, 69001', statut: 'Livré', livreur: 'Ahmed Ben', date: '2024-12-03', poids: '1.8 kg' },
    { id: 'COL-2845', client: 'Global Supplies', destinataire: 'Pierre Dubois', ville: 'Marseille', adresse: '78 Boulevard du Port, 13001', statut: 'En préparation', livreur: 'Non assigné', date: '2024-12-03', poids: '3.2 kg' },
    { id: 'COL-2844', client: 'MegaMart', destinataire: 'Sophie Bernard', ville: 'Toulouse', adresse: '12 Place du Capitole, 31000', statut: 'En livraison', livreur: 'Karim Sadiq', date: '2024-12-03', poids: '1.5 kg' },
    { id: 'COL-2843', client: 'Prime Retail', destinataire: 'Luc Petit', ville: 'Nice', adresse: '89 Promenade des Anglais, 06000', statut: 'En transit', livreur: 'Youssef Alami', date: '2024-12-02', poids: '4.1 kg' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900">Gestion des Colis</h1>
        <button 
          onClick={() => setShowNewColis(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Nouveau Colis
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">Total Colis</p>
          <p className="text-gray-900">2,847</p>
          <p className="text-blue-600 mt-1">+12.5%</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">En transit</p>
          <p className="text-gray-900">1,423</p>
          <p className="text-orange-600 mt-1">En cours</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">Livrés aujourd'hui</p>
          <p className="text-gray-900">892</p>
          <p className="text-green-600 mt-1">+15.3%</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">En attente</p>
          <p className="text-gray-900">156</p>
          <p className="text-gray-600 mt-1">À traiter</p>
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
                placeholder="Rechercher un colis..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Tous les statuts</option>
            <option>En préparation</option>
            <option>En transit</option>
            <option>En livraison</option>
            <option>Livré</option>
            <option>Retourné</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Toutes les villes</option>
            <option>Fes</option>
            <option>Meknes</option>
            <option>Casablanca</option>
            <option>Rabat</option>
            <option>Qenitra</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Plus de filtres
          </button>
        </div>
      </div>

      {/* Tableau des colis */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-gray-600">N° Colis</th>
                <th className="px-6 py-3 text-left text-gray-600">Client</th>
                <th className="px-6 py-3 text-left text-gray-600">Destinataire</th>
                <th className="px-6 py-3 text-left text-gray-600">Ville</th>
                <th className="px-6 py-3 text-left text-gray-600">Adresse</th>
                <th className="px-6 py-3 text-left text-gray-600">Poids</th>
                <th className="px-6 py-3 text-left text-gray-600">Livreur</th>
                <th className="px-6 py-3 text-left text-gray-600">Statut</th>
                <th className="px-6 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {colis.map((col) => (
                <tr key={col.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{col.id}</td>
                  <td className="px-6 py-4 text-gray-900">{col.client}</td>
                  <td className="px-6 py-4 text-gray-900">{col.destinataire}</td>
                  <td className="px-6 py-4 text-gray-600">{col.ville}</td>
                  <td className="px-6 py-4 text-gray-600">{col.adresse}</td>
                  <td className="px-6 py-4 text-gray-600">{col.poids}</td>
                  <td className="px-6 py-4 text-gray-600">{col.livreur}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-white ${
                      col.statut === 'Livré' ? 'bg-green-500' :
                      col.statut === 'En transit' ? 'bg-blue-500' :
                      col.statut === 'En livraison' ? 'bg-purple-500' :
                      col.statut === 'En préparation' ? 'bg-gray-500' :
                      'bg-orange-500'
                    }`}>
                      {col.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedColis(col)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nouveau Colis */}
      {showNewColis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Créer un Nouveau Colis</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Client</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Téléphone client</label>
                  <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nom destinataire</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Téléphone destinataire</label>
                  <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Ville</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Paris</option>
                    <option>Lyon</option>
                    <option>Marseille</option>
                    <option>Toulouse</option>
                    <option>Nice</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Poids</label>
                  <input type="text" placeholder="ex: 2.5 kg" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Adresse complète</label>
                <textarea rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Notes / Instructions</label>
                <textarea rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowNewColis(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Créer le colis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails Colis */}
      {selectedColis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">Détails du Colis {selectedColis.id}</h2>
              <button 
                onClick={() => setSelectedColis(null)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">N° Colis</p>
                  <p className="text-gray-900">{selectedColis.id}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Date</p>
                  <p className="text-gray-900">{selectedColis.date}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Client</p>
                  <p className="text-gray-900">{selectedColis.client}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Destinataire</p>
                  <p className="text-gray-900">{selectedColis.destinataire}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Ville</p>
                  <p className="text-gray-900">{selectedColis.ville}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Poids</p>
                  <p className="text-gray-900">{selectedColis.poids}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Adresse complète</p>
                <p className="text-gray-900">{selectedColis.adresse}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Livreur assigné</p>
                <p className="text-gray-900">{selectedColis.livreur}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Statut</p>
                <span className={`inline-block px-3 py-1 rounded-full text-white ${
                  selectedColis.statut === 'Livré' ? 'bg-green-500' :
                  selectedColis.statut === 'En transit' ? 'bg-blue-500' :
                  selectedColis.statut === 'En livraison' ? 'bg-purple-500' :
                  selectedColis.statut === 'En préparation' ? 'bg-gray-500' :
                  'bg-orange-500'
                }`}>
                  {selectedColis.statut}
                </span>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button 
                onClick={() => setSelectedColis(null)}
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