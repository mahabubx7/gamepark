import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RtkRootState } from '@rtk/store'
import { loginRequest } from '@rtk/auth/auth.api'
import './forms.css'
import { Link } from 'react-router-dom'

export function LoginForm() {
  const dispatch = useDispatch<AppDispatch>()

  const { isLoading } = useSelector((state: RtkRootState) => state.auth)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = (e.target as HTMLFormElement).email.value as string
    const password = (e.target as HTMLFormElement).password.value as string
    dispatch(loginRequest({ email, password }))
  }

  return (
    <form id='loginForm' onSubmit={handleSubmit} className='min-h-[65vh]'>
      <legend className='mb-auto'>
        <p className='text-left'>
          <span className='text-2xl pl-0 text-gray-600 text-center block mb-0'>
            Welcome back to
          </span>
          <span className='text-center text-green-500 capitalize text-6xl font-bold block my-2'>
            Gamepark
          </span>
        </p>
        <p className='text-xl text-gray-500 mt-4 text-sm'>
          Login to continue to your account
        </p>
      </legend>
      <fieldset className='mt-auto'>
        <input
          type='email'
          name='email'
          placeholder='Email Address'
          autoComplete='off'
          required
        />
      </fieldset>
      <fieldset>
        <input
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='off'
          required
        />
      </fieldset>
      <button type='submit' className='btn_submit' disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
      <p className='text-center mt-1 text-gray-500'>
        Are your new here /{' '}
        <span>
          <Link to='/register' className='text-green-500 font-semibold'>
            Register
          </Link>
        </span>
      </p>
    </form>
  )
}
