import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RtkRootState } from '@rtk/store'
import { loginRequest } from '@rtk/auth/auth.api'
import './forms.css'
import { Link } from 'react-router-dom'

export function LoginForm() {
  const dispatch = useDispatch<AppDispatch>()

  const { isLoading, isAuthenticated } = useSelector(
    (state: RtkRootState) => state.auth,
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = (e.target as HTMLFormElement).email.value as string
    const password = (e.target as HTMLFormElement).password.value as string
    dispatch(loginRequest({ email, password }))
  }

  return (
    <form id='loginForm' onSubmit={handleSubmit}>
      <legend>{isAuthenticated ? 'Login Successfull!' : 'Sign In'}</legend>
      <fieldset>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Enter your email address'
          autoComplete='off'
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Enter your password'
          autoComplete='off'
          required
        />
      </fieldset>
      <button type='submit' className='btn btn-submit' disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Login'}
      </button>
      <fieldset className='flex flex-col gap-2 text-center text-sm'>
        <span className='w-full'>
          Don't have an account? <Link to='/register'>Register here</Link>
        </span>
        <Link className='w-full' to='/forgot-password'>
          Forgot Password?
        </Link>
      </fieldset>
    </form>
  )
}
