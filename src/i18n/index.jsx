// src/i18n/index.js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import pt from '@/i18n/locales/pt.json'
import en from '@/i18n/locales/en.json'

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      pt: { translation: pt },
      en: { translation: en },
    },
    interpolation: { escapeValue: false },
  })

export default i18n
