import { useState } from 'react'
import { Column } from '../../components/Table/Table'
import Table from '../../components/Table/Table'
import Modal from '../../components/Modal/Modal'
import Button from '../../components/Button/Button'
import DeleteConfirmDialog from '../../components/DeleteConfirmDialog/DeleteConfirmDialog'
import { Imovel } from '../../types/imovel'
import { imoveis as imoveisMock } from '../../data/imoveis.mock'
import ImovelForm from './ImovelForm'
import styles from './ImoveisPage.module.css'

export default function ImoveisPage() {
  const [imoveis, setImoveis] = useState<Imovel[]>(imoveisMock)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImovel, setSelectedImovel] = useState<Imovel | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [imovelToDelete, setImovelToDelete] = useState<Imovel | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const filteredImoveis = imoveis.filter((imovel) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      imovel.endereco.toLowerCase().includes(searchLower) ||
      imovel.bairro.toLowerCase().includes(searchLower) ||
      imovel.cidade.toLowerCase().includes(searchLower) ||
      imovel.tipo.toLowerCase().includes(searchLower) ||
      imovel.titulo.toLowerCase().includes(searchLower)
    )
  })

  const handleAddImovel = () => {
    setSelectedImovel(null)
    setIsModalOpen(true)
  }

  const handleEditImovel = (imovel: Imovel) => {
    setSelectedImovel(imovel)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (imovel: Imovel) => {
    setImovelToDelete(imovel)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!imovelToDelete) return

    try {
      setIsDeleting(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setImoveis(imoveis.filter((i) => i.id !== imovelToDelete.id))
      setIsDeleteDialogOpen(false)
      setImovelToDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false)
    setImovelToDelete(null)
  }

  const handleSaveImovel = (imovelData: Partial<Imovel>) => {
    if (selectedImovel) {
      setImoveis(
        imoveis.map((i) =>
          i.id === selectedImovel.id
            ? { ...i, ...imovelData, ultimaAtualizacao: new Date().toISOString().split('T')[0] }
            : i
        )
      )
    } else {
      const newImovel: Imovel = {
        id: String(Date.now()),
        ...imovelData,
        dataCadastro: new Date().toISOString().split('T')[0],
        ultimaAtualizacao: new Date().toISOString().split('T')[0]
      } as Imovel
      setImoveis([...imoveis, newImovel])
    }
    setIsModalOpen(false)
  }

  const formatCurrency = (value?: number) => {
    if (!value) return '-'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getTipoNegocioBadge = (tipo: string) => {
    const colors: Record<string, string> = {
      venda: '#10b981',
      locacao: '#3b82f6',
      ambos: '#f59e0b'
    }

    const labels: Record<string, string> = {
      venda: 'Venda',
      locacao: 'Locação',
      ambos: 'Venda/Locação'
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

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      disponivel: '#10b981',
      vendido: '#64748b',
      alugado: '#3b82f6',
      negociacao: '#f59e0b',
      reservado: '#8b5cf6'
    }

    const labels: Record<string, string> = {
      disponivel: 'Disponível',
      vendido: 'Vendido',
      alugado: 'Alugado',
      negociacao: 'Em Negociação',
      reservado: 'Reservado'
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

  const getTipoImovelLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      apartamento: 'Apartamento',
      casa: 'Casa',
      terreno: 'Terreno',
      sala_comercial: 'Sala Comercial',
      galpao: 'Galpão',
      cobertura: 'Cobertura',
      studio: 'Studio'
    }
    return labels[tipo] || tipo
  }

  const columns: Column<Imovel>[] = [
    {
      key: 'fotoDestaque',
      header: 'Imóvel',
      render: (imovel) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {imovel.fotos && imovel.fotos.length > 0 ? (
            <img
              src={imovel.fotos[0]}
              alt={imovel.titulo}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '8px',
                objectFit: 'cover',
                border: '2px solid rgba(212, 175, 55, 0.3)'
              }}
            />
          ) : (
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%)',
                border: '2px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
          <div>
            <div style={{ fontWeight: '500' }}>{getTipoImovelLabel(imovel.tipo)}</div>
            <div style={{ fontSize: '12px', color: '#B8A898' }}>
              {imovel.endereco}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'bairro',
      header: 'Localização',
      width: '180px',
      render: (imovel) => (
        <div>
          <div style={{ fontWeight: '500' }}>{imovel.bairro}</div>
          <div style={{ fontSize: '12px', color: '#B8A898' }}>{imovel.cidade}/{imovel.estado}</div>
        </div>
      )
    },
    {
      key: 'area',
      header: 'Área',
      width: '100px',
      render: (imovel) => `${imovel.area}m²`
    },
    {
      key: 'quartos',
      header: 'Quartos',
      width: '80px',
      render: (imovel) => imovel.quartos > 0 ? imovel.quartos : '-'
    },
    {
      key: 'tipoNegocio',
      header: 'Tipo',
      width: '140px',
      render: (imovel) => getTipoNegocioBadge(imovel.tipoNegocio)
    },
    {
      key: 'valorVenda',
      header: 'Valor',
      width: '150px',
      render: (imovel) => (
        <div style={{ fontSize: '13px' }}>
          {imovel.valorVenda && <div>{formatCurrency(imovel.valorVenda)}</div>}
          {imovel.valorLocacao && (
            <div style={{ color: '#B8A898' }}>{formatCurrency(imovel.valorLocacao)}/mês</div>
          )}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      width: '130px',
      render: (imovel) => getStatusBadge(imovel.status)
    },
    {
      key: 'corretorResponsavel',
      header: 'Corretor',
      width: '150px'
    },
    {
      key: 'actions',
      header: 'Ações',
      width: '120px',
      render: (imovel) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleEditImovel(imovel)
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
              handleDeleteClick(imovel)
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
          <h1 className={styles.title}>Imóveis</h1>
          <p className={styles.subtitle}>Gerencie seu portfólio de imóveis de alto padrão</p>
        </div>
        <Button onClick={handleAddImovel}>
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
          Novo Imóvel
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
          placeholder="Buscar por endereço, bairro, cidade ou tipo..."
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
        data={filteredImoveis}
        onRowClick={handleEditImovel}
        emptyMessage={
          searchTerm
            ? 'Nenhum imóvel encontrado com os termos de busca'
            : 'Nenhum imóvel cadastrado. Clique em "Novo Imóvel" para começar.'
        }
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedImovel ? 'Editar Imóvel' : 'Novo Imóvel'}
        size="xlarge"
      >
        <ImovelForm
          initialData={selectedImovel || undefined}
          onSave={handleSaveImovel}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={`${getTipoImovelLabel(imovelToDelete?.tipo || 'apartamento')} - ${imovelToDelete?.endereco || ''}`}
        itemType="este imóvel"
        loading={isDeleting}
      />
    </div>
  )
}
