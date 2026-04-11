import { useState } from 'react'
import { mockMatches } from '../../data/imoveis.mock'
import { mockProjetoMatches } from '../../data/projetos.mock'
import { clientesMock } from '../../data/clientes.mock'
import { ClienteImovelMatch } from '../../types/imovel'
import { ClienteProjetoMatch } from '../../types/projeto'
import Select from '../../components/Select/Select'
import PropostaModal, { type PropostaInitialData } from '../../components/PropostaModal/PropostaModal'
import styles from './MatchingPage.module.css'

type TabType = 'imoveis' | 'projetos'

export default function MatchingPage() {
  const [selectedClienteId, setSelectedClienteId] = useState<string>('1')
  const [activeTab, setActiveTab] = useState<TabType>('imoveis')
  const [minScore, setMinScore] = useState<number>(0)
  const [propostaOpen, setPropostaOpen] = useState(false)
  const [propostaInitial, setPropostaInitial] = useState<PropostaInitialData>({})

  const handleEnviarProposta = (data: PropostaInitialData) => {
    setPropostaInitial(data)
    setPropostaOpen(true)
  }

  const selectedCliente = clientesMock.find(c => c.id === selectedClienteId)

  const filteredMatches = mockMatches
    .filter(match => match.score.score >= minScore)
    .sort((a, b) => b.score.score - a.score.score)

  const filteredProjetoMatches = mockProjetoMatches
    .filter(match => match.score.score >= minScore)
    .sort((a, b) => b.score.score - a.score.score)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Matching de Imóveis</h1>
          <p className={styles.subtitle}>
            Encontre os melhores imóveis para seus clientes com base em seu perfil
          </p>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <Select
            label="Selecione o Cliente"
            value={selectedClienteId}
            onChange={(value) => setSelectedClienteId(value)}
            options={clientesMock.map(c => ({
              value: c.id,
              label: c.nome
            }))}
          />
        </div>

        <div className={styles.filterGroup}>
          <Select
            label="Score Mínimo"
            value={minScore.toString()}
            onChange={(value) => setMinScore(Number(value))}
            options={[
              { value: '0', label: 'Todos' },
              { value: '50', label: '50% ou mais' },
              { value: '70', label: '70% ou mais' },
              { value: '85', label: '85% ou mais' }
            ]}
          />
        </div>
      </div>

      {selectedCliente && (
        <div className={styles.clienteInfo}>
          <div className={styles.clienteAvatar}>
            <img src={selectedCliente.foto || '/placeholder-avatar.png'} alt={selectedCliente.nome} />
          </div>
          <div className={styles.clienteDetails}>
            <h3>{selectedCliente.nome}</h3>
            <p>Orçamento: {formatCurrency(selectedCliente.orcamentoMin)} - {formatCurrency(selectedCliente.orcamentoMax)}</p>
            <p>Preferências: {selectedCliente.tipoImovel.join(', ')} • {selectedCliente.bairrosPreferidos}</p>
          </div>
        </div>
      )}

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'imoveis' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('imoveis')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Imóveis Disponíveis ({filteredMatches.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'projetos' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('projetos')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 11L12 14L22 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Projetos ({filteredProjetoMatches.length})
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'imoveis' && (
          <div className={styles.matchList}>
            {filteredMatches.length === 0 ? (
              <div className={styles.emptyState}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                    stroke="#B8A898"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Nenhum imóvel encontrado com os filtros selecionados</p>
              </div>
            ) : (
              filteredMatches.map((match) => (
                <MatchCard key={match.imovel.id} match={match} clienteNome={selectedCliente?.nome || ''} onEnviarProposta={handleEnviarProposta} />
              ))
            )}
          </div>
        )}

        {activeTab === 'projetos' && (
          <div className={styles.matchList}>
            {filteredProjetoMatches.length === 0 ? (
              <div className={styles.emptyState}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 11L12 14L22 4"
                    stroke="#B8A898"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                    stroke="#B8A898"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Nenhum projeto encontrado com os filtros selecionados</p>
              </div>
            ) : (
              filteredProjetoMatches.map((match) => (
                <ProjetoMatchCard key={match.projeto.id} match={match} clienteNome={selectedCliente?.nome || ''} onEnviarProposta={handleEnviarProposta} />
              ))
            )}
          </div>
        )}
      </div>

      <PropostaModal
        isOpen={propostaOpen}
        onClose={() => setPropostaOpen(false)}
        initialData={propostaInitial}
      />
    </div>
  )
}

