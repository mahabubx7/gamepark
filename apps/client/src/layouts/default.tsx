import { Header } from '@components'
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <div className='h-full'>
      <Header />
      <main className='default w-full bg-gray-50 min-h-screen pb-[120px]'>
        <Outlet />
      </main>
    </div>
  )
}
