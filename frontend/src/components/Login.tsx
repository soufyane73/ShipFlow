import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { login } from '../api/auth';
import { toast } from 'sonner';

interface LoginProps {
    onLoginSuccess: (token: string) => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await login({ email, password });

            // Verify token exists clearly
            if (!response.token) {
                console.error('Invalid Login Response:', response);
                throw new Error('Server detected login but returned no key.');
            }

            // Save token
            localStorage.setItem('auth_token', response.token);

            // Notify parent
            onLoginSuccess(response.token);
            toast.success('Connexion réussie !');
        } catch (error: any) {
            console.error(error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                toast.error(`Erreur ${error.response.status}: ${error.response.data.message || 'Échec de la connexion'}`);
            } else if (error.request) {
                // The request was made but no response was received
                toast.error('Erreur réseau: Pas de réponse du serveur. Vérifiez que le backend tourne.');
            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error('Erreur: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">ShipFlow</h1>
                    <p className="text-gray-600">Connectez-vous pour accéder à votre espace</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    );
}
