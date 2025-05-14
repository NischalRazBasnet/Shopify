import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Button,
  Input,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import { useUserSignUpMutation } from './authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

export default function SignUp() {
  const nav = useNavigate();
  const [userSignUp, { isLoading }] = useUserSignUpMutation();
  const [show, setShow] = useState(false);
  return (
    <div className='max-w-[400px]'>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={async (val) => {
          try {
            await userSignUp(val).unwrap();
            toast.success('User Created Successfully');
          } catch (err) {
            console.log(err);
            toast.error(err.data?.message || err.data);
          }
        }}
      >
        {({ handleSubmit, handleChange, touched, values }) => (
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <Input
                onChange={handleChange}
                value={values.username}
                label='Username'
                name='username'
              />
            </div>
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
              Sign Up
            </Button>
          </form>
        )}
      </Formik>
      <Typography color='gray' className='mt-4 text-center font-normal'>
        Already have an account?{' '}
        <Button
          variant='text'
          onClick={() => nav(-1)}
          className='font-medium text-gray-900 uppercase px-2'
        >
          LogIn
        </Button>
      </Typography>
    </div>
  );
}
