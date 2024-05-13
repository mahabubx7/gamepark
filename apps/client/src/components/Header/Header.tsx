import { Link } from 'react-router-dom'
import './header.css'

export function Header() {
  return (
    <header id='header'>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
          <li>
            <Link to='/dashboard/not-found-test'>Dashboard404</Link>
          </li>
          <li>
            <Link to='/not-found-test'>Default404</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
