import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Github, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="mb-8">
          <Link to="/">
            <img 
              src="https://i.postimg.cc/Wb9qKg7Y/logo.png" 
              alt="Salink Logo"
              className="w-[120px] h-auto"
            />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl mb-8">
          <div>
            <h4 className="font-semibold text-white mb-4">{t('footer.site.title')}</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-green-400 transition-colors">{t('footer.site.home')}</Link></li>
              <li><Link to="/features" className="hover:text-green-400 transition-colors">{t('footer.site.features')}</Link></li>
              <li><Link to="/pricing" className="hover:text-green-400 transition-colors">{t('footer.site.pricing')}</Link></li>
              <li><Link to="/help" className="hover:text-green-400 transition-colors">{t('footer.site.help')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">{t('footer.company.title')}</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-green-400 transition-colors">{t('footer.company.about')}</Link></li>
              <li><Link to="/team" className="hover:text-green-400 transition-colors">{t('footer.company.team')}</Link></li>
              <li><Link to="/careers" className="hover:text-green-400 transition-colors">{t('footer.company.careers')}</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 transition-colors">{t('footer.company.contact')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">{t('footer.resources.title')}</h4>
            <ul className="space-y-2">
              <li><Link to="/blog" className="hover:text-green-400 transition-colors">{t('footer.resources.blog')}</Link></li>
              <li><Link to="/faq" className="hover:text-green-400 transition-colors">{t('footer.resources.faq')}</Link></li>
              <li><Link to="/docs" className="hover:text-green-400 transition-colors">{t('footer.resources.docs')}</Link></li>
              <li><Link to="/terms" className="hover:text-green-400 transition-colors">{t('footer.resources.terms')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">{t('footer.connect.title')}</h4>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-4xl pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            {t('footer.copyright')}
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-green-400 transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-green-400 transition-colors">{t('footer.terms')}</Link>
            <Link to="/cookies" className="text-sm text-gray-500 hover:text-green-400 transition-colors">{t('footer.cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
