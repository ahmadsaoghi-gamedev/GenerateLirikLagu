import React from 'react';
import { Coffee } from 'lucide-react';

interface FooterProps {
  language: 'english' | 'indonesian';
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ language, darkMode }) => {
  const translations = {
    english: {
      madeWith: 'Made with Love',
      buyCoffee: 'Buy Coffee'
    },
    indonesian: {
      madeWith: 'Dibuat dengan Cinta',
      buyCoffee: 'Belikan Kopi'
    }
  };

  const t = translations[language];

  return (
    <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Made with Love */}
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <span className="text-lg font-medium">{t.madeWith}</span>
            <div className="relative">
              <span className="text-red-500 text-xl animate-pulse">❤️</span>
              <div className="absolute inset-0 text-red-500 text-xl animate-ping opacity-75">❤️</div>
            </div>
          </div>

          {/* Buy Coffee Button */}
          <a
            href="https://saweria.co/ahmadsaoghi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Coffee className="w-5 h-5" />
            <span>{t.buyCoffee}</span>
          </a>

          {/* Additional Info */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© 2024 Suno AI Generator. All rights reserved.</p>
            <p className="mt-1">
              {language === 'indonesian' 
                ? 'Terima kasih telah menggunakan generator kami!' 
                : 'Thank you for using our generator!'
              }
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;