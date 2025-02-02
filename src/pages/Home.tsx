
import axios from 'axios';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAppDispatch } from '../hooks/reduxHook';
import { logout, setUser } from '../redux/userSlice';
import Sidebar from '../components/Sidebar';


export default function Home() {

  //const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  const fetchUserDetails = async () => {

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`

      const response = await axios({
        url: url,
        withCredentials: true
      })

      dispatch(setUser(response.data.data))

      if (response.data.logout) {
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


  return (
    <>
      <div className="grid  md:grid-rows-1 md:grid-cols-5 h-screen max-h-screen">
        <section className='bg-white'>
          <Sidebar />
        </section>
        <section>
          <Outlet />
        </section>
      </div>
    </>
  )
}
