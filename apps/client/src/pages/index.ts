import { lazy } from 'react'

export { default as HomePage } from './Home.page'

// lazy load pages
export const LoginPage = lazy(() => import('./Login.page'))
export const RegisterPage = lazy(() => import('./Register.page'))
export const DashboardPage = lazy(() => import('./Dashboard.page'))
