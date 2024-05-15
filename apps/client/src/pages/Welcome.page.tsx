import Lottie from 'lottie-react'
import lottieWelcome from '../assets/play.json'
import { useSelector } from 'react-redux'
import { RtkRootState } from '@rtk/store'
import { Link } from 'react-router-dom'

export default function WelcomePage() {
  const { isAuthenticated } = useSelector((state: RtkRootState) => state.auth)

  return (
    <div className='container bg-gray-50 min-h-screen flex flex-col justify-center items-center'>
      <div className='container flex flex-col gap-0 mt-[-10vh]'>
        <Lottie animationData={lottieWelcome} loop={true} />
      </div>

      <p className='text-gray-600 text-2xl text-wrap'>
        The best place to find your nearest sports venue.
      </p>

      <h2 className='text-green-600 text-5xl font-bold mt-4 uppercase'>
        Gamepark
      </h2>

      {isAuthenticated && (
        <>
          <p className='text-gray-500 text-lg mt-4'>
            You are already authenticated.
          </p>

          <Link
            to='/home'
            className='bg-green-500 text-white px-8 py-2.5 rounded-md mt-4 font-semibold uppercase hover:bg-blue-600 transition-all duration-300 ease-in-out'
          >
            go to home
          </Link>
        </>
      )}

      {!isAuthenticated && (
        <>
          <p className='text-gray-500 text-lg mt-4'>
            Please login or register to continue.
          </p>

          <Link
            to='/auth/login'
            className='bg-green-500 text-white px-8 py-2.5 rounded-md mt-4 font-semibold uppercase hover:bg-blue-600 transition-all duration-300 ease-in-out'
          >
            sign in
          </Link>

          <p className='mt-1.5 text-gray-400 uppercase font-semibold'>or</p>

          <Link
            to='/auth/register'
            className='bg-green-500 text-white px-8 py-2.5 rounded-md mt-1 font-semibold uppercase hover:bg-blue-600 transition-all duration-300 ease-in-out'
          >
            sign up
          </Link>
        </>
      )}
    </div>
  )
}
