import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import translationAR from './locales/ar.json';
import translationEN from './locales/en.json';

// Define available languages
export const languages = {
  ar: { name: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  en: { name: 'English', dir: 'ltr', flag: '🇺🇸' }
};

// Define resources
const resources = {
  ar: {
    translation: translationAR
  },
  en: {
    translation: translationEN
  }
};

// Initialize i18next
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'ar', // Default language
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'localStorage'],
      lookupLocalStorage: 'salink_language',
      caches: ['localStorage'],
    }
  });

// Function to change language
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  // Update HTML dir attribute for RTL/LTR support
  document.documentElement.dir = languages[lng as keyof typeof languages]?.dir || 'rtl';
  document.documentElement.lang = lng;
};

// Set initial direction based on current language
const currentLang = i18n.language || 'ar';
document.documentElement.dir = languages[currentLang as keyof typeof languages]?.dir || 'rtl';
document.documentElement.lang = currentLang;

export default i18n;
