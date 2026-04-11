import { useState } from 'react'
import { NegocioPipeline, EtapaPipeline, EtapaConfig } from '../../types/pipeline'
import { negociosPipeline } from '../../data/pipeline.mock'
import styles from './PipelinePage.module.css'

export default function PipelinePage() {
  const [negocios, setNegocios] = useState<NegocioPipeline[]>(negociosPipeline)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)

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

  const handleDragStart = (e: React.DragEvent, negocioId: string) => {
    setDraggedItem(negocioId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, novaEtapa: EtapaPipeline) => {
    e.preventDefault()

    if (!draggedItem) return

    setNegocios((prevNegocios) =>
      prevNegocios.map((negocio) =>
        negocio.id === draggedItem
          ? {
              ...negocio,
              etapa: novaEtapa,
              dataMovimentacao: new Date().toISOString().split('T')[0],
              diasNaEtapa: 0,
              probabilidadeFechamento:
                novaEtapa === 'fechado' ? 100 :
                novaEtapa === 'perdido' ? 0 :
                novaEtapa === 'negociacao' ? 80 :
                novaEtapa === 'proposta_enviada' ? 65 :
                novaEtapa === 'visita_agendada' ? 55 :
                novaEtapa === 'qualificado' ? 40 :
                20
            }
          : negocio
      )
    )

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
            <div className={styles.statLabel}>Negócios Ativos</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className={styles.statValue}>{formatCurrency(stats.totalValor)}</div>
            <div className={styles.statLabel}>Valor em Pipeline</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className={styles.statValue}>{formatCurrency(stats.valorFechado)}</div>
            <div className={styles.statLabel}>Vendas Fechadas</div>
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
            <div className={styles.statLabel}>Taxa de Conversão</div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className={styles.kanbanBoard}>
        {etapas.map((etapa) => {
          const negociosEtapa = getNegociosPorEtapa(etapa.id)
          const totalValor = getTotalValorEtapa(etapa.id)

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
                <div className={styles.columnValue}>{formatCurrency(totalValor)}</div>
              </div>

              <div className={styles.columnContent}>
                {negociosEtapa.map((negocio) => (
                  <div
                    key={negocio.id}
                    className={styles.negocioCard}
                    draggable
                    onDragStart={(e) => handleDragStart(e, negocio.id)}
                  >
                    {/* Header do Card */}
                    <div className={styles.cardHeader}>
                      <div className={styles.clienteInfo}>
                        {negocio.clienteFoto ? (
                          <img
                            src={negocio.clienteFoto}
                            alt={negocio.clienteNome}
                            className={styles.clienteAvatar}
                          />
                        ) : (
                          <div className={styles.clienteAvatarPlaceholder}>
                            {negocio.clienteNome.charAt(0)}
                          </div>
                        )}
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

                    {/* Imóvel */}
                    <div className={styles.imovelInfo}>
                      {negocio.imovelFoto && (
                        <img
                          src={negocio.imovelFoto}
                          alt={negocio.imovelTitulo}
                          className={styles.imovelFoto}
                        />
                      )}
                      <div className={styles.imovelDetalhes}>
                        <div className={styles.imovelTitulo}>{negocio.imovelTitulo}</div>
                        <div className={styles.imovelEndereco}>{negocio.imovelEndereco}</div>
                      </div>
                    </div>

                    {/* Valor */}
                    <div className={styles.valorNegocio}>{formatCurrency(negocio.valorNegocio)}</div>

                    {/* Probabilidade */}
                    <div className={styles.probabilidade}>
                      <div className={styles.probabilidadeLabel}>
                        <span>Probabilidade</span>
                        <span className={styles.probabilidadeValue}>{negocio.probabilidadeFechamento}%</span>
                      </div>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{
                            width: `${negocio.probabilidadeFechamento}%`,
                            backgroundColor: etapa.cor
                          }}
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className={styles.cardFooter}>
                      <div className={styles.diasEtapa}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        {negocio.diasNaEtapa} {negocio.diasNaEtapa === 1 ? 'dia' : 'dias'}
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
    </div>
  )
}
