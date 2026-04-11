'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './BuscaPage.module.css'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

function createPinIcon(label: string, active: boolean) {
  return L.divIcon({
    className: '',
    html: `<div style="padding:5px 10px;background:${active ? 'linear-gradient(135deg,#D4AF37,#F5C563)' : 'rgba(15,12,8,0.92)'};color:${active ? '#0a0604' : '#F5C563'};border:1px solid ${active ? '#D4AF37' : 'rgba(212,175,55,0.3)'};border-radius:8px;font-size:11px;font-weight:700;font-family:Poppins,sans-serif;white-space:nowrap;box-shadow:0 2px 10px rgba(0,0,0,0.5);transform:translate(-50%,-100%);cursor:pointer;">${label}</div>`,
    iconSize: [0, 0], iconAnchor: [0, 0],
  })
}

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (positions.length > 0) {
      map.fitBounds(L.latLngBounds(positions), { padding: [40, 40], maxZoom: 15 })
    }
  }, [positions, map])
  return null
}

// ─── CARACTERÍSTICAS KEYS ───
const CARAC_IMOVEL_KEYS = [
  'vista_mar', 'frente_mar', 'piscina', 'piscina_privativa', 'jacuzzi',
  'churrasqueira', 'varanda', 'varanda_gourmet', 'home_office', 'closet',
  'lareira', 'ar_condicionado', 'jardim',
]

const CARAC_CONDOMINIO_KEYS = [
  'academia', 'sauna', 'salao_festas', 'playground', 'pet_place',
  'portaria_24h', 'elevador', 'elevador_privativo', 'concierge', 'heliponto',
]

