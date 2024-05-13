import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RtkRootState } from '@rtk/store'
import { registerRequest } from '@rtk/auth/auth.api'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IRegisterBody } from '@interfaces/auth/register.interface'
import './forms.css'

export function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>()

  const { isLoading } = useSelector((state: RtkRootState) => state.auth)

  const { register, handleSubmit } = useForm<IRegisterBody>()

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
          <span className='text-center text-green-500 capitalize text-6xl font-bold block my-2'>
            Gamepark
          </span>
        </p>
        <p className='text-xl text-gray-500 mt-4 text-lg'>
          Sign up and start playing!
        </p>
      </legend>

      <fieldset className='mt-auto'>
        <input
          {...register('fname')}
          type='text'
          name='fname'
          placeholder='First Name'
          autoComplete='off'
          required
        />
      </fieldset>

      <fieldset>
        <input
          {...register('lname')}
          type='text'
          name='lname'
          placeholder='Last Name'
          autoComplete='off'
          required
        />
      </fieldset>
      <fieldset>
        <input
          {...register('email')}
          type='email'
          name='email'
          placeholder='Email Address'
          autoComplete='off'
          required
        />
      </fieldset>
      <fieldset>
        <input
          {...register('password')}
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='off'
          required
        />
      </fieldset>

      <button type='submit' className='btn_submit' disabled={isLoading}>
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </button>
      <p className='text-center mt-1 text-gray-500'>
        Already have an account? /{' '}
        <span>
          <Link to='/auth/login' className='text-green-500 font-semibold'>
            Sign In
          </Link>
        </span>
      </p>
    </form>
  )
}
