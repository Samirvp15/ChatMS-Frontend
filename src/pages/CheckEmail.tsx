
import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import toast from 'react-hot-toast'
import { PiUserCircle } from "react-icons/pi";




export default function CheckEmail() {

  const [data, setData] = useState({ email: '' })

  const navigate = useNavigate()

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

    const url = `${import.meta.env.VITE_BACKEND_URL}/api/email`

    try {

      const response = await axios.post(url, data)
      toast.success(response.data.message)
      if (response.data.success) {
        setData({ email: '' })
        navigate('/password', {
          state: response.data.data
        })
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
      <div className=' bg-white w-full max-w-sm  rounded overflow-hidden p-4 mx-auto'>
        <div className="w-fit mx-auto mb-2">
          <PiUserCircle size={80} />

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
              value={data.email}
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
