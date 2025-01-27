
import axios from 'axios';
import { useEffect } from 'react';
import { Outlet } from 'react-router';


export default function Home() {

  const fetchUserDetails = async()=>{

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`

      const response = await axios({
        url: url,
        withCredentials: true
      })
      console.log(response)
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
