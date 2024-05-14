import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import {
  AppstoreOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems'

interface DashSidebarProps {
  collapsed: boolean
  userRole: 'user' | 'admin' | 'vendor'
  handleLogOut: () => void
}

const AdminMenus: MenuItemType = {
  key: '2',
  icon: (
    <Link to='/dashboard/admin'>
      <AppstoreOutlined />
    </Link>
  ),
  label: 'Admin Portal',
}

const VendorMenus: ItemType<MenuItemType> = {
  key: '2',
  icon: (
    <Link to='/dashboard/vendor'>
      <AppstoreOutlined />
    </Link>
  ),
  label: 'Vendor Portal',
  children: [
    {
      key: '2.1',
      icon: (
        <Link to='/dashboard/vendor/venue'>
          <AppstoreOutlined />
        </Link>
      ),
      label: 'My Venues',
    },
    {
      key: '2.2',
      icon: (
        <Link to='/dashboard/vendor/venue/add'>
          <AppstoreOutlined />
        </Link>
      ),
      label: 'Add New',
    },
  ],
}

export const DashSidebar = ({
  collapsed,
  userRole,
  handleLogOut,
}: DashSidebarProps) => {
  const roleBasedMenus = userRole === 'admin' ? AdminMenus : VendorMenus

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className='transition-all transition-opacity'>
        <Link
          to='/'
          className='logo text-4xl font-semibold text-green-600 capitalize text-center block my-2 mx-auto'
        >
          {collapsed ? 'G.' : 'Gamepark'}
        </Link>
        <span className='text-gray-500 mb-2 block uppercase'>
          {collapsed ? '' : 'Dashboard Portal'}
        </span>
      </div>
      <Menu
        theme='dark'
        mode='inline'
        className='text-left'
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: (
              <Link to='/dashboard'>
                <UserOutlined />
              </Link>
            ),
            label: 'Profile',
          },
          userRole !== 'user' ? roleBasedMenus : null,
          {
            key: '9',
            icon: (
              <button type='button' onClick={handleLogOut}>
                <LogoutOutlined />
              </button>
            ),
            label: 'Logout',
          },
        ]}
      />
    </Sider>
  )
}