// ─── MOCK DATA ───
const TODOS_IMOVEIS = [
  { id: '1', titulo: 'Apartamento Frente Mar - Barra Sul', bairro: 'Barra Sul', cidade: 'Balneário Camboriú', endereco: 'Av. Atlântica, 4500', quartos: 3, suites: 3, banheiros: 3, vagas: 2, area: 220, preco: 5800000, tipo: 'venda', categoria: 'apartamento', condicao: 'pronto', mobiliado: 'mobiliado', andar: 'alto', caracteristicas: ['vista_mar', 'frente_mar', 'varanda_gourmet', 'piscina', 'churrasqueira', 'academia', 'portaria_24h', 'elevador', 'ar_condicionado'], aceita_pets: true, aceita_financiamento: true, foto: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop', lat: -26.9980, lng: -48.6310 },
  { id: '2', titulo: 'Cobertura Duplex - Centro BC', bairro: 'Centro', cidade: 'Balneário Camboriú', endereco: 'Av. Brasil, 1200', quartos: 5, suites: 4, banheiros: 5, vagas: 4, area: 380, preco: 8500000, tipo: 'venda', categoria: 'cobertura', condicao: 'pronto', mobiliado: 'sem_mobilia', andar: 'cobertura', caracteristicas: ['vista_mar', 'piscina_privativa', 'churrasqueira', 'jacuzzi', 'sauna', 'home_office', 'closet', 'lareira', 'academia', 'portaria_24h', 'elevador_privativo'], aceita_pets: true, aceita_financiamento: true, foto: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop', lat: -26.9905, lng: -48.6355 },
  { id: '3', titulo: 'Apartamento Alto Padrão - Pioneiros', bairro: 'Pioneiros', cidade: 'Balneário Camboriú', endereco: 'Rua 2500, 300', quartos: 3, suites: 2, banheiros: 3, vagas: 2, area: 160, preco: 2900000, tipo: 'venda', categoria: 'apartamento', condicao: 'pronto', mobiliado: 'semi_mobiliado', andar: 'alto', caracteristicas: ['varanda_gourmet', 'churrasqueira', 'academia', 'salao_festas', 'portaria_24h', 'elevador', 'playground'], aceita_pets: true, aceita_financiamento: true, foto: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop', lat: -26.9870, lng: -48.6420 },
  { id: '4', titulo: 'Penthouse Vista 360° - Barra Norte', bairro: 'Barra Norte', cidade: 'Balneário Camboriú', endereco: 'Av. Atlântica, 1000', quartos: 4, suites: 4, banheiros: 6, vagas: 4, area: 450, preco: 15000000, tipo: 'venda', categoria: 'cobertura', condicao: 'pronto', mobiliado: 'mobiliado', andar: 'cobertura', caracteristicas: ['vista_mar', 'frente_mar', 'piscina_privativa', 'jacuzzi', 'heliponto', 'churrasqueira', 'home_office', 'closet', 'lareira', 'sauna', 'elevador_privativo', 'portaria_24h', 'concierge', 'ar_condicionado'], aceita_pets: true, aceita_financiamento: false, foto: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop', lat: -26.9830, lng: -48.6380 },
  { id: '5', titulo: 'Apartamento Mobiliado - Centro', bairro: 'Centro', cidade: 'Balneário Camboriú', endereco: 'Rua 1900, 450', quartos: 2, suites: 1, banheiros: 2, vagas: 1, area: 85, preco: 4500, tipo: 'aluguel', categoria: 'apartamento', condicao: 'pronto', mobiliado: 'mobiliado', andar: 'medio', caracteristicas: ['varanda', 'ar_condicionado', 'portaria_24h', 'elevador', 'academia'], aceita_pets: false, aceita_financiamento: false, foto: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop', lat: -26.9915, lng: -48.6340 },
  { id: '6', titulo: 'Sala Comercial - Av. Brasil', bairro: 'Centro', cidade: 'Balneário Camboriú', endereco: 'Av. Brasil, 800', quartos: 0, suites: 0, banheiros: 1, vagas: 1, area: 55, preco: 3200, tipo: 'aluguel', categoria: 'comercial', condicao: 'pronto', mobiliado: 'sem_mobilia', andar: 'baixo', caracteristicas: ['ar_condicionado', 'elevador', 'portaria_24h'], aceita_pets: false, aceita_financiamento: false, foto: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', lat: -26.9925, lng: -48.6350 },
  { id: '7', titulo: 'Studio Beira Mar - Barra Sul', bairro: 'Barra Sul', cidade: 'Balneário Camboriú', endereco: 'Av. Atlântica, 5200', quartos: 1, suites: 1, banheiros: 1, vagas: 1, area: 42, preco: 3800, tipo: 'aluguel', categoria: 'studio', condicao: 'pronto', mobiliado: 'mobiliado', andar: 'alto', caracteristicas: ['vista_mar', 'varanda', 'piscina', 'academia', 'portaria_24h', 'elevador', 'ar_condicionado'], aceita_pets: true, aceita_financiamento: false, foto: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop', lat: -27.0010, lng: -48.6290 },
  { id: '8', titulo: 'Apartamento Meia Praia - Itapema', bairro: 'Meia Praia', cidade: 'Itapema', endereco: 'Av. Nereu Ramos, 3200', quartos: 3, suites: 1, banheiros: 2, vagas: 2, area: 130, preco: 1800000, tipo: 'venda', categoria: 'apartamento', condicao: 'pronto', mobiliado: 'sem_mobilia', andar: 'medio', caracteristicas: ['varanda_gourmet', 'churrasqueira', 'piscina', 'academia', 'salao_festas', 'portaria_24h', 'elevador', 'playground'], aceita_pets: true, aceita_financiamento: true, foto: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=600&h=400&fit=crop', lat: -27.0870, lng: -48.6150 },
  { id: '9', titulo: 'Cobertura Vista Mar - Itapema', bairro: 'Centro', cidade: 'Itapema', endereco: 'Rua 222, 500', quartos: 4, suites: 2, banheiros: 3, vagas: 3, area: 240, preco: 3200000, tipo: 'venda', categoria: 'cobertura', condicao: 'pronto', mobiliado: 'semi_mobiliado', andar: 'cobertura', caracteristicas: ['vista_mar', 'piscina_privativa', 'churrasqueira', 'jacuzzi', 'academia', 'portaria_24h', 'elevador'], aceita_pets: true, aceita_financiamento: true, foto: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop', lat: -27.0920, lng: -48.6120 },
  { id: '10', titulo: 'Apt. Temporada - Meia Praia', bairro: 'Meia Praia', cidade: 'Itapema', endereco: 'Av. Nereu Ramos, 2800', quartos: 2, suites: 1, banheiros: 1, vagas: 1, area: 75, preco: 2800, tipo: 'aluguel', categoria: 'apartamento', condicao: 'pronto', mobiliado: 'mobiliado', andar: 'medio', caracteristicas: ['varanda', 'piscina', 'ar_condicionado', 'portaria_24h', 'elevador'], aceita_pets: false, aceita_financiamento: false, foto: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop', lat: -27.0850, lng: -48.6170 },
  { id: '11', titulo: 'Casa com Vista - Perequê', bairro: 'Perequê', cidade: 'Porto Belo', endereco: 'Rua das Flores, 120', quartos: 4, suites: 2, banheiros: 3, vagas: 3, area: 280, preco: 1950000, tipo: 'venda', categoria: 'casa', condicao: 'pronto', mobiliado: 'sem_mobilia', andar: 'baixo', caracteristicas: ['vista_mar', 'piscina', 'churrasqueira', 'jardim', 'pet_place'], aceita_pets: true, aceita_financiamento: true, foto: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop', lat: -27.1550, lng: -48.5580 },
  { id: '12', titulo: 'Apartamento Porto Belo Centro', bairro: 'Centro', cidade: 'Porto Belo', endereco: 'Av. Gov. Celso Ramos, 600', quartos: 3, suites: 1, banheiros: 2, vagas: 2, area: 110, preco: 890000, tipo: 'venda', categoria: 'apartamento', condicao: 'novo', mobiliado: 'sem_mobilia', andar: 'medio', caracteristicas: ['varanda', 'piscina', 'academia', 'salao_festas', 'portaria_24h', 'elevador'], aceita_pets: true, aceita_financiamento: true, foto: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop', lat: -27.1520, lng: -48.5530 },
  { id: '13', titulo: 'Casa de Praia - Porto Belo', bairro: 'Araçá', cidade: 'Porto Belo', endereco: 'Rua da Praia, 80', quartos: 3, suites: 1, banheiros: 2, vagas: 2, area: 150, preco: 5500, tipo: 'aluguel', categoria: 'casa', condicao: 'pronto', mobiliado: 'mobiliado', andar: 'baixo', caracteristicas: ['vista_mar', 'churrasqueira', 'jardim', 'pet_place'], aceita_pets: true, aceita_financiamento: false, foto: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop', lat: -27.1600, lng: -48.5550 },
  { id: '14', titulo: 'Casa em Condomínio - Camboriú', bairro: 'Rio Pequeno', cidade: 'Camboriú', endereco: 'Rua das Palmeiras, 300', quartos: 3, suites: 1, banheiros: 2, vagas: 2, area: 200, preco: 980000, tipo: 'venda', categoria: 'casa', condicao: 'pronto', mobiliado: 'sem_mobilia', andar: 'baixo', caracteristicas: ['churrasqueira', 'jardim', 'piscina', 'playground', 'portaria_24h'], aceita_pets: true, aceita_financiamento: true, foto: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop', lat: -27.0250, lng: -48.6520 },
  { id: '15', titulo: 'Apartamento Novo - Camboriú', bairro: 'Centro', cidade: 'Camboriú', endereco: 'Rua Joinville, 450', quartos: 2, suites: 1, banheiros: 1, vagas: 1, area: 68, preco: 420000, tipo: 'venda', categoria: 'apartamento', condicao: 'novo', mobiliado: 'sem_mobilia', andar: 'medio', caracteristicas: ['varanda', 'elevador', 'portaria_24h'], aceita_pets: false, aceita_financiamento: true, foto: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop', lat: -27.0210, lng: -48.6510 },
]

const TODOS_PROJETOS = [
  { id: 'p1', titulo: 'Yachthouse Residence Club', construtora: 'Pasqualotto & FG', bairro: 'Barra Sul', cidade: 'Balneário Camboriú', endereco: 'Av. Atlântica, 5000', unidades: 120, areaMin: 150, areaMax: 550, precoMin: 4500000, precoMax: 25000000, percentual: 85, previsao: 'Dez/2025', foto: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop', lat: -27.0000, lng: -48.6300 },
  { id: 'p2', titulo: 'Sky Tower Residence', construtora: 'Embraed', bairro: 'Centro', cidade: 'Balneário Camboriú', endereco: 'Av. Brasil, 1500', unidades: 42, areaMin: 120, areaMax: 350, precoMin: 2800000, precoMax: 9500000, percentual: 30, previsao: 'Mar/2027', foto: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop', lat: -26.9910, lng: -48.6345 },
  { id: 'p3', titulo: 'Tonino Lamborghini Residence', construtora: 'FG Empreendimentos', bairro: 'Barra Norte', cidade: 'Balneário Camboriú', endereco: 'Av. Atlântica, 800', unidades: 60, areaMin: 180, areaMax: 480, precoMin: 6000000, precoMax: 18000000, percentual: 15, previsao: 'Jun/2028', foto: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop', lat: -26.9840, lng: -48.6370 },
  { id: 'p4', titulo: 'Residencial Costa Marina', construtora: 'Cechinel Inc.', bairro: 'Meia Praia', cidade: 'Itapema', endereco: 'Av. Nereu Ramos, 4000', unidades: 96, areaMin: 70, areaMax: 160, precoMin: 680000, precoMax: 1800000, percentual: 55, previsao: 'Set/2026', foto: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=600&h=400&fit=crop', lat: -27.0880, lng: -48.6130 },
  { id: 'p5', titulo: 'Porto Belo Marina Resort', construtora: 'Construtora Horizonte', bairro: 'Centro', cidade: 'Porto Belo', endereco: 'Av. Gov. Celso Ramos, 1200', unidades: 200, areaMin: 55, areaMax: 130, precoMin: 380000, precoMax: 950000, percentual: 40, previsao: 'Dez/2026', foto: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop', lat: -27.1530, lng: -48.5540 },
]

const CATEGORIAS = ['todos', 'apartamento', 'casa', 'cobertura', 'studio', 'loft', 'comercial']
const CIDADES = ['todas', 'Balneário Camboriú', 'Itapema', 'Porto Belo', 'Camboriú']
const CONDICOES_KEYS = ['todos', 'novo', 'pronto', 'em_construcao']
const MOBILIA_KEYS = ['todos', 'mobiliado', 'semi_mobiliado', 'sem_mobilia']
const ANDARES_KEYS = ['todos', 'baixo', 'medio', 'alto', 'cobertura']
const NUM_OPTIONS = [0, 1, 2, 3, 4, 5]

function formatPreco(valor: number, tipo: 'venda' | 'aluguel' = 'venda', perMonth = '/mês') {
  if (tipo === 'aluguel') return `R$ ${valor.toLocaleString('pt-BR')}${perMonth}`
  if (valor >= 1000000) { const m = valor / 1000000; return `R$ ${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)} mi` }
  return `R$ ${valor.toLocaleString('pt-BR')}`
}

export default function BuscaContent() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const router = useRouter()
  const tipoParam = (searchParams.get('tipo') || 'venda') as 'venda' | 'aluguel' | 'projeto'
  const enderecoParam = searchParams.get('endereco') || ''

  const [tab, setTab] = useState(tipoParam)
  const [busca, setBusca] = useState(enderecoParam)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const perMonth = t('common.perMonth')

  // Filters
  const [categoria, setCategoria] = useState('todos')
  const [cidade, setCidade] = useState('todas')
  const [quartosMin, setQuartosMin] = useState(0)
  const [suitesMin, setSuitesMin] = useState(0)
  const [banheirosMin, setBanheirosMin] = useState(0)
  const [vagasMin, setVagasMin] = useState(0)
  const [precoMinF, setPrecoMinF] = useState('')
  const [precoMaxF, setPrecoMaxF] = useState('')
  const [areaMinF, setAreaMinF] = useState('')
  const [areaMaxF, setAreaMaxF] = useState('')
  const [condicao, setCondicao] = useState('todos')
  const [mobiliado, setMobiliado] = useState('todos')
  const [andar, setAndar] = useState('todos')
  const [aceitaPets, setAceitaPets] = useState(false)
  const [aceitaFinanc, setAceitaFinanc] = useState(false)
  const [caracSel, setCaracSel] = useState<string[]>([])

  const toggleCarac = (key: string) => setCaracSel(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])

  const handleTabChange = (t: 'venda' | 'aluguel' | 'projeto') => {
    setTab(t)
    const p = new URLSearchParams(searchParams.toString())
    p.set('tipo', t)
    router.replace(`/busca?${p.toString()}`)
  }

  const handleSearch = () => {
    const p = new URLSearchParams()
    p.set('tipo', tab)
    if (busca.trim()) p.set('endereco', busca.trim())
    router.replace(`/busca?${p.toString()}`)
  }

  const clearFilters = () => {
    setCategoria('todos'); setCidade('todas'); setQuartosMin(0); setSuitesMin(0); setBanheirosMin(0); setVagasMin(0)
    setPrecoMinF(''); setPrecoMaxF(''); setAreaMinF(''); setAreaMaxF('')
    setCondicao('todos'); setMobiliado('todos'); setAndar('todos')
    setAceitaPets(false); setAceitaFinanc(false); setCaracSel([])
  }

  const hasActiveFilters = categoria !== 'todos' || cidade !== 'todas' || quartosMin > 0 || suitesMin > 0 || banheirosMin > 0 || vagasMin > 0 || precoMinF || precoMaxF || areaMinF || areaMaxF || condicao !== 'todos' || mobiliado !== 'todos' || andar !== 'todos' || aceitaPets || aceitaFinanc || caracSel.length > 0
  const activeCount = [categoria !== 'todos', cidade !== 'todas', quartosMin > 0, suitesMin > 0, banheirosMin > 0, vagasMin > 0, !!precoMinF || !!precoMaxF, !!areaMinF || !!areaMaxF, condicao !== 'todos', mobiliado !== 'todos', andar !== 'todos', aceitaPets, aceitaFinanc, caracSel.length > 0].filter(Boolean).length

  const resultados = useMemo(() => {
    const termo = busca.toLowerCase().trim()
    const pMin = precoMinF ? Number(precoMinF) : 0
    const pMax = precoMaxF ? Number(precoMaxF) : Infinity
    const aMin = areaMinF ? Number(areaMinF) : 0
    const aMax = areaMaxF ? Number(areaMaxF) : Infinity

    if (tab === 'projeto') {
      return TODOS_PROJETOS.filter((p) => {
        if (termo && ![p.titulo, p.bairro, p.cidade, p.endereco, p.construtora].some(s => s.toLowerCase().includes(termo))) return false
        if (cidade !== 'todas' && p.cidade !== cidade) return false
        if (pMin && p.precoMax < pMin) return false
        if (pMax < Infinity && p.precoMin > pMax) return false
        return true
      })
    }

    return TODOS_IMOVEIS.filter((im) => {
      if (im.tipo !== tab) return false
      if (termo && ![im.titulo, im.bairro, im.cidade, im.endereco].some(s => s.toLowerCase().includes(termo))) return false
      if (categoria !== 'todos' && im.categoria !== categoria) return false
      if (cidade !== 'todas' && im.cidade !== cidade) return false
      if (quartosMin > 0 && im.quartos < quartosMin) return false
      if (suitesMin > 0 && im.suites < suitesMin) return false
      if (banheirosMin > 0 && im.banheiros < banheirosMin) return false
      if (vagasMin > 0 && im.vagas < vagasMin) return false
      if (pMin && im.preco < pMin) return false
      if (pMax < Infinity && im.preco > pMax) return false
      if (aMin && im.area < aMin) return false
      if (aMax < Infinity && im.area > aMax) return false
      if (condicao !== 'todos' && im.condicao !== condicao) return false
      if (mobiliado !== 'todos' && im.mobiliado !== mobiliado) return false
      if (andar !== 'todos' && im.andar !== andar) return false
      if (aceitaPets && !im.aceita_pets) return false
      if (aceitaFinanc && !im.aceita_financiamento) return false
      if (caracSel.length > 0 && !caracSel.every(c => im.caracteristicas.includes(c))) return false
      return true
    })
  }, [tab, busca, categoria, cidade, quartosMin, suitesMin, banheirosMin, vagasMin, precoMinF, precoMaxF, areaMinF, areaMaxF, condicao, mobiliado, andar, aceitaPets, aceitaFinanc, caracSel])

  const mapPositions: [number, number][] = resultados.map((r: any) => [r.lat, r.lng])

  const renderCard = (item: any, isProjeto = false) => (
    <div key={item.id} className={`${styles.card} ${hoveredCard === item.id ? styles.cardHovered : ''}`} onMouseEnter={() => setHoveredCard(item.id)} onMouseLeave={() => setHoveredCard(null)}>
      <div className={styles.cardImgWrap}>
        <img src={item.foto} alt={item.titulo} className={styles.cardImg} loading="lazy" />
        <span className={`${styles.badge} ${tab === 'aluguel' ? styles.badgeAluguel : ''} ${isProjeto ? styles.badgeProjeto : ''}`}>
          {isProjeto ? t('home.badge.project') : tab === 'venda' ? t('home.badge.sale') : t('home.badge.rental')}
        </span>
        {isProjeto && <div className={styles.progress}><div className={styles.progressBar} style={{ width: `${item.percentual}%` }} /><span className={styles.progressLabel}>{item.percentual}%</span></div>}
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{item.titulo}</h3>
        {isProjeto && <p className={styles.cardConstrutora}>{item.construtora}</p>}
        <p className={styles.cardLocation}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61 3.95 5.32 5.64 3.64C7.32 1.95 9.61 1 12 1C14.39 1 16.68 1.95 18.36 3.64C20.05 5.32 21 7.61 21 10Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>
          {item.bairro}, {item.cidade}
        </p>
        <div className={styles.cardSpecs}>
          {isProjeto ? (<><span>{item.unidades} {t('search.specs.units')}</span><span>{item.areaMin}-{item.areaMax}m²</span></>) : (<>{item.quartos > 0 && <span>{item.quartos} {t('search.specs.rooms')}</span>}<span>{item.area}m²</span><span>{item.vagas} {t('search.specs.parking')}</span></>)}
        </div>
        <p className={styles.cardPrice}>{isProjeto ? t('search.startingFrom', { price: formatPreco(item.precoMin) }) : formatPreco(item.preco, tab as 'venda' | 'aluguel', perMonth)}</p>
      </div>
    </div>
  )

  const ChipGroup = ({ label, options, value, onChange, small }: { label: string, options: { key: string | number, label: string }[], value: string | number, onChange: (v: any) => void, small?: boolean }) => (
    <div className={styles.filterGroup}>
      <label className={styles.filterLabel}>{label}</label>
      <div className={styles.filterChips}>
        {options.map(o => (
          <button key={o.key} className={`${styles.chip} ${small ? styles.chipSmall : ''} ${value === o.key ? styles.chipActive : ''}`} onClick={() => onChange(o.key)}>{o.label}</button>
        ))}
      </div>
    </div>
  )

  const NumChipGroup = ({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) => (
    <ChipGroup label={label} value={value} onChange={onChange} small options={NUM_OPTIONS.map(n => ({ key: n, label: n === 0 ? t('search.all') : `${n}+` }))} />
  )

  return (
    <div className={styles.page}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.topLeft}>
          <Link href="/" className={styles.backBtn} title={t('search.back')}><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></Link>
          <img src="/HORIZONTAL BRANCO SEM FUNDO.png" alt="Cretor" className={styles.topLogo} />
        </div>
        <div className={styles.topTabs}>
          {(['venda', 'aluguel', 'projeto'] as const).map(t2 => (
            <button key={t2} className={`${styles.tab} ${tab === t2 ? styles.tabActive : ''}`} onClick={() => handleTabChange(t2)}>{t(`search.tabs.${t2}`)}</button>
          ))}
        </div>
        <div className={styles.topSearch}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          <input type="text" className={styles.topInput} placeholder={t('search.placeholder')} value={busca} onChange={e => setBusca(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} />
        </div>
        <button className={`${styles.filterToggle} ${hasActiveFilters ? styles.filterToggleActive : ''}`} onClick={() => setFiltersOpen(!filtersOpen)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {t('search.filters')} {activeCount > 0 && <span className={styles.filterCount}>{activeCount}</span>}
        </button>
      </div>

      {/* Filters Modal */}
      {filtersOpen && (
        <>
          <div className={styles.filtersOverlay} onClick={() => setFiltersOpen(false)} />
          <div className={styles.filtersPanel}>
            <div className={styles.filtersHeader}>
              <h2 className={styles.filtersTitle}>{t('search.filters')}</h2>
              <button className={styles.filtersClose} onClick={() => setFiltersOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>

            <div className={styles.filtersScroll}>
              {tab !== 'projeto' && (
                <ChipGroup label={t('search.filterLabels.propertyType')} value={categoria} onChange={setCategoria} options={CATEGORIAS.map(c => ({ key: c, label: t(`search.categories.${c}`) }))} />
              )}

              <ChipGroup label={t('search.filterLabels.city')} value={cidade} onChange={setCidade} options={CIDADES.map(c => ({ key: c, label: c === 'todas' ? t('search.cities.todas') : c }))} />

              <div className={styles.filtersDivider} />

              {tab !== 'projeto' && (
                <>
                  <NumChipGroup label={t('search.filterLabels.bedroomsMin')} value={quartosMin} onChange={setQuartosMin} />
                  <NumChipGroup label={t('search.filterLabels.suitesMin')} value={suitesMin} onChange={setSuitesMin} />
                  <NumChipGroup label={t('search.filterLabels.bathroomsMin')} value={banheirosMin} onChange={setBanheirosMin} />
                  <NumChipGroup label={t('search.filterLabels.parkingMin')} value={vagasMin} onChange={setVagasMin} />
                  <div className={styles.filtersDivider} />
                </>
              )}

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>{t('search.filterLabels.priceRange')}</label>
                <div className={styles.filterRow}>
                  <input type="number" className={styles.filterInput} placeholder={t('search.min')} value={precoMinF} onChange={e => setPrecoMinF(e.target.value)} />
                  <span className={styles.filterSep}>{t('search.to')}</span>
                  <input type="number" className={styles.filterInput} placeholder={t('search.max')} value={precoMaxF} onChange={e => setPrecoMaxF(e.target.value)} />
                </div>
              </div>

              {tab !== 'projeto' && (
                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>{t('search.filterLabels.area')}</label>
                  <div className={styles.filterRow}>
                    <input type="number" className={styles.filterInput} placeholder={t('search.min')} value={areaMinF} onChange={e => setAreaMinF(e.target.value)} />
                    <span className={styles.filterSep}>{t('search.to')}</span>
                    <input type="number" className={styles.filterInput} placeholder={t('search.max')} value={areaMaxF} onChange={e => setAreaMaxF(e.target.value)} />
                  </div>
                </div>
              )}

              {tab !== 'projeto' && (
                <>
                  <div className={styles.filtersDivider} />
                  <ChipGroup label={t('search.filterLabels.condition')} value={condicao} onChange={setCondicao} options={CONDICOES_KEYS.map(k => ({ key: k, label: t(`search.conditions.${k}`) }))} small />
                  <ChipGroup label={t('search.filterLabels.furnishing')} value={mobiliado} onChange={setMobiliado} options={MOBILIA_KEYS.map(k => ({ key: k, label: t(`search.furnishing.${k}`) }))} small />
                  <ChipGroup label={t('search.filterLabels.floor')} value={andar} onChange={setAndar} options={ANDARES_KEYS.map(k => ({ key: k, label: t(`search.floors.${k}`) }))} small />

                  <div className={styles.filtersDivider} />

                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>{t('search.filterLabels.rules')}</label>
                    <div className={styles.filterChips}>
                      <button className={`${styles.chip} ${aceitaPets ? styles.chipActive : ''}`} onClick={() => setAceitaPets(!aceitaPets)}>{t('search.rules.pets')}</button>
                      <button className={`${styles.chip} ${aceitaFinanc ? styles.chipActive : ''}`} onClick={() => setAceitaFinanc(!aceitaFinanc)}>{t('search.rules.financing')}</button>
                    </div>
                  </div>

                  <div className={styles.filtersDivider} />

                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>{t('search.filterLabels.propertyFeatures')}</label>
                    <div className={styles.filterChips}>
                      {CARAC_IMOVEL_KEYS.map(key => (
                        <button key={key} className={`${styles.chip} ${caracSel.includes(key) ? styles.chipActive : ''}`} onClick={() => toggleCarac(key)}>{t(`search.features.${key}`)}</button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>{t('search.filterLabels.amenities')}</label>
                    <div className={styles.filterChips}>
                      {CARAC_CONDOMINIO_KEYS.map(key => (
                        <button key={key} className={`${styles.chip} ${caracSel.includes(key) ? styles.chipActive : ''}`} onClick={() => toggleCarac(key)}>{t(`search.amenities.${key}`)}</button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className={styles.filtersFooter}>
              {hasActiveFilters && (
                <button className={styles.clearFilters} onClick={clearFilters}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  {t('search.clearFilters')}
                </button>
              )}
              <button className={styles.filtersApply} onClick={() => setFiltersOpen(false)}>
                {resultados.length === 1 ? t('search.viewResults', { count: resultados.length }) : t('search.viewResults_plural', { count: resultados.length })}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className={styles.main}>
        <div className={styles.listPanel}>
          <div className={styles.listHeader}>
            <p className={styles.listCount} dangerouslySetInnerHTML={{ __html: t('search.resultsCount', { count: resultados.length, type: tab === 'projeto' ? t('search.resultsType.project') : t('search.resultsType.property') }) }} />
          </div>
          <div className={styles.listScroll}>
            {resultados.length === 0 ? (
              <div className={styles.empty}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <h3>{t('search.noResults.title')}</h3>
                <p>{t('search.noResults.desc')}</p>
              </div>
            ) : (
              <div className={styles.listGrid}>
                {tab === 'projeto'
                  ? (resultados as typeof TODOS_PROJETOS).map(p => renderCard(p, true))
                  : (resultados as typeof TODOS_IMOVEIS).map(im => renderCard(im))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.mapPanel}>
          <MapContainer center={[-27.05, -48.62]} zoom={11} className={styles.leafletMap} zoomControl={false}>
            <TileLayer attribution='&copy; OpenStreetMap &copy; CARTO' url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png" />
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png" className="map-labels" />
            {mapPositions.length > 0 && <FitBounds positions={mapPositions} />}
            {resultados.map((item: any) => {
              const isProjeto = tab === 'projeto'
              const priceLabel = isProjeto ? formatPreco(item.precoMin) : formatPreco(item.preco, tab as 'venda' | 'aluguel', perMonth)
              return (
                <Marker key={item.id} position={[item.lat, item.lng]} icon={createPinIcon(priceLabel, hoveredCard === item.id)} eventHandlers={{ mouseover: () => setHoveredCard(item.id), mouseout: () => setHoveredCard(null) }}>
                  <Popup>
                    <div style={{ minWidth: 180 }}>
                      <img src={item.foto} alt={item.titulo} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 6, marginBottom: 8 }} />
                      <strong style={{ fontSize: 13 }}>{item.titulo}</strong>
                      <p style={{ fontSize: 12, color: '#666', margin: '4px 0' }}>{item.bairro}, {item.cidade}</p>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#D4AF37' }}>{priceLabel}</p>
                    </div>
                  </Popup>
                </Marker>
              )
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
