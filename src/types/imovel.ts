export type TipoImovel = 'apartamento' | 'casa' | 'cobertura' | 'terreno' | 'comercial'
export type StatusImovel = 'disponivel' | 'reservado' | 'vendido' | 'em_construcao'

export interface Imovel {
  id: string
  tipo: TipoImovel
  titulo: string
  descricao: string
  endereco: string
  bairro: string
  cidade: string
  estado: string

  // Características
  quartos: number
  banheiros: number
  vagas: number
  areaTotal: number
  areaUtil: number
  andar?: number

  // Financeiro
  preco: number
  condominio?: number
  iptu?: number

  // Status
  status: StatusImovel
  disponibilidade: string

  // Características especiais
  caracteristicas: string[]

  // Mídia
  fotos: string[]
  videoUrl?: string
  tourVirtualUrl?: string

  // Dados adicionais
  anoConstucao?: number
  mobiliado?: boolean
  aceita_pets?: boolean

  createdAt: string
  updatedAt: string
}

export interface MatchScore {
  clienteId: string
  imovelId: string
  score: number // 0-100
  probabilidadeFechamento: 'baixa' | 'media' | 'alta' | 'muito_alta'
  motivos: {
    criterio: string
    match: boolean
    peso: number
  }[]
  ultimaAtualizacao: string
}

export interface ClienteImovelMatch {
  imovel: Imovel
  score: MatchScore
}
