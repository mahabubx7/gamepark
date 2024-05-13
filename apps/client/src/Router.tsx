import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { DashboardLayout, DefaultLayout } from '@layouts'
import { DashboardPage, HomePage, LoginPage } from '@pages'

export default function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path='login' element={<LoginPage />}></Route>
          <Route path='*' element={<div>Not found! 404</div>}></Route>
        </Route>

        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<DashboardPage />}></Route>
          <Route path='*' element={<div>Not found! 404</div>}></Route>
        </Route>
      </Routes>
    </Suspense>
  )
}
