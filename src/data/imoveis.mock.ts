import { Imovel, ClienteImovelMatch, MatchScore } from '../types/imovel'

export const imoveis: Imovel[] = [
  {
    id: '1',
    tipo: 'apartamento',
    titulo: 'Apartamento Alto Padrão - Jardins',
    descricao: 'Magnífico apartamento de 180m² com vista panorâmica, acabamento de luxo e localização privilegiada.',
    endereco: 'Rua Augusta, 2500',
    bairro: 'Jardins',
    cidade: 'São Paulo',
    estado: 'SP',
    quartos: 3,
    banheiros: 3,
    vagas: 2,
    areaTotal: 180,
    areaUtil: 150,
    andar: 15,
    preco: 2500000,
    condominio: 2800,
    iptu: 1200,
    status: 'disponivel',
    disponibilidade: 'Imediata',
    caracteristicas: ['varanda gourmet', 'home office', 'lareira', 'closet', 'vista livre'],
    fotos: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop'],
    anoConstucao: 2020,
    mobiliado: false,
    aceita_pets: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    tipo: 'cobertura',
    titulo: 'Cobertura Duplex - Vila Olímpia',
    descricao: 'Cobertura duplex de 250m² com piscina privativa, churrasqueira e vista 360°.',
    endereco: 'Rua Funchal, 500',
    bairro: 'Vila Olímpia',
    cidade: 'São Paulo',
    estado: 'SP',
    quartos: 4,
    banheiros: 4,
    vagas: 3,
    areaTotal: 250,
    areaUtil: 200,
    andar: 18,
    preco: 3800000,
    condominio: 3500,
    iptu: 2000,
    status: 'disponivel',
    disponibilidade: 'Imediata',
    caracteristicas: ['piscina', 'churrasqueira', 'sauna', 'home theater', 'varanda grande'],
    fotos: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop'],
    anoConstucao: 2019,
    mobiliado: false,
    aceita_pets: true,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '3',
    tipo: 'casa',
    titulo: 'Casa em Condomínio Fechado - Alphaville',
    descricao: 'Casa espaçosa de 320m² em condomínio de alto padrão com área de lazer completa.',
    endereco: 'Alameda Residencial 10, 250',
    bairro: 'Alphaville',
    cidade: 'Barueri',
    estado: 'SP',
    quartos: 4,
    banheiros: 4,
    vagas: 4,
    areaTotal: 500,
    areaUtil: 320,
    preco: 2800000,
    condominio: 1800,
    iptu: 800,
    status: 'disponivel',
    disponibilidade: 'Imediata',
    caracteristicas: ['jardim', 'quintal', 'piscina', 'área gourmet', 'home office'],
    fotos: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop'],
    anoConstucao: 2018,
    mobiliado: false,
    aceita_pets: true,
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z'
  },
  {
    id: '4',
    tipo: 'apartamento',
    titulo: 'Apartamento Moderno - Itaim Bibi',
    descricao: 'Apartamento contemporâneo de 120m² com automação e design moderno.',
    endereco: 'Rua Jesuíno Arruda, 800',
    bairro: 'Itaim Bibi',
    cidade: 'São Paulo',
    estado: 'SP',
    quartos: 2,
    banheiros: 2,
    vagas: 2,
    areaTotal: 120,
    areaUtil: 95,
    andar: 8,
    preco: 1800000,
    condominio: 2000,
    iptu: 900,
    status: 'disponivel',
    disponibilidade: 'Imediata',
    caracteristicas: ['varanda', 'automação', 'churrasqueira', 'vista cidade'],
    fotos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'],
    anoConstucao: 2021,
    mobiliado: false,
    aceita_pets: false,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '5',
    tipo: 'apartamento',
    titulo: 'Lançamento - Brooklin Novo',
    descricao: 'Apartamento na planta com entrega em 2026, infraestrutura completa.',
    endereco: 'Av. Santo Amaro, 5000',
    bairro: 'Brooklin',
    cidade: 'São Paulo',
    estado: 'SP',
    quartos: 3,
    banheiros: 3,
    vagas: 2,
    areaTotal: 150,
    areaUtil: 120,
    andar: 10,
    preco: 1900000,
    condominio: 1500,
    iptu: 700,
    status: 'em_construcao',
    disponibilidade: 'Dezembro 2026',
    caracteristicas: ['varanda gourmet', 'bike space', 'coworking', 'pet place'],
    fotos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'],
    anoConstucao: 2026,
    mobiliado: false,
    aceita_pets: true,
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z'
  }
]

