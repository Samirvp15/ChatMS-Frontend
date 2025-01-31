
import axios from 'axios';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { logout, setUser } from '../redux/userSlice';


export default function Home() {

  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  console.log(user)

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
      <div>
        Home
        <section>
          <Outlet />
        </section>
      </div>
    </>
  )
}
