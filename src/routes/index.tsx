
import { createBrowserRouter } from 'react-router';
import App from '../App'
import Register from '../pages/Register';
import CheckEmail from '../pages/CheckEmail';
import CheckPassword from '../pages/CheckPassword';
import Home from '../pages/Home';
import MessagePage from '../components/MessagePage';
import AuthLayout from '../layout/index';


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
  