// Mock de scores de matching para o primeiro cliente
export const mockMatches: ClienteImovelMatch[] = [
  {
    imovel: imoveis[0],
    score: {
      clienteId: '1',
      imovelId: '1',
      score: 92,
      probabilidadeFechamento: 'muito_alta',
      motivos: [
        { criterio: 'Localização', match: true, peso: 10 },
        { criterio: 'Faixa de Preço', match: true, peso: 9 },
        { criterio: 'Número de Quartos', match: true, peso: 8 },
        { criterio: 'Área Total', match: true, peso: 7 },
        { criterio: 'Aceita Pets', match: true, peso: 6 },
        { criterio: 'Características Desejadas', match: true, peso: 9 }
      ],
      ultimaAtualizacao: new Date().toISOString()
    }
  },
  {
    imovel: imoveis[1],
    score: {
      clienteId: '1',
      imovelId: '2',
      score: 85,
      probabilidadeFechamento: 'alta',
      motivos: [
        { criterio: 'Localização', match: true, peso: 9 },
        { criterio: 'Faixa de Preço', match: false, peso: 5 },
        { criterio: 'Número de Quartos', match: true, peso: 8 },
        { criterio: 'Área Total', match: true, peso: 9 },
        { criterio: 'Aceita Pets', match: true, peso: 6 },
        { criterio: 'Características Desejadas', match: true, peso: 10 }
      ],
      ultimaAtualizacao: new Date().toISOString()
    }
  },
  {
    imovel: imoveis[2],
    score: {
      clienteId: '1',
      imovelId: '3',
      score: 78,
      probabilidadeFechamento: 'alta',
      motivos: [
        { criterio: 'Localização', match: false, peso: 6 },
        { criterio: 'Faixa de Preço', match: true, peso: 9 },
        { criterio: 'Número de Quartos', match: true, peso: 8 },
        { criterio: 'Área Total', match: true, peso: 10 },
        { criterio: 'Aceita Pets', match: true, peso: 6 },
        { criterio: 'Características Desejadas', match: true, peso: 8 }
      ],
      ultimaAtualizacao: new Date().toISOString()
    }
  },
  {
    imovel: imoveis[3],
    score: {
      clienteId: '1',
      imovelId: '4',
      score: 72,
      probabilidadeFechamento: 'media',
      motivos: [
        { criterio: 'Localização', match: true, peso: 9 },
        { criterio: 'Faixa de Preço', match: true, peso: 8 },
        { criterio: 'Número de Quartos', match: false, peso: 4 },
        { criterio: 'Área Total', match: false, peso: 5 },
        { criterio: 'Aceita Pets', match: false, peso: 0 },
        { criterio: 'Características Desejadas', match: true, peso: 7 }
      ],
      ultimaAtualizacao: new Date().toISOString()
    }
  },
  {
    imovel: imoveis[4],
    score: {
      clienteId: '1',
      imovelId: '5',
      score: 68,
      probabilidadeFechamento: 'media',
      motivos: [
        { criterio: 'Localização', match: true, peso: 8 },
        { criterio: 'Faixa de Preço', match: true, peso: 9 },
        { criterio: 'Número de Quartos', match: true, peso: 8 },
        { criterio: 'Área Total', match: true, peso: 7 },
        { criterio: 'Aceita Pets', match: true, peso: 6 },
        { criterio: 'Disponibilidade', match: false, peso: 3 }
      ],
      ultimaAtualizacao: new Date().toISOString()
    }
  }
]
