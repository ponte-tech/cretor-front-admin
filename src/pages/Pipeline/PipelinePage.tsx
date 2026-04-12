import { useState, useEffect, useRef } from 'react'
import { NegocioPipeline, EtapaPipeline, EtapaConfig } from '../../types/pipeline'
import { pipelineApi, NegocioResponse, observacoesApi, ObservacaoResponse } from '../../services/api'
import Modal from '../../components/Modal/Modal'
import styles from './PipelinePage.module.css'

const MAN_AVATARS = ['3','5','8','11','12','13','17','19','22','24','26','29','31','33','34','36','37','42','43','46','49','53','54','55','59','64','65']
const WOMAN_AVATARS = ['1','2','4','6','7','9','10','14','15','16','18','20','21','23','25','27','28','30','32','35','38','39','40','41','44','45','47','48','50','51','52','56','57','58','60','61','62','63','66']
const ALL_AVATARS = [...MAN_AVATARS.map(n => `/avatares/man/${n}.png`), ...WOMAN_AVATARS.map(n => `/avatares/woman/${n}.png`)]

function getAvatar(id: string): string {
  let hash = 0
  for (let i = 0; i < id.length; i++) { hash = ((hash << 5) - hash) + id.charCodeAt(i); hash |= 0 }
  return ALL_AVATARS[Math.abs(hash) % ALL_AVATARS.length]
}

const PRAZO_LABELS: Record<string, string> = {
  'imediatamente': 'Imediatamente',
  'ate-3-meses': 'Ate 3 meses',
  '3-a-6-meses': '3 a 6 meses',
  'pesquisando': 'Pesquisando',
}

const PAGAMENTO_LABELS: Record<string, string> = {
  'financiamento': 'Financiamento',
  'a-vista': 'A vista',
  'fgts-financiamento': 'FGTS + Financiamento',
  'nao-decidi': 'Nao decidi',
}

function tempoNaEtapa(dataMovimentacao: string): string {
  const agora = new Date().getTime()
  const entrada = new Date(dataMovimentacao).getTime()
  const diff = agora - entrada

  const minutos = Math.floor(diff / 60000)
  const horas = Math.floor(diff / 3600000)
  const dias = Math.floor(diff / 86400000)

  if (minutos < 1) return 'agora mesmo'
  if (minutos < 60) return `${minutos}min`
  if (horas < 24) return `${horas}h ${minutos % 60}min`
  if (dias === 1) return `1 dia ${horas % 24}h`
  return `${dias} dias ${horas % 24}h`
}

function mapApiToNegocio(n: NegocioResponse): NegocioPipeline {
  return {
    id: n.id,
    clienteId: n.lead_id,
    clienteNome: n.lead_nome,
    clienteEmail: n.lead_email,
    clienteTelefone: n.lead_telefone,
    leadPrazo: n.lead_prazo,
    leadFormaPagamento: n.lead_forma_pagamento,
    clienteFoto: undefined,
    imovelId: '',
    imovelTitulo: '',
    imovelFoto: undefined,
    imovelEndereco: '',
    etapa: n.etapa as EtapaPipeline,
    prioridade: n.prioridade as any,
    valorNegocio: n.valor_negocio,
    probabilidadeFechamento: n.probabilidade_fechamento,
    dataCriacao: n.data_criacao,
    dataUltimaInteracao: n.data_ultima_interacao,
    dataMovimentacao: n.data_movimentacao,
    diasNaEtapa: n.dias_na_etapa,
    proximaAcao: n.proxima_acao,
    ultimaAnotacao: n.ultima_anotacao,
    corretorResponsavel: n.corretor_responsavel || '',
    tags: n.tags || [],
    motivoPerda: n.motivo_perda,
  }
}

