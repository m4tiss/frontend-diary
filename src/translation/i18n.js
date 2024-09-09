import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  pl: {
    translation: {
      navbar: {
        register: "Zarejestruj się",
        logIn: "Zaloguj się",
        logout: "Wyloguj",
      },
      dashboard:{
        title:"TRENUJ CODZIENNIE"
      }
    },
  },
  gb: {
    translation: {
      navbar: {
        showAll: "Show All",
        register: "Register",
        logIn: "Log In",
        logout: "Logout",
      },
      dashboard:{
        title:"TRAINING EVERYDAY"
      }
    }
}
};

const localStorageKey = "selectedLanguage";

const getDefaultLanguage = () => {
  const selectedLanguage = localStorage.getItem(localStorageKey);
  if (selectedLanguage) {
    return selectedLanguage;
  } else {
    return "pl";
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: getDefaultLanguage(),
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export const setLanguage = (language) => {
  i18n.changeLanguage(language);
  localStorage.setItem(localStorageKey, language);
};

export default i18n;