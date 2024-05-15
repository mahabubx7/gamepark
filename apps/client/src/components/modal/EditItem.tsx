import { BaseModal } from './Modal'

interface EditItemModalProps {
  title: string
  openElement: React.ReactNode | string
  modalContent?: React.ReactNode | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirm: (...args: any) => void
}

export const EditItemModal = (props: EditItemModalProps) => {
  return (
    <BaseModal
      title={props.title}
      noOk={false}
      onConfirm={props.onConfirm}
      OpenElement={props.openElement}
      ModalContent={props.modalContent ?? 'Are you sure?'}
      okButtonProps={{
        disabled: true,
        loading: false,
        className: 'hidden h-0',
      }}
      cancelButtonProps={{
        disabled: true,
        loading: false,
        className: 'hidden h-0',
      }}
    />
  )
}
