import { RtkRootState } from '@rtk/store'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

type Role = 'user' | 'admin' | 'vendor'
interface IAuthGuardProps {
  Component: FC
  roles?: Role[]
}

const AuthGuard = ({ Component, roles }: IAuthGuardProps) => {
  const { isAuthenticated, user } = useSelector(
    (state: RtkRootState) => state.auth,
  )

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace={true} />
  }

  if (roles) {
    if (!roles.includes(user!.role)) {
      // forbideen page
      alert('You are not allowed to access this page')
      return
    }
  }

  return <Component />
}

export default AuthGuard
