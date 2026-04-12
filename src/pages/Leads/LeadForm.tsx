import { useState } from 'react'
import Input from '../../components/Input/Input'
import Select from '../../components/Select/Select'
import Button from '../../components/Button/Button'
import { LeadResponse } from '../../services/api'

interface LeadFormProps {
  initialData?: LeadResponse
  onSave: (data: { nome: string; whatsapp: string; email: string; prazo: string; forma_pagamento: string; status: string }) => void
  onCancel: () => void
}

const PRAZOS = [
  { value: 'imediatamente', label: 'Imediatamente' },
  { value: 'ate-3-meses', label: 'Ate 3 meses' },
  { value: '3-a-6-meses', label: '3 a 6 meses' },
  { value: 'pesquisando', label: 'Apenas pesquisando' },
]

const FORMAS_PAGAMENTO = [
  { value: 'financiamento', label: 'Financiamento' },
  { value: 'a-vista', label: 'A vista' },
  { value: 'fgts-financiamento', label: 'FGTS + Financiamento' },
  { value: 'nao-decidi', label: 'Ainda nao decidi' },
]

const STATUS_OPTIONS = [
  { value: 'novo', label: 'Novo' },
  { value: 'contatado', label: 'Contatado' },
  { value: 'qualificado', label: 'Qualificado' },
  { value: 'convertido', label: 'Convertido' },
  { value: 'descartado', label: 'Descartado' },
]

export default function LeadForm({ initialData, onSave, onCancel }: LeadFormProps) {
  const [nome, setNome] = useState(initialData?.nome || '')
  const [whatsapp, setWhatsapp] = useState(initialData?.whatsapp || '')
  const [email, setEmail] = useState(initialData?.email || '')
  const [prazo, setPrazo] = useState(initialData?.prazo || '')
  const [formaPagamento, setFormaPagamento] = useState(initialData?.forma_pagamento || '')
  const [status, setStatus] = useState(initialData?.status || 'novo')

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 11)
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
  }

  const handleSubmit = () => {
    onSave({ nome, whatsapp, email, prazo, forma_pagamento: formaPagamento, status })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Input
        label="Nome completo"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Input
          label="WhatsApp"
          type="tel"
          value={whatsapp}
          onChange={e => setWhatsapp(formatWhatsApp(e.target.value))}
          placeholder="(11) 99999-9999"
          maxLength={15}
        />
        <Input
          label="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value.toLowerCase())}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Select
          label="Prazo de compra"
          options={PRAZOS}
          value={prazo}
          onChange={setPrazo}
        />
        <Select
          label="Forma de pagamento"
          options={FORMAS_PAGAMENTO}
          value={formaPagamento}
          onChange={setFormaPagamento}
        />
      </div>

      <Select
        label="Status"
        options={STATUS_OPTIONS}
        value={status}
        onChange={setStatus}
      />

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Salvar</Button>
      </div>
    </div>
  )
}
