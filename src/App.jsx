import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from './components/RootLayout';
import { RouterProvider } from 'react-router-dom';
import Login from './features/authentication/login';
import SignUp from './features/authentication/SignUp';
import HomePage from './features/home/HomePage';
import AdminPage from './features/admin/AdminPage';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <SignUp /> },
        { path: '/admin-page', element: <AdminPage /> },
      ],
    },
  ]);
  return (
    <div className='mx-auto max-w-[1700px]'>
      <RouterProvider router={router} />;
    </div>
  );
}
