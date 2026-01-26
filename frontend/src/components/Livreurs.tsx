import { useState } from 'react';
import { Plus, Search, Edit, Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export function Livreurs() {
  const [showNewLivreur, setShowNewLivreur] = useState(false);
  const [editingLivreur, setEditingLivreur] = useState<any>(null);

  const livreurs = [
    { id: 'LIV-001', nom: 'Mohamed Ali', telephone: '+33 6 12 34 56 78', email: 'mohamed.ali@shipflow.fr', ville: 'Paris', statut: 'Disponible', colisEnCours: 0, colisLivres: 342, note: 4.8 },
    { id: 'LIV-002', nom: 'Ahmed Ben', telephone: '+33 6 23 45 67 89', email: 'ahmed.ben@shipflow.fr', ville: 'Lyon', statut: 'En livraison', colisEnCours: 5, colisLivres: 289, note: 4.6 },
    { id: 'LIV-003', nom: 'Karim Sadiq', telephone: '+33 6 34 56 78 90', email: 'karim.sadiq@shipflow.fr', ville: 'Marseille', statut: 'En livraison', colisEnCours: 3, colisLivres: 256, note: 4.9 },
    { id: 'LIV-004', nom: 'Youssef Alami', telephone: '+33 6 45 67 89 01', email: 'youssef.alami@shipflow.fr', ville: 'Toulouse', statut: 'Disponible', colisEnCours: 0, colisLivres: 198, note: 4.7 },
    { id: 'LIV-005', nom: 'Rachid Moha', telephone: '+33 6 56 78 90 12', email: 'rachid.moha@shipflow.fr', ville: 'Nice', statut: 'Indisponible', colisEnCours: 0, colisLivres: 167, note: 4.5 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900">Gestion des Livreurs</h1>
        <button 
          onClick={() => setShowNewLivreur(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Nouveau Livreur
        </button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">Total Livreurs</p>
          <p className="text-gray-900">45</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">Disponibles</p>
          <p className="text-gray-900 text-green-600">18</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">En livraison</p>
          <p className="text-gray-900 text-blue-600">23</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-1">Indisponibles</p>
          <p className="text-gray-900 text-gray-600">4</p>
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
                placeholder="Rechercher un livreur..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Tous les statuts</option>
            <option>Disponible</option>
            <option>En livraison</option>
            <option>Indisponible</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Toutes les villes</option>
            <option>Fes</option>
            <option>Meknes</option>
            <option>Casablanca</option>
            <option>Rabat</option>
            <option>Qenitra</option>
          </select>
        </div>
      </div>

      {/* Liste des livreurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {livreurs.map((livreur) => (
          <div key={livreur.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-900 mb-1">{livreur.nom}</h3>
                <p className="text-gray-600">{livreur.id}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-white ${
                livreur.statut === 'Disponible' ? 'bg-green-500' :
                livreur.statut === 'En livraison' ? 'bg-blue-500' :
                'bg-gray-500'
              }`}>
                {livreur.statut}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{livreur.telephone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{livreur.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{livreur.ville}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-gray-600">En cours</p>
                <p className="text-gray-900">{livreur.colisEnCours} colis</p>
              </div>
              <div>
                <p className="text-gray-600">Livrés</p>
                <p className="text-gray-900">{livreur.colisLivres} colis</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Note:</span>
                <span className="text-gray-900">{livreur.note} / 5</span>
              </div>
              <button 
                onClick={() => setEditingLivreur(livreur)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Nouveau Livreur */}
      {showNewLivreur && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Ajouter un Nouveau Livreur</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nom complet</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Téléphone</label>
                  <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Ville d'affectation</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Fes</option>
                  <option>Meknes</option>
                  <option>Casablanca</option>
                  <option>Rabat</option>
                  <option>Qenitra</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Statut</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Disponible</option>
                    <option>Indisponible</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Type de véhicule</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Scooter</option>
                  <option>Voiture</option>
                  <option>Camionnette</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Notes</label>
                <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowNewLivreur(false)}
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

      {/* Modal Modification Livreur */}
      {editingLivreur && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Modifier le Livreur {editingLivreur.id}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nom complet</label>
                  <input 
                    type="text" 
                    defaultValue={editingLivreur.nom}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Téléphone</label>
                  <input 
                    type="tel" 
                    defaultValue={editingLivreur.telephone}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  defaultValue={editingLivreur.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Ville d'affectation</label>
                  <select 
                    defaultValue={editingLivreur.ville}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Paris</option>
                    <option>Lyon</option>
                    <option>Marseille</option>
                    <option>Toulouse</option>
                    <option>Nice</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Statut</label>
                  <select 
                    defaultValue={editingLivreur.statut}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Disponible</option>
                    <option>En livraison</option>
                    <option>Indisponible</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Colis en cours</p>
                  <p className="text-gray-900">{editingLivreur.colisEnCours}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Colis livrés</p>
                  <p className="text-gray-900">{editingLivreur.colisLivres}</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setEditingLivreur(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button 
                onClick={() => {
                  toast.success('Livreur modifié avec succès');
                  setEditingLivreur(null);
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