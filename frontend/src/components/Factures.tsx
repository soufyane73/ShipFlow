import { useState } from 'react';
import { Plus, Search, Download, Eye, Send, X } from 'lucide-react';
import { toast } from 'sonner';

export function Factures() {
  const [showNewFacture, setShowNewFacture] = useState(false);
  const [selectedFacture, setSelectedFacture] = useState<any>(null);

  const factures = [
    { id: 'FA-2024-001', client: 'Acme Corp', dateEmission: '2024-12-01', dateEcheance: '2024-12-31', montant: '1250.00', statut: 'Payée', bonLivraison: 'BL-2024-001' },
    { id: 'FA-2024-002', client: 'TechStart Inc', dateEmission: '2024-12-01', dateEcheance: '2024-12-31', montant: '850.00', statut: 'En attente', bonLivraison: 'BL-2024-002' },
    { id: 'FA-2024-003', client: 'Global Supplies', dateEmission: '2024-12-02', dateEcheance: '2025-01-02', montant: '2340.00', statut: 'En attente', bonLivraison: 'BL-2024-003' },
    { id: 'FA-2024-004', client: 'MegaMart', dateEmission: '2024-12-02', dateEcheance: '2025-01-02', montant: '4580.00', statut: 'Payée', bonLivraison: 'BL-2024-004' },
    { id: 'FA-2024-005', client: 'Prime Retail', dateEmission: '2024-12-03', dateEcheance: '2025-01-03', montant: '1890.00', statut: 'En retard', bonLivraison: 'BL-2024-005' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900">Gestion des Factures</h1>
        <button 
          onClick={() => setShowNewFacture(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Nouvelle Facture
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">Total Factures</p>
          <p className="text-gray-900">856</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">Payées</p>
          <p className="text-gray-900 text-green-600">645</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">En attente</p>
          <p className="text-gray-900 text-orange-600">178</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">En retard</p>
          <p className="text-gray-900 text-red-600">33</p>
        </div>
      </div>

      {/* Résumé financier */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-gray-900 mb-4">Résumé Financier</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 mb-1">Chiffre d'affaires total</p>
            <p className="text-gray-900">245,680 €</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Montant en attente</p>
            <p className="text-gray-900 text-orange-600">52,340 €</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Montant en retard</p>
            <p className="text-gray-900 text-red-600">8,920 €</p>
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
                placeholder="Rechercher une facture..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Tous les statuts</option>
            <option>Payée</option>
            <option>En attente</option>
            <option>En retard</option>
            <option>Annulée</option>
          </select>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tableau des factures */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-gray-600">N° Facture</th>
                <th className="px-6 py-3 text-left text-gray-600">Client</th>
                <th className="px-6 py-3 text-left text-gray-600">Bon de livraison</th>
                <th className="px-6 py-3 text-left text-gray-600">Date émission</th>
                <th className="px-6 py-3 text-left text-gray-600">Date échéance</th>
                <th className="px-6 py-3 text-left text-gray-600">Montant</th>
                <th className="px-6 py-3 text-left text-gray-600">Statut</th>
                <th className="px-6 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {factures.map((facture) => (
                <tr key={facture.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{facture.id}</td>
                  <td className="px-6 py-4 text-gray-900">{facture.client}</td>
                  <td className="px-6 py-4 text-gray-600">{facture.bonLivraison}</td>
                  <td className="px-6 py-4 text-gray-600">{facture.dateEmission}</td>
                  <td className="px-6 py-4 text-gray-600">{facture.dateEcheance}</td>
                  <td className="px-6 py-4 text-gray-900">{facture.montant} €</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-white ${
                      facture.statut === 'Payée' ? 'bg-green-500' :
                      facture.statut === 'En attente' ? 'bg-orange-500' :
                      facture.statut === 'En retard' ? 'bg-red-500' :
                      'bg-gray-500'
                    }`}>
                      {facture.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedFacture(facture)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => toast.success('Téléchargement de la facture PDF...')}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => toast.success('Envoi de la facture par email...')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nouvelle Facture */}
      {showNewFacture && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Créer une Nouvelle Facture</h2>
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
                  <label className="block text-gray-700 mb-2">Bon de livraison</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Sélectionner un bon</option>
                    <option>BL-2024-001</option>
                    <option>BL-2024-002</option>
                    <option>BL-2024-003</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Date d'émission</label>
                  <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Date d'échéance</label>
                  <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Montant (€)</label>
                <input type="number" step="0.01" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Notes</label>
                <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowNewFacture(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Créer la facture
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails Facture */}
      {selectedFacture && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-gray-900">Détails de la Facture {selectedFacture.id}</h2>
              <button 
                onClick={() => setSelectedFacture(null)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">N° Facture</p>
                  <p className="text-gray-900">{selectedFacture.id}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Client</p>
                  <p className="text-gray-900">{selectedFacture.client}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Bon de livraison</p>
                  <p className="text-gray-900">{selectedFacture.bonLivraison}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Montant</p>
                  <p className="text-gray-900">{selectedFacture.montant} €</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Date d'émission</p>
                  <p className="text-gray-900">{selectedFacture.dateEmission}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Date d'échéance</p>
                  <p className="text-gray-900">{selectedFacture.dateEcheance}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Statut</p>
                <span className={`inline-block px-3 py-1 rounded-full text-white ${
                  selectedFacture.statut === 'Payée' ? 'bg-green-500' :
                  selectedFacture.statut === 'En attente' ? 'bg-orange-500' :
                  selectedFacture.statut === 'En retard' ? 'bg-red-500' :
                  'bg-gray-500'
                }`}>
                  {selectedFacture.statut}
                </span>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => toast.success('Téléchargement de la facture...')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Télécharger
              </button>
              <button 
                onClick={() => toast.success('Envoi de la facture...')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-green-600"
              >
                <Send className="w-4 h-4" />
                Envoyer
              </button>
              <button 
                onClick={() => setSelectedFacture(null)}
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