import i18next from "i18next";
import {initReactI18next} from "react-i18next";

import fr from "./fr.json";
import {LanguageDetector} from "./LanguageDetector";

const resources = {
    fr: {
        translation: fr,
    },
};

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: "v3",
        fallbackLng: "fr",
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources,
    }).then(r => console.log(r));

export default i18next;
