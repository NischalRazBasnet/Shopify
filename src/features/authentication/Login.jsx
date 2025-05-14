import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, Input, IconButton } from '@material-tailwind/react';
import { useUserLoginMutation } from './authApi';
import toast from 'react-hot-toast';

export default function Login() {
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const [show, setShow] = useState(false);
  return (
    <div className=' max-w-[400px]'>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (val) => {
          try {
            await userLogin(val).unwrap();
            toast.success('Login Successful');
          } catch (err) {
            toast.error(err.data?.message || err.data);
          }
        }}
      >
        {({ handleSubmit, handleChange, touched, values }) => (
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <Input
                onChange={handleChange}
                value={values.email}
                label='Email'
                name='email'
              />
            </div>

            <div className='relative flex w-full'>
              <Input
                onChange={handleChange}
                value={values.password}
                type={show ? 'text' : 'password'}
                label='Password'
                name='password'
                className='pr-20'
                containerProps={{ className: 'min-w-0' }}
              />

              <IconButton
                onClick={() => {
                  setShow(!show);
                }}
                variant='text'
                size='sm'
                className='!absolute right-1 top-1 rounded'
              >
                <i className={show ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
              </IconButton>
            </div>
            <Button loading={isLoading} type='submit'>
              Login
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
