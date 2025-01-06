
import React, { ChangeEvent, useState } from 'react'

const dataUser = {
  name: '',
  email:'',
  password: '',
  profile_pic: '',
}


export default function Register() {

  const [data, setData] = useState(dataUser)

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target

    setData((prev)=>{
      return {
        ...prev,
        [name]: value
      }
    })
  }

  return (
    <div className=' mt-5'>
      <div className=' bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4'>
        <h3>Bienvenidos a Chat MS</h3>

        <form action="" className=' grid gap-4'>
          <div className=' flex flex-col gap-1'>
            <label htmlFor='name'>Nombre:</label>
            <input type="text"
              name="name"
              id="name"
              placeholder='Ingresa tu nombre'
              className=' bg-slate-200 px-2 py-1 focus:outline-primary' 
              value={data.name}
              onChange={handleChange}
              required
              />
          </div>

          <div className=' flex flex-col gap-1'>
            <label htmlFor='email'>Correo:</label>
            <input type="email"
              name="email"
              id="email"
              placeholder='Ingresa tu correo'
              className=' bg-slate-200 px-2 py-1 focus:outline-primary' 
              value={data.name}
              onChange={handleChange}
              required
              />
          </div>

          <div className=' flex flex-col gap-1 mt-5'>
            <label htmlFor='password'>Contraseña:</label>
            <input type="password"
              name="password"
              id="password"
              placeholder='Ingresa tu contraseña'
              className=' bg-slate-200 px-2 py-1 focus:outline-primary' 
              value={data.name}
              onChange={handleChange}
              required
              />
          </div>
        </form>

      </div>
    </div>
  )
}
