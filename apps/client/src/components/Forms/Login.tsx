import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RtkRootState } from '@rtk/store'
import { loginRequest } from '@rtk/auth/auth.api'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ILoginBody } from '@interfaces/auth/login.interface'
import './forms.css'

export function LoginForm() {
  const dispatch = useDispatch<AppDispatch>()

  const { isLoading, errors: serverError } = useSelector(
    (state: RtkRootState) => state.auth,
  )

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<ILoginBody>()

  const handleSubmitForm: SubmitHandler<ILoginBody> = (data) =>
    dispatch(loginRequest(data))

  return (
    <form
      id='loginForm'
      onSubmit={handleSubmit(handleSubmitForm)}
      className='min-h-[65vh]'
    >
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
      {serverError && (
        <p className='error'>
          {typeof serverError === 'string' ? serverError : serverError.message}
        </p>
      )}
      <fieldset className='mt-auto'>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
          className={`${
            errors.email
              ? 'border-red-500'
              : touchedFields.email && !errors.email
                ? 'valid'
                : ''
          }`}
          type='email'
          placeholder='Email Address'
          autoComplete='off'
        />
        {errors.email && <span className='error'>{errors.email.message}</span>}
      </fieldset>
      <fieldset>
        <input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
              message:
                'Password must contain at least one uppercase letter, one lowercase letter, and one number',
            },
          })}
          className={`${
            errors.password
              ? 'border-red-500'
              : touchedFields.password && !errors.password
                ? 'valid'
                : ''
          }`}
          type='password'
          placeholder='Password'
          autoComplete='off'
        />
        {errors.password && (
          <span className='error'>{errors.password.message}</span>
        )}
      </fieldset>
      <button
        type='submit'
        className='btn_submit'
        disabled={
          (touchedFields.email ?? touchedFields.password) &&
          (isLoading || !isValid)
        }
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
      <p className='text-center mt-1 text-gray-500'>
        Are your new here /{' '}
        <span>
          <Link to='/auth/register' className='text-green-500 font-semibold'>
            Register
          </Link>
        </span>
      </p>
    </form>
  )
}
