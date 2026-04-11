import { useState } from 'react'
import { Column } from '../../components/Table/Table'
import Table from '../../components/Table/Table'
import Modal from '../../components/Modal/Modal'
import Button from '../../components/Button/Button'
import DeleteConfirmDialog from '../../components/DeleteConfirmDialog/DeleteConfirmDialog'
import { Cliente } from '../../types/cliente'
import { clientesMock } from '../../data/clientes.mock'
import ClienteForm from './ClienteForm'
import styles from './ClientesPage.module.css'

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>(clientesMock)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [clienteToDelete, setClienteToDelete] = useState<Cliente | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [generatedLink, setGeneratedLink] = useState('')

  const filteredClientes = clientes.filter((cliente) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      cliente.nome.toLowerCase().includes(searchLower) ||
      cliente.email.toLowerCase().includes(searchLower) ||
      cliente.telefone.includes(searchTerm)
    )
  })

  const handleAddCliente = () => {
    setSelectedCliente(null)
    setIsModalOpen(true)
  }

  const handleEditCliente = (cliente: Cliente) => {
    setSelectedCliente(cliente)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (cliente: Cliente) => {
    setClienteToDelete(cliente)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!clienteToDelete) return

    try {
      setIsDeleting(true)
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      setClientes(clientes.filter((c) => c.id !== clienteToDelete.id))
      setIsDeleteDialogOpen(false)
      setClienteToDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false)
    setClienteToDelete(null)
  }

  const handleGenerateLink = () => {
    // Generate a unique token for the self-service link
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const link = `${window.location.origin}/cadastro/${token}`
    setGeneratedLink(link)
    setIsLinkModalOpen(true)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink)
  }

  const handleSaveCliente = (clienteData: Partial<Cliente>) => {
    if (selectedCliente) {
      // Edit existing
      setClientes(
        clientes.map((c) =>
          c.id === selectedCliente.id
            ? { ...c, ...clienteData, ultimaAtualizacao: new Date().toISOString().split('T')[0] }
            : c
        )
      )
    } else {
      // Add new
      const newCliente: Cliente = {
        id: String(Date.now()),
        ...clienteData,
        dataCadastro: new Date().toISOString().split('T')[0],
        ultimaAtualizacao: new Date().toISOString().split('T')[0]
      } as Cliente
      setClientes([...clientes, newCliente])
    }
    setIsModalOpen(false)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      ativo: '#10b981',
      inativo: '#ef4444',
      prospecto: '#f59e0b',
      cliente: '#3b82f6'
    }

    return (
      <span
        style={{
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600',
          backgroundColor: `${colors[status]}20`,
          color: colors[status]
        }}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getUrgenciaBadge = (urgencia: string) => {
    const colors: Record<string, string> = {
      baixa: '#10b981',
      media: '#f59e0b',
      alta: '#ef4444'
    }

    return (
      <span
        style={{
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600',
          backgroundColor: `${colors[urgencia]}20`,
          color: colors[urgencia]
        }}
      >
        {urgencia.charAt(0).toUpperCase() + urgencia.slice(1)}
      </span>
    )
  }

  const columns: Column<Cliente>[] = [
    {
      key: 'nome',
      header: 'Cliente',
      render: (cliente) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {cliente.foto ? (
            <img
              src={cliente.foto}
              alt={cliente.nome}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid rgba(212, 175, 55, 0.3)'
              }}
            />
          ) : (
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F5C563 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              {cliente.nome
                .split(' ')
                .map((n) => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase()}
            </div>
          )}
          <div>
            <div style={{ fontWeight: '500' }}>{cliente.nome}</div>
            <div style={{ fontSize: '12px', color: '#B8A898' }}>{cliente.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'telefone',
      header: 'Telefone',
      width: '140px'
    },
    {
      key: 'profissao',
      header: 'Profissão',
      width: '150px'
    },
    {
      key: 'orcamentoMin',
      header: 'Orçamento',
      width: '200px',
      render: (cliente) => (
        <div style={{ fontSize: '13px' }}>
          {formatCurrency(cliente.orcamentoMin)} - {formatCurrency(cliente.orcamentoMax)}
        </div>
      )
    },
    {
      key: 'urgencia',
      header: 'Urgência',
      width: '100px',
      render: (cliente) => getUrgenciaBadge(cliente.urgencia)
    },
    {
      key: 'status',
      header: 'Status',
      width: '120px',
      render: (cliente) => getStatusBadge(cliente.status)
    },
    {
      key: 'responsavel',
      header: 'Responsável',
      width: '150px'
    },
    {
      key: 'actions',
      header: 'Ações',
      width: '120px',
      render: (cliente) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleEditCliente(cliente)
            }}
            className={styles.actionButton}
            title="Editar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteClick(cliente)
            }}
            className={styles.actionButton}
            title="Excluir"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6H5H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Clientes</h1>
          <p className={styles.subtitle}>Gerencie sua carteira de clientes de alto padrão</p>
        </div>
        <div className={styles.headerButtons}>
          <Button variant="outline" onClick={handleGenerateLink}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginRight: '8px' }}
            >
              <path
                d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6898C16.4231 14.4392 17.0331 14.0471 17.54 13.54L20.54 10.54C21.4508 9.59702 21.9548 8.33362 21.9434 7.02217C21.932 5.71072 21.4061 4.45601 20.4791 3.52903C19.5521 2.60205 18.2974 2.07605 16.986 2.06464C15.6745 2.05322 14.4111 2.55724 13.468 3.46802L11.75 5.17999M14 11C13.5705 10.4259 13.0226 9.95077 12.3934 9.60706C11.7643 9.26335 11.0685 9.05889 10.3533 9.00773C9.63816 8.95656 8.92037 9.05961 8.24861 9.3102C7.57685 9.56079 6.96689 9.9529 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04515 15.6664 2.05657 16.9778C2.06798 18.2893 2.59399 19.544 3.52097 20.471C4.44795 21.398 5.70266 21.924 7.01411 21.9354C8.32556 21.9468 9.58897 21.4428 10.532 20.532L12.243 18.82"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Gerar Link
          </Button>
          <Button onClick={handleAddCliente}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginRight: '8px' }}
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Novo Cliente
          </Button>
        </div>
      </div>

      <div className={styles.searchBar}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.searchIcon}>
          <circle
            cx="11"
            cy="11"
            r="8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21L16.65 16.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          placeholder="Buscar por nome, email ou telefone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <button className={styles.clearButton} onClick={() => setSearchTerm('')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      <Table
        columns={columns}
        data={filteredClientes}
        onRowClick={handleEditCliente}
        emptyMessage={
          searchTerm
            ? 'Nenhum cliente encontrado com os termos de busca'
            : 'Nenhum cliente cadastrado. Clique em "Novo Cliente" para começar.'
        }
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCliente ? 'Editar Cliente' : 'Novo Cliente'}
        size="xlarge"
      >
        <ClienteForm
          initialData={selectedCliente || undefined}
          onSave={handleSaveCliente}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={clienteToDelete?.nome || ''}
        itemType="este cliente"
        loading={isDeleting}
      />

      <Modal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        title="Link de Auto-Atendimento Gerado"
        size="medium"
      >
        <div style={{ padding: '16px 0' }}>
          <p style={{ color: '#B8A898', marginBottom: '24px', fontSize: '14px' }}>
            Compartilhe este link com seus clientes para que eles possam se cadastrar autonomamente e informar suas preferências de imóvel.
          </p>

          <div style={{
            background: 'rgba(20, 16, 12, 0.5)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
            wordBreak: 'break-all',
            color: '#F5C563',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}>
            {generatedLink}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button onClick={handleCopyLink} style={{ flex: 1 }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginRight: '8px' }}
              >
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Copiar Link
            </Button>
            <Button variant="outline" onClick={() => window.open(generatedLink, '_blank')} style={{ flex: 1 }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginRight: '8px' }}
              >
                <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Abrir Link
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