function MatchCard({ match, clienteNome, onEnviarProposta }: { match: ClienteImovelMatch; clienteNome: string; onEnviarProposta: (data: PropostaInitialData) => void }) {
  const [showDetails, setShowDetails] = useState(false)
  const { imovel, score } = match

  const getScoreColor = (score: number) => {
    if (score >= 85) return '#10B981'
    if (score >= 70) return '#F59E0B'
    if (score >= 50) return '#F97316'
    return '#EF4444'
  }

  const getProbabilidadeLabel = (prob: string) => {
    const labels = {
      'muito_alta': 'Muito Alta',
      'alta': 'Alta',
      'media': 'Média',
      'baixa': 'Baixa'
    }
    return labels[prob as keyof typeof labels] || prob
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value)
  }

  const scoreColor = getScoreColor(score.score)

  return (
    <div className={styles.matchCard}>
      <div className={styles.matchCardHeader}>
        <div className={styles.matchCardInfo}>
          <div className={styles.matchCardImage}>
            {imovel.fotos && imovel.fotos.length > 0 ? (
              <img
                src={imovel.fotos[0]}
                alt={imovel.titulo}
                className={styles.imovelImage}
              />
            ) : (
              <div className={styles.placeholderImage}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className={styles.matchCardDetails}>
            <h3>{imovel.titulo}</h3>
            <p className={styles.matchCardAddress}>
              {imovel.bairro}, {imovel.cidade} - {imovel.estado}
            </p>
            <div className={styles.matchCardFeatures}>
              <span>{imovel.quartos} quartos</span>
              <span>•</span>
              <span>{imovel.banheiros} banheiros</span>
              <span>•</span>
              <span>{imovel.vagas} vagas</span>
              <span>•</span>
              <span>{imovel.areaTotal}m²</span>
            </div>
            <p className={styles.matchCardPrice}>{formatCurrency(imovel.preco)}</p>
          </div>
        </div>

        <div className={styles.matchCardScore}>
          <div className={styles.thermometer}>
            <div className={styles.thermometerBar}>
              <div
                className={styles.thermometerFill}
                style={{
                  height: `${score.score}%`,
                  backgroundColor: scoreColor
                }}
              />
            </div>
            <div className={styles.thermometerLabel}>
              <span className={styles.scoreValue} style={{ color: scoreColor }}>
                {score.score}%
              </span>
              <span className={styles.scoreProbabilidade}>
                {getProbabilidadeLabel(score.probabilidadeFechamento)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.matchCardActions}>
        <button
          className={styles.detailsButton}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Ocultar' : 'Ver'} Detalhes do Match
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              transform: showDetails ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.3s ease'
            }}
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.cardActions}>
          <button className={styles.actionButtonPrimary} onClick={() => {
            const preco = imovel.preco
            const ato = preco * 0.15
            const mensal = preco * 0.40
            const reforco = preco * 0.30
            const reforcoPos = preco * 0.15
            const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
            onEnviarProposta({
              nomeCliente: clienteNome,
              nomeCorretor: 'Daniel Krammes',
              empreendimento: imovel.titulo,
              torre: 'A',
              unidade: '3101',
              entregaUnidade: 'dezembro/2028',
              imobiliaria: 'DK Investimento Imobiliários',
              valorTabela: fmt(preco * 1.13),
              valorizacaoPercent: '100',
              fluxo: [
                { tipo: 'ATO', qtdeParcelas: '1', valor: fmt(ato), dataVencimento: '10/10/2024', valorTotal: fmt(ato) },
                { tipo: 'Mensal', qtdeParcelas: '60', valor: fmt(mensal / 60), dataVencimento: '10/11/2024', valorTotal: fmt(mensal) },
                { tipo: 'Reforço Semestral', qtdeParcelas: '4', valor: fmt(reforco / 4), dataVencimento: '20/06/2025', valorTotal: fmt(reforco) },
                { tipo: 'Reforço Semestral Pós chaves', qtdeParcelas: '', valor: '', dataVencimento: '', valorTotal: fmt(reforcoPos) },
              ],
            })
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Enviar Proposta
          </button>
        </div>
      </div>

      {showDetails && (
        <div className={styles.matchDetails}>
          <h4>Critérios de Matching</h4>
          <div className={styles.criteriaList}>
            {score.motivos.map((motivo, index) => (
              <div key={index} className={styles.criteriaItem}>
                <div className={styles.criteriaHeader}>
                  <span className={styles.criteriaName}>{motivo.criterio}</span>
                  <div className={styles.criteriaStatus}>
                    {motivo.match ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="#10B981"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M18 6L6 18M6 6L18 18"
                          stroke="#EF4444"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <span style={{ color: motivo.match ? '#10B981' : '#EF4444' }}>
                      {motivo.match ? 'Compatível' : 'Não compatível'}
                    </span>
                  </div>
                </div>
                <div className={styles.criteriaWeight}>
                  <div className={styles.criteriaWeightBar}>
                    <div
                      className={styles.criteriaWeightFill}
                      style={{
                        width: `${(motivo.peso / 10) * 100}%`,
                        backgroundColor: motivo.match ? '#10B981' : '#EF4444'
                      }}
                    />
                  </div>
                  <span>Peso: {motivo.peso}/10</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.imovelCaracteristicas}>
            <h4>Características do Imóvel</h4>
            <div className={styles.caracteristicasTags}>
              {imovel.caracteristicas.map((carac, index) => (
                <span key={index} className={styles.caracteristicaTag}>
                  {carac}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

function ProjetoMatchCard({ match, clienteNome, onEnviarProposta }: { match: ClienteProjetoMatch; clienteNome: string; onEnviarProposta: (data: PropostaInitialData) => void }) {
  const [showDetails, setShowDetails] = useState(false)
  const { projeto, score } = match

  const getScoreColor = (score: number) => {
    if (score >= 85) return '#10B981'
    if (score >= 70) return '#F59E0B'
    if (score >= 50) return '#F97316'
    return '#EF4444'
  }

  const getProbabilidadeLabel = (prob: string) => {
    const labels = {
      'muito_alta': 'Muito Alta',
      'alta': 'Alta',
      'media': 'Média',
      'baixa': 'Baixa'
    }
    return labels[prob as keyof typeof labels] || prob
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value)
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      'lancamento': 'Lançamento',
      'em_construcao': 'Em Construção',
      'pronto': 'Pronto',
      'entregue': 'Entregue'
    }
    return labels[status as keyof typeof labels] || status
  }

  const scoreColor = getScoreColor(score.score)

  return (
    <div className={styles.matchCard}>
      <div className={styles.matchCardHeader}>
        <div className={styles.matchCardInfo}>
          <div className={styles.matchCardImage}>
            {projeto.fotoDestaque ? (
              <img
                src={projeto.fotoDestaque}
                alt={projeto.nome}
                className={styles.imovelImage}
              />
            ) : (
              <div className={styles.placeholderImage}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="9" rx="1" stroke="#D4AF37" strokeWidth="2" />
                  <rect x="14" y="3" width="7" height="5" rx="1" stroke="#D4AF37" strokeWidth="2" />
                  <rect x="14" y="12" width="7" height="9" rx="1" stroke="#D4AF37" strokeWidth="2" />
                  <rect x="3" y="16" width="7" height="5" rx="1" stroke="#D4AF37" strokeWidth="2" />
                </svg>
              </div>
            )}
          </div>
          <div className={styles.matchCardDetails}>
            <h3>{projeto.nome}</h3>
            <p className={styles.matchCardAddress}>
              {projeto.bairro}, {projeto.cidade} - {projeto.estado}
            </p>
            <div className={styles.matchCardFeatures}>
              <span>{getStatusLabel(projeto.status)}</span>
              <span>•</span>
              <span>{projeto.construtora}</span>
              <span>•</span>
              <span>{projeto.unidadesDisponiveis} unidades</span>
              <span>•</span>
              <span>{projeto.areaPrivativaMin}-{projeto.areaPrivativaMax}m²</span>
            </div>
            <p className={styles.matchCardPrice}>
              {formatCurrency(projeto.precoMin)} - {formatCurrency(projeto.precoMax)}
            </p>
          </div>
        </div>

        <div className={styles.matchCardScore}>
          <div className={styles.thermometer}>
            <div className={styles.thermometerBar}>
              <div
                className={styles.thermometerFill}
                style={{
                  height: `${score.score}%`,
                  backgroundColor: scoreColor
                }}
              />
            </div>
            <div className={styles.thermometerLabel}>
              <span className={styles.scoreValue} style={{ color: scoreColor }}>
                {score.score}%
              </span>
              <span className={styles.scoreProbabilidade}>
                {getProbabilidadeLabel(score.probabilidadeFechamento)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.matchCardActions}>
        <button
          className={styles.detailsButton}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Ocultar' : 'Ver'} Detalhes do Match
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              transform: showDetails ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.3s ease'
            }}
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.cardActions}>
          <button className={styles.actionButtonPrimary} onClick={() => {
            const preco = projeto.precoMin
            const ato = preco * 0.15
            const mensal = preco * 0.40
            const reforco = preco * 0.30
            const reforcoPos = preco * 0.15
            const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
            onEnviarProposta({
              nomeCliente: clienteNome,
              nomeCorretor: projeto.corretorResponsavel,
              empreendimento: projeto.nome,
              torre: 'A',
              unidade: '3101',
              entregaUnidade: new Date(projeto.previsaoEntrega).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
              imobiliaria: 'DK Investimento Imobiliários',
              valorTabela: fmt(preco * 1.13),
              valorizacaoPercent: '100',
              fluxo: [
                { tipo: 'ATO', qtdeParcelas: '1', valor: fmt(ato), dataVencimento: '10/10/2024', valorTotal: fmt(ato) },
                { tipo: 'Mensal', qtdeParcelas: '60', valor: fmt(mensal / 60), dataVencimento: '10/11/2024', valorTotal: fmt(mensal) },
                { tipo: 'Reforço Semestral', qtdeParcelas: '4', valor: fmt(reforco / 4), dataVencimento: '20/06/2025', valorTotal: fmt(reforco) },
                { tipo: 'Reforço Semestral Pós chaves', qtdeParcelas: '', valor: '', dataVencimento: '', valorTotal: fmt(reforcoPos) },
              ],
            })
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Enviar Proposta
          </button>
        </div>
      </div>

      {showDetails && (
        <div className={styles.matchDetails}>
          <h4>Critérios de Matching</h4>
          <div className={styles.criteriaList}>
            {score.motivos.map((motivo, index) => (
              <div key={index} className={styles.criteriaItem}>
                <div className={styles.criteriaHeader}>
                  <span className={styles.criteriaName}>{motivo.criterio}</span>
                  <div className={styles.criteriaStatus}>
                    {motivo.match ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="#10B981"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M18 6L6 18M6 6L18 18"
                          stroke="#EF4444"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <span style={{ color: motivo.match ? '#10B981' : '#EF4444' }}>
                      {motivo.match ? 'Compatível' : 'Não compatível'}
                    </span>
                  </div>
                </div>
                <div className={styles.criteriaWeight}>
                  <div className={styles.criteriaWeightBar}>
                    <div
                      className={styles.criteriaWeightFill}
                      style={{
                        width: `${(motivo.peso / 10) * 100}%`,
                        backgroundColor: motivo.match ? '#10B981' : '#EF4444'
                      }}
                    />
                  </div>
                  <span>Peso: {motivo.peso}/10</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.imovelCaracteristicas}>
            <h4>Informações do Projeto</h4>
            <div className={styles.caracteristicasTags}>
              <span className={styles.caracteristicaTag}>
                {projeto.percentualConcluido}% concluído
              </span>
              <span className={styles.caracteristicaTag}>
                Entrega: {new Date(projeto.previsaoEntrega).toLocaleDateString('pt-BR')}
              </span>
              <span className={styles.caracteristicaTag}>
                {projeto.totalUnidades} unidades totais
              </span>
              {projeto.aceitaFinanciamento && (
                <span className={styles.caracteristicaTag}>
                  Aceita financiamento
                </span>
              )}
            </div>
            <h4 style={{ marginTop: '16px' }}>Tipos de Unidades</h4>
            <div className={styles.caracteristicasTags}>
              {projeto.tiposUnidades.map((tipo, index) => (
                <span key={index} className={styles.caracteristicaTag}>
                  {tipo}
                </span>
              ))}
            </div>
            <h4 style={{ marginTop: '16px' }}>Áreas de Lazer</h4>
            <div className={styles.caracteristicasTags}>
              {projeto.areasLazer.map((area, index) => (
                <span key={index} className={styles.caracteristicaTag}>
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
