
import { Navigate, Outlet } from 'react-router';
import { useAppSelector } from '../hooks/reduxHook'; 

const ProtectedRoute = () => {

  // Puedes obtener el token desde Redux o desde localStorage
  const token = useAppSelector(state => state.user.token);

  // Si no existe token, redirige a '/email'
  if (!token) {
    return <Navigate to="/email" replace />;
  }

  // Si el token existe, renderiza las rutas hijas
  return <Outlet />;
};

export default ProtectedRoute;
