import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  // التحقق مما إذا كان الرابط نشطًا
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gray-900 dark:bg-gray-950 border-b border-gray-800 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img 
              src="https://i.postimg.cc/Wb9qKg7Y/logo.png" 
              alt="Salink Logo" 
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`${isActive('/') ? 'text-green-400' : 'text-gray-300'} hover:text-green-400 transition-colors`}
          >
            {t('common.home')}
          </Link>
          <Link 
            to="/features" 
            className={`${isActive('/features') ? 'text-green-400' : 'text-gray-300'} hover:text-green-400 transition-colors`}
          >
            {t('common.features')}
          </Link>
          <Link 
            to="/pricing" 
            className={`${isActive('/pricing') ? 'text-green-400' : 'text-gray-300'} hover:text-green-400 transition-colors`}
          >
            {t('common.pricing')}
          </Link>
          <Link 
            to="/help" 
            className={`${isActive('/help') ? 'text-green-400' : 'text-gray-300'} hover:text-green-400 transition-colors`}
          >
            {t('common.help')}
          </Link>
        </div>

        {/* Auth Buttons and Theme/Language Switchers */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-green-400"
            onClick={() => navigate('/login')}
          >
            {t('common.login')}
          </Button>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => navigate('/signup')}
          >
            {t('common.signup')}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 dark:bg-gray-950 border-t border-gray-800 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'text-green-400' : 'text-gray-300'} hover:text-green-400 transition-colors py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.home')}
            </Link>
            <Link 
              to="/features" 
              className={`${isActive('/features') ? 'text-green-400' : 'text-gray-300'} hover:text-green-400 transition-colors py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.features')}
            </Link>
            <Link 
              to="/pricing" 
              className={`${isActive('/pricing') ? 'text-green-400' : 'text-gray-300'} hover:text-green-400 transition-colors py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.pricing')}
            </Link>
            <Link 
              to="/help" 
              className={`${isActive('/help') ? 'text-green-400' : 'text-gray-300'} hover:text-green-400 transition-colors py-2`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('common.help')}
            </Link>
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-800">
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-green-400 justify-start"
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
              >
                {t('common.login')}
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  navigate('/signup');
                  setIsMenuOpen(false);
                }}
              >
                {t('common.signup')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
