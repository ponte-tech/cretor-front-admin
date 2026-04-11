import { useState, useEffect } from 'react'
import Modal from '../Modal/Modal'
import Input from '../Input/Input'
import { gerarPropostaPDF } from '../../utils/gerarPropostaPDF'
import styles from './PropostaModal.module.css'

export interface FluxoRow {
  tipo: string
  qtdeParcelas: string
  valor: string
  dataVencimento: string
  valorTotal: string
}

export interface PropostaData {
  nomeCliente: string
  nomeCorretor: string
  empreendimento: string
  torre: string
  unidade: string
  entregaUnidade: string
  imobiliaria: string
  valorTabela: string
  fluxo: FluxoRow[]
  valorizacaoPercent: string
}

export type PropostaInitialData = Partial<PropostaData>

interface PropostaModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: PropostaInitialData
}

const emptyFluxoRow = (): FluxoRow => ({
  tipo: '',
  qtdeParcelas: '',
  valor: '',
  dataVencimento: '',
  valorTotal: '',
})

export default function PropostaModal({
  isOpen,
  onClose,
  initialData = {},
}: PropostaModalProps) {
  const buildInitialData = (): PropostaData => ({
    nomeCliente: initialData.nomeCliente || '',
    nomeCorretor: initialData.nomeCorretor || '',
    empreendimento: initialData.empreendimento || '',
    torre: initialData.torre || '',
    unidade: initialData.unidade || '',
    entregaUnidade: initialData.entregaUnidade || '',
    imobiliaria: initialData.imobiliaria || '',
    valorTabela: initialData.valorTabela || '',
    valorizacaoPercent: initialData.valorizacaoPercent || '100',
    fluxo: initialData.fluxo && initialData.fluxo.length > 0
      ? initialData.fluxo
      : [
          { ...emptyFluxoRow(), tipo: 'ATO' },
          { ...emptyFluxoRow(), tipo: 'Mensal' },
          { ...emptyFluxoRow(), tipo: 'Reforço Semestral' },
        ],
  })

  const [data, setData] = useState<PropostaData>(buildInitialData)

  useEffect(() => {
    if (isOpen) {
      setData(buildInitialData())
    }
  }, [isOpen])

  const updateField = (field: keyof PropostaData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const updateFluxoRow = (index: number, field: keyof FluxoRow, value: string) => {
    setData(prev => {
      const fluxo = [...prev.fluxo]
      fluxo[index] = { ...fluxo[index], [field]: value }
      return { ...prev, fluxo }
    })
  }

  const addFluxoRow = () => {
    setData(prev => ({ ...prev, fluxo: [...prev.fluxo, emptyFluxoRow()] }))
  }

  const removeFluxoRow = (index: number) => {
    setData(prev => ({
      ...prev,
      fluxo: prev.fluxo.filter((_, i) => i !== index),
    }))
  }

  const calcTotalProposto = () => {
    return data.fluxo.reduce((sum, row) => {
      const val = parseFloat(row.valorTotal.replace(/\D/g, '')) || 0
      return sum + val
    }, 0)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value)
  }

  const handleGerar = () => {
    gerarPropostaPDF(data)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gerar Proposta" size="xlarge">
      <div className={styles.form}>
        {/* Dados gerais */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Dados da Proposta</h3>
          <div className={styles.row}>
            <Input
              label="Nome do Cliente"
              value={data.nomeCliente}
              onChange={e => updateField('nomeCliente', e.target.value)}
            />
            <Input
              label="Nome do Corretor"
              value={data.nomeCorretor}
              onChange={e => updateField('nomeCorretor', e.target.value)}
            />
          </div>
        </div>

        {/* Empreendimento */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Empreendimento</h3>
          <div className={styles.row}>
            <Input
              label="Nome do Empreendimento"
              value={data.empreendimento}
              onChange={e => updateField('empreendimento', e.target.value)}
            />
            <Input
              label="Imobiliária"
              value={data.imobiliaria}
              onChange={e => updateField('imobiliaria', e.target.value)}
            />
          </div>
          <div className={styles.row3}>
            <Input
              label="Torre"
              value={data.torre}
              onChange={e => updateField('torre', e.target.value)}
            />
            <Input
              label="Unidade"
              value={data.unidade}
              onChange={e => updateField('unidade', e.target.value)}
            />
            <Input
              label="Entrega (ex: dezembro/2028)"
              value={data.entregaUnidade}
              onChange={e => updateField('entregaUnidade', e.target.value)}
            />
          </div>
        </div>

        {/* Fluxo */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Fluxo de Pagamento</h3>
          <div className={styles.row}>
            <Input
              label="Valor Tabela (R$)"
              value={data.valorTabela}
              onChange={e => updateField('valorTabela', e.target.value)}
              placeholder="12.646.084,00"
            />
            <Input
              label="Valorização até entrega (%)"
              value={data.valorizacaoPercent}
              onChange={e => updateField('valorizacaoPercent', e.target.value)}
              placeholder="100"
            />
          </div>

          <table className={styles.fluxoTable}>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Qtde Parcelas</th>
                <th>Valor (R$)</th>
                <th>Data Vencimento</th>
                <th>Valor Total (R$)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.fluxo.map((row, i) => (
                <tr key={i}>
                  <td>
                    <input
                      value={row.tipo}
                      onChange={e => updateFluxoRow(i, 'tipo', e.target.value)}
                      placeholder="ATO, Mensal..."
                    />
                  </td>
                  <td>
                    <input
                      value={row.qtdeParcelas}
                      onChange={e => updateFluxoRow(i, 'qtdeParcelas', e.target.value)}
                      placeholder="1"
                    />
                  </td>
                  <td>
                    <input
                      value={row.valor}
                      onChange={e => updateFluxoRow(i, 'valor', e.target.value)}
                      placeholder="1.800.000,00"
                    />
                  </td>
                  <td>
                    <input
                      value={row.dataVencimento}
                      onChange={e => updateFluxoRow(i, 'dataVencimento', e.target.value)}
                      placeholder="10/10/2024"
                    />
                  </td>
                  <td>
                    <input
                      value={row.valorTotal}
                      onChange={e => updateFluxoRow(i, 'valorTotal', e.target.value)}
                      placeholder="1.800.000,00"
                    />
                  </td>
                  <td>
                    <button
                      className={styles.removeRowButton}
                      onClick={() => removeFluxoRow(i)}
                      type="button"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className={styles.totalRow} colSpan={4}>TOTAL PROPOSTO</td>
                <td className={styles.totalRow}>{formatCurrency(calcTotalProposto() / 100)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>

          <button className={styles.addRowButton} onClick={addFluxoRow} type="button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Adicionar linha
          </button>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose} type="button">
            Cancelar
          </button>
          <button className={styles.generateButton} onClick={handleGerar} type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Gerar PDF
          </button>
        </div>
      </div>
    </Modal>
  )
}
