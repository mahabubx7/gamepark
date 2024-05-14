import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthLayout, DashboardLayout, DefaultLayout } from '@layouts'
import {
  HomePage,
  LoginPage,
  RegisterPage,
  VendorAddPage,
  VendorDashboard,
  // VendorDashboard,
} from '@pages'
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
          <Route path='' element={<div>Dashboard</div>} />
          <Route
            path='user'
            element={
              <AuthGuard
                Component={() => <div>User only</div>}
                roles={['user']}
              />
            }
          />
          <Route path='vendor'>
            <Route
              index
              element={
                <AuthGuard Component={VendorDashboard} roles={['vendor']} />
              }
            />
            <Route
              path='venue'
              element={
                <AuthGuard Component={VendorDashboard} roles={['vendor']} />
              }
            />
            <Route
              path='venue/add'
              element={
                <AuthGuard Component={VendorAddPage} roles={['vendor']} />
              }
            />
            <Route
              path='venue/edit/:id'
              element={
                <AuthGuard
                  Component={() => <p>Edit Venue!</p>}
                  roles={['vendor']}
                />
              }
            />
          </Route>
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
