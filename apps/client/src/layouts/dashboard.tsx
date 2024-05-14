import { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Outlet, useNavigate } from 'react-router-dom'
import { Button, Layout, theme } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RtkRootState } from '@rtk/store'
import { logout } from '@rtk/auth/auth.slice'
import { DashSidebar } from '@components'

const { Header, Content } = Layout

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(true)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const dispatch = useDispatch<AppDispatch>()

  const { user } = useSelector((state: RtkRootState) => state.auth)

  const navigate = useNavigate()

  const handleLogOut = () => {
    dispatch(logout())
    navigate('/auth/login', { replace: true })
  }

  return (
    <Layout className='w-full h-full min-h-screen'>
      <DashSidebar
        collapsed={collapsed}
        userRole={user!.role}
        handleLogOut={handleLogOut}
      />
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className='flex justify-start'
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div
            className={`p-0 m-0 flex flex-col justify-start items-start gap-2 ${!collapsed ? 'hidden' : ''}`}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
