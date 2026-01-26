import { useState } from 'react';
import { Plus, Search, Eye, MessageCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export function Reclamations() {
  const [showNewReclamation, setShowNewReclamation] = useState(false);
  const [selectedReclamation, setSelectedReclamation] = useState<string | null>(null);

  const reclamations = [
    { id: 'REC-2024-001', client: 'Acme Corp', colis: 'COL-2847', type: 'Colis endommagé', priorite: 'Haute', statut: 'En cours', date: '2024-12-03', description: 'Le colis est arrivé avec un emballage déchiré' },
    { id: 'REC-2024-002', client: 'TechStart Inc', colis: 'COL-2840', type: 'Retard de livraison', priorite: 'Moyenne', statut: 'Résolue', date: '2024-12-02', description: 'Livraison prévue le 30/11 mais reçue le 02/12' },
    { id: 'REC-2024-003', client: 'Global Supplies', colis: 'COL-2835', type: 'Mauvaise adresse', priorite: 'Haute', statut: 'En attente', date: '2024-12-02', description: 'Colis livré à une adresse incorrecte' },
    { id: 'REC-2024-004', client: 'MegaMart', colis: 'COL-2828', type: 'Colis perdu', priorite: 'Urgente', statut: 'En cours', date: '2024-12-01', description: 'Aucune mise à jour depuis 5 jours' },
    { id: 'REC-2024-005', client: 'Prime Retail', colis: 'COL-2820', type: 'Service client', priorite: 'Basse', statut: 'Résolue', date: '2024-11-30', description: 'Demande d\'information sur le suivi' },
    { id: 'REC-2024-006', client: 'QuickShop', colis: 'COL-2815', type: 'Produit incorrect', priorite: 'Moyenne', statut: 'Rejetée', date: '2024-11-29', description: 'Produit reçu ne correspond pas à la commande' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900">Gestion des Réclamations</h1>
        <button 
          onClick={() => setShowNewReclamation(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Nouvelle Réclamation
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 mb-1">Total</p>
              <p className="text-gray-900">156</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 mb-1">En cours</p>
              <p className="text-gray-900">45</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 mb-1">Résolues</p>
              <p className="text-gray-900">98</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 mb-1">Rejetées</p>
              <p className="text-gray-900">13</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
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
                placeholder="Rechercher une réclamation..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Tous les statuts</option>
            <option>En attente</option>
            <option>En cours</option>
            <option>Résolue</option>
            <option>Rejetée</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Toutes priorités</option>
            <option>Urgente</option>
            <option>Haute</option>
            <option>Moyenne</option>
            <option>Basse</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Tous les types</option>
            <option>Colis endommagé</option>
            <option>Retard de livraison</option>
            <option>Colis perdu</option>
            <option>Mauvaise adresse</option>
            <option>Produit incorrect</option>
            <option>Service client</option>
          </select>
        </div>
      </div>

      {/* Tableau des réclamations */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-gray-600">N° Réclamation</th>
                <th className="px-6 py-3 text-left text-gray-600">Client</th>
                <th className="px-6 py-3 text-left text-gray-600">N° Colis</th>
                <th className="px-6 py-3 text-left text-gray-600">Type</th>
                <th className="px-6 py-3 text-left text-gray-600">Priorité</th>
                <th className="px-6 py-3 text-left text-gray-600">Statut</th>
                <th className="px-6 py-3 text-left text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reclamations.map((rec) => (
                <tr key={rec.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{rec.id}</td>
                  <td className="px-6 py-4 text-gray-900">{rec.client}</td>
                  <td className="px-6 py-4 text-gray-600">{rec.colis}</td>
                  <td className="px-6 py-4 text-gray-600">{rec.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-white ${
                      rec.priorite === 'Urgente' ? 'bg-red-600' :
                      rec.priorite === 'Haute' ? 'bg-orange-600' :
                      rec.priorite === 'Moyenne' ? 'bg-yellow-600' :
                      'bg-blue-600'
                    }`}>
                      {rec.priorite}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-white ${
                      rec.statut === 'Résolue' ? 'bg-green-500' :
                      rec.statut === 'En cours' ? 'bg-blue-500' :
                      rec.statut === 'En attente' ? 'bg-orange-500' :
                      'bg-gray-500'
                    }`}>
                      {rec.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{rec.date}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedReclamation(rec.id)}
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

      {/* Modal Nouvelle Réclamation */}
      {showNewReclamation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Créer une Nouvelle Réclamation</h2>
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
                  <label className="block text-gray-700 mb-2">N° Colis</label>
                  <input type="text" placeholder="COL-XXXX" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Type de réclamation</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Colis endommagé</option>
                    <option>Retard de livraison</option>
                    <option>Colis perdu</option>
                    <option>Mauvaise adresse</option>
                    <option>Produit incorrect</option>
                    <option>Service client</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Priorité</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Basse</option>
                    <option>Moyenne</option>
                    <option>Haute</option>
                    <option>Urgente</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Description de la réclamation</label>
                <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Décrivez le problème en détail..."></textarea>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email de contact</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowNewReclamation(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Créer la réclamation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails Réclamation */}
      {selectedReclamation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-gray-900">Détails de la réclamation {selectedReclamation}</h2>
                <button 
                  onClick={() => setSelectedReclamation(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Client</p>
                    <p className="text-gray-900">Acme Corp</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">N° Colis</p>
                    <p className="text-gray-900">COL-2847</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 mb-1">Type</p>
                    <p className="text-gray-900">Colis endommagé</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Priorité</p>
                    <span className="px-2 py-1 rounded-full bg-orange-600 text-white">Haute</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Description</p>
                  <p className="text-gray-900">Le colis est arrivé avec un emballage déchiré</p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-gray-900 mb-3">Historique des actions</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-gray-900">Réclamation créée</p>
                        <p className="text-gray-600">03 Déc 2024 - 14:30</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-gray-900">Prise en charge par l'équipe support</p>
                        <p className="text-gray-600">03 Déc 2024 - 15:45</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => {
                  toast.success('Réclamation rejetée');
                  setSelectedReclamation(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Rejeter
              </button>
              <button 
                onClick={() => {
                  toast.success('Réclamation résolue avec succès');
                  setSelectedReclamation(null);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Résoudre
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}