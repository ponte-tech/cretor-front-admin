import { Projeto, ClienteProjetoMatch, ProjetoMatchScore } from '../types/projeto'

export const projetosMock: Projeto[] = [
  {
    id: '1',
    nome: 'Residencial Parque das Flores',
    construtora: 'Construtora Horizonte',
    status: 'em_construcao',
    tipoEmpreendimento: 'residencial',
    endereco: 'Av. das Américas, 5000',
    bairro: 'Barra da Tijuca',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    cep: '22640-102',
    totalUnidades: 240,
    unidadesDisponiveis: 87,
    tiposUnidades: ['2 dormitórios', '3 dormitórios', 'Cobertura Duplex'],
    areaPrivativaMin: 68,
    areaPrivativaMax: 185,
    vagasMin: 1,
    vagasMax: 3,
    precoMin: 580000,
    precoMax: 1850000,
    entradaMinima: 58000,
    aceitaFinanciamento: true,
    dataLancamento: '2023-06-15',
    previsaoEntrega: '2025-12-30',
    faseObra: 'estrutura',
    percentualConcluido: 45,
    areasLazer: [
      'Piscina adulto e infantil',
      'Academia completa',
      'Salão de festas',
      'Churrasqueira',
      'Playground',
      'Quadra poliesportiva',
      'Espaço pet'
    ],
    seguranca: ['Portaria 24h', 'Câmeras de segurança', 'Cerca elétrica', 'Controle de acesso'],
    sustentabilidade: ['Energia solar', 'Coleta seletiva', 'Reuso de água da chuva', 'Áreas verdes'],
    descricao: 'Empreendimento completo com excelente infraestrutura de lazer e segurança, localizado em um dos bairros mais valorizados do Rio de Janeiro.',
    diferenciais: [
      'Vista para o mar em alguns apartamentos',
      'Acabamento de alto padrão',
      'Localização privilegiada',
      'Próximo a shoppings e escolas'
    ],
    logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200',
    fotoDestaque: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    fotos: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    plantas: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800'
    ],
    corretorResponsavel: 'Rafael Santos',
    vendedores: ['Ana Paula Lima', 'Roberto Mendes', 'Patricia Alves'],
    dataCadastro: '2023-05-10',
    ultimaAtualizacao: '2024-03-20'
  },
  {
    id: '2',
    nome: 'Sky Business Center',
    construtora: 'Engenharia Moderna Ltda',
    status: 'lancamento',
    tipoEmpreendimento: 'comercial',
    endereco: 'Av. Paulista, 2300',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01310-300',
    totalUnidades: 180,
    unidadesDisponiveis: 180,
    tiposUnidades: ['Sala 40m²', 'Sala 60m²', 'Sala 100m²', 'Andar corporativo 500m²'],
    areaPrivativaMin: 40,
    areaPrivativaMax: 500,
    vagasMin: 1,
    vagasMax: 8,
    precoMin: 450000,
    precoMax: 5500000,
    entradaMinima: 90000,
    aceitaFinanciamento: true,
    dataLancamento: '2024-04-01',
    previsaoEntrega: '2026-06-30',
    faseObra: 'fundacao',
    percentualConcluido: 15,
    areasLazer: [
      'Auditório',
      'Salas de reunião',
      'Copa gourmet',
      'Terraço',
      'Espaço coworking'
    ],
    seguranca: ['Portaria 24h', 'Câmeras', 'Controle de acesso biométrico', 'Segurança privada'],
    sustentabilidade: ['Certificação LEED', 'Painéis solares', 'Estação de carregamento elétrico', 'Sistema de ar condicionado eficiente'],
    descricao: 'Edifício corporativo AAA na Av. Paulista, com tecnologia de ponta e infraestrutura completa para empresas que buscam excelência.',
    diferenciais: [
      'Localização premium na Av. Paulista',
      'Certificação LEED Platinum',
      'Pé direito duplo no lobby',
      'Heliponto',
      'Gerador próprio'
    ],
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200',
    fotoDestaque: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    fotos: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    ],
    plantas: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800'
    ],
    corretorResponsavel: 'Marcos Silva',
    vendedores: ['João Ferreira', 'Mariana Costa'],
    dataCadastro: '2024-03-15',
    ultimaAtualizacao: '2024-03-22'
  },
  {
    id: '3',
    nome: 'Ville Jardins',
    construtora: 'Construtora Prime',
    status: 'pronto',
    tipoEmpreendimento: 'residencial',
    endereco: 'Rua das Magnólias, 500',
    bairro: 'Jardim Botânico',
    cidade: 'Curitiba',
    estado: 'PR',
    cep: '80210-170',
    totalUnidades: 96,
    unidadesDisponiveis: 12,
    tiposUnidades: ['3 dormitórios', '4 dormitórios', 'Garden'],
    areaPrivativaMin: 110,
    areaPrivativaMax: 165,
    vagasMin: 2,
    vagasMax: 3,
    precoMin: 850000,
    precoMax: 1450000,
    entradaMinima: 170000,
    aceitaFinanciamento: true,
    dataLancamento: '2022-03-10',
    previsaoEntrega: '2024-03-30',
    faseObra: 'pronto',
    percentualConcluido: 100,
    areasLazer: [
      'Piscina aquecida',
      'Sauna',
      'Academia',
      'Salão de festas com cozinha gourmet',
      'Brinquedoteca',
      'Espaço teen',
      'Bike space'
    ],
    seguranca: ['Portaria 24h', 'Câmeras de segurança', 'Fechaduras digitais'],
    sustentabilidade: ['Aquecimento solar', 'Iluminação LED', 'Jardins naturais'],
    descricao: 'Residencial pronto para morar em localização nobre, com acabamento premium e completa infraestrutura.',
    diferenciais: [
      'Pronto para morar',
      'Bairro nobre',
      'Apartamentos de 3 e 4 dormitórios',
      'Unidades garden com jardim privativo'
    ],
    logo: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200',
    fotoDestaque: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    fotos: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    plantas: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800'
    ],
    corretorResponsavel: 'Ana Paula Lima',
    vendedores: ['Patricia Alves', 'Carlos Eduardo Silva'],
    dataCadastro: '2022-01-20',
    ultimaAtualizacao: '2024-03-18'
  },
  {
    id: '4',
    nome: 'Urban Life Residence',
    construtora: 'Construtora Vanguarda',
    status: 'em_construcao',
    tipoEmpreendimento: 'misto',
    endereco: 'Av. Getúlio Vargas, 1200',
    bairro: 'Funcionários',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    cep: '30112-020',
    totalUnidades: 320,
    unidadesDisponiveis: 156,
    tiposUnidades: ['Studio', '1 dormitório', '2 dormitórios', 'Loja térrea'],
    areaPrivativaMin: 28,
    areaPrivativaMax: 85,
    vagasMin: 0,
    vagasMax: 2,
    precoMin: 280000,
    precoMax: 750000,
    entradaMinima: 28000,
    aceitaFinanciamento: true,
    dataLancamento: '2023-09-20',
    previsaoEntrega: '2025-09-30',
    faseObra: 'acabamento',
    percentualConcluido: 70,
    areasLazer: [
      'Rooftop com piscina',
      'Lounge',
      'Coworking',
      'Lavanderia compartilhada',
      'Espaço pet',
      'Bicicletário'
    ],
    seguranca: ['Portaria virtual', 'Câmeras', 'App de controle de acesso'],
    sustentabilidade: ['Bicicletário', 'Estação para carros elétricos', 'Telhado verde'],
    descricao: 'Conceito moderno de moradia urbana com unidades compactas e funcionais, ideal para jovens profissionais e investidores.',
    diferenciais: [
      'Localização central',
      'Unidades compactas e otimizadas',
      'Comércio no térreo',
      'Conceito urban living'
    ],
    logo: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200',
    fotoDestaque: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    fotos: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    plantas: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800'
    ],
    corretorResponsavel: 'Roberto Mendes',
    vendedores: ['Rafael Santos', 'João Ferreira'],
    dataCadastro: '2023-08-05',
    ultimaAtualizacao: '2024-03-21'
  }
]

