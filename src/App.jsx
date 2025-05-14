import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from './components/RootLayout';
import { RouterProvider } from 'react-router-dom';
import Login from './features/authentication/login';
import SignUp from './features/authentication/SignUp';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: '/sign-up',
          element: <SignUp />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
