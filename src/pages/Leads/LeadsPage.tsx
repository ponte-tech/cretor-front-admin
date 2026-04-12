import { useState, useEffect } from 'react'
import Table from '../../components/Table/Table'
import Modal from '../../components/Modal/Modal'
import Button from '../../components/Button/Button'
import DeleteConfirmDialog from '../../components/DeleteConfirmDialog/DeleteConfirmDialog'
import LeadForm from './LeadForm'
import { leadsApi, LeadResponse } from '../../services/api'
import styles from './LeadsPage.module.css'

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => React.ReactNode
  width?: string
}

const STATUS_COLORS: Record<string, string> = {
  novo: '#3b82f6',
  contatado: '#f59e0b',
  qualificado: '#10b981',
  convertido: '#8b5cf6',
  descartado: '#ef4444',
}

const PRAZO_LABELS: Record<string, string> = {
  'imediatamente': 'Imediatamente',
  'ate-3-meses': 'Ate 3 meses',
  '3-a-6-meses': '3 a 6 meses',
  'pesquisando': 'Pesquisando',
}

const MAN_AVATARS = ['3', '5', '8', '11', '12', '13', '17', '19', '22', '24', '26', '29', '31', '33', '34', '36', '37', '42', '43', '46', '49', '53', '54', '55', '59', '64', '65']
const WOMAN_AVATARS = ['1', '2', '4', '6', '7', '9', '10', '14', '15', '16', '18', '20', '21', '23', '25', '27', '28', '30', '32', '35', '38', '39', '40', '41', '44', '45', '47', '48', '50', '51', '52', '56', '57', '58', '60', '61', '62', '63', '66']
const ALL_AVATARS = [
  ...MAN_AVATARS.map(n => `/avatares/man/${n}.png`),
  ...WOMAN_AVATARS.map(n => `/avatares/woman/${n}.png`),
]

function getAvatar(id: string): string {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i)
    hash |= 0
  }
  return ALL_AVATARS[Math.abs(hash) % ALL_AVATARS.length]
}

