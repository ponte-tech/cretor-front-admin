'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useTranslation } from "react-i18next"
import "./home.css"
import Banner from "@/components/Banner"
import Header from "@/components/Header"

const IMOVEIS_VENDA = [
  {
    id: '1',
    titulo: 'Apartamento Alto Padrão - Jardins',
    bairro: 'Jardins',
    cidade: 'São Paulo',
    quartos: 3,
    banheiros: 3,
    vagas: 2,
    area: 180,
    preco: 2500000,
    foto: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
  },
  {
    id: '2',
    titulo: 'Cobertura Duplex - Vila Olímpia',
    bairro: 'Vila Olímpia',
    cidade: 'São Paulo',
    quartos: 4,
    banheiros: 4,
    vagas: 3,
    area: 250,
    preco: 3800000,
    foto: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
  },
  {
    id: '3',
    titulo: 'Casa em Condomínio - Alphaville',
    bairro: 'Alphaville',
    cidade: 'Barueri',
    quartos: 4,
    banheiros: 4,
    vagas: 4,
    area: 320,
    preco: 2800000,
    foto: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
  },
]

const IMOVEIS_ALUGUEL = [
  {
    id: '4',
    titulo: 'Apartamento Moderno - Itaim Bibi',
    bairro: 'Itaim Bibi',
    cidade: 'São Paulo',
    quartos: 2,
    banheiros: 2,
    vagas: 2,
    area: 120,
    preco: 8500,
    foto: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
  },
  {
    id: '5',
    titulo: 'Studio Premium - Pinheiros',
    bairro: 'Pinheiros',
    cidade: 'São Paulo',
    quartos: 1,
    banheiros: 1,
    vagas: 1,
    area: 45,
    preco: 3200,
    foto: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
  },
  {
    id: '6',
    titulo: 'Loft Industrial - Vila Madalena',
    bairro: 'Vila Madalena',
    cidade: 'São Paulo',
    quartos: 1,
    banheiros: 2,
    vagas: 1,
    area: 85,
    preco: 5800,
    foto: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
  },
]

const PROJETOS = [
  {
    id: '1',
    titulo: 'Residencial Parque das Flores',
    construtora: 'Construtora Horizonte',
    bairro: 'Barra da Tijuca',
    cidade: 'Rio de Janeiro',
    unidades: 87,
    areaMin: 68,
    areaMax: 185,
    precoMin: 580000,
    precoMax: 1850000,
    percentual: 45,
    previsao: 'Dez/2025',
    foto: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
  },
  {
    id: '2',
    titulo: 'Sky Tower Residence',
    construtora: 'Elite Construtora',
    bairro: 'Centro',
    cidade: 'Balneário Camboriú',
    unidades: 42,
    areaMin: 120,
    areaMax: 350,
    precoMin: 1200000,
    precoMax: 4500000,
    percentual: 20,
    previsao: 'Mar/2027',
    foto: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
  },
  {
    id: '3',
    titulo: 'Jardins do Atlântico',
    construtora: 'FG Empreendimentos',
    bairro: 'Praia Brava',
    cidade: 'Itajaí',
    unidades: 156,
    areaMin: 55,
    areaMax: 130,
    precoMin: 420000,
    precoMax: 980000,
    percentual: 70,
    previsao: 'Jun/2025',
    foto: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=600&h=400&fit=crop',
  },
]

function formatPreco(valor: number, tipo: 'venda' | 'aluguel' = 'venda', perMonth = '/mês') {
  if (tipo === 'aluguel') {
    return `R$ ${valor.toLocaleString('pt-BR')}${perMonth}`
  }
  if (valor >= 1000000) {
    const m = valor / 1000000
    return `R$ ${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)} mi`
  }
  return `R$ ${valor.toLocaleString('pt-BR')}`
}

