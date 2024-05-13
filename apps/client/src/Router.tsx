import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthLayout, DashboardLayout, DefaultLayout } from '@layouts'
import { DashboardPage, HomePage, LoginPage } from '@pages'
import { useSelector } from 'react-redux'
import { RtkRootState } from '@rtk/store'
import AuthGuard from './helpers/authGuard'

export default function Router() {
  const { isAuthenticated } = useSelector((state: RtkRootState) => state.auth)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route
            index
            element={
              <AuthGuard
                Component={HomePage}
                isAuthenticated={isAuthenticated}
              />
            }
          ></Route>
          <Route path='*' element={<div>Not found! 404</div>}></Route>
        </Route>

        <Route path='/auth' element={<AuthLayout />}>
          <Route index element={<LoginPage />}></Route>
          <Route path='login' element={<LoginPage />}></Route>
          <Route path='register' element={<div>Register</div>}></Route>
          <Route path='*' element={<div>Not found! 404</div>}></Route>
        </Route>

        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route
            index
            element={
              <AuthGuard
                Component={DashboardPage}
                isAuthenticated={isAuthenticated}
              />
            }
          ></Route>
          <Route path='*' element={<div>Not found! 404</div>}></Route>
        </Route>
      </Routes>
    </Suspense>
  )
}