const PAGAMENTO_LABELS: Record<string, string> = {
  'financiamento': 'Financiamento',
  'a-vista': 'A vista',
  'fgts-financiamento': 'FGTS + Financiamento',
  'nao-decidi': 'Nao decidi',
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<LeadResponse | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [leadToDelete, setLeadToDelete] = useState<LeadResponse | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchLeads = async () => {
    setIsLoading(true)
    try {
      const data = await leadsApi.list()
      setLeads(data)
    } catch (error) {
      console.error('Erro ao buscar leads:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const handleAddLead = () => {
    setSelectedLead(null)
    setIsModalOpen(true)
  }

  const handleEditLead = (lead: LeadResponse) => {
    setSelectedLead(lead)
    setIsModalOpen(true)
  }

  const handleSaveLead = async (data: { nome: string; whatsapp: string; email: string; prazo: string; forma_pagamento: string; status: string }) => {
    try {
      if (selectedLead) {
        await leadsApi.update(selectedLead.id, data)
      } else {
        await leadsApi.create(data)
      }
      setIsModalOpen(false)
      fetchLeads()
    } catch (error) {
      console.error('Erro ao salvar lead:', error)
    }
  }

  const handleDeleteClick = (lead: LeadResponse) => {
    setLeadToDelete(lead)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!leadToDelete) return
    setIsDeleting(true)
    try {
      await leadsApi.delete(leadToDelete.id)
      setLeads(prev => prev.filter(l => l.id !== leadToDelete.id))
      setIsDeleteDialogOpen(false)
      setLeadToDelete(null)
    } catch (error) {
      console.error('Erro ao deletar lead:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const color = STATUS_COLORS[status] || '#B8A898'
    return (
      <span style={{
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        backgroundColor: `${color}20`,
        color: color,
      }}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const filteredLeads = leads.filter((lead) => {
    const s = searchTerm.toLowerCase()
    return (
      lead.nome.toLowerCase().includes(s) ||
      lead.email.toLowerCase().includes(s) ||
      lead.whatsapp.includes(searchTerm)
    )
  })

  const columns: Column<LeadResponse>[] = [
    {
      key: 'nome',
      header: 'Lead',
      render: (lead) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={getAvatar(lead.id)}
            alt={lead.nome}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid rgba(212, 175, 55, 0.3)',
              flexShrink: 0,
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontWeight: '600', color: '#FFFFFF' }}>{lead.nome}</span>
            <span style={{ fontSize: '12px', color: '#B8A898' }}>{lead.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'whatsapp',
      header: 'WhatsApp',
      width: '150px',
    },
    {
      key: 'prazo',
      header: 'Prazo',
      width: '140px',
      render: (lead) => (
        <span style={{ fontSize: '13px', color: '#d4ccc4' }}>
          {PRAZO_LABELS[lead.prazo] || lead.prazo}
        </span>
      ),
    },
    {
      key: 'forma_pagamento',
      header: 'Pagamento',
      width: '160px',
      render: (lead) => (
        <span style={{ fontSize: '13px', color: '#d4ccc4' }}>
          {PAGAMENTO_LABELS[lead.forma_pagamento] || lead.forma_pagamento}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      width: '120px',
      render: (lead) => getStatusBadge(lead.status),
    },
    {
      key: 'created_at',
      header: 'Data',
      width: '100px',
      render: (lead) => (
        <span style={{ fontSize: '12px', color: '#B8A898' }}>
          {new Date(lead.created_at).toLocaleDateString('pt-BR')}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Acoes',
      width: '100px',
      render: (lead) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={styles.actionButton}
            onClick={(e) => { e.stopPropagation(); handleEditLead(lead) }}
            title="Editar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className={styles.actionButton}
            onClick={(e) => { e.stopPropagation(); handleDeleteClick(lead) }}
            title="Excluir"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Leads</h1>
          <p className={styles.subtitle}>{leads.length} leads cadastrados</p>
        </div>
        <div className={styles.headerButtons}>
          <Button variant="primary" onClick={handleAddLead}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Novo Lead
          </Button>
        </div>
      </div>

      <div className={styles.searchBar}>
        <div className={styles.searchIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Buscar por nome, email ou whatsapp..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className={styles.clearButton} onClick={() => setSearchTerm('')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Desktop: Table */}
      <div className={styles.desktopOnly}>
        <Table
          columns={columns}
          data={filteredLeads}
          onRowClick={handleEditLead}
          isLoading={isLoading}
          emptyMessage={searchTerm ? 'Nenhum lead encontrado para esta busca.' : 'Nenhum lead cadastrado ainda.'}
        />
      </div>

      {/* Mobile: Cards */}
      <div className={styles.mobileOnly}>
        {isLoading ? (
          <div className={styles.mobileLoading}>Carregando...</div>
        ) : filteredLeads.length === 0 ? (
          <div className={styles.mobileEmpty}>
            {searchTerm ? 'Nenhum lead encontrado.' : 'Nenhum lead cadastrado ainda.'}
          </div>
        ) : (
          <div className={styles.cardList}>
            {filteredLeads.map((lead) => (
              <div key={lead.id} className={styles.card} onClick={() => handleEditLead(lead)}>
                <div className={styles.cardTop}>
                  <div className={styles.cardInfo}>
                    <img src={getAvatar(lead.id)} alt={lead.nome} className={styles.cardAvatar} />
                    <div className={styles.cardName}>
                      <span className={styles.cardNome}>{lead.nome}</span>
                      <span className={styles.cardEmail}>{lead.email}</span>
                    </div>
                  </div>
                  {getStatusBadge(lead.status)}
                </div>
                <div className={styles.cardBottom}>
                  <div className={styles.cardMeta}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    <span>{lead.whatsapp}</span>
                  </div>
                  <div className={styles.cardMeta}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8A898" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{PRAZO_LABELS[lead.prazo] || lead.prazo}</span>
                  </div>
                </div>
                <div className={styles.cardActions}>
                  <button
                    className={styles.cardAction}
                    onClick={(e) => { e.stopPropagation(); handleEditLead(lead) }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Editar
                  </button>
                  <a
                    className={styles.cardAction}
                    href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: '#25D366' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                  <button
                    className={styles.cardAction}
                    onClick={(e) => { e.stopPropagation(); handleDeleteClick(lead) }}
                    style={{ color: '#ef4444' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedLead ? 'Editar Lead' : 'Novo Lead'}
        size="medium"
      >
        <LeadForm
          initialData={selectedLead || undefined}
          onSave={handleSaveLead}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => { setIsDeleteDialogOpen(false); setLeadToDelete(null) }}
        onConfirm={handleDeleteConfirm}
        itemName={leadToDelete?.nome || ''}
        itemType="este lead"
        loading={isDeleting}
      />
    </div>
  )
}
