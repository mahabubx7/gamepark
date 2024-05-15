/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Button, Modal } from 'antd'

interface BaseModalProps {
  title: string
  OpenElement: React.ReactNode | string
  ModalContent: React.ReactNode | string
  onConfirm: () => void
  noOk?: boolean
  okButtonProps?: any
  cancelButtonProps?: any
}

export const BaseModal = ({
  title,
  OpenElement,
  ModalContent,
  noOk = true,
  okButtonProps,
  cancelButtonProps,
  onConfirm,
}: BaseModalProps) => {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
      onConfirm() // calling given function
    }, 2000)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        type='default'
        className='border-0 p-0 m-1 inline-flex justify-content items-center'
        onClick={showModal}
      >
        {OpenElement}
      </Button>
      <Modal
        title={title}
        open={open}
        onOk={noOk ? handleOk : undefined}
        confirmLoading={noOk ? confirmLoading : undefined}
        onCancel={handleCancel}
        okButtonProps={okButtonProps}
        cancelButtonProps={cancelButtonProps}
      >
        {ModalContent}
      </Modal>
    </>
  )
}
