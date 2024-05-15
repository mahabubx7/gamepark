import { lazy } from 'react'

export { default as HomePage } from './Home.page'
export { default as WelcomePage } from './Welcome.page'

// lazy load pages
export const LoginPage = lazy(() => import('./Login.page'))
export const RegisterPage = lazy(() => import('./Register.page'))
export const DashboardPage = lazy(() => import('./Dashboard.page'))
export const VendorDashboard = lazy(() => import('./dashboard/Vendor.page'))
export const VendorAddPage = lazy(() => import('./dashboard/vendor/Vendor.add'))
