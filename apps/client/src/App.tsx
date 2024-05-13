import { useNavigate } from 'react-router-dom'
import Router from 'src/Router'
import { useSelector } from 'react-redux'
import { RtkRootState } from '@rtk/store'
import { useEffect } from 'react'
import './App.css'

function App() {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state: RtkRootState) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      navigate('/auth/login', { replace: true })
    } else {
      // Redirect to the home page if authenticated
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  return <Router />
}

export default App
