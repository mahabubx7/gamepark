import { BaseModal } from './Modal'

interface DeleteItemModalProps {
  title: string
  openElement: React.ReactNode | string
  modalContent?: React.ReactNode | string
  onConfirm: () => void
}

export const DeleteItemModal = (props: DeleteItemModalProps) => {
  return (
    <BaseModal
      title={props.title}
      onConfirm={props.onConfirm}
      OpenElement={props.openElement}
      ModalContent={
        props.modalContent ?? 'Are you sure you want to delete this item?'
      }
    />
  )
}