export default function PipelinePage() {
  const [negocios, setNegocios] = useState<NegocioPipeline[]>([])
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<EtapaPipeline>('primeiro_contato')
  const [moveCardId, setMoveCardId] = useState<string | null>(null)
  const [selectedNegocio, setSelectedNegocio] = useState<NegocioPipeline | null>(null)
  const [observacoes, setObservacoes] = useState<ObservacaoResponse[]>([])
  const [novaObservacao, setNovaObservacao] = useState('')
  const [loadingObs, setLoadingObs] = useState(false)
  const [sendingObs, setSendingObs] = useState(false)
  const dragStartPos = useRef<{ x: number; y: number } | null>(null)
  const wasDragged = useRef(false)

  useEffect(() => {
    pipelineApi.list().then((data) => {
      setNegocios(data.map(mapApiToNegocio))
    }).catch(console.error)
  }, [])

  const etapas: EtapaConfig[] = [
    {
      id: 'primeiro_contato',
      nome: 'Primeiro Contato',
      cor: '#64748b',
      icone: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4741 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4018C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3146 6.72533 15.2661 5.18999 12.85C3.49997 10.2412 2.44824 7.27097 2.11999 4.17997C2.095 3.90344 2.12787 3.62474 2.21649 3.3616C2.30512 3.09846 2.44756 2.85666 2.63476 2.6516C2.82196 2.44653 3.0498 2.28268 3.30379 2.1705C3.55777 2.05831 3.83233 2.00024 4.10999 1.99997H7.10999C7.5953 1.9952 8.06579 2.16705 8.43376 2.48351C8.80173 2.79996 9.04207 3.23942 9.10999 3.71997C9.23662 4.68004 9.47144 5.6227 9.80999 6.52997C9.94454 6.8879 9.97366 7.27689 9.8939 7.65086C9.81415 8.02482 9.62886 8.36809 9.35999 8.63998L8.08999 9.90997C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5285 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      ordem: 1
    },
    {
      id: 'qualificado',
      nome: 'Qualificado',
      cor: '#3b82f6',
      icone: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      ordem: 2
    },
    {
      id: 'visita_agendada',
      nome: 'Visita Agendada',
      cor: '#8b5cf6',
      icone: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      ordem: 3
    },
    {
      id: 'proposta_enviada',
      nome: 'Proposta Enviada',
      cor: '#f59e0b',
      icone: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      ordem: 4
    },
    {
      id: 'negociacao',
      nome: 'Negociação',
      cor: '#ec4899',
      icone: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      ordem: 5
    },
    {
      id: 'fechado',
      nome: 'Fechado',
      cor: '#10b981',
      icone: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      ordem: 6
    },
    {
      id: 'perdido',
      nome: 'Perdido',
      cor: '#ef4444',
      icone: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      ordem: 7
    }
  ]

  const getNegociosPorEtapa = (etapaId: EtapaPipeline) => {
    return negocios.filter((negocio) => negocio.etapa === etapaId)
  }

  const getTotalValorEtapa = (etapaId: EtapaPipeline) => {
    return getNegociosPorEtapa(etapaId).reduce((sum, negocio) => sum + negocio.valorNegocio, 0)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value)
  }

  const getPrioridadeColor = (prioridade: string) => {
    const colors: Record<string, string> = {
      baixa: '#64748b',
      media: '#3b82f6',
      alta: '#f59e0b',
      urgente: '#ef4444'
    }
    return colors[prioridade] || '#64748b'
  }

  const openSidePanel = (negocio: NegocioPipeline) => {
    setSelectedNegocio(negocio)
    setNovaObservacao('')
    setLoadingObs(true)
    observacoesApi.list(negocio.id).then(setObservacoes).catch(console.error).finally(() => setLoadingObs(false))
  }

  const handleAddObservacao = () => {
    if (!selectedNegocio || !novaObservacao.trim()) return
    setSendingObs(true)
    observacoesApi.create(selectedNegocio.id, { texto: novaObservacao.trim() })
      .then((obs) => {
        setObservacoes((prev) => [obs, ...prev])
        setNovaObservacao('')
      })
      .catch(console.error)
      .finally(() => setSendingObs(false))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY }
    wasDragged.current = false
  }

  const handleDragStart = (e: React.DragEvent, negocioId: string) => {
    wasDragged.current = true
    setDraggedItem(negocioId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleCardClick = (negocio: NegocioPipeline) => {
    if (!wasDragged.current) {
      openSidePanel(negocio)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, novaEtapa: EtapaPipeline) => {
    e.preventDefault()

    if (!draggedItem) return

    const probMap: Record<string, number> = {
      primeiro_contato: 20, qualificado: 40, visita_agendada: 55,
      proposta_enviada: 65, negociacao: 80, fechado: 100, perdido: 0,
    }

    // Optimistic update
    setNegocios((prev) =>
      prev.map((n) =>
        n.id === draggedItem
          ? { ...n, etapa: novaEtapa, diasNaEtapa: 0, dataMovimentacao: new Date().toISOString(), probabilidadeFechamento: probMap[novaEtapa] }
          : n
      )
    )

    // Persist to API
    pipelineApi.move(draggedItem, novaEtapa).catch(console.error)

    setDraggedItem(null)
  }

  const getEtapaStats = () => {
    const totalNegocios = negocios.filter(n => n.etapa !== 'perdido').length
    const totalValor = negocios.filter(n => n.etapa !== 'perdido').reduce((sum, n) => sum + n.valorNegocio, 0)
    const valorFechado = negocios.filter(n => n.etapa === 'fechado').reduce((sum, n) => sum + n.valorNegocio, 0)
    const taxaConversao = totalNegocios > 0 ? (negocios.filter(n => n.etapa === 'fechado').length / totalNegocios * 100) : 0

    return { totalNegocios, totalValor, valorFechado, taxaConversao }
  }

  const stats = getEtapaStats()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Pipeline de Vendas</h1>
          <p className={styles.subtitle}>Acompanhe suas oportunidades em tempo real</p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21M4 7H20M4 21H20C20.5304 21 21.0391 20.7893 21.4142 20.4142C21.7893 20.0391 22 19.5304 22 19V9C22 8.46957 21.7893 7.96086 21.4142 7.58579C21.0391 7.21071 20.5304 7 20 7H4C3.46957 7 2.96086 7.21071 2.58579 7.58579C2.21071 7.96086 2 8.46957 2 9V19C2 19.5304 2.21071 20.0391 2.58579 20.4142C2.96086 20.7893 3.46957 21 4 21Z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className={styles.statValue}>{stats.totalNegocios}</div>
            <div className={styles.statLabel}>Negocios Ativos</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 20V10M12 20V4M6 20V14" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className={styles.statValue}>{stats.taxaConversao.toFixed(1)}%</div>
            <div className={styles.statLabel}>Taxa de Conversao</div>
          </div>
        </div>
      </div>

      {/* Desktop: Kanban Board */}
      <div className={styles.kanbanBoard}>
        {etapas.map((etapa) => {
          const negociosEtapa = getNegociosPorEtapa(etapa.id)

          return (
            <div
              key={etapa.id}
              className={styles.kanbanColumn}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, etapa.id)}
            >
              <div className={styles.columnHeader} style={{ borderColor: etapa.cor }}>
                <div className={styles.columnTitle}>
                  <span className={styles.columnIcon} style={{ color: etapa.cor }}>
                    {etapa.icone}
                  </span>
                  <span>{etapa.nome}</span>
                  <span className={styles.columnCount}>{negociosEtapa.length}</span>
                </div>
              </div>

              <div className={styles.columnContent}>
                {negociosEtapa.map((negocio) => (
                  <div
                    key={negocio.id}
                    className={styles.negocioCard}
                    draggable
                    onMouseDown={handleMouseDown}
                    onDragStart={(e) => handleDragStart(e, negocio.id)}
                    onClick={() => handleCardClick(negocio)}
                  >
                    {/* Header do Card */}
                    <div className={styles.cardHeader}>
                      <div className={styles.clienteInfo}>
                        <img
                          src={negocio.clienteFoto || getAvatar(negocio.id)}
                          alt={negocio.clienteNome}
                          className={styles.clienteAvatar}
                        />
                        <div>
                          <div className={styles.clienteNome}>{negocio.clienteNome}</div>
                          <div className={styles.clienteContato}>{negocio.clienteTelefone}</div>
                        </div>
                      </div>
                      <div
                        className={styles.prioridadeBadge}
                        style={{ backgroundColor: `${getPrioridadeColor(negocio.prioridade)}20`, color: getPrioridadeColor(negocio.prioridade) }}
                      >
                        {negocio.prioridade}
                      </div>
                    </div>

                    {/* Lead Info */}
                    {(negocio.leadPrazo || negocio.leadFormaPagamento) && (
                      <div className={styles.leadInfo}>
                        {negocio.leadPrazo && (
                          <div className={styles.leadInfoItem}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span>{PRAZO_LABELS[negocio.leadPrazo] || negocio.leadPrazo}</span>
                          </div>
                        )}
                        {negocio.leadFormaPagamento && (
                          <div className={styles.leadInfoItem}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                              <line x1="1" y1="10" x2="23" y2="10" />
                            </svg>
                            <span>{PAGAMENTO_LABELS[negocio.leadFormaPagamento] || negocio.leadFormaPagamento}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className={styles.cardFooter}>
                      <div className={styles.diasEtapa}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        {tempoNaEtapa(negocio.dataMovimentacao)}
                      </div>
                      {negocio.proximaAcao && (
                        <div className={styles.proximaAcao} title={negocio.proximaAcao}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 20V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {negocio.proximaAcao}
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {negocio.tags.length > 0 && (
                      <div className={styles.tags}>
                        {negocio.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {negociosEtapa.length === 0 && (
                  <div className={styles.emptyColumn}>
                    Nenhum negócio nesta etapa
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile: Tabs + Cards */}
      <div className={styles.mobileView}>
        <div className={styles.tabBar}>
          {etapas.map((etapa) => {
            const count = getNegociosPorEtapa(etapa.id).length
            return (
              <button
                key={etapa.id}
                className={`${styles.tab} ${activeTab === etapa.id ? styles.tabActive : ''}`}
                style={activeTab === etapa.id ? { borderColor: etapa.cor, color: etapa.cor } : {}}
                onClick={() => setActiveTab(etapa.id)}
              >
                {etapa.nome}
                {count > 0 && <span className={styles.tabCount} style={activeTab === etapa.id ? { backgroundColor: etapa.cor } : {}}>{count}</span>}
              </button>
            )
          })}
        </div>

        <div className={styles.mobileCards}>
          {getNegociosPorEtapa(activeTab).length === 0 ? (
            <div className={styles.mobileEmpty}>Nenhum negocio nesta etapa</div>
          ) : (
            getNegociosPorEtapa(activeTab).map((negocio) => (
              <div key={negocio.id} className={styles.mobileCard} onClick={() => openSidePanel(negocio)}>
                <div className={styles.mobileCardTop}>
                  <div className={styles.mobileCardInfo}>
                    <img src={negocio.clienteFoto || getAvatar(negocio.id)} alt={negocio.clienteNome} className={styles.mobileCardAvatar} />
                    <div className={styles.mobileCardName}>
                      <span className={styles.mobileCardNome}>{negocio.clienteNome}</span>
                      <span className={styles.mobileCardTel}>{negocio.clienteTelefone}</span>
                    </div>
                  </div>
                  <div
                    className={styles.prioridadeBadge}
                    style={{ backgroundColor: `${getPrioridadeColor(negocio.prioridade)}20`, color: getPrioridadeColor(negocio.prioridade) }}
                  >
                    {negocio.prioridade}
                  </div>
                </div>

                {(negocio.leadPrazo || negocio.leadFormaPagamento) && (
                  <div className={styles.mobileCardMeta}>
                    {negocio.leadPrazo && (
                      <span className={styles.mobileCardMetaItem}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        {PRAZO_LABELS[negocio.leadPrazo] || negocio.leadPrazo}
                      </span>
                    )}
                    {negocio.leadFormaPagamento && (
                      <span className={styles.mobileCardMetaItem}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                        {PAGAMENTO_LABELS[negocio.leadFormaPagamento] || negocio.leadFormaPagamento}
                      </span>
                    )}
                  </div>
                )}

                <div className={styles.mobileCardFooter}>
                  <span className={styles.mobileCardTime}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    {tempoNaEtapa(negocio.dataMovimentacao)}
                  </span>
                  <button className={styles.mobileCardMove} onClick={() => setMoveCardId(moveCardId === negocio.id ? null : negocio.id)}>
                    Mover etapa
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                </div>

                {moveCardId === negocio.id && (
                  <div className={styles.movePicker}>
                    {etapas.filter(e => e.id !== activeTab).map((etapa) => (
                      <button
                        key={etapa.id}
                        className={styles.moveOption}
                        style={{ borderLeftColor: etapa.cor }}
                        onClick={() => {
                          const probMap: Record<string, number> = {
                            primeiro_contato: 20, qualificado: 40, visita_agendada: 55,
                            proposta_enviada: 65, negociacao: 80, fechado: 100, perdido: 0,
                          }
                          setNegocios(prev => prev.map(n => n.id === negocio.id ? { ...n, etapa: etapa.id, diasNaEtapa: 0, dataMovimentacao: new Date().toISOString(), probabilidadeFechamento: probMap[etapa.id] } : n))
                          pipelineApi.move(negocio.id, etapa.id).catch(console.error)
                          setMoveCardId(null)
                        }}
                      >
                        <span style={{ color: etapa.cor }}>{etapa.icone}</span>
                        {etapa.nome}
                      </button>
                    ))}
                  </div>
                )}

                {negocio.tags.length > 0 && (
                  <div className={styles.tags} style={{ marginTop: '8px' }}>
                    {negocio.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Side Panel - Detalhes do Lead */}
      <Modal
        isOpen={!!selectedNegocio}
        onClose={() => setSelectedNegocio(null)}
        title="Detalhes do Lead"
        size="large"
      >
        {selectedNegocio && (
          <div className={styles.sidePanel}>
            {/* Lead Info */}
            <div className={styles.spSection}>
              <div className={styles.spLeadHeader}>
                <img
                  src={selectedNegocio.clienteFoto || getAvatar(selectedNegocio.id)}
                  alt={selectedNegocio.clienteNome}
                  className={styles.spAvatar}
                />
                <div>
                  <div className={styles.spName}>{selectedNegocio.clienteNome}</div>
                  <div className={styles.spContact}>{selectedNegocio.clienteEmail}</div>
                  <div className={styles.spContact}>{selectedNegocio.clienteTelefone}</div>
                </div>
              </div>
            </div>

            {/* Detalhes do Negocio */}
            <div className={styles.spSection}>
              <h3 className={styles.spSectionTitle}>Detalhes do Negocio</h3>
              <div className={styles.spGrid}>
                <div className={styles.spField}>
                  <span className={styles.spFieldLabel}>Etapa</span>
                  <span className={styles.spFieldValue} style={{ textTransform: 'capitalize' }}>
                    {selectedNegocio.etapa.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className={styles.spField}>
                  <span className={styles.spFieldLabel}>Prioridade</span>
                  <span className={styles.spFieldValue} style={{ color: getPrioridadeColor(selectedNegocio.prioridade), textTransform: 'capitalize' }}>
                    {selectedNegocio.prioridade}
                  </span>
                </div>
                <div className={styles.spField}>
                  <span className={styles.spFieldLabel}>Probabilidade</span>
                  <span className={styles.spFieldValue}>{selectedNegocio.probabilidadeFechamento}%</span>
                </div>
                <div className={styles.spField}>
                  <span className={styles.spFieldLabel}>Tempo na Etapa</span>
                  <span className={styles.spFieldValue}>{tempoNaEtapa(selectedNegocio.dataMovimentacao)}</span>
                </div>
                {selectedNegocio.leadPrazo && (
                  <div className={styles.spField}>
                    <span className={styles.spFieldLabel}>Prazo</span>
                    <span className={styles.spFieldValue}>{PRAZO_LABELS[selectedNegocio.leadPrazo] || selectedNegocio.leadPrazo}</span>
                  </div>
                )}
                {selectedNegocio.leadFormaPagamento && (
                  <div className={styles.spField}>
                    <span className={styles.spFieldLabel}>Forma de Pagamento</span>
                    <span className={styles.spFieldValue}>{PAGAMENTO_LABELS[selectedNegocio.leadFormaPagamento] || selectedNegocio.leadFormaPagamento}</span>
                  </div>
                )}
                {selectedNegocio.proximaAcao && (
                  <div className={styles.spField}>
                    <span className={styles.spFieldLabel}>Proxima Acao</span>
                    <span className={styles.spFieldValue}>{selectedNegocio.proximaAcao}</span>
                  </div>
                )}
                {selectedNegocio.corretorResponsavel && (
                  <div className={styles.spField}>
                    <span className={styles.spFieldLabel}>Corretor Responsavel</span>
                    <span className={styles.spFieldValue}>{selectedNegocio.corretorResponsavel}</span>
                  </div>
                )}
              </div>
              {selectedNegocio.tags.length > 0 && (
                <div className={styles.spTags}>
                  {selectedNegocio.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Observacoes */}
            <div className={styles.spSection}>
              <h3 className={styles.spSectionTitle}>Observacoes</h3>

              {/* Form para adicionar */}
              <div className={styles.spObsForm}>
                <textarea
                  className={styles.spObsInput}
                  placeholder="Adicionar observacao..."
                  value={novaObservacao}
                  onChange={(e) => setNovaObservacao(e.target.value)}
                  rows={3}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleAddObservacao()
                    }
                  }}
                />
                <button
                  className={styles.spObsBtn}
                  onClick={handleAddObservacao}
                  disabled={sendingObs || !novaObservacao.trim()}
                >
                  {sendingObs ? 'Enviando...' : 'Adicionar'}
                </button>
              </div>

              {/* Lista de observacoes */}
              <div className={styles.spObsList}>
                {loadingObs ? (
                  <div className={styles.spObsEmpty}>Carregando...</div>
                ) : observacoes.length === 0 ? (
                  <div className={styles.spObsEmpty}>Nenhuma observacao registrada</div>
                ) : (
                  observacoes.map((obs) => (
                    <div key={obs.id} className={styles.spObsItem}>
                      <div className={styles.spObsHeader}>
                        {obs.autor && <span className={styles.spObsAutor}>{obs.autor}</span>}
                        <span className={styles.spObsDate}>
                          {new Date(obs.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className={styles.spObsText}>{obs.texto}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
