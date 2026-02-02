import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Loader2, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { getProducts, createProduct, updateProduct, deleteProduct, Product } from '../api/products';
import { getCategories, Category } from '../api/categories';

export function Produits() {
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // API State
  const [produits, setProduits] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<Product>>({
    nom: '',
    reference: '',
    categorie_id: '',
    poids_moyen: 0,
    prix: 0,
    stock: 0
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts(1, searchTerm);
      setProduits(response.data);
    } catch (error: any) {
      console.error(error);
      toast.error(`Erreur: ${error.response?.status} - ${error.response?.data?.message || 'Erreur lors du chargement des produits'}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories", error);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [searchTerm]);

  const resetForm = () => {
    setFormData({
      nom: '',
      reference: '',
      categorie_id: '',
      poids_moyen: 0,
      prix: 0,
      stock: 0
    });
  }

  const handleOpenCreate = () => {
    resetForm();
    setShowNewProduct(true);
  }

  const handleOpenEdit = (product: Product) => {
    setFormData({
      nom: product.nom,
      reference: product.reference,
      categorie_id: product.categorie_id,
      poids_moyen: product.poids_moyen,
      prix: product.prix || 0,
      stock: product.stock || 0
    });
    setEditingProduct(product);
  }

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await deleteProduct(id);
        toast.success('Produit supprimé avec succès');
        fetchProducts(); // Refresh list
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        toast.success('Produit mis à jour avec succès');
        setEditingProduct(null);
      } else {
        await createProduct(formData);
        toast.success('Produit créé avec succès');
        setShowNewProduct(false);
      }
      fetchProducts();
    } catch (error: any) {
      console.error(error);
      toast.error(`Erreur: ${error.response?.data?.message || 'Une erreur est survenue'}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900">Gestion des Produits</h1>
        <button
          onClick={handleOpenCreate}
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Toutes catégories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.nom}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Filtres
          </button>
        </div>
      </div>

      {/* Tableau des produits */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
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
                {produits.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                      Aucun produit trouvé.
                    </td>
                  </tr>
                ) : (
                  produits.map((produit) => (
                    <tr key={produit.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900 font-mono text-xs">{produit.id.substring(0, 8)}...</td>
                      <td className="px-6 py-4 text-gray-900">{produit.nom}</td>
                      <td className="px-6 py-4 text-gray-600">{produit.reference}</td>
                      <td className="px-6 py-4 text-gray-600">{produit.categorie?.nom || '-'}</td>
                      <td className="px-6 py-4 text-gray-900">{produit.prix || 0} €</td>
                      <td className="px-6 py-4">
                        <span className={`${(produit.stock || 0) < 30 ? 'text-red-600' : 'text-gray-900'}`}>
                          {produit.stock || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{produit.poids_moyen} kg</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenEdit(produit)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(produit.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form (Shared for Create/Edit) */}
      {(showNewProduct || editingProduct) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-gray-900 text-xl font-semibold">
                {editingProduct ? `Modifier ${editingProduct.nom}` : 'Ajouter un Nouveau Produit'}
              </h2>
              <button onClick={() => { setShowNewProduct(false); setEditingProduct(null); }} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Nom du produit <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Référence</label>
                  <input
                    type="text"
                    value={formData.reference}
                    onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Catégorie</label>
                  <select
                    value={formData.categorie_id}
                    onChange={(e) => setFormData({ ...formData, categorie_id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.nom}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Poids Moyen (kg)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.poids_moyen}
                    onChange={(e) => setFormData({ ...formData, poids_moyen: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Optional Fields (Not yet in Backend) */}
              <div className="grid grid-cols-2 gap-4 bg-yellow-50 p-4 rounded-md border border-yellow-200">
                <div className="col-span-2 text-xs text-yellow-700 mb-2">
                  ⚠️ Ces champs ne sont pas encore sauvegardés dans la base de données actuelle
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Prix (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.prix}
                    onChange={(e) => setFormData({ ...formData, prix: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Stock initial</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-200 mt-6">
                <button
                  type="button"
                  onClick={() => { setShowNewProduct(false); setEditingProduct(null); }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingProduct ? 'Mettre à jour' : 'Créer le produit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
