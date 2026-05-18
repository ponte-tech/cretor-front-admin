import { useState, useEffect, useRef, FormEvent, useCallback } from 'react'
import { leadsApi } from '../../services/api'
import { trackPageView, trackViewContent, trackLead, trackEvent } from '../../services/analytics'
import { useFormTracking } from '../../hooks/useFormTracking'
import { Waves, Dumbbell, UtensilsCrossed, ToyBrick, PartyPopper, Wine, Building2, TreePine } from 'lucide-react'
import styles from './LPPortoBelo.module.css'

const FAQ_ITEMS = [
  { q: 'Qual o prazo de entrega?', a: 'A previsão de entrega é de 1 ano. A obra já está em estágio avançado, com mais de 65% concluída.' },
  { q: 'Como funciona o financiamento direto?', a: 'O pagamento é parcelado em até 84 vezes direto com a construtora, sem necessidade de aprovação bancária. Sem burocracia e sem juros de banco.' },
  { q: 'O empreendimento fica perto de quê?', a: 'A 430 metros do mar, ao lado de 2 supermercados, farmácias, Havan e restaurantes — faz tudo a pé! Fica a 15 minutos de Bombinhas, 30 minutos de Balneário Camboriú e 50 minutos do aeroporto de Navegantes.' },
  { q: 'Quais as formas de pagamento aceitas?', a: 'Aceitamos financiamento direto com a construtora em até 84x, pagamento à vista com desconto e combinações personalizadas.' },
  { q: 'O apartamento vem com vaga de garagem?', a: 'Sim, são 2 vagas de garagem cobertas incluídas, sem custo adicional.' },
]

interface LeadFormData {
  nome: string
  whatsapp: string
  prazo: string
  formaPagamento: string
  website: string
}

const PRAZOS = [
  { value: 'imediatamente', label: 'Imediatamente' },
  { value: 'ate-3-meses', label: 'Até 3 meses' },
  { value: '3-a-6-meses', label: '3 a 6 meses' },
  { value: 'pesquisando', label: 'Apenas pesquisando' },
]

const FORMAS_PAGAMENTO = [
  { value: 'financiamento', label: 'Financiamento' },
  { value: 'a-vista', label: 'À vista' },
  { value: 'fgts-financiamento', label: 'FGTS + Financiamento' },
  { value: 'direto-construtora', label: 'Direto com a construtora' },
  { value: 'nao-decidi', label: 'Ainda não decidi' },
]

const FORM_FIELDS: (keyof LeadFormData)[] = ['nome', 'prazo', 'whatsapp']

const WHATSAPP_NUMBER = '5554991964993'

const GALLERY_IMAGES = [
  { src: '/images/porto-belo/img-08.jpeg', alt: 'Living integrado com vista para o mar', label: 'Living' },
  { src: '/images/porto-belo/img-19.jpeg', alt: 'Suíte master com acabamento premium', label: 'Suíte' },
  { src: '/images/porto-belo/img-09.jpeg', alt: 'Rooftop com bar e piscina', label: 'Rooftop' },
  { src: '/images/porto-belo/img-06.jpeg', alt: 'Hall de entrada com mármore e design moderno', label: 'Hall' },
  { src: '/images/porto-belo/img-02.jpeg', alt: 'Academia completa', label: 'Academia' },
  { src: '/images/porto-belo/img-15.jpeg', alt: 'Espaço gourmet', label: 'Gourmet' },
  { src: '/images/porto-belo/img-03.jpeg', alt: 'Fachada noturna do empreendimento', label: 'Fachada' },
  { src: '/images/porto-belo/img-01.jpeg', alt: 'Brinquedoteca infantil', label: 'Kids' },
]

