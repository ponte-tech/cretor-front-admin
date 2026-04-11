'use client'

import { useTranslation } from 'react-i18next'

const LANGS = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
]

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n } = useTranslation()
  const current = i18n.language?.substring(0, 2) || 'pt'

  return (
    <div className={`lang-switcher ${className || ''}`}>
      {LANGS.map((lang) => (
        <button
          key={lang.code}
          className={`lang-switcher__btn ${current === lang.code ? 'lang-switcher__btn--active' : ''}`}
          onClick={() => i18n.changeLanguage(lang.code)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
