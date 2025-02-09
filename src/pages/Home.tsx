
import axios from 'axios';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { logout, setOnlineUser, setUser } from '../redux/userSlice';
import Sidebar from '../components/Sidebar';
import io from 'socket.io-client'

export default function Home() {

  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

console.log('User:: ', user)
  const fetchUserDetails = async () => {

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`

      const response = await axios({
        url: url,
        withCredentials: true
      })
      dispatch(setUser(response.data.data))

      if (response.data.data.logout) {
        dispatch(logout())
        navigate('/email')
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  // Socket Client Connection
  useEffect(()=>{
    const socketConnection = io(`${import.meta.env.VITE_BACKEND_URL}`,{
      auth: {
        token: localStorage.getItem('token')
      },
      transports: ["websocket"],
    })

    socketConnection.on('onlineUser',(data)=>{
      dispatch(setOnlineUser(data))
    })


    return ()=>{
      socketConnection.disconnect()
    }

  },[])



  const basePath = location.pathname === '/'

  return (
    <>
      <div className="grid bg-white grid-cols-1 md:grid-cols-4 min-h-screen">
        {/* Sidebar: En móviles se mostrará en la primera fila; en pantallas md+ ocupará la primera columna (25%) */}
        <div className="bg-slate-200 md:col-span-1">
          <Sidebar />
        </div>

        {/* Área de contenido: En móviles ocupa toda la fila; en pantallas md+ ocupa 3 columnas (75%) */}
        <div className="md:col-span-3 flex flex-col items-center justify-center p-4">
          {basePath ? (
            <div className="flex flex-col items-center gap-2">
              <img src="/logo.jpg" alt="logo" className="max-w-full" />
              <p className="text-md mt-4 text-slate-600 italic text-center">
                {`"Bienvenido a Chat MS donde cada conversación cuenta.`}
                <br />
                {`Conecta, comparte y crea momentos inolvidables."`}
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </>



  )
}
