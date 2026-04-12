import Modal from '../Modal/Modal'
import PropostaForm from './PropostaForm'
import type { PropostaInitialData } from './PropostaForm'

export type { FluxoRow, PropostaData, PropostaInitialData } from './PropostaForm'

interface PropostaModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: PropostaInitialData
}

export default function PropostaModal({
  isOpen,
  onClose,
  initialData = {},
}: PropostaModalProps) {
  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gerar Proposta" size="xlarge">
      <PropostaForm initialData={initialData} onCancel={onClose} />
    </Modal>
  )
}
