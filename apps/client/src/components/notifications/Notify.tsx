import { notification } from 'antd'

interface NotificationProps {
  message: string
  description: string
  trigger: boolean
  duration?: number
  classes?: string
}

const Notify = (props: NotificationProps) => {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = () => {
    api.open({
      message: props.message,
      description: props.description,
      duration: props.duration ?? 5,
      className: props.classes ?? '',
      placement: 'topLeft',
      role: 'alert',
    })
  }

  return (
    <>
      {contextHolder}
      {props.trigger && openNotification()}
    </>
  )
}

export default Notify
