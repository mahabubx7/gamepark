import { Header } from '@components'
import { Outlet } from 'react-router-dom'

export function DefaultLayout() {
  return (
    <div className='container mx-auto'>
      <Header />
      <main className='default'>
        <Outlet />
      </main>
    </div>
  )
}
