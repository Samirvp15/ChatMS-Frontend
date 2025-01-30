
import axios from 'axios';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useAppSelector } from '../hooks/reduxHook';


export default function Home() {

  const user = useAppSelector(state => state.user)

  console.log(user)

  const fetchUserDetails = async()=>{

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`

      await axios({
        url: url,
        withCredentials: true
      })
 
    } catch (error) {
      if (axios.isAxiosError(error)) {
       console.log(error)
      }
    }
  }

  useEffect(()=>{
    fetchUserDetails()
  },[])


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
