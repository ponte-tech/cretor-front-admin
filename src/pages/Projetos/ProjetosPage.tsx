import { useState } from 'react'
import { Column } from '../../components/Table/Table'
import Table from '../../components/Table/Table'
import Modal from '../../components/Modal/Modal'
import Button from '../../components/Button/Button'
import DeleteConfirmDialog from '../../components/DeleteConfirmDialog/DeleteConfirmDialog'
import { Projeto } from '../../types/projeto'
import { projetosMock } from '../../data/projetos.mock'
import ProjetoForm from './ProjetoForm'
import styles from './ProjetosPage.module.css'

export default function ProjetosPage() {
  const [projetos, setProjetos] = useState<Projeto[]>(projetosMock)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProjeto, setSelectedProjeto] = useState<Projeto | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [projetoToDelete, setProjetoToDelete] = useState<Projeto | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredProjetos = projetos.filter((projeto) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      projeto.nome.toLowerCase().includes(searchLower) ||
      projeto.construtora.toLowerCase().includes(searchLower) ||
      projeto.bairro.toLowerCase().includes(searchLower) ||
      projeto.cidade.toLowerCase().includes(searchLower)
    )
  })

  const handleAddProjeto = () => {
    setSelectedProjeto(null)
    setIsModalOpen(true)
  }

  const handleEditProjeto = (projeto: Projeto) => {
    setSelectedProjeto(projeto)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (projeto: Projeto) => {
    setProjetoToDelete(projeto)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!projetoToDelete) return

    try {
      setIsDeleting(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setProjetos(projetos.filter((p) => p.id !== projetoToDelete.id))
      setIsDeleteDialogOpen(false)
      setProjetoToDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false)
    setProjetoToDelete(null)
  }

  const handleSaveProjeto = (projetoData: Partial<Projeto>) => {
    if (selectedProjeto) {
      setProjetos(
        projetos.map((p) =>
          p.id === selectedProjeto.id
            ? { ...p, ...projetoData, ultimaAtualizacao: new Date().toISOString().split('T')[0] }
            : p
        )
      )
    } else {
      const newProjeto: Projeto = {
        id: String(Date.now()),
        ...projetoData,
        dataCadastro: new Date().toISOString().split('T')[0],
        ultimaAtualizacao: new Date().toISOString().split('T')[0]
      } as Projeto
      setProjetos([...projetos, newProjeto])
    }
    setIsModalOpen(false)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value)
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      lancamento: '#f59e0b',
      em_construcao: '#3b82f6',
      pronto: '#10b981',
      entregue: '#64748b'
    }

    const labels: Record<string, string> = {
      lancamento: 'Lançamento',
      em_construcao: 'Em Construção',
      pronto: 'Pronto',
      entregue: 'Entregue'
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
        {labels[status]}
      </span>
    )
  }

  const getTipoEmpreendimentoBadge = (tipo: string) => {
    const colors: Record<string, string> = {
      residencial: '#10b981',
      comercial: '#3b82f6',
      misto: '#8b5cf6'
    }

    const labels: Record<string, string> = {
      residencial: 'Residencial',
      comercial: 'Comercial',
      misto: 'Misto'
    }

    return (
      <span
        style={{
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600',
          backgroundColor: `${colors[tipo]}20`,
          color: colors[tipo]
        }}
      >
        {labels[tipo]}
      </span>
    )
  }

  const columns: Column<Projeto>[] = [
    {
      key: 'fotoDestaque',
      header: 'Projeto',
      render: (projeto) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={projeto.fotoDestaque}
            alt={projeto.nome}
            style={{
              width: '80px',
              height: '60px',
              borderRadius: '8px',
              objectFit: 'cover',
              border: '2px solid rgba(212, 175, 55, 0.3)'
            }}
          />
          <div>
            <div style={{ fontWeight: '500', marginBottom: '4px' }}>{projeto.nome}</div>
            <div style={{ fontSize: '12px', color: '#B8A898' }}>{projeto.construtora}</div>
          </div>
        </div>
      )
    },
    {
      key: 'bairro',
      header: 'Localização',
      width: '180px',
      render: (projeto) => (
        <div>
          <div style={{ fontWeight: '500' }}>{projeto.bairro}</div>
          <div style={{ fontSize: '12px', color: '#B8A898' }}>
            {projeto.cidade}/{projeto.estado}
          </div>
        </div>
      )
    },
    {
      key: 'tipoEmpreendimento',
      header: 'Tipo',
      width: '120px',
      render: (projeto) => getTipoEmpreendimentoBadge(projeto.tipoEmpreendimento)
    },
    {
      key: 'unidades',
      header: 'Unidades',
      width: '120px',
      render: (projeto) => (
        <div style={{ fontSize: '13px' }}>
          <div style={{ fontWeight: '500' }}>{projeto.unidadesDisponiveis} disponíveis</div>
          <div style={{ color: '#B8A898' }}>de {projeto.totalUnidades} total</div>
        </div>
      )
    },
    {
      key: 'precos',
      header: 'Faixa de Preço',
      width: '160px',
      render: (projeto) => (
        <div style={{ fontSize: '13px' }}>
          <div>{formatCurrency(projeto.precoMin)}</div>
          <div style={{ color: '#B8A898' }}>a {formatCurrency(projeto.precoMax)}</div>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      width: '130px',
      render: (projeto) => getStatusBadge(projeto.status)
    },
    {
      key: 'percentualConcluido',
      header: 'Progresso',
      width: '120px',
      render: (projeto) => (
        <div>
          <div style={{ fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>
            {projeto.percentualConcluido}%
          </div>
          <div
            style={{
              width: '100%',
              height: '6px',
              background: 'rgba(212, 175, 55, 0.2)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${projeto.percentualConcluido}%`,
                height: '100%',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F5C563 100%)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Ações',
      width: '120px',
      render: (projeto) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleEditProjeto(projeto)
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
              handleDeleteClick(projeto)
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
          <h1 className={styles.title}>Projetos Imobiliários</h1>
          <p className={styles.subtitle}>Gerencie os empreendimentos e lançamentos na planta</p>
        </div>
        <Button onClick={handleAddProjeto}>
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
          Novo Projeto
        </Button>
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
          placeholder="Buscar por nome, construtora, bairro ou cidade..."
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
        data={filteredProjetos}
        onRowClick={handleEditProjeto}
        emptyMessage={
          searchTerm
            ? 'Nenhum projeto encontrado com os termos de busca'
            : 'Nenhum projeto cadastrado. Clique em "Novo Projeto" para começar.'
        }
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedProjeto ? 'Editar Projeto' : 'Novo Projeto'}
        size="xlarge"
      >
        <ProjetoForm
          initialData={selectedProjeto || undefined}
          onSave={handleSaveProjeto}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={projetoToDelete?.nome || ''}
        itemType="este projeto"
        loading={isDeleting}
      />
    </div>
  )
}
