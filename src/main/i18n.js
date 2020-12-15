const i18n = require('i18next');
const i18nextBackend = require('i18next-node-fs-backend');
const path = require('path');

const i18nConfig = require('./i18n.config');

const i18nextOptions = {
  backend:{
    loadPath: path.resolve(__dirname, './locales/{{lng}}/{{ns}}.json'),
    addPath: path.resolve(__dirname, './locales/{{lng}}/{{ns}}.missing.json'),
    // jsonIndent to use when storing json files
    jsonIndent: 2,
  },
  interpolation: {
    escapeValue: false
  },
  saveMissing: true,
  fallbackLng: i18nConfig.fallbackLng,
  whitelist: i18nConfig.whitelist,
};

i18n
  .use(i18nextBackend);

// initialize if not already initialized
if (!i18n.isInitialized) {
  i18n
    .init(i18nextOptions);
}

module.exports = i18n;