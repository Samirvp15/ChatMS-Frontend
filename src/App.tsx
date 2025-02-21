
import { Outlet } from 'react-router'
import { Toaster } from 'react-hot-toast'
import { useAppDispatch } from './hooks/reduxHook'
import { useEffect, useState } from 'react';
import { setToken } from './redux/userSlice';
import Loading from './components/Loading';


function App() {

  const dispatch = useAppDispatch();
  
  // Estado para saber si estamos rehidratando el token
  const [rehydrating, setRehydrating] = useState(true);


  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      dispatch(setToken(localToken));
    }
 
    // Una vez que lo intentamos leer (exista o no), decimos que ya no estamos rehidratando
    setRehydrating(false);

  }, [dispatch]);

  
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {rehydrating ? (
        // Mostrar algo mientras rehidrata, por ejemplo un spinner o "Cargando..."
        <div className='flex flex-col justify-center items-center h-screen'>

          <Loading />
          <div>
            Cargando ...
          </div>

        </div>
      ) : (
        // Cuando termina la rehidratación, renderizamos las rutas
        <Outlet />
      )}
    </>
  )
}

export default App
