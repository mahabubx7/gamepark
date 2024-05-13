import { FC } from 'react'
import { Navigate } from 'react-router-dom'

interface IAuthGuardProps {
  Component: FC
  isAuthenticated: boolean
}

const AuthGuard = ({ Component, isAuthenticated }: IAuthGuardProps) => {
  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />
  }

  return <Component />
}

export default AuthGuard
