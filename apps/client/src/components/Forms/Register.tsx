import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RtkRootState } from '@rtk/store'
import { registerRequest } from '@rtk/auth/auth.api'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IRegisterBody } from '@interfaces/auth/register.interface'
import './forms.css'

export function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>()

  const { isLoading, errors: serverError } = useSelector(
    (state: RtkRootState) => state.auth,
  )

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<IRegisterBody>()

  const handleSubmitForm: SubmitHandler<IRegisterBody> = (data) =>
    dispatch(registerRequest(data))

  return (
    <form
      id='RegisterForm'
      onSubmit={handleSubmit(handleSubmitForm)}
      className='min-h-[65vh]'
    >
      <legend className='mb-auto'>
        <p className='text-left'>
          <span className='text-center text-indigo-500 capitalize text-6xl font-bold block my-2'>
            Gamepark
          </span>
        </p>
        <p className='text-xl text-gray-500 mt-4 text-lg'>
          Sign up and start playing!
        </p>
      </legend>

      {serverError && (
        <p className='error'>
          {typeof serverError === 'string' ? serverError : serverError.message}
        </p>
      )}

      <fieldset className='mt-auto'>
        <input
          {...register('fname', {
            required: 'Last Name is required',
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: 'Invalid Last Name',
            },
            minLength: {
              value: 3,
              message: 'First Name must be at least 3 characters long',
            },
          })}
          type='text'
          name='fname'
          placeholder='First Name'
          autoComplete='off'
        />
        {errors.fname && <span className='error'>{errors.fname.message}</span>}
      </fieldset>

      <fieldset>
        <input
          {...register('lname', {
            required: 'Last Name is required',
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: 'Invalid Last Name',
            },
            minLength: {
              value: 3,
              message: 'Last Name must be at least 3 characters long',
            },
          })}
          type='text'
          placeholder='Last Name'
          autoComplete='off'
        />
        {errors.lname && <span className='error'>{errors.lname.message}</span>}
      </fieldset>
      <fieldset>
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
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </button>
      <p className='text-center mt-1 text-gray-500'>
        Already have an account? /{' '}
        <span>
          <Link to='/auth/login' className='text-indigo-500 font-semibold'>
            Sign In
          </Link>
        </span>
      </p>
    </form>
  )
}
