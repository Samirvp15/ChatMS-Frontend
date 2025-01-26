
import { BrowserRouter, Route, Routes } from 'react-router';
import App from '../App'
import Register from '../pages/Register';
import CheckEmail from '../pages/CheckEmail';
import CheckPassword from '../pages/CheckPassword';
import Home from '../pages/Home';
import MessagePage from '../components/MessagePage';
import AuthLayout from '../layout/index';
import ForgotPassword from '../pages/ForgotPassword';



export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<App />}>

          {/* Rutas hijas */}
          <Route path="register" element={<AuthLayout><Register /></AuthLayout>} />
          <Route path="email" element={<AuthLayout><CheckEmail /></AuthLayout>} />
          <Route path="password" element={<AuthLayout><CheckPassword /></AuthLayout>} />
          <Route path="forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />
          <Route path="/" element={<Home />}>
            {/* Ruta dinámica */}
            <Route path=":userId" element={<MessagePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
/*export const router = createBrowserRouter([
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
  */

