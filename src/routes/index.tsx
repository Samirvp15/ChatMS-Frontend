import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx'
import Register from '../pages/Register.tsx';
import CheckEmail from '../pages/CheckEmail.tsx';
import CheckPassword from '../pages/CheckPassword.tsx';
import Home from '../pages/Home.tsx';
import MessagePage from '../components/MessagePage.tsx';
import AuthLayout from '../layout/index.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'register',
        element: (
          <AuthLayout>
            <Register />
          </AuthLayout>
        )
      }, {
        path: 'email',
        element: (
          <AuthLayout>
            <CheckEmail />
          </AuthLayout>
        )
      }, {
        path: 'password',
        element: (
          <AuthLayout>
            <CheckPassword />
          </AuthLayout>
        )
      }, {
        path: '',
        element: <Home />,
        children: [
          {
            path: ':userId',
            element: <MessagePage />
          }
        ]
      }
    ]

  },
]);
