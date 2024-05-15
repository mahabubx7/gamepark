/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Form,
  FormProps,
  Input,
  Select,
  // TimePicker,
  Upload,
} from 'antd'
import { FC, useEffect, useState } from 'react'
import { ISportType, IVenueBody } from '@interfaces/venue/venue.interface'
import { createVenueRequest } from '@rtk/venue/venue.api'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@rtk/store'
import Notify from 'src/components/notifications/Notify'
import { TiUploadOutline } from 'react-icons/ti'

type FieldType = {
  name?: string
  address?: string
  coverImage?: string
  workDays?: string[]
  // hourRange?: any
  sportTypes?: number[]
}

const VendorDashboardIndex: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [status, setStatus] = useState({
    success: false,
    error: false,
    description: '',
  })

  const [photoUrl, setPhotoUrl] = useState<string>('')
  const [sports, setSports] = useState<ISportType[]>([])

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
    console.log('Photo: ', photoUrl)
    dispatch(
      createVenueRequest({
        ...values,
        coverImage: photoUrl === '' ? undefined : photoUrl,
      } as IVenueBody),
    )
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

  const handleUpload = (info: any) => {
    if (info.file.status === 'done') {
      // console.log(info.file.response.secure_url)
      setPhotoUrl(info.file.response.secure_url)
    }
  }

  useEffect(() => {
    async function fetchSports() {
      await fetch('http://127.0.0.1:5000/api/sports', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
        .then((res) => res.json())
        .then(({ data }: { data: ISportType[] }) => {
          setSports(data)
        })
        .catch((err) => console.error(err))
    }

    fetchSports()
  }, [])

  return (
    <>
      <h2 className='text-gray-700 font-semibold text-2xl uppercase mb-2 text-blue-500'>
        Add New Venue
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

        <Form.Item<FieldType>
          name='sportTypes'
          label='Select (Sport Types)'
          required
        >
          <Select
            mode='multiple'
            style={{
              width: '100%',
            }}
            placeholder='Please select sport types'
            options={sports.map((sport) => ({
              label: sport.name,
              value: sport.id,
            }))}
          ></Select>
        </Form.Item>

        <Form.Item
          className='justify-first inline-flex w-full'
          label='Cover Image'
        >
          <Upload.Dragger
            listType='picture-card'
            accept='image/*'
            onChange={handleUpload}
            action={`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLD_CLOUD_NAME}/image/upload`}
            data={{
              upload_preset: 'gamepark',
            }}
          >
            <Button icon={<TiUploadOutline />}>Upload Photo</Button>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item<FieldType> label='Select (Available Days)' name='workDays'>
          <Select
            mode='multiple'
            style={{
              width: '100%',
            }}
            placeholder='Select available days'
            options={[
              {
                label: 'Monday',
                value: 'Monday',
              },
              {
                label: 'Tuesday',
                value: 'Tuesday',
              },
              {
                label: 'Wednesday',
                value: 'Wednesday',
              },
              {
                label: 'Thursday',
                value: 'Thursday',
              },
              {
                label: 'Friday',
                value: 'Friday',
              },
              {
                label: 'Saturday',
                value: 'Saturday',
              },
              {
                label: 'Sunday',
                value: 'Sunday',
              },
            ]}
          ></Select>
        </Form.Item>

        {/* <Form.Item<FieldType> name='hourRange' label='Active Hours'>
          <TimePicker.RangePicker showSecond={false} />
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit' size='large'>
            Create
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
