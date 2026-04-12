import { useState, useEffect, FormEvent } from 'react'
import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'
import Button from '../../components/Button/Button'
import { leadsApi } from '../../services/api'
import { trackPageView, trackLead, trackEvent } from '../../services/analytics'
import { useFormTracking } from '../../hooks/useFormTracking'
import styles from './LeadCapturePage.module.css'

interface LeadFormData {
  nome: string
  whatsapp: string
  email: string
  prazo: string
  formaPagamento: string
  website: string  // honeypot
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
  { value: 'nao-decidi', label: 'Ainda não decidi' },
]

const FORM_FIELDS: (keyof LeadFormData)[] = ['nome', 'prazo', 'formaPagamento', 'whatsapp', 'email']

export default function LeadCapturePage() {
  const [formData, setFormData] = useState<LeadFormData>({
    nome: '',
    whatsapp: '',
    email: '',
    prazo: '',
    formaPagamento: '',
    website: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    trackPageView('lead_alto_padrao')
  }, [])

  const {
    trackFieldFocus,
    trackFieldBlur,
    trackSubmit,
    trackSubmitSuccess,
    trackSubmitError,
    trackValidationErrors,
  } = useFormTracking({ formName: 'lead_alto_padrao', fields: FORM_FIELDS })

  const updateField = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 11)
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
  }

  const formatEmail = (value: string) => {
    return value.toLowerCase().replace(/\s/g, '')
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {}

    if (!formData.nome.trim()) newErrors.nome = 'Precisamos do seu nome para te atender melhor'
    if (!formData.whatsapp.trim() || formData.whatsapp.replace(/\D/g, '').length < 10) {
      newErrors.whatsapp = 'Informe seu WhatsApp para contato imediato'
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Informe um e-mail válido para enviarmos os detalhes'
    }
    if (!formData.prazo) newErrors.prazo = 'Nos ajude a entender seu momento de compra'
    if (!formData.formaPagamento) newErrors.formaPagamento = 'Selecione a forma de pagamento desejada'

    setErrors(newErrors)
    const errorFields = Object.keys(newErrors) as (keyof LeadFormData)[]
    if (errorFields.length > 0) {
      trackValidationErrors(errorFields)
    }
    return errorFields.length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    trackSubmit()

    if (!validate()) return

    setIsSubmitting(true)

    try {
      await leadsApi.create({
        nome: formData.nome,
        whatsapp: formData.whatsapp,
        email: formData.email,
        prazo: formData.prazo,
        forma_pagamento: formData.formaPagamento,
        website: formData.website,
      })
      trackSubmitSuccess()
      trackLead({
        form_name: 'lead_alto_padrao',
        prazo: formData.prazo,
        forma_pagamento: formData.formaPagamento,
      })
      setIsSuccess(true)
    } catch (error) {
      console.error('Erro ao enviar lead:', error)
      trackSubmitError(error instanceof Error ? error.message : 'unknown')
      setErrors({ nome: 'Erro ao enviar. Tente novamente.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    const whatsappNumber = '5554991964993'
    const whatsappMessage = encodeURIComponent(
      `Ola! Sou ${formData.nome}, acabei de me cadastrar no site e gostaria de saber mais sobre os imoveis de alto padrao.`
    )

    trackPageView('lead_alto_padrao_sucesso')

    return (
      <div className={styles.page}>
        <div className={styles.successContainer}>
          <div className={styles.confettiWrapper}>
            <div className={styles.confetti} />
            <div className={styles.confetti} />
            <div className={styles.confetti} />
            <div className={styles.confetti} />
            <div className={styles.confetti} />
            <div className={styles.confetti} />
            <div className={styles.confetti} />
            <div className={styles.confetti} />
          </div>

          <div className={styles.successIcon}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>

          <div className={styles.successPulse} />

          <h2 className={styles.successTitle}>
            Parabens pela decisao, <span className={styles.successName}>{formData.nome.split(' ')[0]}</span>!
          </h2>

          <p className={styles.successText}>
            Voce deu o primeiro passo para encontrar o imovel dos seus sonhos.
            Nossa equipe de consultores especializados ja foi notificada e vai
            entrar em contato com voce <strong>o mais rapido possivel</strong> para
            dar continuidade ao seu atendimento exclusivo.
          </p>

          <div className={styles.successDivider} />

          <p className={styles.successSubtext}>
            Se preferir, voce tambem pode falar diretamente com um especialista agora mesmo:
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappButton}
            onClick={() => trackEvent('whatsapp_click', { form_name: 'lead_alto_padrao', lead_name: formData.nome })}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chamar no WhatsApp
          </a>

          <span className={styles.whatsappNumber}>+55 54 9196-4993</span>

          <div className={styles.successBadge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Seus dados estao protegidos
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header mínimo */}
        <div className={styles.header}>
          <img
            src="/HORIZONTAL BRANCO SEM FUNDO.png"
            alt="Logo"
            className={styles.logo}
            width="200"
            height="40"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
          <span className={styles.badge}>Venda Direto com a Construtora</span>
          <p className={styles.subtitle}>Preencha abaixo e um consultor entrará em contato pelo WhatsApp</p>
        </div>

        {/* Formulário direto */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.fieldGroup}>
            <Input
              label="Nome completo"
              type="text"
              value={formData.nome}
              onChange={e => updateField('nome', e.target.value)}
              onFocus={() => trackFieldFocus('nome')}
              onBlur={() => trackFieldBlur('nome', !!formData.nome.trim())}
              error={errors.nome}
              autoComplete="name"
            />

            <Select
              label="Pretende adquirir em quanto tempo?"
              options={PRAZOS}
              value={formData.prazo}
              onChange={value => updateField('prazo', value)}
              onFocus={() => trackFieldFocus('prazo')}
              onBlur={(hasValue) => trackFieldBlur('prazo', hasValue)}
              error={errors.prazo}
            />

            <Select
              label="Como pretende pagar?"
              options={FORMAS_PAGAMENTO}
              value={formData.formaPagamento}
              onChange={value => updateField('formaPagamento', value)}
              onFocus={() => trackFieldFocus('formaPagamento')}
              onBlur={(hasValue) => trackFieldBlur('formaPagamento', hasValue)}
              error={errors.formaPagamento}
            />

            <div className={styles.row}>
              <Input
                label="WhatsApp"
                type="tel"
                value={formData.whatsapp}
                onChange={e => updateField('whatsapp', formatWhatsApp(e.target.value))}
                onFocus={() => trackFieldFocus('whatsapp')}
                onBlur={() => trackFieldBlur('whatsapp', formData.whatsapp.replace(/\D/g, '').length >= 10)}
                error={errors.whatsapp}
                autoComplete="tel"
                placeholder="(11) 99999-9999"
                inputMode="numeric"
                maxLength={15}
              />
              <Input
                label="E-mail"
                type="email"
                value={formData.email}
                onChange={e => updateField('email', formatEmail(e.target.value))}
                onFocus={() => trackFieldFocus('email')}
                onBlur={() => trackFieldBlur('email', !!formData.email.trim())}
                error={errors.email}
                autoComplete="email"
                inputMode="email"
              />
            </div>
          </div>

          {/* Honeypot - invisible to humans, bots will fill it */}
          <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website}
              onChange={e => updateField('website', e.target.value)}
            />
          </div>

          <Button type="submit" variant="primary" fullWidth disabled={isSubmitting}>
            {isSubmitting ? (
              <span className={styles.loadingText}>
                <span className={styles.spinner} />
                Enviando...
              </span>
            ) : (
              <>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Falar com especialista agora
              </>
            )}
          </Button>

          <div className={styles.trust}>
            <span className={styles.trustItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Sem compromisso
            </span>
            <span className={styles.trustItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Resposta imediata
            </span>
            <span className={styles.trustItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Dados protegidos
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
