import { ReactNode } from 'react'
import styles from './DeleteConfirmDialog.module.css'

interface DeleteConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void | Promise<void>
  itemName: string
  itemType?: string
  loading?: boolean
}

export default function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType = 'este item',
  loading = false
}: DeleteConfirmDialogProps) {
  if (!isOpen) return null

  const handleConfirm = async () => {
    await onConfirm()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          {/* Avatar/Icon */}
          <div className={styles.iconContainer}>
            <div className={styles.icon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Texts */}
          <div className={styles.texts}>
            <h2 className={styles.title}>
              Tem certeza que deseja <br /> excluir {itemType}?
            </h2>
            <p className={styles.subtitle}>
              Você removerá todos os dados relacionados a{' '}
              <span className={styles.itemName}>{itemName}</span>, tudo bem?
            </p>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.confirmButton}
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? 'Excluindo...' : 'Sim, excluir'}
            </button>

            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={loading}
            >
              Cancelar e voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
