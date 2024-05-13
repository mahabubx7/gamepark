import { RtkRootState } from '@rtk/store'
import { useEffect } from 'react'
import { GrFormPrevious } from 'react-icons/gr'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export function AuthLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const { isAuthenticated } = useSelector((state: RtkRootState) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      return navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from.pathname, { replace: true })
    } else {
      navigate(-1)
    }
  }

  return (
    <div className='h-full bg-white min-h-screen pt-[6vh] px-[1rem]'>
      <main className='auth__layout mt-[2rem]'>
        <div className='text-left py-4'>
          <button
            onClick={handleGoBack}
            className='text-4xl w-10 h-10 text-green-600 bg-green-100 rounded-full flex items-center justify-center'
          >
            <GrFormPrevious />
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  )
}
