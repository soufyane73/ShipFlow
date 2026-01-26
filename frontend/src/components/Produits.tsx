import { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function Produits() {
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const produits = [
    { id: 'PRD-001', nom: 'Ordinateur portable Dell XPS', categorie: 'Électronique', prix: '1299.00', stock: 45, poids: '1.5 kg', ref: 'DELL-XPS-15' },
    { id: 'PRD-002', nom: 'iPhone 15 Pro', categorie: 'Électronique', prix: '1199.00', stock: 78, poids: '0.3 kg', ref: 'APPLE-IP15P' },
    { id: 'PRD-003', nom: 'Chaise de bureau ergonomique', categorie: 'Mobilier', prix: '299.00', stock: 23, poids: '12 kg', ref: 'CHAIR-ERG-01' },
    { id: 'PRD-004', nom: 'Lot papier A4 (500 feuilles)', categorie: 'Fournitures', prix: '5.99', stock: 156, poids: '2.5 kg', ref: 'PAPER-A4-500' },
    { id: 'PRD-005', nom: 'Écran 27 pouces 4K', categorie: 'Électronique', prix: '449.00', stock: 34, poids: '5 kg', ref: 'MON-27-4K' },
    { id: 'PRD-006', nom: 'Clavier mécanique RGB', categorie: 'Accessoires', prix: '129.00', stock: 67, poids: '0.8 kg', ref: 'KEY-MECH-RGB' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900">Gestion des Produits</h1>
        <button 
          onClick={() => setShowNewProduct(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Nouveau Produit
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Toutes catégories</option>
            <option>Électronique</option>
            <option>Mobilier</option>
            <option>Fournitures</option>
            <option>Accessoires</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Filtres
          </button>
        </div>
      </div>

      {/* Tableau des produits */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-gray-600">ID</th>
                <th className="px-6 py-3 text-left text-gray-600">Nom du produit</th>
                <th className="px-6 py-3 text-left text-gray-600">Référence</th>
                <th className="px-6 py-3 text-left text-gray-600">Catégorie</th>
                <th className="px-6 py-3 text-left text-gray-600">Prix (€)</th>
                <th className="px-6 py-3 text-left text-gray-600">Stock</th>
                <th className="px-6 py-3 text-left text-gray-600">Poids</th>
                <th className="px-6 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {produits.map((produit) => (
                <tr key={produit.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{produit.id}</td>
                  <td className="px-6 py-4 text-gray-900">{produit.nom}</td>
                  <td className="px-6 py-4 text-gray-600">{produit.ref}</td>
                  <td className="px-6 py-4 text-gray-600">{produit.categorie}</td>
                  <td className="px-6 py-4 text-gray-900">{produit.prix} €</td>
                  <td className="px-6 py-4">
                    <span className={`${produit.stock < 30 ? 'text-red-600' : 'text-gray-900'}`}>
                      {produit.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{produit.poids}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setEditingProduct(produit)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
                            toast.success('Produit supprimé avec succès');
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

      {/* Modal Nouveau Produit */}
      {showNewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Ajouter un Nouveau Produit</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nom du produit</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Référence</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Catégorie</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Électronique</option>
                    <option>Mobilier</option>
                    <option>Fournitures</option>
                    <option>Accessoires</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Prix (€)</label>
                  <input type="number" step="0.01" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Stock initial</label>
                  <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Poids</label>
                  <input type="text" placeholder="ex: 1.5 kg" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowNewProduct(false)}
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

      {/* Modal Modification Produit */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Modifier le Produit {editingProduct.id}</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Nom du produit</label>
                  <input 
                    type="text" 
                    defaultValue={editingProduct.nom}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Référence</label>
                  <input 
                    type="text" 
                    defaultValue={editingProduct.ref}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Catégorie</label>
                  <select 
                    defaultValue={editingProduct.categorie}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Électronique</option>
                    <option>Mobilier</option>
                    <option>Fournitures</option>
                    <option>Accessoires</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Prix (€)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    defaultValue={editingProduct.prix}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Stock</label>
                  <input 
                    type="number" 
                    defaultValue={editingProduct.stock}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Poids</label>
                  <input 
                    type="text" 
                    defaultValue={editingProduct.poids}
                    placeholder="ex: 1.5 kg" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button 
                onClick={() => {
                  toast.success('Produit modifié avec succès');
                  setEditingProduct(null);
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