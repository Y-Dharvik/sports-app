import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enJson from "./locale/en.json";
import deJson from "./locale/de.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { ...enJson },
      de: { ...deJson },
    },
    fallbackLng: "en",
    debug: true,
  });