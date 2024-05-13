import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthLayout, DashboardLayout, DefaultLayout } from '@layouts'
import { DashboardPage, HomePage, LoginPage, RegisterPage } from '@pages'
import AuthGuard from './helpers/authGuard'

export default function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<AuthGuard Component={HomePage} />} />
          <Route path='*' element={<div>Not found! 404</div>} />
        </Route>

        <Route path='/auth' element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='*' element={<div>Not found! 404</div>} />
        </Route>

        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<AuthGuard Component={DashboardPage} />} />
          <Route
            path='user'
            element={
              <AuthGuard
                Component={() => <div>User only</div>}
                roles={['user']}
              />
            }
          />
          <Route
            path='vendor'
            element={
              <AuthGuard
                Component={() => <div>Vendors only</div>}
                roles={['vendor']}
              />
            }
          />
          <Route
            path='admin'
            element={
              <AuthGuard
                Component={() => <div>Admins only</div>}
                roles={['admin']}
              />
            }
          />
          <Route path='*' element={<div>Not found! 404</div>} />
        </Route>
      </Routes>
    </Suspense>
  )
}
