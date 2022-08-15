import i18n from "i18n-js";
import * as Localization from "expo-localization";

import en from "../../locales/en_US.json";

i18n.translations = { en };

let deviceLocale = Localization.locale;

// simplify locales by only using the lang code
if (deviceLocale.includes("-")) {
  [deviceLocale] = deviceLocale.split("-");
}

i18n.defaultLocale = "en";
i18n.locale = deviceLocale;
// i18n.locale = 'ar';
i18n.fallbacks = true;

export default i18n;
