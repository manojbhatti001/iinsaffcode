import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to IINSAF",
      "login": "Login",
      "signup": "Sign Up",
      "profile": "Profile",
      "logout": "Logout",
      // Add more translations as needed
    }
  },
  hi: {
    translation: {
      "welcome": "IINSAF में आपका स्वागत है",
      "login": "लॉग इन",
      "signup": "साइन अप",
      "profile": "प्रोफ़ाइल",
      "logout": "लॉग आउट",
      // Add more translations as needed
    }
  },
  ur: {
    translation: {
      "welcome": "IINSAF میں خوش آمدید",
      "login": "لاگ ان",
      "signup": "سائن اپ",
      "profile": "پروفائل",
      "logout": "لاگ آؤٹ",
      // Add more translations as needed
    }
  },
  mr: {
    translation: {
      "welcome": "IINSAF मध्ये आपले स्वागत आहे",
      "login": "लॉगिन",
      "signup": "साइन अप",
      "profile": "प्रोफाइल",
      "logout": "लॉगआउट",
      // Add more translations as needed
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    fallbackLng: 'en',
  });

export default i18n;