// Mock de Matching de Projetos com Clientes
export const mockProjetoMatches: ClienteProjetoMatch[] = [
  {
    projeto: projetosMock[0], // Residencial Parque das Flores
    score: {
      clienteId: '1',
      projetoId: '1',
      score: 92,
      probabilidadeFechamento: 'muito_alta',
      motivos: [
        { criterio: 'Orçamento compatível', match: true, peso: 10 },
        { criterio: 'Localização desejada (Barra da Tijuca)', match: true, peso: 9 },
        { criterio: 'Tipo de unidade (3 dormitórios)', match: true, peso: 10 },
        { criterio: 'Infraestrutura de lazer completa', match: true, peso: 8 },
        { criterio: 'Aceita financiamento', match: true, peso: 7 },
        { criterio: 'Prazo de entrega adequado', match: true, peso: 6 }
      ],
      ultimaAtualizacao: '2024-03-25T10:30:00Z'
    }
  },
  {
    projeto: projetosMock[2], // Ville Jardins
    score: {
      clienteId: '1',
      projetoId: '3',
      score: 88,
      probabilidadeFechamento: 'alta',
      motivos: [
        { criterio: 'Orçamento compatível', match: true, peso: 10 },
        { criterio: 'Pronto para morar', match: true, peso: 10 },
        { criterio: 'Tipo de unidade (3-4 dormitórios)', match: true, peso: 9 },
        { criterio: 'Localização premium', match: true, peso: 8 },
        { criterio: 'Acabamento de alto padrão', match: true, peso: 8 },
        { criterio: 'Cidade diferente da preferida', match: false, peso: 7 }
      ],
      ultimaAtualizacao: '2024-03-25T10:30:00Z'
    }
  },
  {
    projeto: projetosMock[3], // Urban Life Residence
    score: {
      clienteId: '1',
      projetoId: '4',
      score: 65,
      probabilidadeFechamento: 'media',
      motivos: [
        { criterio: 'Orçamento abaixo do desejado', match: false, peso: 10 },
        { criterio: 'Unidades compactas (Studio/1 dorm)', match: false, peso: 9 },
        { criterio: 'Conceito urban living moderno', match: true, peso: 6 },
        { criterio: 'Boa para investimento', match: true, peso: 7 },
        { criterio: 'Localização central', match: true, peso: 8 },
        { criterio: 'Cidade diferente', match: false, peso: 5 }
      ],
      ultimaAtualizacao: '2024-03-25T10:30:00Z'
    }
  },
  {
    projeto: projetosMock[1], // Sky Business Center
    score: {
      clienteId: '1',
      projetoId: '2',
      score: 45,
      probabilidadeFechamento: 'baixa',
      motivos: [
        { criterio: 'Empreendimento comercial', match: false, peso: 10 },
        { criterio: 'Cliente busca residencial', match: false, peso: 10 },
        { criterio: 'Localização em São Paulo', match: true, peso: 7 },
        { criterio: 'Orçamento acima do esperado', match: false, peso: 8 },
        { criterio: 'Oportunidade de investimento', match: true, peso: 5 }
      ],
      ultimaAtualizacao: '2024-03-25T10:30:00Z'
    }
  }
]
