import { Button, Form, FormProps, Input } from 'antd'
import { FC, useState } from 'react'
import { IVenueBody } from '@interfaces/venue/venue.interface'
import { createVenueRequest } from '@rtk/venue/venue.api'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@rtk/store'
import Notify from 'src/components/notifications/Notify'

type FieldType = {
  name?: string
  address?: string
}

const VendorDashboardIndex: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [status, setStatus] = useState({
    success: false,
    error: false,
    description: '',
  })

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    // console.log('Success:', values)
    dispatch(createVenueRequest(values as IVenueBody))
      .then(() => {
        setStatus({
          ...status,
          success: true,
          description: 'Successfully added',
        })
      })
      .catch(() => {
        setStatus({
          ...status,
          error: true,
          description: 'Failed to add a new venue',
        })
      })
  }
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo)
    setStatus({
      ...status,
      error: true,
      description: 'Failed! Please try again',
    })
  }

  return (
    <>
      <h2 className='text-gray-700 font-semibold text-2xl uppercase mb-2 text-blue-500'>
        Add New
      </h2>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input your venue name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Address'
          name='address'
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
          <Notify
            trigger={status.success === true}
            message='Successfully added'
            classes='bg-green-100 text-green-600'
            description={status.description}
            duration={5}
          />
          <Notify
            trigger={status.error === true}
            message='Failed!'
            classes='bg-red-100 text-red-600'
            description={status.description}
            duration={5}
          />
        </Form.Item>
      </Form>
    </>
  )
}

export default VendorDashboardIndex
