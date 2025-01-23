
import React, { ChangeEvent, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router'
//import  uploadFile  from '../helpers/uploadFile'

const dataUser = {
  name: '',
  email: '',
  password: '',
  profile_pic: '',
}


export default function Register() {

  const [data, setData] = useState(dataUser)
  const [uploadPhoto, setUploadPhoto] = useState<File>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleUploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    //const uploadPhoto = uploadFile(file)
    //console.log(uploadPhoto)
    setUploadPhoto(file)
  }


  const handleClearUploadPhoto = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setUploadPhoto(undefined)
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(data)
  }



  return (
    <div className=' mt-5'>
      <div className=' bg-white w-full max-w-sm  rounded overflow-hidden p-4 mx-auto'>
        <h3>Bienvenidos a Chat MS</h3>


        <form onSubmit={handleSubmit} className=' grid gap-4'>
          <div className=' flex flex-col gap-1 mt-5'>
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
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className=' flex flex-col gap-1 '>
            <label htmlFor='password'>Contraseña:</label>
            <input type="password"
              name="password"
              id="password"
              placeholder='Ingresa tu contraseña'
              className=' bg-slate-200 px-2 py-1 focus:outline-primary'
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className=' flex flex-col gap-1 '>
            <label htmlFor='profile_pic'>Foto de Perfil:
              <div
                className=' bg-slate-200 h-14 flex justify-center items-center border rounded hover:border-primary cursor-pointer' >
                <p className=' text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                  {
                    uploadPhoto?.name
                      ? uploadPhoto.name
                      : ' Subir foto de perfil'
                  }
                </p>
                {
                  uploadPhoto?.name && (
                    <button className='  text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                      <IoClose />
                    </button>
                  )
                }

              </div>
            </label>

            <input type="file"
              name="profile_pic"
              id="profile_pic"
              className=' bg-slate-200 px-2 py-1 focus:outline-primary'
              onChange={handleUploadPhoto}
              hidden
            />

          </div>

          <button className=' bg-primary text-lg px-4 py-1 hover:bg-secondary rounded my-3 font-bold transition-all hover:text-white'>Registrar</button>

        </form>
        <p className=' text-center'>Ya tienes una cuenta?<Link to={'/email'} className=' text-primary font-bold hover:text-secondary ml-2 hover:underline'>Inicia Sesion</Link></p>

      </div>
    </div>
  )
}
