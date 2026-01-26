import { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Save, Key, Bell } from 'lucide-react';

export function MesInformations() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div>
      <h1 className="text-gray-900 mb-6">Mes Informations</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 -mb-px ${
            activeTab === 'profile'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Profil
        </button>
        <button
          onClick={() => setActiveTab('company')}
          className={`px-4 py-2 -mb-px ${
            activeTab === 'company'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Entreprise
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 -mb-px ${
            activeTab === 'security'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Sécurité
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 -mb-px ${
            activeTab === 'notifications'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Notifications
        </button>
      </div>

      {/* Profil Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <div>
              <h2 className="text-gray-900 mb-1">Photo de profil</h2>
              <p className="text-gray-600 mb-3">PNG, JPG jusqu'à 5MB</p>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Changer la photo
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Prénom</label>
                <input
                  type="text"
                  defaultValue="Jean"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  defaultValue="Dupont"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </div>
              </label>
              <input
                type="email"
                defaultValue="jean.dupont@shipflow.fr"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Téléphone
                </div>
              </label>
              <input
                type="tel"
                defaultValue="+33 6 12 34 56 78"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Adresse
                </div>
              </label>
              <input
                type="text"
                defaultValue="123 Rue de la République, 75001 Paris"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Save className="w-4 h-4" />
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Entreprise Tab */}
      {activeTab === 'company' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Nom de l'entreprise
                </div>
              </label>
              <input
                type="text"
                defaultValue="ShipFlow SARL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">SIRET</label>
                <input
                  type="text"
                  defaultValue="123 456 789 00012"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">N° TVA</label>
                <input
                  type="text"
                  defaultValue="FR 12 345678901"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Adresse du siège social</label>
              <textarea
                rows={3}
                defaultValue="123 Avenue des Champs-Élysées&#10;75008 Paris&#10;France"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Email entreprise</label>
                <input
                  type="email"
                  defaultValue="contact@shipflow.fr"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Téléphone entreprise</label>
                <input
                  type="tel"
                  defaultValue="+33 1 23 45 67 89"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Site web</label>
              <input
                type="url"
                defaultValue="https://www.shipflow.fr"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Save className="w-4 h-4" />
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sécurité Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Changer le mot de passe</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    Mot de passe actuel
                  </div>
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Nouveau mot de passe</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Confirmer le nouveau mot de passe</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end pt-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Changer le mot de passe
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Authentification à deux facteurs</h2>
            <p className="text-gray-600 mb-4">
              Ajoutez une couche de sécurité supplémentaire à votre compte en activant l'authentification à deux facteurs.
            </p>
            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Activer 2FA
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Sessions actives</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-gray-900">Windows - Chrome</p>
                  <p className="text-gray-600">Paris, France - Il y a 5 minutes</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded">Session actuelle</span>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-gray-900">iPhone - Safari</p>
                  <p className="text-gray-600">Lyon, France - Il y a 2 jours</p>
                </div>
                <button className="text-red-600 hover:text-red-700">Déconnecter</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-gray-600" />
            <h2 className="text-gray-900">Préférences de notification</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 mb-3">Notifications Email</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="text-gray-900">Nouveaux colis</p>
                    <p className="text-gray-600">Recevoir un email pour chaque nouveau colis</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </label>
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="text-gray-900">Livraisons effectuées</p>
                    <p className="text-gray-600">Notification quand un colis est livré</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </label>
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="text-gray-900">Réclamations</p>
                    <p className="text-gray-600">Alertes pour les nouvelles réclamations</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </label>
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="text-gray-900">Factures</p>
                    <p className="text-gray-600">Notifications de facturation</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-gray-900 mb-3">Notifications Push</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div>
                    <p className="text-gray-900">Alertes en temps réel</p>
                    <p className="text-gray-600">Recevoir des notifications push</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Save className="w-4 h-4" />
                Enregistrer les préférences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
