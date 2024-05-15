import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RtkRootState } from '@rtk/store'
import { GrHomeRounded, GrUser, GrLogout } from 'react-icons/gr'
import { logout } from '@rtk/auth/auth.slice'
import './header.css'

export function Header() {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated } = useSelector((state: RtkRootState) => state.auth)

  return (
    <header id='header'>
      <nav
        className='fixed bottom-0 left-0 w-full border-t-2 border-gray-200'
        id='menuNav'
      >
        <ul className='mobile__menu'>
          <li>
            <Link to='/' className='link'>
              <GrHomeRounded />
            </Link>
          </li>
          <li>
            <Link to='/dashboard' className='link'>
              <GrUser />
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <button
                  className='btn__logout link'
                  onClick={() => dispatch(logout())}
                >
                  <GrLogout />
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
