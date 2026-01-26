import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function Villes() {
  const [showNewVille, setShowNewVille] = useState(false);
  const [editingVille, setEditingVille] = useState<any>(null);

  const villes = [
    { id: 'VIL-001', nom: 'Paris', codePostal: '75000-75020', region: 'Île-de-France', tarifLivraison: '5.00', nbLivreurs: 12, nbColisActifs: 234, statut: 'Actif' },
    { id: 'VIL-002', nom: 'Lyon', codePostal: '69000-69009', region: 'Auvergne-Rhône-Alpes', tarifLivraison: '4.50', nbLivreurs: 8, nbColisActifs: 156, statut: 'Actif' },
    { id: 'VIL-003', nom: 'Marseille', codePostal: '13000-13016', region: 'Provence-Alpes-Côte d\'Azur', tarifLivraison: '4.50', nbLivreurs: 7, nbColisActifs: 142, statut: 'Actif' },
    { id: 'VIL-004', nom: 'Toulouse', codePostal: '31000-31500', region: 'Occitanie', tarifLivraison: '4.00', nbLivreurs: 6, nbColisActifs: 98, statut: 'Actif' },
    { id: 'VIL-005', nom: 'Nice', codePostal: '06000-06300', region: 'Provence-Alpes-Côte d\'Azur', tarifLivraison: '4.00', nbLivreurs: 5, nbColisActifs: 87, statut: 'Actif' },
    { id: 'VIL-006', nom: 'Nantes', codePostal: '44000-44300', region: 'Pays de la Loire', tarifLivraison: '3.50', nbLivreurs: 4, nbColisActifs: 65, statut: 'Actif' },
    { id: 'VIL-007', nom: 'Strasbourg', codePostal: '67000', region: 'Grand Est', tarifLivraison: '3.50', nbLivreurs: 3, nbColisActifs: 45, statut: 'Actif' },
    { id: 'VIL-008', nom: 'Bordeaux', codePostal: '33000-33800', region: 'Nouvelle-Aquitaine', tarifLivraison: '3.50', nbLivreurs: 5, nbColisActifs: 78, statut: 'Actif' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900">Gestion des Villes</h1>
        <button 
          onClick={() => setShowNewVille(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Nouvelle Ville
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">Villes couvertes</p>
          <p className="text-gray-900">28</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">Régions</p>
          <p className="text-gray-900">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">Colis actifs</p>
          <p className="text-gray-900">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">Tarif moyen</p>
          <p className="text-gray-900">4.20 €</p>
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
                placeholder="Rechercher une ville..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Toutes les régions</option>
            <option>Île-de-France</option>
            <option>Auvergne-Rhône-Alpes</option>
            <option>Provence-Alpes-Côte d'Azur</option>
            <option>Occitanie</option>
            <option>Nouvelle-Aquitaine</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Tous les statuts</option>
            <option>Actif</option>
            <option>Inactif</option>
          </select>
        </div>
      </div>

      {/* Tableau des villes */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-gray-600">ID</th>
                <th className="px-6 py-3 text-left text-gray-600">Ville</th>
                <th className="px-6 py-3 text-left text-gray-600">Code postal</th>
                <th className="px-6 py-3 text-left text-gray-600">Région</th>
                <th className="px-6 py-3 text-left text-gray-600">Tarif livraison</th>
                <th className="px-6 py-3 text-left text-gray-600">Nb livreurs</th>
                <th className="px-6 py-3 text-left text-gray-600">Colis actifs</th>
                <th className="px-6 py-3 text-left text-gray-600">Statut</th>
                <th className="px-6 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {villes.map((ville) => (
                <tr key={ville.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{ville.id}</td>
                  <td className="px-6 py-4 text-gray-900">{ville.nom}</td>
                  <td className="px-6 py-4 text-gray-600">{ville.codePostal}</td>
                  <td className="px-6 py-4 text-gray-600">{ville.region}</td>
                  <td className="px-6 py-4 text-gray-900">{ville.tarifLivraison} €</td>
                  <td className="px-6 py-4 text-gray-600">{ville.nbLivreurs}</td>
                  <td className="px-6 py-4 text-gray-900">{ville.nbColisActifs}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-white ${
                      ville.statut === 'Actif' ? 'bg-green-500' : 'bg-gray-500'
                    }`}>
                      {ville.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setEditingVille(ville)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm('Êtes-vous sûr de vouloir supprimer cette ville ?')) {
                            toast.success('Ville supprimée avec succès');
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nouvelle Ville */}
      {showNewVille && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Ajouter une Nouvelle Ville</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nom de la ville</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Code postal</label>
                  <input type="text" placeholder="ex: 75000-75020" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Région</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Île-de-France</option>
                    <option>Auvergne-Rhône-Alpes</option>
                    <option>Provence-Alpes-Côte d'Azur</option>
                    <option>Occitanie</option>
                    <option>Nouvelle-Aquitaine</option>
                    <option>Grand Est</option>
                    <option>Pays de la Loire</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Tarif de livraison (€)</label>
                  <input type="number" step="0.01" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Statut</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Actif</option>
                  <option>Inactif</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Notes</label>
                <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowNewVille(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Modification Ville */}
      {editingVille && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Modifier la Ville {editingVille.id}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nom de la ville</label>
                  <input 
                    type="text" 
                    defaultValue={editingVille.nom}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Code postal</label>
                  <input 
                    type="text" 
                    defaultValue={editingVille.codePostal}
                    placeholder="ex: 75000-75020" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Région</label>
                  <select 
                    defaultValue={editingVille.region}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Île-de-France</option>
                    <option>Auvergne-Rhône-Alpes</option>
                    <option>Provence-Alpes-Côte d'Azur</option>
                    <option>Occitanie</option>
                    <option>Nouvelle-Aquitaine</option>
                    <option>Grand Est</option>
                    <option>Pays de la Loire</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Tarif de livraison (€)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    defaultValue={editingVille.tarifLivraison}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Statut</label>
                <select 
                  defaultValue={editingVille.statut}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Actif</option>
                  <option>Inactif</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Nombre de livreurs</p>
                  <p className="text-gray-900">{editingVille.nbLivreurs}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Colis actifs</p>
                  <p className="text-gray-900">{editingVille.nbColisActifs}</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setEditingVille(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button 
                onClick={() => {
                  toast.success('Ville modifiée avec succès');
                  setEditingVille(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}