/* eslint-disable @typescript-eslint/no-explicit-any */
import { IVenue, IVenueEditable } from '@interfaces/venue/venue.interface'
import { Button, Form, Input } from 'antd'

interface EditVenueFormProps {
  venue: IVenue
  onUpdate: (venue: IVenueEditable, uid: string) => void
  onFail?: () => void
}

type FieldType = {
  name?: string
  address?: string
}

export const EditVenueForm = (props: EditVenueFormProps) => {
  const onFinish = (values: FieldType) => {
    console.log('Success:', values)
    props.onUpdate(values as IVenueEditable, props.venue.uid)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
    if (props.onFail) {
      props.onFail()
    }
  }

  return (
    <>
      <h4 className='text-gray-700 font-semibold text-2xl uppercase mb-2 text-blue-500'>
        UID: [{props.venue.uid}]
      </h4>

      <Form
        name={`edit_venue_form_${props.venue.uid}`}
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
          rules={[{ required: false }]}
          initialValue={props.venue.name}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Address'
          name='address'
          rules={[{ required: false }]}
          initialValue={props.venue.address}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
