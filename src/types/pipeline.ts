export type EtapaPipeline =
  | 'primeiro_contato'
  | 'qualificado'
  | 'visita_agendada'
  | 'proposta_enviada'
  | 'negociacao'
  | 'fechado'
  | 'perdido'

export type PrioridadeNegocio = 'baixa' | 'media' | 'alta' | 'urgente'

export interface NegocioPipeline {
  id: string
  clienteId: string
  clienteNome: string
  clienteFoto?: string
  clienteEmail: string
  clienteTelefone: string

  // Lead info
  leadPrazo?: string
  leadFormaPagamento?: string

  // Imóvel de Interesse
  imovelId: string
  imovelTitulo: string
  imovelFoto?: string
  imovelEndereco: string

  // Status do Negócio
  etapa: EtapaPipeline
  prioridade: PrioridadeNegocio
  valorNegocio: number
  probabilidadeFechamento: number // 0-100

  // Datas e Tempo
  dataCriacao: string
  dataUltimaInteracao: string
  dataMovimentacao: string // Quando mudou de etapa pela última vez
  diasNaEtapa: number

  // Interações
  proximaAcao?: string
  dataProximaAcao?: string
  ultimaAnotacao?: string

  // Responsável
  corretorResponsavel: string

  // Tags
  tags: string[]

  // Motivo (se perdido)
  motivoPerda?: string
}

export interface EtapaConfig {
  id: EtapaPipeline
  nome: string
  cor: string
  icone: JSX.Element
  ordem: number
}
