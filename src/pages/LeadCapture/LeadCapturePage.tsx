import { useState, FormEvent } from 'react'
import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'
import Button from '../../components/Button/Button'
import styles from './LeadCapturePage.module.css'

interface LeadFormData {
  nome: string
  whatsapp: string
  email: string
  prazo: string
  formaPagamento: string
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

export default function LeadCapturePage() {
  const [formData, setFormData] = useState<LeadFormData>({
    nome: '',
    whatsapp: '',
    email: '',
    prazo: '',
    formaPagamento: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // Simula envio - substituir pela integração real
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className={styles.page}>
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h2 className={styles.successTitle}>Interesse registrado com sucesso!</h2>
          <p className={styles.successText}>
            Obrigado, <strong>{formData.nome.split(' ')[0]}</strong>! Um de nossos consultores
            especializados entrará em contato pelo WhatsApp em instantes com
            condições exclusivas para você.
          </p>
          <div className={styles.successBadge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            Fique atento ao seu WhatsApp
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
            fetchPriority="high"
          />
          <span className={styles.badge}>Condições Exclusivas</span>
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
              error={errors.nome}
              autoComplete="name"
            />

            <Select
              label="Pretende adquirir em quanto tempo?"
              options={PRAZOS}
              value={formData.prazo}
              onChange={value => updateField('prazo', value)}
              error={errors.prazo}
            />

            <Select
              label="Como pretende pagar?"
              options={FORMAS_PAGAMENTO}
              value={formData.formaPagamento}
              onChange={value => updateField('formaPagamento', value)}
              error={errors.formaPagamento}
            />

            <div className={styles.row}>
              <Input
                label="WhatsApp"
                type="tel"
                value={formData.whatsapp}
                onChange={e => updateField('whatsapp', formatWhatsApp(e.target.value))}
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
                error={errors.email}
                autoComplete="email"
                inputMode="email"
              />
            </div>
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
