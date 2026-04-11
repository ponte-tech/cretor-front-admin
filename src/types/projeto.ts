export interface Projeto {
  id: string
  // Informações Básicas
  nome: string
  construtora: string
  status: 'lancamento' | 'em_construcao' | 'pronto' | 'entregue'
  tipoEmpreendimento: 'residencial' | 'comercial' | 'misto'

  // Localização
  endereco: string
  bairro: string
  cidade: string
  estado: string
  cep: string

  // Características do Projeto
  totalUnidades: number
  unidadesDisponiveis: number
  tiposUnidades: string[] // ['1 dorm', '2 dorm', '3 dorm', 'cobertura']
  areaPrivativaMin: number // m²
  areaPrivativaMax: number // m²
  vagasMin: number
  vagasMax: number

  // Valores
  precoMin: number
  precoMax: number
  entradaMinima: number
  aceitaFinanciamento: boolean

  // Prazos
  dataLancamento: string
  previsaoEntrega: string
  faseObra: 'fundacao' | 'estrutura' | 'acabamento' | 'pronto'
  percentualConcluido: number

  // Infraestrutura e Lazer
  areasLazer: string[] // ['piscina', 'academia', 'salao de festas', etc]
  seguranca: string[] // ['portaria 24h', 'cameras', 'cerca eletrica']
  sustentabilidade: string[] // ['energia solar', 'coleta seletiva', etc]

  // Descrição e Mídia
  descricao: string
  diferenciais: string[]
  logo?: string
  fotoDestaque: string
  fotos: string[]
  plantas: string[]

  // Gestão
  corretorResponsavel: string
  vendedores: string[]
  dataCadastro: string
  ultimaAtualizacao: string
}

export interface ProjetoMatchScore {
  clienteId: string
  projetoId: string
  score: number // 0-100
  probabilidadeFechamento: 'baixa' | 'media' | 'alta' | 'muito_alta'
  motivos: {
    criterio: string
    match: boolean
    peso: number
  }[]
  ultimaAtualizacao: string
}

export interface ClienteProjetoMatch {
  projeto: Projeto
  score: ProjetoMatchScore
}
