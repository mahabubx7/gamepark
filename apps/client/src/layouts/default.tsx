import { Header } from '@components'
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <div className='bg-gray-400 h-full'>
      <Header />
      <main className='default'>
        <Outlet />
      </main>
    </div>
  )
}
