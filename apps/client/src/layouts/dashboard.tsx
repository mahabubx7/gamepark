import { DashboardHeader } from '@components'
import { Outlet } from 'react-router-dom'

export function DashboardLayout() {
  return (
    <div className='container mx-auto'>
      <DashboardHeader />
      <main className='default'>
        <Outlet />
      </main>
    </div>
  )
}
