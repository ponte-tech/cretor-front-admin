export interface Cliente {
  id: string
  // Dados Pessoais
  nome: string
  email: string
  telefone: string
  cpf: string
  dataNascimento: string
  sexo: 'masculino' | 'feminino'
  foto?: string

  // Perfil Demográfico
  estadoCivil: 'solteiro' | 'casado' | 'divorciado' | 'viuvo' | 'uniao_estavel'
  profissao: string
  rendaMensal: number
  patrimonio?: number

  // Composição Familiar
  temFilhos: boolean
  numeroFilhos?: number
  idadeFilhos?: string
  temPets: boolean
  tipoPets?: string

  // Preferências de Imóvel
  tipoImovel: ('apartamento' | 'casa' | 'cobertura' | 'terreno' | 'comercial')[]
  finalidade: 'morar' | 'investir' | 'alugar' | 'temporada'
  metragemMin: number
  metragemMax: number
  quartos: number
  banheiros: number
  vagas: number

  // Características Físicas do Imóvel
  preferenciaAndar?: 'terreo' | 'baixo' | 'medio' | 'alto' | 'cobertura' | 'indiferente'
  vistaDesejada?: ('cidade' | 'mar' | 'natureza' | 'rio' | 'montanha' | 'sem_preferencia')[]
  imovelNovo?: 'planta' | 'novo_pronto' | 'usado_5anos' | 'usado_qualquer' | 'indiferente'
  estadoConservacao?: 'pronto' | 'pequena_reforma' | 'reforma_completa'
  tipoAcabamento?: 'padrao' | 'alto_padrao' | 'luxo' | 'ultra_luxo'
  orientacaoSolar?: 'sol_manha' | 'sol_tarde' | 'muita_luz' | 'sem_preferencia'
  areaExternaPrivativa?: ('jardim' | 'quintal' | 'terraco' | 'varanda_grande' | 'nao_precisa')[]

  // Características Desejadas
  caracteristicas: string[] // piscina, churrasqueira, varanda, sacada, jardim, etc
  condominio: boolean
  condominioFechado: boolean

  // Necessidades Especiais
  necessitaAcessibilidade?: boolean
  tipoAcessibilidade?: ('rampa' | 'elevador_obrigatorio' | 'portas_largas' | 'banheiro_adaptado')[]
  mobilidadeReduzida?: 'idoso' | 'cadeirante' | 'temporario' | 'nao'
  temBebe?: boolean
  idadeBebe?: string
  necessitaDependencia?: 'com_banheiro' | 'simples' | 'nao'

  // Condomínio & Vizinhança
  tamanhoCondominioPreferido?: 'pequeno' | 'medio' | 'grande' | 'indiferente'
  importanciaAreaLazer?: 'essencial' | 'importante' | 'indiferente'
  perfilVizinhanca?: 'familias' | 'jovens' | 'aposentados' | 'misto' | 'sem_preferencia'
  toleranciaBarulho?: 'baixa' | 'media' | 'alta'
  restricoesCondominio?: string[]

  // Localização
  bairrosPreferidos: string[]
  cidadesPreferidas: string[]
  zonaPreferida?: 'norte' | 'sul' | 'leste' | 'oeste' | 'centro'

  // Trabalho & Mobilidade
  enderecoTrabalho?: string
  tempoDeslocamentoMax?: '15min' | '30min' | '45min' | '1h' | 'sem_restricao'
  modalTransporte?: 'carro' | 'transporte_publico' | 'a_pe' | 'bicicleta' | 'misto'
  jaMoraCidade?: boolean
  cidadeAtual?: string
  necessitaEscritorio?: boolean
  horarioTrabalho?: 'comercial' | 'noturno' | 'flexivel' | 'home_office_integral'

  // Pontos de Interesse Próximos
  pontosInteresse: {
    escolas: boolean
    universidades: boolean
    hospitais: boolean
    shoppings: boolean
    parques: boolean
    academias: boolean
    restaurantes: boolean
    supermercados: boolean
    transporte: boolean
    praia: boolean
    metro: boolean
  }

  // Orçamento
  orcamentoMin: number
  orcamentoMax: number
  formasPagamento: ('vista' | 'financiamento' | 'permuta' | 'consorcio')[]

  // Prioridades & Deal Breakers
  prioridades?: {
    localizacao: number // 1-5
    tamanho: number
    preco: number
    caracteristicas: number
    condominio: number
  }
  dealBreakers?: string[] // 'via_expressa', 'aeroporto', 'sem_elevador', etc
  mustHaves?: string[] // top 3 características obrigatórias

  // Flexibilidade Financeira
  possuiFGTS?: boolean
  valorFGTS?: number
  imovelEntrada?: boolean
  valorImovelEntrada?: number
  scoreCredito?: 'excelente' | 'bom' | 'regular' | 'nao_sabe'
  preferenciaParcelas?: 'entrada_grande' | 'entrada_menor'
  podeFiador?: boolean
  rendaComprometida?: 'ate_20' | 'ate_30' | 'ate_40'

  // Sustentabilidade & Tecnologia
  carroEletrico?: 'tem' | 'planeja' | 'nao'
  certificacaoSustentavel?: 'essencial' | 'importante' | 'indiferente'
  automacaoResidencial?: 'tem_quer_expandir' | 'quer_implementar' | 'indiferente'
  energiaSolar?: 'essencial' | 'desejavel' | 'indiferente'

  // Estilo de Vida
  trabalhaHome: boolean
  praticaEsportes: boolean
  gostaCozinhar: boolean
  recebeMuito: boolean
  viajaFrequente: boolean

  // Processo de Compra
  urgencia: 'baixa' | 'media' | 'alta'
  motivoCompra: string
  jaVisitouImoveis: boolean
  temImovelVenda: boolean

  // Timeline
  prazoMudanca?: 'imediato' | '1_3_meses' | '3_6_meses' | '6_12_meses' | 'flexivel'
  processoVenda?: 'vendeu' | 'anunciado' | 'vai_anunciar' | 'nao_tem'
  propostaFeita?: boolean
  motivoBusca?: 'upgrade' | 'mudanca_cidade' | 'casamento' | 'nascimento' | 'investimento' | 'aposentadoria' | 'separacao' | 'outro'

  // Comportamento de Compra
  imoveisVisitados?: '0' | '1_3' | '4_7' | '8_15' | 'mais_15'
  tempoProcurando?: 'menos_1mes' | '1_3_meses' | '3_6_meses' | '6_12_meses' | 'mais_1ano'
  principalProblema?: 'localizacao' | 'preco' | 'tamanho' | 'acabamento' | 'nenhum'
  nivelPesquisa?: 'sabe_exatamente' | 'ideia_geral' | 'explorando'
  envolveDecisao?: ('conjuge' | 'filhos' | 'pais' | 'socio' | 'sozinho')[]

  // Observações
  observacoes?: string

  // Metadata
  status: 'ativo' | 'inativo' | 'prospecto' | 'cliente'
  origem: 'site' | 'indicacao' | 'redes_sociais' | 'evento' | 'telefone' | 'outro'
  dataCadastro: string
  ultimaAtualizacao: string
  responsavel: string
}

export type ClienteFormData = Omit<Cliente, 'id' | 'dataCadastro' | 'ultimaAtualizacao'>
