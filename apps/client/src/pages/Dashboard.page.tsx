import { Route, Routes } from 'react-router-dom'
// import AuthGuard from 'src/helpers'
// import VendorDashboard from './dashboard/Vendor.page'

export default function DashboardPage() {
  return (
    <Routes>
      <Route index element={<h2>Index Dashboard</h2>}></Route>
      {/* <Route path='' element={<div>Dashboard</div>} />
      <Route
        path='user'
        element={
          <AuthGuard Component={() => <div>User only</div>} roles={['user']} />
        }
      />
      <Route
        path='vendor'
        element={<AuthGuard Component={VendorDashboard} roles={['vendor']} />}
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
      <Route path='*' element={<div>Not found! 404</div>} /> */}
    </Routes>
  )
}
