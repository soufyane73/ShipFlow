import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <Globe className="w-5 h-5 text-gray-600" />
        <span className="text-gray-700 uppercase">{language}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <button
          onClick={() => setLanguage('fr')}
          className={`w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg flex items-center gap-2 ${
            language === 'fr' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
          }`}
        >
          <span className="text-xl">🇫🇷</span>
          <span>Français</span>
        </button>
        <button
          onClick={() => setLanguage('ar')}
          className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 ${
            language === 'ar' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
          }`}
        >
          <span className="text-xl">🇸🇦</span>
          <span>العربية</span>
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`w-full px-4 py-2 text-left hover:bg-gray-50 last:rounded-b-lg flex items-center gap-2 ${
            language === 'en' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
          }`}
        >
          <span className="text-xl">🇬🇧</span>
          <span>English</span>
        </button>
      </div>
    </div>
  );
}
