import { useEffect, useState } from 'react'
import { AppDispatch, RtkRootState } from '@rtk/store'
import {
  deleteVenueRequest,
  getOwnVenueRequest,
  updateVenueRequest,
} from '@rtk/venue/venue.api'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, List } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { DeleteItemModal } from 'src/components/modal/DeleteItem'
import { EditItemModal } from 'src/components/modal/EditItem'
import { EditVenueForm } from 'src/components'
import { IVenueEditable } from '@interfaces/venue/venue.interface'
import Notify from 'src/components/notifications/Notify'
import { Link } from 'react-router-dom'

export default function VendorDashboard() {
  const [status, setStatus] = useState({
    success: false,
    error: false,
    description: '',
  })
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, errors, isLoaded, venues } = useSelector(
    (state: RtkRootState) => state.venue,
  )

  const handleDelete = (uid: string) => {
    dispatch(deleteVenueRequest(uid))
      .then(() => {
        setStatus({
          ...status,
          success: true,
          description: 'Removed successfully',
        })
      })
      .catch(() => {
        setStatus({
          ...status,
          error: true,
          description: 'An error occurred while removing',
        })
      })
  }

  const handleEdit = (venue: IVenueEditable, uid: string) => {
    dispatch(updateVenueRequest({ venue, uid }))
      .then(() => {
        setStatus({
          ...status,
          success: true,
          description: 'Updated successfully',
        })
      })
      .catch(() => {
        setStatus({
          ...status,
          error: true,
          description: 'An error occurred while updating',
        })
      })
  }

  useEffect(() => {
    if (isLoaded) return
    dispatch(getOwnVenueRequest())
  }, [isLoaded, dispatch])

  if (isLoading) return <div>Loading...</div>
  if (errors) return <div>Error: {JSON.stringify(errors)}</div>

  return (
    <>
      <h3 className='text-xl font-semibold text-center block w-full text-green-500 mb-4 uppercase'>
        You have: <strong className='text-green-600'>{venues.length}</strong>{' '}
        venues
      </h3>
      <div className='w-full px-0 flex flex-col gap-2'>
        <List
          itemLayout='horizontal'
          dataSource={venues}
          className='flex flex-col gap-2 p-0 m-0'
          renderItem={(item) => (
            <List.Item className='flex flex-col gap-1 rounded-md'>
              <List.Item.Meta
                className='flex items-center justify-between w-full text-left'
                avatar={
                  <Avatar
                    shape={'square'}
                    size={'large'}
                    src={item.coverImage}
                  />
                }
                title={
                  <Link
                    className='text-lg font-semibold hover:underline'
                    to={`/venue/${item.uid}`}
                  >
                    {item.name}
                  </Link>
                }
              />
              <div className='flex flex-col text-left w-full'>
                <p className='text-sm text-gray-600'>
                  <strong>Address</strong>: {item.address}
                </p>
                <p className='text-sm text-gray-600'>
                  <strong>UID</strong>: {item.uid}
                </p>
              </div>
              <div className='flex justify-end w-full gap-x-2'>
                <EditItemModal
                  title='Edit Venue'
                  openElement={
                    <EditOutlined className='text-blue-500 text-xl' />
                  }
                  modalContent={
                    <EditVenueForm
                      venue={item}
                      onUpdate={(data: IVenueEditable, uid: string) =>
                        handleEdit(data, uid)
                      }
                    />
                  }
                  onConfirm={() => null}
                />

                <DeleteItemModal
                  title='Delete Venue'
                  onConfirm={() => handleDelete(item.uid)}
                  openElement={
                    <DeleteOutlined className='text-red-400 text-xl' />
                  }
                  modalContent='Are you sure you want to delete it?'
                />
              </div>
            </List.Item>
          )}
        />
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
      </div>
    </>
  )
}
