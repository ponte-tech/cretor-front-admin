import { useState, useEffect, useRef, FormEvent, useCallback } from 'react'
import { leadsApi } from '../../services/api'
import { trackPageView, trackViewContent, trackLead, trackEvent } from '../../services/analytics'
import { useFormTracking } from '../../hooks/useFormTracking'
import styles from './LPTestePublicos.module.css'

const WHATSAPP_NUMBER = '5554991964993'

const SLIDE_IMAGES = [
  { src: '/images/porto-belo/img-07.jpeg', alt: 'Vista aerea do empreendimento' },
  { src: '/images/porto-belo/img-08.jpeg', alt: 'Living integrado com vista' },
  { src: '/images/porto-belo/img-09.jpeg', alt: 'Rooftop com piscina' },
  { src: '/images/porto-belo/img-06.jpeg', alt: 'Hall de entrada premium' },
  { src: '/images/porto-belo/img-03.jpeg', alt: 'Fachada noturna' },
]

const INTERESSES = [
  { value: 'moradia', label: 'Moradia' },
  { value: 'investimento-venda', label: 'Investimento para Venda' },
  { value: 'investimento-locacao-temporada', label: 'Investimento para Locacao Temporada' },
]

const FLUXOS_COMPRA = [
  {
    value: 'entrada-maior',
    title: 'Entrada maior',
    desc: 'Mensalidades menores + reforco anual',
    exemplo: 'Ex: Entrada ~R$300mil + 84x de ~R$5mil + reforcos anuais',
  },
  {
    value: 'entrada-menor',
    title: 'Entrada menor',
    desc: 'Parcelas maiores + reforco anual',
    exemplo: 'Ex: Entrada ~R$150mil + 84x de ~R$8mil + reforcos anuais',
  },
]

interface LeadFormData {
  interesse: string
  fluxoCompra: string
  nome: string
  whatsapp: string
  website: string
}

const FORM_FIELDS: (keyof LeadFormData)[] = ['interesse', 'fluxoCompra', 'nome', 'whatsapp']

