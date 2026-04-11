'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function Header() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const NAV_ITEMS = [
    { label: t('header.nav.sales'), anchor: 'secao-vendas' },
    { label: t('header.nav.rental'), anchor: 'secao-aluguel' },
    { label: t('header.nav.projects'), anchor: 'secao-projetos' },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header className={`hdr ${scrolled ? 'hdr--scrolled' : ''}`}>
      <div className="hdr__inner">
        <Link href="/" className="hdr__logo">
          <img
            src="/HORIZONTAL BRANCO SEM FUNDO.png"
            alt="Cretor"
            className="hdr__logo-img"
          />
        </Link>

        <nav className="hdr__nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.anchor}
              className="hdr__nav-link"
              onClick={() => scrollToSection(item.anchor)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <LanguageSwitcher />

        <button
          className={`hdr__hamburger ${mobileOpen ? 'hdr__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? t('header.closeMenu') : t('header.openMenu')}
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`hdr__mobile ${mobileOpen ? 'hdr__mobile--open' : ''}`}>
        <nav className="hdr__mobile-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.anchor}
              className="hdr__mobile-link"
              onClick={() => { scrollToSection(item.anchor); setMobileOpen(false) }}
            >
              {item.label}
            </button>
          ))}
          <LanguageSwitcher className="lang-switcher--mobile" />
        </nav>
      </div>
    </header>
  )
}
