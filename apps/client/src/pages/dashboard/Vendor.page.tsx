import { useEffect } from 'react'
import { AppDispatch, RtkRootState } from '@rtk/store'
import { deleteVenueRequest, getOwnVenueRequest } from '@rtk/venue/venue.api'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

export default function VendorDashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { isLoading, errors, isLoaded, venues } = useSelector(
    (state: RtkRootState) => state.venue,
  )

  const handleDelete = (uid: string) => {
    dispatch(deleteVenueRequest(uid))
  }

  useEffect(() => {
    if (isLoaded) return
    dispatch(getOwnVenueRequest())
  }, [isLoaded, dispatch])

  if (isLoading) return <div>Loading...</div>
  if (errors) return <div>Error: {JSON.stringify(errors)}</div>

  return (
    <>
      <p>Venues: {venues.length}</p>
      <div className='w-full'>
        <List
          itemLayout='horizontal'
          dataSource={venues}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={<a href='https://ant.design'>{item.name}</a>}
              />
              <div className='flex items-center justify-end gap-1'>
                <button type='button' onClick={() => handleDelete(item.uid)}>
                  <DeleteOutlined className='text-red-400 text-xl' />
                </button>
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  )
}
