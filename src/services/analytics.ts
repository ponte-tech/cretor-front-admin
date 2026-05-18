/**
 * Analytics Service
 *
 * Centraliza GA4, Meta Pixel e eventos customizados.
 * Substitua os IDs abaixo quando tiver as contas criadas:
 *
 * GA4:        VITE_GA4_ID=G-XXXXXXXXXX
 * Meta Pixel: VITE_META_PIXEL_ID=123456789
 */

const GA4_ID = import.meta.env.VITE_GA4_ID || ''
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || ''
const GADS_ID = 'AW-18133412978'
const GADS_CONVERSION_LABEL = 'AW-18133412978/35EsCNerqqgcEPLY18ZD'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
    fbq: (...args: unknown[]) => void
    _fbq: unknown
  }
}

// ── GA4 ──

function initGA4() {
  if (!GA4_ID) return

  // Inicializa dataLayer e gtag ANTES de carregar o script
  window.dataLayer = window.dataLayer || []

  // Usa Function para preservar o objeto `arguments` que o gtag precisa
  // eslint-disable-next-line no-new-func
  window.gtag = new Function('window.dataLayer.push(arguments)') as typeof window.gtag

  window.gtag('js', new Date())
  window.gtag('config', GA4_ID)
  window.gtag('config', GADS_ID)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
  document.head.appendChild(script)
}

function ga4Event(name: string, params?: Record<string, unknown>) {
  if (!GA4_ID || !window.gtag) return
  window.gtag('event', name, params)
}

// ── Meta Pixel ──

function initMetaPixel() {
  if (!META_PIXEL_ID) return

  /* eslint-disable */
  ;(function (f: Window, b: Document, e: string, v: string) {
    if (f.fbq) return
    const n: any = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    })
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
    const t = b.createElement(e) as HTMLScriptElement
    t.async = true
    t.src = v
    const s = b.getElementsByTagName(e)[0]
    s.parentNode!.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  /* eslint-enable */

  window.fbq('init', META_PIXEL_ID)
}

function metaEvent(name: string, params?: Record<string, unknown>) {
  if (!META_PIXEL_ID || !window.fbq) return
  window.fbq('track', name, params)
}

function metaCustomEvent(name: string, params?: Record<string, unknown>) {
  if (!META_PIXEL_ID || !window.fbq) return
  window.fbq('trackCustom', name, params)
}

// ── API pública ──

export function initAnalytics() {
  initGA4()
  initMetaPixel()
}

export function trackPageView(page: string) {
  ga4Event('page_view', { page_title: page, page_location: window.location.href })
  metaEvent('PageView')
}

export function trackViewContent(params?: Record<string, unknown>) {
  ga4Event('view_item', params)
  metaEvent('ViewContent', params)
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  ga4Event(name, params)
  metaCustomEvent(name, params)
}

export function trackLead(params?: Record<string, unknown>) {
  ga4Event('generate_lead', params)

  // Google Ads conversion
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: GADS_CONVERSION_LABEL,
      value: 1000000,
      currency: 'BRL',
    })
  }

  // Use event_id for deduplication with CAPI server-side events
  const eventId = params?.event_id as string | undefined
  const metaParams = { ...params }
  delete metaParams.event_id

  if (eventId && META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'Lead', metaParams, { eventID: eventId })
  } else {
    metaEvent('Lead', metaParams)
  }
}
