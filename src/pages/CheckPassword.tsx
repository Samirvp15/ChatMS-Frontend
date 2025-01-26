
import { ChangeEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import toast from 'react-hot-toast'
//import { PiUserCircle } from "react-icons/pi";
import Avatar from '../components/Avatar';




export default function CheckPassword() {

  const [data, setData] = useState({ password: '' })

  const navigate = useNavigate()
  const location = useLocation()

  console.log('location: ', location)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }


  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const url = `${import.meta.env.VITE_BACKEND_URL}/api/password`

    try {

      const response = await axios.post(url, data)
      toast.success(response.data.message)
      if (response.data.success) {
        setData({ password: '' })
        navigate('/password')
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error((error.response?.data?.message))

      } else {
        toast.error('Ocurrio un error inesperado')
      }
    }
  }



  return (
    <div className=' mt-5'>
      <div className=' bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
        <div className="w-fit mx-auto mb-2 flex justify-center items-center flex-col">
          {/* <PiUserCircle size={80} /> */}
          <Avatar
            name={location.state?.name}
            imageURL={location.state?.profile_pic}
            height={70}
            width={70} />
          <h2>{location.state?.name}</h2>
        </div>
        <h3>Bienvenidos a Chat MS</h3>


        <form onSubmit={handleSubmit} className=' grid gap-4'>


          <div className=' flex flex-col gap-1'>
            <label htmlFor='email'>Correo:</label>
            <input type="email"
              name="email"
              id="email"
              placeholder='Ingresa tu correo'
              className=' bg-slate-200 px-2 py-1 focus:outline-primary'
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>


          <button className=' bg-primary text-lg px-4 py-1 hover:bg-secondary rounded my-3 font-bold transition-all hover:text-white'>Inicia Sesión</button>

        </form>
        <p className=' text-center'>Usuario nuevo?<Link to={'/register'} className=' text-primary font-bold hover:text-secondary ml-2 hover:underline'>Registrate</Link></p>

      </div>
    </div>
  )
}
