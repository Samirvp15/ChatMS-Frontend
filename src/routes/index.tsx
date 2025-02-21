
import { BrowserRouter, Route, Routes } from 'react-router';
import App from '../App'
import Register from '../pages/Register';
import CheckEmail from '../pages/CheckEmail';
import CheckPassword from '../pages/CheckPassword';
import Home from '../pages/Home';
import MessagePage from '../components/MessagePage';
import AuthLayout from '../layout/index';
import ForgotPassword from '../pages/ForgotPassword';
import ProtectedRoute from '../pages/ProtectedRoute';



export function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
      {/* Ruta principal con layout común */}
      <Route path="/" element={<App />}>
        {/* Rutas públicas */}
        <Route path="email" element={<AuthLayout><CheckEmail /></AuthLayout>} />
        <Route path="register" element={<AuthLayout><Register /></AuthLayout>} />
        <Route path="password" element={<AuthLayout><CheckPassword /></AuthLayout>} />
        <Route path="forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          {/* Si se accede a '/' o a sus rutas hijas y el usuario no está autenticado, se redirige a '/email' */}
          <Route path="/" element={<Home />}>
            <Route path=":userId" element={<MessagePage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}