function LeadForm({ formRef, formData, errors, isSubmitting, updateField, formatWhatsApp, handleSubmit, trackFieldFocus, trackFieldBlur, compact }: {
  formRef?: React.RefObject<HTMLFormElement | null>
  formData: LeadFormData
  errors: Partial<Record<keyof LeadFormData, string>>
  isSubmitting: boolean
  updateField: (field: keyof LeadFormData, value: string) => void
  formatWhatsApp: (value: string) => string
  handleSubmit: (e: FormEvent) => void
  trackFieldFocus: (field: string) => void
  trackFieldBlur: (field: string, hasValue: boolean) => void
  compact?: boolean
}) {
  return (
    <form ref={formRef} className={`${styles.form} ${compact ? styles.formCompact : ''}`} onSubmit={handleSubmit} noValidate>
      {compact && <h3 className={styles.formCompactTitle}>Fale com um consultor</h3>}
      <div className={styles.formField}>
        <label className={styles.label}>Nome completo</label>
        <input type="text" className={`${styles.input} ${errors.nome ? styles.inputError : ''}`} value={formData.nome} onChange={(e) => updateField('nome', e.target.value)} onFocus={() => trackFieldFocus('nome')} onBlur={() => trackFieldBlur('nome', !!formData.nome.trim())} autoComplete="name" placeholder="Seu nome" />
        {errors.nome && <span className={styles.error}>{errors.nome}</span>}
      </div>
      <div className={styles.formField}>
        <label className={styles.label}>WhatsApp</label>
        <input type="tel" className={`${styles.input} ${errors.whatsapp ? styles.inputError : ''}`} value={formData.whatsapp} onChange={(e) => updateField('whatsapp', formatWhatsApp(e.target.value))} onFocus={() => trackFieldFocus('whatsapp')} onBlur={() => trackFieldBlur('whatsapp', formData.whatsapp.replace(/\D/g, '').length >= 10)} autoComplete="tel" placeholder="(00) 00000-0000" inputMode="numeric" maxLength={15} />
        {errors.whatsapp && <span className={styles.error}>{errors.whatsapp}</span>}
      </div>
      <div className={styles.formField}>
        <label className={styles.label}>Prazo para compra</label>
        <select className={`${styles.select} ${errors.prazo ? styles.inputError : ''} ${!formData.prazo ? styles.selectPlaceholder : ''}`} value={formData.prazo} onChange={(e) => updateField('prazo', e.target.value)} onFocus={() => trackFieldFocus('prazo')} onBlur={() => trackFieldBlur('prazo', !!formData.prazo)}>
          <option value="" disabled>Selecione</option>
          {PRAZOS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
        {errors.prazo && <span className={styles.error}>{errors.prazo}</span>}
      </div>
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={(e) => updateField('website', e.target.value)} />
      </div>
      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? (
          <span className={styles.loadingText}><span className={styles.spinner} />Enviando...</span>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Falar com especialista
          </>
        )}
      </button>
      <div className={styles.trustInline}>
        <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> Dados protegidos</span>
        <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Sem compromisso</span>
      </div>
    </form>
  )
}