export default function HomePage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [searchTab, setSearchTab] = useState<'venda' | 'aluguel' | 'projeto'>('venda')
  const [endereco, setEndereco] = useState('')

  const perMonth = t('common.perMonth')

  const handleSearch = () => {
    const params = new URLSearchParams()
    params.set('tipo', searchTab)
    if (endereco.trim()) params.set('endereco', endereco.trim())
    router.push(`/busca?${params.toString()}`)
  }

  return (
    <>
      <Header />
      <Banner />

      {/* Search Section */}
      <section className="hp-search">
        <div className="hp-search__container">
          <h2 className="hp-search__title">{t('home.search.title')}</h2>
          <p className="hp-search__subtitle">{t('home.search.subtitle')}</p>

          <div className="hp-search__box">
            {/* Tabs */}
            <div className="hp-search__tabs">
              {(['venda', 'aluguel', 'projeto'] as const).map((tab) => (
                <button
                  key={tab}
                  className={`hp-search__tab ${searchTab === tab ? 'hp-search__tab--active' : ''}`}
                  onClick={() => setSearchTab(tab)}
                >
                  {tab === 'venda' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {tab === 'aluguel' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M19 21V5C19 3.9 18.1 3 17 3H7C5.9 3 5 3.9 5 5V21M3 21H21M9 7H11M9 11H11M13 7H15M13 11H15M9 15H15V21H9V15Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {tab === 'projeto' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M2 3H8C9.06 3 10.08 3.42 10.83 4.17C11.58 4.92 12 5.94 12 7V21C12 20.2 11.68 19.44 11.12 18.88C10.56 18.32 9.8 18 9 18H2V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 3H16C14.94 3 13.92 3.42 13.17 4.17C12.42 4.92 12 5.94 12 7V21C12 20.2 12.32 19.44 12.88 18.88C13.44 18.32 14.2 18 15 18H22V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  <span>{t(`home.tabs.${tab}`)}</span>
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="hp-search__input-row">
              <div className="hp-search__input-wrap">
                <svg className="hp-search__input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <input
                  type="text"
                  className="hp-search__input"
                  placeholder={t('home.search.placeholder')}
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button className="hp-search__btn" onClick={handleSearch}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>{t('home.search.button')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Vendas Section */}
      <section id="secao-vendas" className="hp-section">
        <div className="hp-section__container">
          <div className="hp-section__header">
            <div>
              <h2 className="hp-section__title">{t('home.sections.sale.title')}</h2>
              <p className="hp-section__desc">{t('home.sections.sale.desc')}</p>
            </div>
            <a href="/venda/" className="hp-section__link">
              {t('home.viewAll')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div className="hp-grid">
            {IMOVEIS_VENDA.map((im) => (
              <a key={im.id} href={`/imovel/${im.id}`} className="hp-card">
                <div className="hp-card__img-wrap">
                  <img src={im.foto} alt={im.titulo} className="hp-card__img" loading="lazy" />
                  <span className="hp-card__badge">{t('home.badge.sale')}</span>
                </div>
                <div className="hp-card__body">
                  <h3 className="hp-card__title">{im.titulo}</h3>
                  <p className="hp-card__location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61 3.95 5.32 5.64 3.64C7.32 1.95 9.61 1 12 1C14.39 1 16.68 1.95 18.36 3.64C20.05 5.32 21 7.61 21 10Z" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    {im.bairro}, {im.cidade}
                  </p>
                  <div className="hp-card__specs">
                    <span>{im.quartos} {t('home.specs.bedrooms')}</span>
                    <span>{im.banheiros} {t('home.specs.bathrooms')}</span>
                    <span>{im.vagas} {t('home.specs.parking')}</span>
                    <span>{im.area}m²</span>
                  </div>
                  <p className="hp-card__price">{formatPreco(im.preco)}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Aluguel Section */}
      <section id="secao-aluguel" className="hp-section hp-section--alt">
        <div className="hp-section__container">
          <div className="hp-section__header">
            <div>
              <h2 className="hp-section__title">{t('home.sections.rental.title')}</h2>
              <p className="hp-section__desc">{t('home.sections.rental.desc')}</p>
            </div>
            <a href="/aluguel-anual/" className="hp-section__link">
              {t('home.viewAll')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div className="hp-grid">
            {IMOVEIS_ALUGUEL.map((im) => (
              <a key={im.id} href={`/imovel/${im.id}`} className="hp-card">
                <div className="hp-card__img-wrap">
                  <img src={im.foto} alt={im.titulo} className="hp-card__img" loading="lazy" />
                  <span className="hp-card__badge hp-card__badge--aluguel">{t('home.badge.rental')}</span>
                </div>
                <div className="hp-card__body">
                  <h3 className="hp-card__title">{im.titulo}</h3>
                  <p className="hp-card__location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61 3.95 5.32 5.64 3.64C7.32 1.95 9.61 1 12 1C14.39 1 16.68 1.95 18.36 3.64C20.05 5.32 21 7.61 21 10Z" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    {im.bairro}, {im.cidade}
                  </p>
                  <div className="hp-card__specs">
                    <span>{im.quartos} {t('home.specs.bedrooms')}</span>
                    <span>{im.banheiros} {t('home.specs.bathrooms')}</span>
                    <span>{im.vagas} {t('home.specs.parking')}</span>
                    <span>{im.area}m²</span>
                  </div>
                  <p className="hp-card__price">{formatPreco(im.preco, 'aluguel', perMonth)}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Projetos Section */}
      <section id="secao-projetos" className="hp-section">
        <div className="hp-section__container">
          <div className="hp-section__header">
            <div>
              <h2 className="hp-section__title">{t('home.sections.projects.title')}</h2>
              <p className="hp-section__desc">{t('home.sections.projects.desc')}</p>
            </div>
            <a href="/projetos/" className="hp-section__link">
              {t('home.viewAll')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div className="hp-grid">
            {PROJETOS.map((proj) => (
              <a key={proj.id} href={`/projeto/${proj.id}`} className="hp-card hp-card--projeto">
                <div className="hp-card__img-wrap">
                  <img src={proj.foto} alt={proj.titulo} className="hp-card__img" loading="lazy" />
                  <span className="hp-card__badge hp-card__badge--projeto">{t('home.badge.project')}</span>
                  <div className="hp-card__progress">
                    <div className="hp-card__progress-bar" style={{ width: `${proj.percentual}%` }} />
                    <span className="hp-card__progress-label">{t('home.project.completed', { pct: proj.percentual })}</span>
                  </div>
                </div>
                <div className="hp-card__body">
                  <h3 className="hp-card__title">{proj.titulo}</h3>
                  <p className="hp-card__construtora">{proj.construtora}</p>
                  <p className="hp-card__location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61 3.95 5.32 5.64 3.64C7.32 1.95 9.61 1 12 1C14.39 1 16.68 1.95 18.36 3.64C20.05 5.32 21 7.61 21 10Z" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    {proj.bairro}, {proj.cidade}
                  </p>
                  <div className="hp-card__specs">
                    <span>{proj.unidades} {t('home.project.unitsAvailable')}</span>
                    <span>{proj.areaMin}-{proj.areaMax}m²</span>
                    <span>{t('home.project.delivery', { date: proj.previsao })}</span>
                  </div>
                  <p className="hp-card__price">{t('home.project.startingFrom', { price: formatPreco(proj.precoMin) })}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hp-footer">
        <div className="hp-footer__container">
          <div className="hp-footer__grid">
            {/* Brand */}
            <div className="hp-footer__brand">
              <img src="/HORIZONTAL BRANCO SEM FUNDO.png" alt="Cretor" className="hp-footer__logo" />
              <p className="hp-footer__tagline">{t('footer.tagline')}</p>
              <div className="hp-footer__social">
                <a href="https://www.instagram.com/guilhermepilger/" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
                </a>
                <a href="https://wa.me/554798252080" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" stroke="currentColor" strokeWidth="1.5"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.8"/></svg>
                </a>
                <a href="https://www.facebook.com/guilherme.pilger/" target="_blank" rel="noopener noreferrer" title="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="https://www.youtube.com/@GuilhermePilger/" target="_blank" rel="noopener noreferrer" title="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1.14521 8.20556 0.991235 9.97631 1 11.75C0.988687 13.537 1.14266 15.3213 1.46 17.08C1.59096 17.5398 1.8383 17.9581 2.17814 18.2945C2.51798 18.6308 2.93882 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0064 13.5103 23 11.75C23.0113 9.96295 22.8573 8.1787 22.54 6.42Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.75 15.02L15.5 11.75L9.75 8.48V15.02Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="https://www.tiktok.com/@guilhermepilgeroficial" target="_blank" rel="noopener noreferrer" title="TikTok">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 12C9 13.657 7.657 15 6 15C4.343 15 3 13.657 3 12C3 10.343 4.343 9 6 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M15 3V15C15 17.761 12.761 20 10 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M15 3C15 3 15 7 19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="hp-footer__col">
              <h4 className="hp-footer__col-title">{t('footer.navigation')}</h4>
              <a href="/venda/" className="hp-footer__link">{t('header.nav.sales')}</a>
              <a href="/aluguel-anual/" className="hp-footer__link">{t('header.nav.rental')}</a>
              <a href="/projetos/" className="hp-footer__link">{t('header.nav.projects')}</a>
              <a href="/busca" className="hp-footer__link">{t('footer.searchProperties')}</a>
            </div>

            <div className="hp-footer__col">
              <h4 className="hp-footer__col-title">{t('footer.institutional')}</h4>
              <a href="/imobiliaria/" className="hp-footer__link">{t('footer.aboutUs')}</a>
              <a href="/contato" className="hp-footer__link">{t('footer.contactUs')}</a>
              <a href="/cadastre" className="hp-footer__link">{t('footer.sellProperty')}</a>
              <a href="https://blog.guilhermepilger.com" target="_blank" rel="noopener noreferrer" className="hp-footer__link">{t('footer.blog')}</a>
            </div>

            {/* Contato */}
            <div className="hp-footer__col">
              <h4 className="hp-footer__col-title">{t('footer.contact')}</h4>
              <a href="https://wa.me/554798252080" target="_blank" rel="noopener noreferrer" className="hp-footer__contact">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.97C20.64 21 20.29 21 19.92 21C10.4 21 3 13.6 3 4.08C3 3.71 3 3.36 3.03 3C3.07 2.44 3.52 2 4.08 2H7.08C7.56 2 7.96 2.37 8.03 2.85C8.11 3.41 8.24 3.96 8.43 4.49C8.58 4.89 8.47 5.33 8.17 5.63L6.91 6.89C8.51 9.66 10.34 11.49 13.11 13.09L14.37 11.83C14.67 11.53 15.11 11.42 15.51 11.57C16.04 11.76 16.59 11.89 17.15 11.97C17.63 12.04 18 12.44 18 12.92V16.92" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                (47) 9 8252-8080
              </a>
              <a href="mailto:contato@guilhermepilger.com" className="hp-footer__contact">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                contato@guilhermepilger.com
              </a>
              <p className="hp-footer__contact hp-footer__contact--text">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61 3.95 5.32 5.64 3.64C7.32 1.95 9.61 1 12 1C14.39 1 16.68 1.95 18.36 3.64C20.05 5.32 21 7.61 21 10Z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>
                Balneário Camboriú, SC
              </p>
              <p className="hp-footer__creci">CRECI/SC 56055F</p>
            </div>
          </div>

          <div className="hp-footer__bottom">
            <p>&copy; {new Date().getFullYear()} Guilherme Pilger Corretor de Imóveis. {t('footer.copyright')}.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
