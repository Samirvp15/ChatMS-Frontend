
import axios from 'axios';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice';
import Sidebar from '../components/Sidebar';
import io from 'socket.io-client'

export default function Home() {

  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

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
  useEffect(() => {
    const socketConnection = io(`${import.meta.env.VITE_BACKEND_URL}`, {
      auth: {
        token: localStorage.getItem('token')
      },
      transports: ["websocket"],
    })

    socketConnection.on('onlineUser', (data) => {
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return () => {
      socketConnection.disconnect()
    }

  }, [])



  const basePath = location.pathname === '/'

  return (
    <div className="grid lg:grid-cols-4 h-screen">

      {/* Sidebar a la izquierda (1 columna) */}
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>

      {/* Zona de chat (3 columnas) */}
      <section
        className={`
          ${basePath && "hidden"}
          relative
          md:col-span-3
          flex
          flex-col
          h-full
        `}
      >
        <Outlet />
      </section>

      {/* Imagen/logo central cuando sí es basePath */}
      <div
        className={`
          
          md:col-span-3
          justify-center
          items-center
          flex-col
          gap-2
          hidden
          ${!basePath ? "hidden" : "lg:flex"}
        `}
      >
        <img src="/logo.jpg" alt="logo" className="max-w-full" />
        <p className="text-md mt-4 text-slate-600 italic text-center">
          {`"Bienvenido a Chat MS donde cada conversación cuenta.`}
          <br />
          {`Conecta, comparte y crea momentos inolvidables."`}
        </p>
      </div>
    </div>
  );
}
