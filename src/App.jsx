import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from './components/RootLayout';
import { RouterProvider } from 'react-router-dom';
import Login from './features/authentication/login';
import SignUp from './features/authentication/SignUp';
import ProductList from './features/products/ProductList';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        // {
        //   index: true,
        //   element: <ProductList />,
        // },
        {
          index: true,
          element: <Login />,
        },
        {
          path: '/signup',
          element: <SignUp />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