export default function LPPortoBelo() {
  const [formData, setFormData] = useState<LeadFormData>({
    nome: '', whatsapp: '', prazo: '', formaPagamento: '', website: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showExitIntent, setShowExitIntent] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const exitIntentShown = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const galleryScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pageStart = Date.now()
    trackPageView('lp_porto_belo')
    trackEvent('page_render_start', { page: 'lp_porto_belo' })
    trackViewContent({
      content_name: 'Apartamento 2 Suítes Porto Belo',
      content_category: 'imovel_alto_padrao',
      content_type: 'product',
      value: 1000000,
      currency: 'BRL',
    })

    // Detectar quando a página carregou 100% (imagens, CSS, JS)
    const checkFullLoad = () => {
      const loadTime = Date.now() - pageStart
      trackEvent('page_fully_loaded', {
        page: 'lp_porto_belo',
        load_time_ms: loadTime,
        load_time_s: Math.round(loadTime / 100) / 10,
      })
    }

    if (document.readyState === 'complete') {
      checkFullLoad()
    } else {
      window.addEventListener('load', checkFullLoad)
    }

    // Detectar quando o hero (primeira tela) renderizou
    const heroImg = new Image()
    heroImg.src = '/images/porto-belo/img-07.jpeg'
    heroImg.onload = () => {
      const heroTime = Date.now() - pageStart
      trackEvent('hero_image_loaded', {
        page: 'lp_porto_belo',
        load_time_ms: heroTime,
      })
    }

    return () => {
      window.removeEventListener('load', checkFullLoad)
    }

    // SEO meta tags + Open Graph
    document.title = 'Apartamento 2 Suítes Porto Belo SC — 430m do Mar | Menos de R$ 1M'
    const setMeta = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(property.startsWith('og:') ? 'property' : 'name', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }
    setMeta('description', 'Apartamento 2 suítes, 86m², 2 vagas, a 430m do mar em Porto Belo SC. Parcele em até 84x direto com a construtora. Entrega em 1 ano.')
    setMeta('og:title', 'Apto 2 Suítes em Porto Belo — 430m do Mar')
    setMeta('og:description', '86m² privativos, 2 vagas, parcele em 84x direto. Obra avançada, entrega em 1 ano.')
    setMeta('og:image', window.location.origin + '/images/porto-belo/img-07.jpeg')
    setMeta('og:type', 'website')
    setMeta('og:url', window.location.href)
  }, [])

  // Scroll depth + form visibility tracking
  useEffect(() => {
    const scrollFired = new Set<number>()
    let formSeen = false
    let timeOnPage = 0
    const timer = setInterval(() => {
      timeOnPage += 1
      if (timeOnPage === 3) trackEvent('time_on_page_3s', { page: 'lp_porto_belo' })
      if (timeOnPage === 10) trackEvent('time_on_page_10s', { page: 'lp_porto_belo' })
      if (timeOnPage === 30) trackEvent('time_on_page_30s', { page: 'lp_porto_belo' })
      if (timeOnPage === 60) trackEvent('time_on_page_60s', { page: 'lp_porto_belo' })
    }, 1000)

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const pct = Math.round((scrollTop / docHeight) * 100)

      for (const threshold of [10, 25, 50, 75, 90]) {
        if (pct >= threshold && !scrollFired.has(threshold)) {
          scrollFired.add(threshold)
          trackEvent(`scroll_depth_${threshold}`, { page: 'lp_porto_belo', percent: threshold })
        }
      }

      // Verificar se o formulário do hero está visível
      if (!formSeen) {
        const heroForm = document.querySelector('[class*="heroForm"]')
        if (heroForm) {
          const rect = heroForm.getBoundingClientRect()
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            formSeen = true
            trackEvent('form_visible', { page: 'lp_porto_belo', form: 'hero' })
          }
        }
      }
    }

    // Verificar form visível no load (mobile com order:-1)
    setTimeout(() => {
      const heroForm = document.querySelector('[class*="heroForm"]')
      if (heroForm) {
        const rect = heroForm.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          if (!formSeen) {
            formSeen = true
            trackEvent('form_visible_on_load', { page: 'lp_porto_belo' })
          }
        } else {
          trackEvent('form_NOT_visible_on_load', { page: 'lp_porto_belo', form_top: Math.round(rect.top) })
        }
      }
    }, 2000)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(timer)
    }
  }, [])

  // Exit intent — desktop only
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown.current && !isSuccess) {
        exitIntentShown.current = true
        setShowExitIntent(true)
        trackEvent('exit_intent_shown', { page: 'lp_porto_belo' })
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [isSuccess])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > (heroRef.current?.offsetHeight ?? 600))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const {
    trackFieldFocus, trackFieldBlur, trackSubmit,
    trackSubmitSuccess, trackSubmitError, trackValidationErrors,
  } = useFormTracking({ formName: 'lp_porto_belo', fields: FORM_FIELDS })

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const updateField = (field: keyof LeadFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 11)
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {}
    if (!formData.nome.trim()) newErrors.nome = 'Informe seu nome'
    if (!formData.whatsapp.trim() || formData.whatsapp.replace(/\D/g, '').length < 10) {
      newErrors.whatsapp = 'Informe seu WhatsApp'
    }
    if (!formData.prazo) newErrors.prazo = 'Selecione o prazo'
    setErrors(newErrors)
    const errorFields = Object.keys(newErrors) as (keyof LeadFormData)[]
    if (errorFields.length > 0) trackValidationErrors(errorFields)
    return errorFields.length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    trackSubmit()
    if (!validate()) return
    setIsSubmitting(true)
    try {
      // Detectar origem: meta, google ou direto
      const params = new URLSearchParams(window.location.search)
      const utmSource = params.get('utm_source') || ''
      const gclid = params.get('gclid') || ''
      let origem = 'lp_porto_belo'
      if (gclid) origem = 'google_ads'
      else if (utmSource === 'meta') origem = 'meta_ads_lp'
      else if (utmSource) origem = `lp_${utmSource}`

      const result = await leadsApi.create({
        nome: formData.nome,
        whatsapp: formData.whatsapp,
        prazo: formData.prazo,
        forma_pagamento: formData.formaPagamento,
        website: formData.website,
        origem,
      })
      trackSubmitSuccess()
      trackLead({
        form_name: 'lp_porto_belo',
        prazo: formData.prazo,
        forma_pagamento: formData.formaPagamento,
        event_id: result.event_id,
      })
      // Google Ads conversion
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
          value: 1000000,
          currency: 'BRL',
        })
      }
      setIsSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      trackSubmitError('unknown')
      setErrors({ nome: 'Erro ao enviar. Tente novamente.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    const whatsappMessage = encodeURIComponent(
      `Olá! Vim pelo site do Apartamento 2 Suítes em Porto Belo/SC e gostaria de falar com um consultor.`
    )
    return (
      <div className={styles.successPage}>
        <div className={styles.successContent}>
          <div className={styles.successIcon}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 className={styles.successTitle}>
            Excelente escolha, <span className={styles.goldText}>{formData.nome.split(' ')[0]}</span>!
          </h2>
          <p className={styles.successText}>
            Nosso consultor especializado em Porto Belo vai entrar em contato pelo WhatsApp
            para apresentar as melhores condições para você.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappCta}
            onClick={() => trackEvent('whatsapp_click', { form_name: 'lp_porto_belo', lead_name: formData.nome })}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Falar com consultor agora
          </a>
          <p className={styles.successSubtext}>Ou aguarde, entraremos em contato em breve.</p>
        </div>
      </div>
    )
  }

  const sectionClass = (id: string) =>
    `${styles.section} ${visibleSections.has(id) ? styles.sectionVisible : ''}`

  return (
    <div className={styles.page}>
      {/* ══════ STICKY BAR ══════ */}
      <div className={`${styles.stickyBar} ${showStickyBar ? styles.stickyBarVisible : ''}`}>
        <div className={styles.stickyContent}>
          <div className={styles.stickyInfo}>
            <strong>Apto 2 Suítes — Porto Belo</strong>
            <span>Menos de R$ 1.000.000</span>
          </div>
          <button className={styles.stickyCta} onClick={scrollToForm}>Quero saber mais</button>
        </div>
      </div>

      {/* ══════ HERO COM FORMULARIO ══════ */}
      <section className={styles.hero} ref={heroRef}>
        <img
          src="/images/porto-belo/img-07.jpeg"
          alt="Vista aérea do empreendimento com mar ao fundo - Porto Belo SC"
          className={styles.heroImage}
          loading="eager"
          fetchPriority="high"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroSplit}>
          <div className={styles.heroText}>
            <span className={styles.heroBadge}>Porto Belo, SC</span>
            <h1 className={styles.heroTitle}>
              Apartamento 2 Suítes a<br />
              <span className={styles.goldText}>430 metros do mar</span>
            </h1>
            <p className={styles.heroSubtitle}>
              2 suites &middot; 86m&sup2; privativos &middot; 2 vagas &middot; Entrega em 1 ano
            </p>
            <p className={styles.heroPricing}>
              Menos de <strong>R$ 1.000.000</strong> &middot; Parcele em até 84x direto com a construtora
            </p>
          </div>
          <div className={styles.heroForm}>
            <LeadForm
              formData={formData} errors={errors} isSubmitting={isSubmitting}
              updateField={updateField} formatWhatsApp={formatWhatsApp}
              handleSubmit={handleSubmit} trackFieldFocus={trackFieldFocus}
              trackFieldBlur={trackFieldBlur} compact
            />
          </div>
        </div>
      </section>

      {/* ══════ STATS BAR ══════ */}
      <section className={styles.statsBar}>
        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <span className={styles.statValue}>86m&sup2;</span>
            <span className={styles.statLabel}>Área Privativa</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>2</span>
            <span className={styles.statLabel}>Suítes</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>2</span>
            <span className={styles.statLabel}>Vagas</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>430m</span>
            <span className={styles.statLabel}>Do Mar</span>
          </div>
        </div>
      </section>

      {/* ══════ PROVA SOCIAL + URGENCIA ══════ */}
      <section id="social" data-animate className={sectionClass('social')}>
        <div className={styles.container}>
          <div className={styles.socialLayout}>
            {/* Card de urgencia destaque */}
            <div className={styles.urgencyCard}>
              <div className={styles.urgencyPulse} />
              <div className={styles.urgencyNumber}>03</div>
              <div className={styles.urgencyLabel}>unidades<br />restantes</div>
              <button className={styles.urgencyCta} onClick={scrollToForm}>Garantir minha unidade</button>
            </div>

            {/* Cards de metricas */}
            <div className={styles.socialCards}>
              <div className={styles.socialCard}>
                <div className={styles.socialCardHeader}>
                  <span className={styles.socialValue}>94%</span>
                  <span className={styles.socialLabel}>Unidades vendidas</span>
                </div>
                <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '94%' }} /></div>
              </div>
              <div className={styles.socialCard}>
                <div className={styles.socialCardHeader}>
                  <span className={styles.socialValue}>65%</span>
                  <span className={styles.socialLabel}>Obra concluída</span>
                </div>
                <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: '65%' }} /></div>
              </div>
              <div className={styles.socialCard}>
                <div className={styles.socialCardHeader}>
                  <span className={styles.socialValue}>+40%</span>
                  <span className={styles.socialLabel}>Valorização da região</span>
                </div>
                <span className={styles.socialSubtext}>nos últimos 3 anos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ VIDEO ══════ */}
      <section id="video" data-animate className={sectionClass('video')}>
        <div className={styles.container}>
          <div className={styles.videoSection}>
            <div className={styles.videoText}>
              <span className={styles.sectionTag}>Tour Virtual</span>
              <h2 className={styles.sectionTitle}>Conheça o empreendimento</h2>
              <p className={styles.sectionDesc}>
                Assista ao tour e veja de perto a qualidade dos acabamentos,
                a vista privilegiada e toda a infraestrutura de lazer que espera por você.
              </p>
              <button className={styles.ctaSecondary} onClick={scrollToForm}>
                Quero saber mais
              </button>
            </div>
            <div className={styles.videoWrapper}>
              {videoLoaded ? (
                <iframe
                  src="https://www.youtube.com/embed/yAfF5NXlTFo?rel=0&modestbranding=1&autoplay=1&loop=1&playlist=yAfF5NXlTFo"
                  title="Tour do empreendimento em Porto Belo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button className={styles.videoFacade} onClick={() => setVideoLoaded(true)} aria-label="Assistir video">
                  <img src="https://img.youtube.com/vi/yAfF5NXlTFo/maxresdefault.jpg" alt="Tour do empreendimento" loading="lazy" />
                  <div className={styles.videoPlayBtn}>
                    <svg width="48" height="48" viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#D4AF37" /><path d="M45 24L27 14v20" fill="#0a0604" /></svg>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ SOBRE ══════ */}
      <section id="sobre" data-animate className={sectionClass('sobre')}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <span className={styles.sectionTag}>O Empreendimento</span>
              <h2 className={styles.sectionTitle}>
                Viva onde outros passam férias
              </h2>
              <p className={styles.sectionDesc}>
                Em uma das regiões que mais valoriza no litoral catarinense, este
                empreendimento oferece o equilíbrio perfeito entre sofisticação e
                proximidade com a natureza. A apenas 430 metros do mar, com obra já
                avançada e entrega prevista para 1 ano.
              </p>
              <ul className={styles.featureList}>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Sacada privativa na suíte master
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Living integrado com lavabo
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  2 vagas de garagem cobertas
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Acabamento de alto padrão
                </li>
              </ul>
              <button className={styles.ctaSecondary} onClick={scrollToForm}>
                Receber informações completas
              </button>
            </div>
            <div className={styles.aboutImage}>
              <img src="/images/porto-belo/img-08.jpeg" alt="Living integrado do apartamento" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════ PLANTA HUMANIZADA ══════ */}
      <section id="planta" data-animate className={sectionClass('planta')}>
        <div className={styles.container}>
          <div className={styles.plantaSection}>
            <div className={styles.plantaImage}>
              <img
                src="/images/porto-belo/planta.png"
                alt="Planta humanizada - Apartamento Tipo 06 - 86,54m² - 2 Suites"
                loading="lazy"
              />
            </div>
            <div className={styles.plantaInfo}>
              <span className={styles.sectionTag}>Planta do Apartamento</span>
              <h2 className={styles.sectionTitle}>Tipo 06 — 86,54m²</h2>
              <div className={styles.plantaSpecs}>
                <div className={styles.plantaSpec}>
                  <span className={styles.plantaSpecValue}>2</span>
                  <span className={styles.plantaSpecLabel}>Suítes</span>
                </div>
                <div className={styles.plantaSpec}>
                  <span className={styles.plantaSpecValue}>21m²</span>
                  <span className={styles.plantaSpecLabel}>Living</span>
                </div>
                <div className={styles.plantaSpec}>
                  <span className={styles.plantaSpecValue}>2</span>
                  <span className={styles.plantaSpecLabel}>Sacadas</span>
                </div>
                <div className={styles.plantaSpec}>
                  <span className={styles.plantaSpecValue}>2</span>
                  <span className={styles.plantaSpecLabel}>Vagas</span>
                </div>
              </div>
              <ul className={styles.featureList}>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Sacada com churrasqueira a carvão
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Lavabo social independente
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Suítes com banheiro privativo
                </li>
              </ul>
              <button className={styles.ctaSecondary} onClick={scrollToForm}>
                Receber planta em alta resolução
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ GALERIA COM SWIPE ══════ */}
      <section id="galeria" data-animate className={sectionClass('galeria')}>
        <div className={styles.container}>
          <span className={styles.sectionTag}>Galeria</span>
          <h2 className={styles.sectionTitle}>Cada detalhe pensado para você</h2>
        </div>
        <div className={styles.galleryScroll} ref={galleryScrollRef}>
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={i}
              className={styles.galleryItem}
              onClick={() => setLightboxIndex(i)}
              aria-label={`Abrir imagem: ${img.alt}`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <span className={styles.galleryLabel}>{img.label}</span>
            </button>
          ))}
        </div>
        <div className={styles.gallerySwipeHint}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          Arraste para ver mais
        </div>
        <div className={styles.galleryDesktop}>
          <div className={styles.container}>
            <div className={styles.galleryGrid}>
              {GALLERY_IMAGES.map((img, i) => (
                <button
                  key={i}
                  className={styles.galleryItem}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Abrir imagem: ${img.alt}`}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                  <span className={styles.galleryLabel}>{img.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ INFRAESTRUTURA ══════ */}
      <section id="infra" data-animate className={sectionClass('infra')}>
        <div className={styles.container}>
          <span className={styles.sectionTag}>Infraestrutura</span>
          <h2 className={styles.sectionTitle}>Lazer completo no seu condomínio</h2>
          <div className={styles.amenitiesGrid}>
            {[
              { Icon: Waves, name: 'Piscina Adulto e Infantil' },
              { Icon: Dumbbell, name: 'Academia Completa' },
              { Icon: UtensilsCrossed, name: 'Espaço Gourmet' },
              { Icon: ToyBrick, name: 'Brinquedoteca' },
              { Icon: PartyPopper, name: 'Salão de Festas' },
              { Icon: Wine, name: 'Rooftop com Bar' },
              { Icon: Building2, name: 'Hall Social Premium' },
              { Icon: TreePine, name: 'Playground Externo' },
            ].map((a, i) => (
              <div key={i} className={styles.amenityCard} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className={styles.amenityIcon}>
                  <a.Icon size={32} strokeWidth={1.5} color="#D4AF37" />
                </div>
                <span className={styles.amenityName}>{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CONDICOES ══════ */}
      <section id="condicoes" data-animate className={sectionClass('condicoes')}>
        <div className={styles.container}>
          <span className={styles.sectionTag}>Investimento</span>
          <h2 className={styles.sectionTitle}>Condições exclusivas</h2>
          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard} style={{ animationDelay: '0s' }}>
              <div className={styles.pricingIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M12 12a2 2 0 100-4 2 2 0 000 4z" /><path d="M6 12h.01M18 12h.01" /></svg>
              </div>
              <span className={styles.pricingLabel}>Menos de</span>
              <span className={styles.pricingValue}>R$ 1.000.000</span>
              <span className={styles.pricingDetail}>Parcele em até 84x direto com a construtora</span>
            </div>
            <div className={styles.pricingCard} style={{ animationDelay: '0.1s' }}>
              <div className={styles.pricingIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <span className={styles.pricingLabel}>Entrega em</span>
              <span className={styles.pricingValue}>1 Ano</span>
              <span className={styles.pricingDetail}>Obra já avançada — acompanhe a evolução</span>
            </div>
            <div className={styles.pricingCard} style={{ animationDelay: '0.2s' }}>
              <div className={styles.pricingIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <span className={styles.pricingLabel}>Pagamento</span>
              <span className={styles.pricingValue}>Sem Banco</span>
              <span className={styles.pricingDetail}>Financiamento direto, sem burocracia bancária</span>
            </div>
          </div>
          <div className={styles.pricingCta}>
            <button className={styles.heroCta} onClick={scrollToForm}>
              Simular meu investimento
            </button>
          </div>
        </div>
      </section>

      {/* ══════ DEPOIMENTOS ══════ */}
      <section id="depoimentos" data-animate className={sectionClass('depoimentos')}>
        <div className={styles.container}>
          <span className={styles.sectionTag}>Depoimentos</span>
          <h2 className={styles.sectionTitle}>Quem escolheu Porto Belo</h2>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                "Pesquisamos o litoral de SC inteiro e Porto Belo foi a melhor
                relação custo-benefício. O empreendimento tem tudo que precisamos
                e a valorização já está acontecendo."
              </p>
              <div className={styles.testimonialAuthor}>
                <img src="/avatares/man/46.png" alt="Ricardo" className={styles.testimonialAvatar} />
                <div>
                  <strong>Ricardo M.</strong>
                  <span>Comprador — Curitiba, PR</span>
                </div>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                "O atendimento foi excepcional. Me explicaram todas as condições,
                visitei a obra e fechei na hora. Parcela direto com a construtora
                sem burocracia."
              </p>
              <div className={styles.testimonialAuthor}>
                <img src="/avatares/woman/25.png" alt="Ana Paula" className={styles.testimonialAvatar} />
                <div>
                  <strong>Ana Paula S.</strong>
                  <span>Compradora — São Paulo, SP</span>
                </div>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p className={styles.testimonialText}>
                "Comprei como investimento. A região valorizou mais de 40% nos
                últimos anos e a localização a poucos metros do mar é imbatível. Recomendo."
              </p>
              <div className={styles.testimonialAuthor}>
                <img src="/avatares/man/34.png" alt="Marcos" className={styles.testimonialAvatar} />
                <div>
                  <strong>Marcos L.</strong>
                  <span>Investidor — Porto Alegre, RS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ LOCALIZACAO ══════ */}
      <section id="localizacao" data-animate className={sectionClass('localizacao')}>
        <div className={styles.container}>
          <span className={styles.sectionTag}>Localização</span>
          <h2 className={styles.sectionTitle}>Porto Belo, Santa Catarina</h2>
          <p className={styles.sectionDesc} style={{ maxWidth: 640, margin: '0 auto 32px' }}>
            Uma das cidades que mais valoriza no litoral sul do Brasil.
            Tudo a pé: supermercados, farmácias, Havan e restaurantes ao lado.
            Próxima a Bombinhas, Balneário Camboriú e Itapema.
          </p>
          <div className={styles.locationGrid}>
            <div className={styles.locationCard}>
              <span className={styles.locationDist}>430m</span>
              <span className={styles.locationName}>Praia</span>
            </div>
            <div className={styles.locationCard}>
              <span className={styles.locationDist}>A pe</span>
              <span className={styles.locationName}>Supermercados e Farmácias</span>
            </div>
            <div className={styles.locationCard}>
              <span className={styles.locationDist}>15 min</span>
              <span className={styles.locationName}>Bombinhas</span>
            </div>
            <div className={styles.locationCard}>
              <span className={styles.locationDist}>30 min</span>
              <span className={styles.locationName}>Bal. Camboriu</span>
            </div>
            <div className={styles.locationCard}>
              <span className={styles.locationDist}>50 min</span>
              <span className={styles.locationName}>Aeroporto Navegantes</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section id="faq" data-animate className={sectionClass('faq')}>
        <div className={styles.container}>
          <span className={styles.sectionTag}>Dúvidas Frequentes</span>
          <h2 className={styles.sectionTitle}>Perguntas e respostas</h2>
          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ''}`}>
                <button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.faqChevron}><polyline points="6 9 12 15 18 9" /></svg>
                </button>
                <div className={styles.faqAnswer}>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FORMULARIO COMPLETO ══════ */}
      <section id="formulario" data-animate className={sectionClass('formulario')}>
        <div className={styles.container}>
          <div className={styles.formSection}>
            <div className={styles.formInfo}>
              <span className={styles.sectionTag}>Fale com um consultor</span>
              <h2 className={styles.sectionTitle}>Receba atendimento exclusivo</h2>
              <p className={styles.sectionDesc}>
                Preencha o formulário e um consultor especializado vai entrar em
                contato pelo WhatsApp com todas as informações, plantas e
                condições de pagamento.
              </p>
              <div className={styles.formTrust}>
                <div className={styles.formTrustItem}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  <span>Dados protegidos</span>
                </div>
                <div className={styles.formTrustItem}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>Sem compromisso</span>
                </div>
                <div className={styles.formTrustItem}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  <span>Resposta rápida</span>
                </div>
              </div>
            </div>
            <LeadForm
              formRef={formRef} formData={formData} errors={errors}
              isSubmitting={isSubmitting} updateField={updateField}
              formatWhatsApp={formatWhatsApp} handleSubmit={handleSubmit}
              trackFieldFocus={trackFieldFocus} trackFieldBlur={trackFieldBlur}
            />
          </div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className={styles.footer}>
        <img src="/HORIZONTAL BRANCO SEM FUNDO.png" alt="Logo" className={styles.footerLogo} loading="lazy" />
        <p>Imagens meramente ilustrativas. Sujeito a disponibilidade.</p>
        <a href="/politica-de-privacidade" className={styles.footerLink}>Política de Privacidade</a>
      </footer>

      {/* ══════ WHATSAPP FLUTUANTE ══════ */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Vim pelo site do Apartamento 2 Suítes em Porto Belo/SC e gostaria de mais informações.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatingWhatsapp}
        aria-label="Falar pelo WhatsApp"
        onClick={() => trackEvent('whatsapp_float_click', { page: 'lp_porto_belo' })}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </a>

      {/* ══════ MOBILE CTA BAR ══════ */}
      <div className={`${styles.mobileCta} ${showStickyBar ? styles.mobileCtaVisible : ''}`}>
        <button className={styles.mobileCtaBtn} onClick={scrollToForm}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          Falar com consultor
        </button>
      </div>

      {/* ══════ EXIT INTENT MODAL ══════ */}
      {showExitIntent && (
        <div className={styles.exitOverlay} onClick={() => setShowExitIntent(false)}>
          <div className={styles.exitModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.exitClose} onClick={() => setShowExitIntent(false)} aria-label="Fechar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <h3 className={styles.exitTitle}>Espere! Não perca essa oportunidade</h3>
            <p className={styles.exitText}>
              Receba no seu WhatsApp a <strong>tabela de preços atualizada</strong> e
              as <strong>condições especiais</strong> de pagamento direto com a construtora.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Vim pelo site do Apartamento 2 Suítes em Porto Belo/SC e gostaria de receber a tabela de preços.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.exitCta}
              onClick={() => {
                trackEvent('exit_intent_click', { page: 'lp_porto_belo' })
                setShowExitIntent(false)
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Receber tabela no WhatsApp
            </a>
            <span className={styles.exitSubtext}>Sem spam. Atendimento humano.</span>
          </div>
        </div>
      )}

      {/* ══════ LIGHTBOX ══════ */}
      {lightboxIndex !== null && (
        <div className={styles.lightbox} onClick={() => setLightboxIndex(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightboxIndex(null)} aria-label="Fechar">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length) }} aria-label="Anterior">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <img src={GALLERY_IMAGES[lightboxIndex].src} alt={GALLERY_IMAGES[lightboxIndex].alt} className={styles.lightboxImage} onClick={(e) => e.stopPropagation()} />
          <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length) }} aria-label="Proximo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
          <span className={styles.lightboxCounter}>{lightboxIndex + 1} / {GALLERY_IMAGES.length}</span>
        </div>
      )}
    </div>
  )
}
