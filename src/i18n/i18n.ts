import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// import Backend from "i18next-http-backend";
import enJson from "./locale/en.json";
// import siJson from "./locale/si.json";

const resources = {
  en: {
    translation: enJson,
  },
  // si: {
  //   translation: siJson,
  // },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.REACT_APP_ENV === "development",
    fallbackLng: "en",
    returnObjects: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
  });

export default i18n;
