import { Cliente } from '../types/cliente'

export const clientesMock: Cliente[] = [
  {
    id: '1',
    // Dados Pessoais
    nome: 'Carlos Eduardo Silva',
    email: 'carlos.silva@email.com',
    telefone: '(11) 99999-0001',
    cpf: '123.456.789-00',
    dataNascimento: '1978-05-15',
    sexo: 'masculino',
    foto: '/avatares/man/12.png',

    // Perfil Demográfico
    estadoCivil: 'casado',
    profissao: 'Empresário',
    rendaMensal: 85000,
    patrimonio: 15000000,

    // Composição Familiar
    temFilhos: true,
    numeroFilhos: 2,
    idadeFilhos: '8 e 12 anos',
    temPets: true,
    tipoPets: '1 Golden Retriever',

    // Preferências de Imóvel
    tipoImovel: ['apartamento', 'cobertura'],
    finalidade: 'morar',
    metragemMin: 250,
    metragemMax: 400,
    quartos: 4,
    banheiros: 4,
    vagas: 3,

    // Características Desejadas
    caracteristicas: [
      'piscina',
      'churrasqueira',
      'varanda gourmet',
      'vista panorâmica',
      'automação residencial',
      'closet',
      'lavabo'
    ],
    condominio: true,
    condominioFechado: true,

    // Características Físicas
    preferenciaAndar: 'alto',
    vistaDesejada: ['cidade', 'natureza'],
    imovelNovo: 'novo_pronto',
    estadoConservacao: 'pronto',
    tipoAcabamento: 'alto_padrao',
    orientacaoSolar: 'muita_luz',
    areaExternaPrivativa: ['varanda_grande'],

    // Necessidades Especiais
    necessitaAcessibilidade: false,
    mobilidadeReduzida: 'nao',
    temBebe: false,
    necessitaDependencia: 'com_banheiro',

    // Condomínio & Vizinhança
    tamanhoCondominioPreferido: 'medio',
    importanciaAreaLazer: 'importante',
    perfilVizinhanca: 'familias',
    toleranciaBarulho: 'baixa',
    restricoesCondominio: ['Permite pets grande porte'],

    // Localização
    bairrosPreferidos: ['Jardins', 'Itaim Bibi', 'Vila Olímpia'],
    cidadesPreferidas: ['São Paulo'],
    zonaPreferida: 'oeste',

    // Trabalho & Mobilidade
    enderecoTrabalho: 'Av. Brigadeiro Faria Lima, 3900 - Itaim Bibi',
    tempoDeslocamentoMax: '30min',
    modalTransporte: 'carro',
    jaMoraCidade: false,
    cidadeAtual: 'Rio de Janeiro',
    necessitaEscritorio: true,
    horarioTrabalho: 'flexivel',

    // Pontos de Interesse
    pontosInteresse: {
      escolas: true,
      universidades: false,
      hospitais: true,
      shoppings: true,
      parques: true,
      academias: true,
      restaurantes: true,
      supermercados: true,
      transporte: true,
      praia: false,
      metro: false
    },

    // Orçamento
    orcamentoMin: 3500000,
    orcamentoMax: 5000000,
    formasPagamento: ['vista', 'financiamento'],

    // Prioridades & Deal Breakers
    prioridades: {
      localizacao: 1,
      tamanho: 2,
      preco: 3,
      caracteristicas: 4,
      condominio: 5
    },
    dealBreakers: ['Via expressa próxima', 'Sem elevador', 'Prédio sem portaria 24h'],
    mustHaves: ['Varanda gourmet', 'Home office', 'Vista livre'],

    // Flexibilidade Financeira
    possuiFGTS: false,
    imovelEntrada: true,
    valorImovelEntrada: 2000000,
    scoreCredito: 'excelente',
    preferenciaParcelas: 'entrada_grande',
    podeFiador: false,
    rendaComprometida: 'ate_30',

    // Sustentabilidade & Tecnologia
    carroEletrico: 'planeja',
    certificacaoSustentavel: 'importante',
    automacaoResidencial: 'tem_quer_expandir',
    energiaSolar: 'desejavel',

    // Estilo de Vida
    trabalhaHome: false,
    praticaEsportes: true,
    gostaCozinhar: false,
    recebeMuito: true,
    viajaFrequente: true,

    // Processo de Compra
    urgencia: 'media',
    motivoCompra: 'Mudança de cidade por trabalho',
    jaVisitouImoveis: true,
    temImovelVenda: true,

    // Timeline
    prazoMudanca: '3_6_meses',
    processoVenda: 'vai_anunciar',
    propostaFeita: false,
    motivoBusca: 'mudanca_cidade',

    // Comportamento de Compra
    imoveisVisitados: '4_7',
    tempoProcurando: '1_3_meses',
    principalProblema: 'localizacao',
    nivelPesquisa: 'ideia_geral',
    envolveDecisao: ['conjuge', 'filhos'],

    // Observações
    observacoes: 'Cliente interessado em imóveis de alto padrão com boa localização. Valoriza segurança e infraestrutura completa.',

    // Metadata
    status: 'cliente',
    origem: 'indicacao',
    dataCadastro: '2024-01-15',
    ultimaAtualizacao: '2024-02-10',
    responsavel: 'Ana Paula Costa'
  },
  {
    id: '2',
    nome: 'Marina Fernandes',
    email: 'marina.fernandes@email.com',
    telefone: '(21) 99999-0002',
    cpf: '234.567.890-11',
    dataNascimento: '1985-09-22',
    sexo: 'feminino',
    foto: '/avatares/woman/25.png',

    estadoCivil: 'solteiro',
    profissao: 'Médica',
    rendaMensal: 45000,
    patrimonio: 3500000,

    temFilhos: false,
    temPets: true,
    tipoPets: '2 gatos',

    tipoImovel: ['apartamento'],
    finalidade: 'morar',
    metragemMin: 120,
    metragemMax: 180,
    quartos: 2,
    banheiros: 2,
    vagas: 2,

    caracteristicas: [
      'varanda',
      'vista mar',
      'iluminação natural',
      'home office',
      'área de serviço'
    ],
    condominio: true,
    condominioFechado: true,

    bairrosPreferidos: ['Leblon', 'Ipanema', 'Barra da Tijuca'],
    cidadesPreferidas: ['Rio de Janeiro'],
    zonaPreferida: 'sul',

    pontosInteresse: {
      escolas: false,
      universidades: false,
      hospitais: true,
      shoppings: true,
      parques: true,
      academias: true,
      restaurantes: true,
      supermercados: true,
      transporte: false,
      praia: true,
      metro: false
    },

    orcamentoMin: 1800000,
    orcamentoMax: 2500000,
    formasPagamento: ['vista', 'financiamento'],

    trabalhaHome: true,
    praticaEsportes: true,
    gostaCozinhar: true,
    recebeMuito: false,
    viajaFrequente: false,

    urgencia: 'alta',
    motivoCompra: 'Saindo do aluguel',
    jaVisitouImoveis: true,
    temImovelVenda: false,

    observacoes: 'Cliente valoriza qualidade de vida e proximidade com a praia. Trabalha home office e precisa de espaço adequado.',

    status: 'ativo',
    origem: 'site',
    dataCadastro: '2024-02-01',
    ultimaAtualizacao: '2024-02-15',
    responsavel: 'Roberto Alves'
  },
  {
    id: '3',
    nome: 'Roberto & Juliana Martins',
    email: 'roberto.martins@email.com',
    telefone: '(47) 99999-0003',
    cpf: '345.678.901-22',
    dataNascimento: '1982-03-10',
    sexo: 'masculino',
    foto: '/avatares/man/33.png',

    estadoCivil: 'casado',
    profissao: 'Advogado',
    rendaMensal: 95000,
    patrimonio: 8000000,

    temFilhos: true,
    numeroFilhos: 3,
    idadeFilhos: '5, 7 e 10 anos',
    temPets: true,
    tipoPets: '1 Labrador',

    tipoImovel: ['casa'],
    finalidade: 'morar',
    metragemMin: 400,
    metragemMax: 600,
    quartos: 5,
    banheiros: 5,
    vagas: 4,

    caracteristicas: [
      'piscina',
      'churrasqueira',
      'jardim amplo',
      'área gourmet',
      'playground',
      'home theater',
      'academia',
      'piscina aquecida',
      'sauna'
    ],
    condominio: true,
    condominioFechado: true,

    bairrosPreferidos: ['Jurerê Internacional', 'Cachoeira do Bom Jesus'],
    cidadesPreferidas: ['Florianópolis'],
    zonaPreferida: 'norte',

    pontosInteresse: {
      escolas: true,
      universidades: false,
      hospitais: true,
      shoppings: true,
      parques: true,
      academias: false,
      restaurantes: true,
      supermercados: true,
      transporte: false,
      praia: true,
      metro: false
    },

    orcamentoMin: 5000000,
    orcamentoMax: 8000000,
    formasPagamento: ['vista'],

    trabalhaHome: true,
    praticaEsportes: true,
    gostaCozinhar: false,
    recebeMuito: true,
    viajaFrequente: true,

    urgencia: 'baixa',
    motivoCompra: 'Investimento e moradia de férias',
    jaVisitouImoveis: false,
    temImovelVenda: false,

    observacoes: 'Família grande busca casa espaçosa em condomínio de alto padrão. Priorizam segurança e área de lazer completa.',

    status: 'prospecto',
    origem: 'evento',
    dataCadastro: '2024-01-20',
    ultimaAtualizacao: '2024-02-08',
    responsavel: 'Carla Souza'
  },
  {
    id: '4',
    nome: 'Patricia Oliveira',
    email: 'patricia.oliveira@email.com',
    telefone: '(11) 99999-0004',
    cpf: '456.789.012-33',
    dataNascimento: '1990-11-05',
    sexo: 'feminino',
    foto: '/avatares/woman/38.png',

    estadoCivil: 'divorciado',
    profissao: 'Arquiteta',
    rendaMensal: 35000,
    patrimonio: 2000000,

    temFilhos: true,
    numeroFilhos: 1,
    idadeFilhos: '6 anos',
    temPets: false,

    tipoImovel: ['apartamento'],
    finalidade: 'morar',
    metragemMin: 100,
    metragemMax: 150,
    quartos: 3,
    banheiros: 2,
    vagas: 2,

    caracteristicas: [
      'sacada',
      'cozinha americana',
      'armários planejados',
      'iluminação natural',
      'acabamento de luxo'
    ],
    condominio: true,
    condominioFechado: false,

    bairrosPreferidos: ['Pinheiros', 'Vila Madalena', 'Perdizes'],
    cidadesPreferidas: ['São Paulo'],
    zonaPreferida: 'oeste',

    pontosInteresse: {
      escolas: true,
      universidades: false,
      hospitais: true,
      shoppings: true,
      parques: true,
      academias: true,
      restaurantes: true,
      supermercados: true,
      transporte: true,
      praia: false,
      metro: true
    },

    orcamentoMin: 900000,
    orcamentoMax: 1500000,
    formasPagamento: ['financiamento'],

    trabalhaHome: true,
    praticaEsportes: true,
    gostaCozinhar: true,
    recebeMuito: false,
    viajaFrequente: false,

    urgencia: 'alta',
    motivoCompra: 'Primeiro imóvel próprio',
    jaVisitouImoveis: true,
    temImovelVenda: false,

    observacoes: 'Cliente com excelente senso estético, valoriza design e funcionalidade. Mãe solo, prioriza proximidade com escola.',

    status: 'ativo',
    origem: 'redes_sociais',
    dataCadastro: '2024-02-05',
    ultimaAtualizacao: '2024-02-14',
    responsavel: 'Ana Paula Costa'
  },
  {
    id: '5',
    nome: 'André Luiz Santos',
    email: 'andre.santos@email.com',
    telefone: '(11) 99999-0005',
    cpf: '567.890.123-44',
    dataNascimento: '1975-07-20',
    sexo: 'masculino',
    foto: '/avatares/man/54.png',

    estadoCivil: 'viuvo',
    profissao: 'Investidor',
    rendaMensal: 150000,
    patrimonio: 35000000,

    temFilhos: true,
    numeroFilhos: 2,
    idadeFilhos: '22 e 25 anos',
    temPets: false,

    tipoImovel: ['cobertura', 'apartamento'],
    finalidade: 'investir',
    metragemMin: 200,
    metragemMax: 500,
    quartos: 3,
    banheiros: 3,
    vagas: 3,

    caracteristicas: [
      'vista panorâmica',
      'pé direito alto',
      'acabamento premium',
      'automação total',
      'adega climatizada',
      'terraço privativo'
    ],
    condominio: true,
    condominioFechado: true,

    bairrosPreferidos: ['Moema', 'Brooklin', 'Vila Nova Conceição'],
    cidadesPreferidas: ['São Paulo'],
    zonaPreferida: 'sul',

    pontosInteresse: {
      escolas: false,
      universidades: false,
      hospitais: true,
      shoppings: true,
      parques: false,
      academias: false,
      restaurantes: true,
      supermercados: false,
      transporte: false,
      praia: false,
      metro: false
    },

    orcamentoMin: 4000000,
    orcamentoMax: 10000000,
    formasPagamento: ['vista'],

    trabalhaHome: false,
    praticaEsportes: false,
    gostaCozinhar: false,
    recebeMuito: false,
    viajaFrequente: true,

    urgencia: 'baixa',
    motivoCompra: 'Investimento imobiliário',
    jaVisitouImoveis: false,
    temImovelVenda: false,

    observacoes: 'Investidor experiente buscando imóveis de alto padrão para rentabilidade. Prioriza localização e valorização.',

    status: 'prospecto',
    origem: 'indicacao',
    dataCadastro: '2024-01-10',
    ultimaAtualizacao: '2024-01-28',
    responsavel: 'Roberto Alves'
  },
  {
    id: '6',
    nome: 'Fernanda Costa',
    email: 'fernanda.costa@email.com',
    telefone: '(11) 99999-0006',
    cpf: '678.901.234-55',
    dataNascimento: '1988-12-18',
    sexo: 'feminino',
    foto: '/avatares/woman/44.png',

    estadoCivil: 'casado',
    profissao: 'Dentista',
    rendaMensal: 52000,
    patrimonio: 4500000,

    temFilhos: true,
    numeroFilhos: 1,
    idadeFilhos: '3 anos',
    temPets: true,
    tipoPets: '1 Yorkshire',

    tipoImovel: ['apartamento'],
    finalidade: 'morar',
    metragemMin: 150,
    metragemMax: 200,
    quartos: 3,
    banheiros: 3,
    vagas: 2,

    caracteristicas: ['varanda', 'área de serviço', 'playground', 'brinquedoteca', 'pet place'],
    condominio: true,
    condominioFechado: true,

    bairrosPreferidos: ['Moema', 'Campo Belo', 'Brooklin'],
    cidadesPreferidas: ['São Paulo'],
    zonaPreferida: 'sul',

    pontosInteresse: {
      escolas: true,
      universidades: false,
      hospitais: true,
      shoppings: true,
      parques: true,
      academias: false,
      restaurantes: true,
      supermercados: true,
      transporte: false,
      praia: false,
      metro: true
    },

    orcamentoMin: 1500000,
    orcamentoMax: 2200000,
    formasPagamento: ['financiamento', 'permuta'],

    trabalhaHome: false,
    praticaEsportes: true,
    gostaCozinhar: true,
    recebeMuito: false,
    viajaFrequente: false,

    urgencia: 'alta',
    motivoCompra: 'Crescimento da família',
    jaVisitouImoveis: true,
    temImovelVenda: true,

    observacoes: 'Cliente necessita de local próximo a escolas. Tem imóvel atual para permuta no valor de R$ 800.000.',

    status: 'ativo',
    origem: 'site',
    dataCadastro: '2024-02-12',
    ultimaAtualizacao: '2024-02-18',
    responsavel: 'Ana Paula Costa'
  },
  {
    id: '7',
    nome: 'Lucas Mendes',
    email: 'lucas.mendes@email.com',
    telefone: '(11) 99999-0007',
    cpf: '789.012.345-66',
    dataNascimento: '1992-06-25',
    sexo: 'masculino',
    foto: '/avatares/man/43.png',

    estadoCivil: 'solteiro',
    profissao: 'Engenheiro de Software',
    rendaMensal: 38000,
    patrimonio: 1200000,

    temFilhos: false,
    temPets: true,
    tipoPets: '1 Border Collie',

    tipoImovel: ['apartamento'],
    finalidade: 'morar',
    metragemMin: 80,
    metragemMax: 120,
    quartos: 2,
    banheiros: 2,
    vagas: 1,

    caracteristicas: ['home office', 'varanda', 'churrasqueira', 'academia no condomínio'],
    condominio: true,
    condominioFechado: false,

    bairrosPreferidos: ['Vila Madalena', 'Pinheiros', 'Sumaré'],
    cidadesPreferidas: ['São Paulo'],
    zonaPreferida: 'oeste',

    pontosInteresse: {
      escolas: false,
      universidades: false,
      hospitais: false,
      shoppings: false,
      parques: true,
      academias: true,
      restaurantes: true,
      supermercados: true,
      transporte: true,
      praia: false,
      metro: true
    },

    orcamentoMin: 650000,
    orcamentoMax: 950000,
    formasPagamento: ['financiamento', 'vista'],

    trabalhaHome: true,
    praticaEsportes: true,
    gostaCozinhar: false,
    recebeMuito: true,
    viajaFrequente: false,

    urgencia: 'media',
    motivoCompra: 'Independência familiar',
    jaVisitouImoveis: false,
    temImovelVenda: false,

    observacoes: 'Perfil jovem, valoriza mobilidade urbana e vida social no bairro.',

    status: 'prospecto',
    origem: 'redes_sociais',
    dataCadastro: '2024-02-16',
    ultimaAtualizacao: '2024-02-19',
    responsavel: 'Carla Souza'
  },
  {
    id: '8',
    nome: 'Beatriz Almeida',
    email: 'beatriz.almeida@email.com',
    telefone: '(21) 99999-0008',
    cpf: '890.123.456-77',
    dataNascimento: '1980-04-08',
    sexo: 'feminino',
    foto: '/avatares/woman/56.png',

    estadoCivil: 'divorciado',
    profissao: 'Diretora de Marketing',
    rendaMensal: 72000,
    patrimonio: 9500000,

    temFilhos: true,
    numeroFilhos: 2,
    idadeFilhos: '14 e 16 anos',
    temPets: false,

    tipoImovel: ['cobertura', 'apartamento'],
    finalidade: 'morar',
    metragemMin: 200,
    metragemMax: 350,
    quartos: 4,
    banheiros: 4,
    vagas: 3,

    caracteristicas: ['vista mar', 'terraço', 'piscina privativa', 'spa', 'home theater', 'adega'],
    condominio: true,
    condominioFechado: true,

    bairrosPreferidos: ['Leblon', 'Ipanema', 'Copacabana'],
    cidadesPreferidas: ['Rio de Janeiro'],
    zonaPreferida: 'sul',

    pontosInteresse: {
      escolas: true,
      universidades: false,
      hospitais: true,
      shoppings: true,
      parques: false,
      academias: true,
      restaurantes: true,
      supermercados: true,
      transporte: false,
      praia: true,
      metro: false
    },

    orcamentoMin: 6000000,
    orcamentoMax: 10000000,
    formasPagamento: ['vista'],

    trabalhaHome: false,
    praticaEsportes: true,
    gostaCozinhar: false,
    recebeMuito: true,
    viajaFrequente: true,

    urgencia: 'baixa',
    motivoCompra: 'Upgrade de qualidade de vida',
    jaVisitouImoveis: true,
    temImovelVenda: false,

    observacoes: 'Cliente exigente, busca exclusividade e requinte. Filhos em idade escolar.',

    status: 'cliente',
    origem: 'indicacao',
    dataCadastro: '2024-01-05',
    ultimaAtualizacao: '2024-02-20',
    responsavel: 'Roberto Alves'
  }
]