export default function LPTestePublicos() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState<LeadFormData>({
    interesse: '', fluxoCompra: '', nome: '', whatsapp: '', website: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [showExitIntent, setShowExitIntent] = useState(false)
  const exitIntentShown = useRef(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const pageStart = Date.now()
    document.title = 'Apartamento 2 Suites Porto Belo SC — Entrega em menos de 12 meses'

    trackPageView('lp_teste_publicos')
    trackEvent('page_render_start', { page: 'lp_teste_publicos' })
    trackViewContent({
      content_name: 'Apartamento 2 Suites Porto Belo - Teste Publicos',
      content_category: 'imovel_alto_padrao',
      content_type: 'product',
      value: 1000000,
      currency: 'BRL',
    })

    const checkFullLoad = () => {
      const loadTime = Date.now() - pageStart
      trackEvent('page_fully_loaded', { page: 'lp_teste_publicos', load_time_ms: loadTime })
    }
    if (document.readyState === 'complete') checkFullLoad()
    else window.addEventListener('load', checkFullLoad)

    // SEO meta tags
    const setMeta = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`)
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute(property.startsWith('og:') ? 'property' : 'name', property); document.head.appendChild(tag) }
      tag.setAttribute('content', content)
    }
    setMeta('description', 'Apartamento 2 suites, 86m², 2 vagas, a 430m do mar em Porto Belo SC. Entrega em menos de 12 meses.')
    setMeta('og:title', 'Apto 2 Suites Porto Belo — 430m do Mar')
    setMeta('og:description', '86m² privativos, 2 vagas, parcele em 84x direto. Entrega em menos de 12 meses.')
    setMeta('og:image', window.location.origin + '/images/porto-belo/img-07.jpeg')
    setMeta('og:type', 'website')
    setMeta('og:url', window.location.href)

    return () => window.removeEventListener('load', checkFullLoad)
  }, [])

  // Scroll depth + time on page tracking
  useEffect(() => {
    const scrollFired = new Set<number>()
    let timeOnPage = 0
    const timer = setInterval(() => {
      timeOnPage += 1
      if (timeOnPage === 3) trackEvent('time_on_page_3s', { page: 'lp_teste_publicos' })
      if (timeOnPage === 10) trackEvent('time_on_page_10s', { page: 'lp_teste_publicos' })
      if (timeOnPage === 30) trackEvent('time_on_page_30s', { page: 'lp_teste_publicos' })
      if (timeOnPage === 60) trackEvent('time_on_page_60s', { page: 'lp_teste_publicos' })
    }, 1000)

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const pct = Math.round((scrollTop / docHeight) * 100)
      for (const threshold of [10, 25, 50, 75, 90]) {
        if (pct >= threshold && !scrollFired.has(threshold)) {
          scrollFired.add(threshold)
          trackEvent(`scroll_depth_${threshold}`, { page: 'lp_teste_publicos', percent: threshold })
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => { window.removeEventListener('scroll', handleScroll); clearInterval(timer) }
  }, [])

  // Exit intent — desktop only
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown.current && !isSuccess) {
        exitIntentShown.current = true
        setShowExitIntent(true)
        trackEvent('exit_intent_shown', { page: 'lp_teste_publicos' })
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [isSuccess])

  // Slider auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDE_IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Sticky bar — passive scroll
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
  } = useFormTracking({ formName: 'lp_teste_publicos', fields: FORM_FIELDS })

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => {
      const firstInput = formRef.current?.querySelector<HTMLElement>('select, input:not([type="hidden"]):not([tabindex="-1"])')
      firstInput?.focus()
    }, 600)
  }, [])

  const updateField = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 11)
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {}

    if (step === 1) {
      if (!formData.interesse) newErrors.interesse = 'Selecione seu interesse'
    } else if (step === 2) {
      if (!formData.fluxoCompra) newErrors.fluxoCompra = 'Selecione o fluxo de compra'
    } else if (step === 3) {
      if (!formData.nome.trim()) newErrors.nome = 'Informe seu nome'
      if (!formData.whatsapp.trim() || formData.whatsapp.replace(/\D/g, '').length < 10) {
        newErrors.whatsapp = 'Informe seu WhatsApp'
      }
    }

    setErrors(newErrors)
    const errorFields = Object.keys(newErrors) as (keyof LeadFormData)[]
    if (errorFields.length > 0) trackValidationErrors(errorFields)
    return errorFields.length === 0
  }

  const handleNextStep = () => {
    if (!validateStep(formStep)) return
    trackEvent(`form_step_${formStep}_complete`, { page: 'lp_teste_publicos' })
    setFormStep(prev => prev + 1)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    trackSubmit()
    if (!validateStep(3)) return
    setIsSubmitting(true)
    try {
      const params = new URLSearchParams(window.location.search)
      const utmSource = params.get('utm_source') || ''
      const gclid = params.get('gclid') || ''
      let origem = 'lp_teste_publicos'
      if (gclid) origem = 'google_ads'
      else if (utmSource === 'meta') origem = 'meta_ads_teste_publicos'
      else if (utmSource) origem = `lp_${utmSource}`

      const result = await leadsApi.create({
        nome: formData.nome,
        whatsapp: formData.whatsapp,
        interesse: formData.interesse,
        fluxo_compra: formData.fluxoCompra,
        website: formData.website,
        origem,
      })
      trackSubmitSuccess()
      trackLead({
        form_name: 'lp_teste_publicos',
        interesse: formData.interesse,
        fluxo_compra: formData.fluxoCompra,
        event_id: result.event_id,
      })
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
      `Ola! Vim pelo site do Apartamento 2 Suites em Porto Belo/SC e gostaria de falar com um consultor.`
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
            Nosso consultor especializado vai entrar em contato pelo WhatsApp
            para apresentar as melhores condicoes para voce.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappCta}
            onClick={() => trackEvent('whatsapp_click', { form_name: 'lp_teste_publicos', lead_name: formData.nome })}
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
      {/* ══════ STICKY BAR (RED) ══════ */}
      <div className={`${styles.stickyBar} ${showStickyBar ? styles.stickyBarVisible : ''}`}>
        <div className={styles.stickyContent}>
          <div className={styles.stickyInfo}>
            <strong>Apto 2 Suites — Porto Belo</strong>
            <span className={styles.stickyUrgency}>
              <span className={styles.urgencyDot} />
              Entrega em menos de 12 meses
            </span>
          </div>
          <button className={styles.stickyCta} onClick={scrollToForm}>Quero garantir</button>
        </div>
      </div>

      {/* ══════ HERO COM SLIDER ══════ */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroSlider}>
          {SLIDE_IMAGES.map((img, i) => (
            <div key={i} className={`${styles.heroSlide} ${i === currentSlide ? styles.heroSlideActive : ''}`}>
              <img
                src={img.src}
                alt={img.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding={i === 0 ? 'sync' : 'async'}
                {...(i === 0 ? { fetchPriority: 'high' as const } : {})}
              />
            </div>
          ))}
        </div>
        <div className={styles.heroOverlay} />
        <button className={`${styles.heroArrow} ${styles.heroArrowLeft}`} onClick={() => setCurrentSlide(prev => (prev - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length)} aria-label="Slide anterior">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button className={`${styles.heroArrow} ${styles.heroArrowRight}`} onClick={() => setCurrentSlide(prev => (prev + 1) % SLIDE_IMAGES.length)} aria-label="Proximo slide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 6 15 12 9 18" /></svg>
        </button>
        <div className={styles.heroContent}>
          <span className={styles.heroUrgencyBadge}>
            <span className={styles.urgencyDot} />
            Entrega em menos de 12 meses
          </span>
          <h1 className={styles.heroTitle}>
            Seu apartamento de <span className={styles.goldText}>alto padrao</span> a 430m do mar
          </h1>
          <p className={styles.heroSubtitle}>
            2 suites &middot; 86m&sup2; privativos &middot; 2 vagas &middot; Porto Belo, SC
          </p>
          <p className={styles.heroPricing}>
            Menos de <strong>R$ 1.000.000</strong> &middot; Parcele em ate 84x direto com a construtora
          </p>
          <button className={styles.heroCta} onClick={scrollToForm}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
            Quero saber mais
          </button>
        </div>
        <div className={styles.heroSliderDots}>
          {SLIDE_IMAGES.map((_, i) => (
            <button
              key={i}
              className={`${styles.heroDot} ${i === currentSlide ? styles.heroDotActive : ''}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ══════ URGENCY BAR (RED) ══════ */}
      <section className={styles.urgencyBar}>
        <div className={styles.urgencyBarText}>
          <span className={styles.urgencyBarIcon}>&#9200;</span>
          Receba seu imovel em menos de 12 meses — Obra avancada, poucas unidades restantes
          <span className={styles.urgencyBarIcon}>&#9200;</span>
        </div>
      </section>

      {/* ══════ STATS BAR ══════ */}
      <section className={styles.statsBar}>
        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <span className={styles.statValue}>86m&sup2;</span>
            <span className={styles.statLabel}>Area Privativa</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>2</span>
            <span className={styles.statLabel}>Suites</span>
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

      {/* ══════ PRIMEIRA DOBRA — VENDE A IDEIA ══════ */}
      <section id="sobre" data-animate className={sectionClass('sobre')}>
        <div className={styles.container}>
          <div className={styles.sellSection}>
            <div className={styles.sellText}>
              <span className={styles.sectionTag}>O Empreendimento</span>
              <h2 className={styles.sectionTitle}>
                Viva onde outros passam ferias — ou <span className={styles.goldText}>rentabilize com locacao de temporada</span>
              </h2>
              <p className={styles.sectionDesc}>
                Em uma das regioes que mais valoriza no litoral catarinense, este
                empreendimento oferece o equilibrio perfeito entre sofisticacao e
                proximidade com a natureza. A apenas 430 metros do mar, com obra ja
                avancada e entrega em menos de 12 meses.
              </p>
              <ul className={styles.featureList}>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Sacada privativa na suite master
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
                  Acabamento de alto padrao
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  +40% de valorizacao na regiao nos ultimos 3 anos
                </li>
              </ul>
              <button className={styles.sellCta} onClick={scrollToForm}>
                Quero garantir minha unidade
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
            </div>
            <div className={styles.sellImage}>
              <img src="/images/porto-belo/img-08.jpeg" alt="Living integrado do apartamento" loading="lazy" />
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
              <h2 className={styles.sectionTitle}>Conheca o empreendimento</h2>
              <p className={styles.sectionDesc}>
                Assista ao tour e veja de perto a qualidade dos acabamentos,
                a vista privilegiada e toda a infraestrutura de lazer que espera por voce.
              </p>
              <button className={styles.sellCta} onClick={scrollToForm}>
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
                  <img src="https://img.youtube.com/vi/yAfF5NXlTFo/hqdefault.jpg" alt="Tour do empreendimento" loading="lazy" decoding="async" />
                  <div className={styles.videoPlayBtn}>
                    <svg width="68" height="48" viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#D4AF37" /><path d="M45 24L27 14v20" fill="#fff" /></svg>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FORMULARIO EM ETAPAS (FINAL DA PAGINA) ══════ */}
      <section id="formulario" data-animate className={sectionClass('formulario')}>
        <div className={styles.container}>
          <div className={styles.formSection}>
            <div className={styles.formInfo}>
              <span className={styles.sectionTag}>Fale com um especialista</span>
              <h2 className={styles.sectionTitle}>
                Garanta sua unidade <span className={styles.goldText}>antes que acabe</span>
              </h2>
              <p className={styles.sectionDesc}>
                Preencha o formulario e um consultor especializado vai entrar em contato
                pelo WhatsApp com todas as condicoes, planta e simulacao de pagamento.
              </p>
              <div className={styles.formTrust}>
                <div className={styles.formTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  Seus dados estao protegidos
                </div>
                <div className={styles.formTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  Sem compromisso — atendimento consultivo
                </div>
                <div className={styles.formTrustItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  Resposta em ate 5 minutos
                </div>
              </div>
            </div>

            <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
              <h3 className={styles.formTitle}>Simule seu investimento</h3>
              <p className={styles.formSubtitle}>Etapa {formStep} de 3</p>

              {/* ── ETAPA 1: Interesse ── */}
              {formStep === 1 && (
                <>
                  <div className={styles.formField}>
                    <label className={styles.label}>Qual seu interesse?</label>
                    <select
                      className={`${styles.select} ${errors.interesse ? styles.inputError : ''} ${!formData.interesse ? styles.selectPlaceholder : ''}`}
                      value={formData.interesse}
                      onChange={(e) => updateField('interesse', e.target.value)}
                      onFocus={() => trackFieldFocus('interesse')}
                      onBlur={() => trackFieldBlur('interesse', !!formData.interesse)}
                    >
                      <option value="" disabled>Selecione</option>
                      {INTERESSES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    {errors.interesse && <span className={styles.error}>{errors.interesse}</span>}
                  </div>
                  <button type="button" className={styles.submitBtn} onClick={handleNextStep}>
                    Proximo
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 6 15 12 9 18" /></svg>
                  </button>
                </>
              )}

              {/* ── ETAPA 2: Fluxo de compra ── */}
              {formStep === 2 && (
                <>
                  <div className={styles.formField}>
                    <label className={styles.label}>Qual fluxo ideal de compra?</label>
                    <div className={styles.simCards}>
                      {FLUXOS_COMPRA.map(f => (
                        <div
                          key={f.value}
                          className={`${styles.simCard} ${formData.fluxoCompra === f.value ? styles.simCardActive : ''}`}
                          onClick={() => updateField('fluxoCompra', f.value)}
                        >
                          <span className={styles.simCardTitle}>{f.title}</span>
                          <span className={styles.simCardDesc}>{f.desc}</span>
                          <span className={styles.simCardExemplo}>{f.exemplo}</span>
                        </div>
                      ))}
                    </div>
                    {errors.fluxoCompra && <span className={styles.error}>{errors.fluxoCompra}</span>}
                  </div>
                  <div className={styles.formActions}>
                    <button type="button" className={styles.backBtn} onClick={() => setFormStep(1)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                      Voltar
                    </button>
                    <button type="button" className={styles.submitBtn} onClick={handleNextStep}>
                      Proximo
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 6 15 12 9 18" /></svg>
                    </button>
                  </div>
                </>
              )}

              {/* ── ETAPA 3: Nome + WhatsApp ── */}
              {formStep === 3 && (
                <>
                  <div className={styles.formField}>
                    <label className={styles.label}>Nome completo</label>
                    <input
                      type="text"
                      className={`${styles.input} ${errors.nome ? styles.inputError : ''}`}
                      value={formData.nome}
                      onChange={(e) => updateField('nome', e.target.value)}
                      onFocus={() => trackFieldFocus('nome')}
                      onBlur={() => trackFieldBlur('nome', !!formData.nome.trim())}
                      autoComplete="name"
                      placeholder="Seu nome"
                    />
                    {errors.nome && <span className={styles.error}>{errors.nome}</span>}
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.label}>WhatsApp</label>
                    <input
                      type="tel"
                      className={`${styles.input} ${errors.whatsapp ? styles.inputError : ''}`}
                      value={formData.whatsapp}
                      onChange={(e) => updateField('whatsapp', formatWhatsApp(e.target.value))}
                      onFocus={() => trackFieldFocus('whatsapp')}
                      onBlur={() => trackFieldBlur('whatsapp', formData.whatsapp.replace(/\D/g, '').length >= 10)}
                      autoComplete="tel"
                      placeholder="(00) 00000-0000"
                      inputMode="numeric"
                      maxLength={15}
                    />
                    {errors.whatsapp && <span className={styles.error}>{errors.whatsapp}</span>}
                  </div>
                  <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={(e) => updateField('website', e.target.value)} />
                  </div>
                  <div className={styles.formActions}>
                    <button type="button" className={styles.backBtn} onClick={() => setFormStep(2)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                      Voltar
                    </button>
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
                  </div>
                  <div className={styles.trustInline}>
                    <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> Dados protegidos</span>
                    <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg> Sem compromisso</span>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ══════ EXIT INTENT MODAL ══════ */}
      {showExitIntent && (
        <div className={styles.exitOverlay} onClick={() => setShowExitIntent(false)}>
          <div className={styles.exitModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.exitClose} onClick={() => setShowExitIntent(false)} aria-label="Fechar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <h3 className={styles.exitTitle}>Espere! Nao perca essa oportunidade</h3>
            <p className={styles.exitText}>
              Receba no seu WhatsApp a <strong>tabela de precos atualizada</strong> e
              as <strong>condicoes especiais</strong> de pagamento direto com a construtora.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Ola! Vim pelo site do Apartamento 2 Suites em Porto Belo/SC e gostaria de receber a tabela de precos.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.exitCta}
              onClick={() => { trackEvent('exit_intent_click', { page: 'lp_teste_publicos' }); setShowExitIntent(false) }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Receber tabela no WhatsApp
            </a>
            <span className={styles.exitSubtext}>Sem spam. Atendimento humano.</span>
          </div>
        </div>
      )}

      {/* ══════ FOOTER ══════ */}
      <footer className={styles.footer}>
        <img src="/HORIZONTAL BRANCO SEM FUNDO.png" alt="Daniel Krammes Imoveis" className={styles.footerLogo} />
        <p>Daniel Krammes Imoveis — CRECI 12345</p>
        <a href="/politica-de-privacidade" className={styles.footerLink}>Politica de Privacidade</a>
      </footer>

      {/* ══════ FLOATING WHATSAPP ══════ */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatingWhatsapp}
        aria-label="Falar pelo WhatsApp"
        onClick={() => trackEvent('whatsapp_float_click', { page: 'lp_teste_publicos' })}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </a>

      {/* ══════ MOBILE CTA ══════ */}
      <div className={styles.mobileCta}>
        <button onClick={scrollToForm}>Quero garantir minha unidade</button>
      </div>
    </div>
  )
}
