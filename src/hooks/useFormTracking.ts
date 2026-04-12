import { useEffect, useRef, useCallback } from 'react'
import { trackEvent } from '../services/analytics'

interface FormTrackingOptions {
  formName: string
  fields: string[]
}

/**
 * Eventos enviados ao GA4 (todos aparecem com nome descritivo):
 *
 * lead_pagina_carregou
 * lead_comecou_preencher
 * lead_clicou_nome / lead_clicou_whatsapp / lead_clicou_email / etc.
 * lead_preencheu_nome / lead_preencheu_prazo / etc.
 * lead_abandonou_nome / lead_abandonou_email / etc.
 * lead_progresso_20 / lead_progresso_40 / lead_progresso_60 / etc.
 * lead_clicou_enviar
 * lead_enviado_sucesso
 * lead_erro_envio
 * lead_erro_campo_nome / lead_erro_campo_email / etc.
 */
export function useFormTracking({ formName, fields }: FormTrackingOptions) {
  const startTime = useRef(Date.now())
  const hasStarted = useRef(false)
  const filledFields = useRef(new Set<string>())

  useEffect(() => {
    trackEvent('lead_pagina_carregou', { form_name: formName })
  }, [formName])

  const trackFieldFocus = useCallback(
    (fieldName: string) => {
      const elapsed = Date.now() - startTime.current

      if (!hasStarted.current) {
        hasStarted.current = true
        trackEvent('lead_comecou_preencher', {
          primeiro_campo: fieldName,
          tempo_ms: elapsed,
        })
      }

      trackEvent(`lead_clicou_${fieldName}`, {
        tempo_ms: elapsed,
        campos_preenchidos: filledFields.current.size,
      })
    },
    [formName],
  )

  const trackFieldBlur = useCallback(
    (fieldName: string, hasValue: boolean) => {
      if (hasValue) {
        filledFields.current.add(fieldName)

        trackEvent(`lead_preencheu_${fieldName}`, {
          campos_preenchidos: filledFields.current.size,
          total_campos: fields.length,
        })

        const pct = Math.round((filledFields.current.size / fields.length) * 100)
        trackEvent(`lead_progresso_${pct}`, {
          campos_ok: Array.from(filledFields.current).join(', '),
          campos_faltam: fields.filter((f) => !filledFields.current.has(f)).join(', '),
        })
      } else {
        trackEvent(`lead_abandonou_${fieldName}`, {
          tempo_ms: Date.now() - startTime.current,
        })
      }
    },
    [formName, fields],
  )

  const trackSubmit = useCallback(() => {
    trackEvent('lead_clicou_enviar', {
      tempo_total_ms: Date.now() - startTime.current,
      campos_preenchidos: filledFields.current.size,
      total_campos: fields.length,
    })
  }, [formName, fields])

  const trackSubmitSuccess = useCallback(() => {
    trackEvent('lead_enviado_sucesso', {
      tempo_total_ms: Date.now() - startTime.current,
    })
  }, [formName])

  const trackSubmitError = useCallback(
    (error: string) => {
      trackEvent('lead_erro_envio', {
        erro: error,
        tempo_ms: Date.now() - startTime.current,
      })
    },
    [formName],
  )

  const trackValidationErrors = useCallback(
    (errorFields: string[]) => {
      errorFields.forEach((field) => {
        trackEvent(`lead_erro_campo_${field}`)
      })
    },
    [formName],
  )

  return {
    trackFieldFocus,
    trackFieldBlur,
    trackSubmit,
    trackSubmitSuccess,
    trackSubmitError,
    trackValidationErrors,
  }
}
